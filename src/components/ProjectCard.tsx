import { useState, useEffect } from 'react';
import { Project } from '../types';
import { colors, DOT_COLORS, BADGE_STYLES } from '../theme';
import ActionForm from './ActionForm';

interface Props {
  project: Project;
  brandColor: string;
  showToast: (msg: string) => void;
}

function SprintRing({ pct, color }: { pct: number; color: string }) {
  const r = 14;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r={r} fill="none" stroke={colors.border} strokeWidth="4" />
      <circle cx="18" cy="18" r={r} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset} transform="rotate(-90 18 18)" />
    </svg>
  );
}

export default function ProjectCard({ project, brandColor, showToast }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [showActionForm, setShowActionForm] = useState(false);

  const statusDotColor = DOT_COLORS[project.statusDot] || colors.text3;
  const ringColor = typeof project.sprintColor === 'string' && project.sprintColor.startsWith('#')
    ? project.sprintColor
    : (colors as any)[project.sprintColor] || colors.green;

  useEffect(() => {
    const saved = localStorage.getItem(`note-${project.id}`);
    if (saved) setNotes(saved);
  }, [project.id]);

  const saveNote = () => {
    localStorage.setItem(`note-${project.id}`, notes);
    showToast(`Note saved for ${project.name}`);
  };

  const copyPrompt = () => {
    if (!project.agentPrompt) return;
    const fullPrompt = notes
      ? `${project.agentPrompt}\n\nContext/Prerequisites:\n${notes}`
      : project.agentPrompt;
    navigator.clipboard.writeText(fullPrompt).then(() => {
      setCopied(true);
      showToast('Agent prompt copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const hasSprint = !!(project.sprintLabel || (project.tasks && project.tasks.length > 0));

  return (
    <div
      id={project.id}
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 8,
        borderLeft: `3px solid ${brandColor}`,
        overflow: 'hidden',
        transition: 'border-color .2s, box-shadow .2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = colors.border2; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,.3)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Card Header */}
      <div style={{ padding: '11px 13px 7px', display: 'flex', alignItems: 'flex-start', gap: 9 }}>
        <div style={{ width: 30, height: 30, borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, background: `${brandColor}20` }}>
          {project.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: statusDotColor, flexShrink: 0 }} />
            <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>{project.name}</div>
          </div>
          <div style={{ fontSize: 10, color: colors.text3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.desc}</div>
          <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', marginTop: 3 }}>
            {project.badges.map((b, i) => {
              const style = BADGE_STYLES[b.type] || BADGE_STYLES.none;
              return (
                <span key={i} style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', background: style.bg, color: style.color }}>
                  {b.text}
                </span>
              );
            })}
          </div>
        </div>
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <SprintRing pct={project.sprintPct} color={ringColor} />
          <div style={{ fontSize: 10, fontWeight: 700, color: ringColor }}>{project.sprintPct}%</div>
        </div>
      </div>

      {/* Next Action bar */}
      {project.nextAction && (
        <div style={{ margin: '0 13px 5px', padding: '5px 9px', background: 'rgba(16,185,129,.06)', border: '1px solid rgba(16,185,129,.15)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ color: colors.green, fontSize: 10, flexShrink: 0 }}>▶</span>
          <span style={{ fontSize: 11, color: colors.text2, flex: 1 }}>{project.nextAction}</span>
          {project.nextActionStatus && <span style={{ fontSize: 10, color: colors.text3, flexShrink: 0 }}>{project.nextActionStatus}</span>}
        </div>
      )}

      {/* Blocker bar */}
      {project.blocker && (
        <div style={{ margin: '0 13px 5px', padding: '5px 9px', background: 'rgba(239,68,68,.06)', border: '1px solid rgba(239,68,68,.15)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ color: colors.red, fontSize: 10, flexShrink: 0 }}>⚠</span>
          <span style={{ fontSize: 11, color: '#fca5a5', flex: 1 }}>{project.blocker}</span>
        </div>
      )}

      {/* Info bar */}
      {project.infoBar && (
        <div style={{ margin: '0 13px 5px', padding: '5px 9px', background: 'rgba(99,102,241,.06)', border: '1px solid rgba(99,102,241,.15)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ color: colors.sys, fontSize: 10, flexShrink: 0 }}>ℹ</span>
          <span style={{ fontSize: 11, color: '#a5b4fc', flex: 1 }}>{project.infoBar}</span>
        </div>
      )}

      {/* Planning note (no sprint) */}
      {project.note && !hasSprint && (
        <div style={{ padding: '5px 13px 9px', fontSize: 11, color: colors.text3 }}>{project.note}</div>
      )}

      {/* Sprint section */}
      {hasSprint && (
        <div style={{ borderTop: `1px solid ${colors.border}`, marginTop: 5 }}>
          {/* Active sprint header */}
          <div
            onClick={() => setExpanded(!expanded)}
            style={{ padding: '7px 13px', display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', background: 'rgba(16,185,129,.02)' }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: colors.green, flexShrink: 0, animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: colors.green, flex: 1 }}>{project.sprintLabel}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 52, height: 4, background: colors.border2, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${project.sprintPct}%`, background: colors.green, borderRadius: 2 }} />
              </div>
              <span style={{ fontSize: 10, color: colors.text3 }}>{project.sprintProgress}</span>
            </div>
            <span style={{ fontSize: 10, color: colors.text3, marginLeft: 4 }}>{expanded ? '▼' : '▶'}</span>
          </div>

          {/* Task list */}
          {expanded && (
            <div style={{ padding: '3px 13px 9px' }}>
              <div style={{ marginBottom: 7 }}>
                {project.tasks?.map((task, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, padding: '2px 0', fontSize: 11, color: task.done ? colors.text3 : colors.text2 }}>
                    <span style={{ color: task.done ? colors.green : colors.text3, flexShrink: 0, marginTop: 1 }}>{task.done ? '✓' : '○'}</span>
                    <span style={{ textDecoration: task.done ? 'line-through' : 'none', opacity: task.done ? 0.6 : 1, flex: 1 }}>{task.text}</span>
                    {task.critical && <span style={{ fontSize: 9, padding: '1px 4px', background: 'rgba(239,68,68,.12)', color: '#f87171', borderRadius: 3, marginLeft: 'auto', flexShrink: 0 }}>CRITICAL</span>}
                    {!task.critical && task.owner === 'agent' && <span style={{ fontSize: 9, padding: '1px 4px', background: 'rgba(99,102,241,.12)', color: colors.sys, borderRadius: 3, marginLeft: 'auto', flexShrink: 0 }}>🤖</span>}
                    {!task.critical && task.owner === 'kosta' && <span style={{ fontSize: 9, marginLeft: 'auto', flexShrink: 0, color: colors.text3 }}>👤</span>}
                  </div>
                ))}
              </div>

              {/* Trigger area */}
              {project.agentPrompt && (
                <div style={{ background: colors.surface2, border: `1px solid ${colors.border2}`, borderRadius: 5, padding: 7, marginTop: 5 }}>
                  <textarea
                    value={notes}
                    onChange={e => { setNotes(e.target.value); localStorage.setItem(`note-${project.id}`, e.target.value); }}
                    placeholder="Prerequisites / bypass reason / context..."
                    style={{
                      width: '100%',
                      background: colors.surface,
                      border: `1px solid ${colors.border2}`,
                      borderRadius: 3,
                      padding: '5px 7px',
                      color: colors.text2,
                      fontSize: 11,
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      minHeight: 40,
                      marginBottom: 5,
                      outline: 'none',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = colors.sys; }}
                    onBlur={e => { e.currentTarget.style.borderColor = colors.border2; }}
                  />
                  <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    <button
                      onClick={copyPrompt}
                      style={{
                        flex: 1,
                        padding: '5px 9px',
                        background: copied ? 'rgba(16,185,129,.1)' : 'rgba(99,102,241,.1)',
                        border: `1px solid ${copied ? colors.green : 'rgba(99,102,241,.25)'}`,
                        borderRadius: 3,
                        color: copied ? colors.green : colors.sys,
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'center',
                        fontFamily: 'inherit',
                      }}
                    >
                      {copied ? '✓ Copied!' : '📋 Copy Agent Prompt'}
                    </button>
                    <button
                      onClick={saveNote}
                      style={{ padding: '5px 9px', background: 'transparent', border: `1px solid ${colors.border2}`, borderRadius: 3, color: colors.text3, fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = colors.green; e.currentTarget.style.color = colors.green; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = colors.border2; e.currentTarget.style.color = colors.text3; }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowActionForm(!showActionForm)}
                      style={{ padding: '5px 9px', background: 'transparent', border: `1px solid ${colors.border2}`, borderRadius: 3, color: colors.text3, fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = colors.blue; e.currentTarget.style.color = '#60a5fa'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = colors.border2; e.currentTarget.style.color = colors.text3; }}
                    >
                      {showActionForm ? 'Close' : '⚡ Actions'}
                    </button>
                  </div>
                  {showActionForm && <ActionForm project={project} showToast={showToast} />}
                </div>
              )}
            </div>
          )}

          {/* Sprints done count */}
          {project.sprintsDone !== undefined && project.sprintsDone > 0 && (
            <div style={{ padding: '4px 13px', fontSize: 10, color: colors.text3, display: 'flex', alignItems: 'center', gap: 5, borderTop: `1px solid ${colors.border}` }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 15, height: 15, background: colors.border2, borderRadius: '50%', fontSize: 9, fontWeight: 700, color: colors.text3 }}>{project.sprintsDone}</span>
              sprints done
            </div>
          )}
        </div>
      )}
    </div>
  );
}
