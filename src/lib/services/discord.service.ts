/**
 * Discord Notification Service — SERVER ONLY.
 *
 * Sends rich embeds to a Discord channel via webhook when Master Signals trigger.
 * The webhook URL lives in DISCORD_WEBHOOK_URL (.env.local) — never in source code.
 *
 * Alert gating rules (must ALL pass before a notification is sent):
 *   1. The MasterSignal's own `alertEnabled` flag must be true.
 *   2. At least one SubSignal in the triggered set must have `alertEnabled: true`.
 *      (A signal where every condition has alerts silenced is treated as silent.)
 *
 * Each embed includes:
 *   - Signal name + logic mode (AND / OR)
 *   - One field per ALERTED condition showing its name and met/not-met state
 *   - Completion summary (e.g. "3/3 conditions met")
 *   - Timestamp in Europe/London timezone
 */

import type { MasterSignal, SubSignal } from '@/types/signals';

// ─── Discord API shape (minimal — only fields we use) ────────────────────────

interface DiscordEmbedField {
  name: string;
  value: string;
  inline: boolean;
}

interface DiscordEmbed {
  title: string;
  description: string;
  color: number; // decimal RGB integer
  fields: DiscordEmbedField[];
  footer: { text: string };
  timestamp: string; // ISO 8601
}

interface DiscordWebhookPayload {
  username: string;
  avatar_url?: string;
  embeds: DiscordEmbed[];
}

// ─── Colour constants ─────────────────────────────────────────────────────────

/** Neon red — signal fully triggered */
const COLOUR_TRIGGERED = 0xff3333;
/** Amber — partial (≥50% met in AND mode, used for partial OR signals) */
const COLOUR_PARTIAL    = 0xffaa00;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Format a number cleanly — no trailing zeros. */
function fmt(n: number): string {
  return Number.isInteger(n) ? n.toLocaleString('en-GB') : n.toFixed(2);
}

/** Human-readable operator label for embed display. */
function operatorLabel(op: SubSignal['operator']): string {
  switch (op) {
    case '>':           return '>';
    case '<':           return '<';
    case '>=':          return '≥';
    case '<=':          return '≤';
    case 'EQUALS':      return '=';
    case 'CROSS_ABOVE': return '⬆ crossed above';
    case 'CROSS_BELOW': return '⬇ crossed below';
  }
}

/** Friendly threshold string — shows target value or metric name. */
function thresholdLabel(condition: SubSignal): string {
  if (condition.targetMetric) return condition.targetMetric;
  if (condition.targetValue !== undefined) return fmt(condition.targetValue);
  return '—';
}

/**
 * Build the condition line shown in the embed field value.
 * Only conditions with alertEnabled: true are included.
 */
function buildConditionLine(condition: SubSignal): string {
  const status = condition.isMet ? '✅' : '⬜';
  const threshold = `${operatorLabel(condition.operator)} ${thresholdLabel(condition)}`;
  return `${status}  \`${condition.metric}\` ${threshold}`;
}

/** London timestamp — "18 May 2026, 14:32 BST" */
function londonTimestamp(): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date());
}

// ─── Embed builder ────────────────────────────────────────────────────────────

function buildEmbed(signal: MasterSignal): DiscordEmbed {
  // Only show conditions that the user has chosen to alert on
  const alertedConditions = signal.conditions.filter((c) => c.alertEnabled);

  const conditionLines = alertedConditions
    .map(buildConditionLine)
    .join('\n');

  const { metConditions, totalConditions, logicMode, isTriggered } = signal;

  const summary = `**${metConditions}/${totalConditions}** conditions met · ${logicMode} logic`;

  // Colour: red when fully triggered, amber when partial (≥50% and at least 1 met)
  const colour =
    isTriggered
      ? COLOUR_TRIGGERED
      : metConditions / totalConditions >= 0.5
        ? COLOUR_PARTIAL
        : COLOUR_PARTIAL; // still amber for any partial notification

  return {
    title: `🔴 SIGNAL TRIGGERED — ${signal.name}`,
    description: conditionLines || '_No individually-alerted conditions._',
    color: colour,
    fields: [
      {
        name: 'Summary',
        value: summary,
        inline: false,
      },
    ],
    footer: { text: `Market Sentinel · ${londonTimestamp()}` },
    timestamp: new Date().toISOString(),
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Send Discord notifications for each triggered Master Signal that has alerts enabled.
 *
 * Gating:
 *   - `signal.alertEnabled` must be true (user opt-in at signal level).
 *   - At least one condition in the signal must have `alertEnabled: true`
 *     (user opt-in at condition level).
 *
 * Each signal is sent as a separate embed in a single webhook POST
 * (Discord supports up to 10 embeds per message).
 *
 * Returns the number of signals actually notified.
 */
export async function sendDiscordAlerts(
  triggeredSignals: MasterSignal[]
): Promise<number> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('[Discord] DISCORD_WEBHOOK_URL not set — notifications skipped.');
    return 0;
  }

  // Apply both gating rules:
  //   1. Signal-level: alertEnabled must be true
  //   2. Condition-level: at least one condition must have alertEnabled: true
  const alertable = triggeredSignals.filter(
    (ms) =>
      ms.alertEnabled &&
      ms.conditions.some((c) => c.alertEnabled)
  );

  if (alertable.length === 0) return 0;

  // Discord allows up to 10 embeds per message; we batch if needed
  const BATCH_SIZE = 10;
  let notified = 0;

  for (let i = 0; i < alertable.length; i += BATCH_SIZE) {
    const batch = alertable.slice(i, i + BATCH_SIZE);
    const payload: DiscordWebhookPayload = {
      username: 'Market Sentinel',
      embeds: batch.map(buildEmbed),
    };

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // No caching — every call is a live notification
      cache: 'no-store',
    });

    if (!res.ok) {
      // Log but don't throw — a failed notification should never crash the route
      const body = await res.text().catch(() => '');
      console.error(`[Discord] Webhook POST failed: ${res.status}`, body);
    } else {
      notified += batch.length;
    }
  }

  return notified;
}
