'use client';

import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const parseMarkdown = (text: string): React.ReactNode[] => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let currentTable: string[][] = [];
    let inTable = false;
    let currentList: React.ReactNode[] = [];
    let inList = false;

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} style={{ paddingLeft: '18px', margin: '8px 0', listStyleType: 'square' }}>
            {currentList}
          </ul>
        );
        currentList = [];
      }
      inList = false;
    };

    const flushTable = () => {
      if (currentTable.length > 0) {
        // Filter out alignment divider row (e.g. |---|---|)
        const rows = currentTable.filter(row => !row.every(cell => cell.trim().match(/^:?-+:?$/)));
        if (rows.length > 0) {
          const headers = rows[0];
          const bodyRows = rows.slice(1);
          elements.push(
            <div key={`table-${elements.length}`} style={{ overflowX: 'auto', margin: '14px 0', border: '1px solid var(--color-border)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.68rem', fontFamily: 'var(--font-geist-mono)' }}>
                <thead>
                  <tr style={{ background: 'var(--color-terminal-800)', borderBottom: '1px solid var(--color-border)' }}>
                    {headers.map((h, i) => (
                      <th key={i} style={{ padding: '6px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--color-muted)' }}>
                        {renderInline(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bodyRows.map((row, ri) => (
                    <tr key={ri} style={{ borderBottom: ri < bodyRows.length - 1 ? '1px solid var(--color-border-subtle)' : undefined, backgroundColor: ri % 2 === 1 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{ padding: '6px 8px', color: 'var(--color-text-secondary)' }}>
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        currentTable = [];
      }
      inTable = false;
    };

    const renderInline = (str: string): React.ReactNode => {
      let parts: React.ReactNode[] = [str];

      // Bold **text**
      parts = parts.flatMap((part) => {
        if (typeof part !== 'string') return part;
        const subParts = part.split(/\*\*([^*]+)\*\*/g);
        return subParts.map((sub, i) => (i % 2 === 1 ? <strong style={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>{sub}</strong> : sub));
      });

      // Code `text`
      parts = parts.flatMap((part) => {
        if (typeof part !== 'string') return part;
        const subParts = part.split(/`([^`]+)`/g);
        return subParts.map((sub, i) => (i % 2 === 1 ? <code style={{ background: 'var(--color-terminal-800)', padding: '1px 3px', border: '1px solid var(--color-border-subtle)', borderRadius: '2px', color: 'var(--color-accent)', fontFamily: 'var(--font-geist-mono)', fontSize: '0.62rem' }}>{sub}</code> : sub));
      });

      return (
        <>
          {parts.map((part, idx) => {
            if (React.isValidElement(part)) {
              return React.cloneElement(part, { key: `inline-el-${idx}` });
            }
            return <React.Fragment key={`inline-txt-${idx}`}>{part}</React.Fragment>;
          })}
        </>
      );
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle Tables
      if (line.trim().startsWith('|')) {
        if (inList) flushList();
        inTable = true;
        const cells = line.split('|').slice(1, -1).map(c => c.trim());
        currentTable.push(cells);
        continue;
      } else if (inTable) {
        flushTable();
      }

      // Handle Lists
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        inList = true;
        const content = line.trim().substring(2);
        currentList.push(
          <li key={`li-${currentList.length}`} style={{ color: 'var(--color-text-secondary)', fontSize: '0.70rem', margin: '3px 0' }}>
            {renderInline(content)}
          </li>
        );
        continue;
      } else if (inList) {
        flushList();
      }

      // Handle Headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text)', borderBottom: '1px solid var(--color-border)', paddingBottom: '6px', margin: '20px 0 10px 0', fontFamily: 'var(--font-geist-mono)' }}>
            {renderInline(line.substring(2))}
          </h1>
        );
        continue;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} style={{ fontSize: '0.80rem', fontWeight: 700, color: 'var(--color-accent)', margin: '16px 0 8px 0', fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.05em' }}>
            {renderInline(line.substring(3))}
          </h2>
        );
        continue;
      }
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-muted)', margin: '12px 0 6px 0', fontFamily: 'var(--font-geist-mono)' }}>
            {renderInline(line.substring(4))}
          </h3>
        );
        continue;
      }

      // Handle Horizontal Rule
      if (line.trim() === '---') {
        elements.push(<hr key={i} style={{ border: 'none', borderBottom: '1px solid var(--color-border)', margin: '14px 0' }} />);
        continue;
      }

      // Handle Blank Line
      if (line.trim() === '') {
        continue;
      }

      // Handle regular text paragraphs
      elements.push(
        <p key={i} style={{ color: 'var(--color-text-secondary)', fontSize: '0.70rem', lineHeight: 1.5, margin: '6px 0' }}>
          {renderInline(line)}
        </p>
      );
    }

    if (inList) flushList();
    if (inTable) flushTable();

    return elements;
  };

  return (
    <div style={{ fontFamily: 'var(--font-geist-mono)', lineHeight: '1.4' }}>
      {parseMarkdown(content)}
    </div>
  );
}
