'use client';

/**
 * SignalEditor — right panel of the Signal Builder.
 *
 * Three modes:
 *   'idle'     — no signal selected, shows a prompt
 *   'creating' — blank form for a new Master Signal
 *   'editing'  — form pre-populated with the selected signal
 *
 * Local form state (name, conditions, etc.) is managed via useState.
 * On SAVE, the draft is committed to the Zustand signalStore.
 * On DELETE, the signal is removed from the store.
 */

import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSignalStore } from '@/store/signalStore';
import { useUIStore } from '@/store/uiStore';
import ConditionRow from './ConditionRow';
import Badge from '@/components/ui/Badge';
import { Plus, Save, Trash2 } from 'lucide-react';
import type { SubSignal } from '@/types/signals';

// Default condition shape used when adding a new row
const BLANK_CONDITION = (): SubSignal => ({
  id: uuid(),
  name: '',
  metric: 'TNX',
  operator: '>',
  targetValue: undefined,
  targetMetric: undefined,
  isMet: false,
  alertEnabled: true,
});

interface SignalEditorProps {
  /** Controlled by parent — true when [+ NEW] was clicked */
  isCreating: boolean;
  onCreatingDone: () => void;
}

export default function SignalEditor({ isCreating, onCreatingDone }: SignalEditorProps) {
  const { masterSignals, addMasterSignal, updateMasterSignal, removeMasterSignal } = useSignalStore();
  const { selectedMasterSignalId, setSelectedMasterSignalId } = useUIStore();

  // ── Local form state ──────────────────────────────────────────────────────
  const [name, setName] = useState('');
  const [logicMode, setLogicMode] = useState<'AND' | 'OR'>('AND');
  const [conditions, setConditions] = useState<SubSignal[]>([BLANK_CONDITION()]);
  const [alertEnabled, setAlertEnabled] = useState(true);

  // ── Derive mode from props + store ────────────────────────────────────────
  const selectedSignal = masterSignals.find((ms) => ms.id === selectedMasterSignalId);
  const mode: 'idle' | 'creating' | 'editing' =
    isCreating ? 'creating' : selectedSignal ? 'editing' : 'idle';

  // Populate form when a signal is selected for editing
  useEffect(() => {
    if (selectedSignal) {
      setName(selectedSignal.name);
      setLogicMode(selectedSignal.logicMode);
      setConditions(selectedSignal.conditions);
      setAlertEnabled(selectedSignal.alertEnabled);
    }
  }, [selectedSignal]);

  // Reset form when switching to create mode
  useEffect(() => {
    if (isCreating) {
      setName('');
      setLogicMode('AND');
      setConditions([BLANK_CONDITION()]);
      setAlertEnabled(true);
    }
  }, [isCreating]);

  // ── Condition handlers ────────────────────────────────────────────────────
  const handleConditionChange = (index: number, updated: SubSignal) => {
    setConditions((prev) => prev.map((c, i) => (i === index ? updated : c)));
  };

  const handleAddCondition = () => {
    setConditions((prev) => [...prev, BLANK_CONDITION()]);
  };

  const handleDeleteCondition = (index: number) => {
    setConditions((prev) => prev.filter((_, i) => i !== index));
  };

  // ── Save / Delete ─────────────────────────────────────────────────────────
  const handleSave = () => {
    if (!name.trim()) return;

    const draft = { name: name.trim(), conditions, logicMode, alertEnabled };

    if (mode === 'creating') {
      addMasterSignal(draft);
      onCreatingDone();
    } else if (mode === 'editing' && selectedSignal) {
      updateMasterSignal(selectedSignal.id, draft);
    }
  };

  const handleDelete = () => {
    if (!selectedSignal) return;
    removeMasterSignal(selectedSignal.id);
    setSelectedMasterSignalId(null);
  };

  // ── Idle state ────────────────────────────────────────────────────────────
  if (mode === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
          SELECT A SIGNAL OR CLICK NEW
        </span>
      </div>
    );
  }

  // ── Form (creating or editing) ────────────────────────────────────────────
  const isValid = name.trim().length > 0 && conditions.length > 0;

  return (
    <div className="flex flex-col h-full gap-0">

      {/* ── Form header ───────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-2.5 shrink-0"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
            {mode === 'creating' ? 'NEW SIGNAL' : 'EDIT SIGNAL'}
          </span>
          {mode === 'editing' && selectedSignal?.isTriggered && (
            <Badge status="triggered" />
          )}
        </div>

        {/* Delete button — only in edit mode */}
        {mode === 'editing' && (
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-sm transition-opacity opacity-60 hover:opacity-100"
            style={{ color: 'var(--color-signal-alert)' }}
          >
            <Trash2 size={10} /> DELETE SIGNAL
          </button>
        )}
      </div>

      {/* ── Signal name input ─────────────────────────────────────────────── */}
      <div className="px-4 py-3 shrink-0" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
        <label className="block text-[10px] mb-1 tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
          SIGNAL NAME
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Macro Tech Crash Warning"
          className="w-full text-[12px] px-2 py-1.5 rounded-sm outline-none"
          style={{
            backgroundColor: 'var(--color-terminal-700)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
            fontFamily: 'var(--font-mono)',
          }}
        />
      </div>

      {/* ── Logic mode toggle ─────────────────────────────────────────────── */}
      <div className="px-4 py-3 flex items-center gap-4 shrink-0" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
        <span className="text-[10px] tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
          TRIGGER LOGIC
        </span>
        {(['AND', 'OR'] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setLogicMode(mode)}
            className="text-[11px] px-3 py-0.5 rounded-sm transition-colors"
            style={{
              color: logicMode === mode ? 'var(--color-terminal-black)' : 'var(--color-text-secondary)',
              backgroundColor: logicMode === mode ? 'var(--color-accent)' : 'transparent',
              border: '1px solid var(--color-accent)',
            }}
          >
            {mode}
          </button>
        ))}
        <span className="text-[10px] ml-2" style={{ color: 'var(--color-text-muted)' }}>
          {logicMode === 'AND'
            ? 'ALL conditions must be met to trigger'
            : 'ANY condition triggers the signal'}
        </span>
      </div>

      {/* ── Conditions list ───────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
            CONDITIONS ({conditions.length})
          </span>
        </div>

        {conditions.map((condition, index) => (
          <ConditionRow
            key={condition.id}
            condition={condition}
            index={index}
            onChange={(updated) => handleConditionChange(index, updated)}
            onDelete={() => handleDeleteCondition(index)}
          />
        ))}

        {/* Add condition */}
        <button
          type="button"
          onClick={handleAddCondition}
          className="flex items-center gap-1.5 text-[11px] py-1.5 transition-opacity opacity-60 hover:opacity-100 mt-1"
          style={{ color: 'var(--color-accent)' }}
        >
          <Plus size={11} /> ADD CONDITION
        </button>
      </div>

      {/* ── Footer: save + alert toggle ───────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        {/* Master alert toggle */}
        <button
          type="button"
          onClick={() => setAlertEnabled((v) => !v)}
          className="flex items-center gap-1.5 text-[10px] transition-colors"
          style={{ color: alertEnabled ? 'var(--color-signal-ok)' : 'var(--color-text-muted)' }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: alertEnabled ? 'var(--color-signal-ok)' : 'var(--color-signal-neutral)' }}
          />
          {alertEnabled ? 'SIGNAL ALERTS ON' : 'SIGNAL ALERTS OFF'}
        </button>

        {/* Save */}
        <button
          type="button"
          onClick={handleSave}
          disabled={!isValid}
          className="flex items-center gap-1.5 text-[11px] px-4 py-1.5 rounded-sm transition-opacity"
          style={{
            color: 'var(--color-terminal-black)',
            backgroundColor: isValid ? 'var(--color-signal-ok)' : 'var(--color-terminal-600)',
            opacity: isValid ? 1 : 0.5,
            cursor: isValid ? 'pointer' : 'not-allowed',
          }}
        >
          <Save size={11} /> SAVE MASTER SIGNAL
        </button>
      </div>
    </div>
  );
}
