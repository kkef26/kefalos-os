import { useState } from 'react';
import { Project } from '../types';
import { colors } from '../theme';

interface Props {
  project: Project;
  showToast: (msg: string) => void;
}

export default function ActionForm({ project, showToast }: Props) {
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [blockerNote, setBlockerNote] = useState('');
  const [generalNote, setGeneralNote] = useState('');
  const [diffVisible, setDiffVisible] = useState(false);
  const [diffContent, setDiffContent] = useState('');

  const pendingTasks = project.tasks?.filter(t => !t.done) || [];

  const toggleTask = (idx: number) => {
    setCompletedTasks(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const buildDiff = () => {
    const changes: any = {};
    if (completedTasks.size > 0 || blockerNote || generalNote) {
      const taskUpdates: any[] = [];
      completedTasks.forEach(idx => {
        const task = pendingTasks[idx];
        if (task) taskUpdates.push({ text: task.text, done: true });
      });
      if (taskUpdates.length > 0) changes.taskUpdates = taskUpdates;
      if (blockerNote) changes.blockerCleared = blockerNote;
      if (generalNote) changes.note = generalNote;
      changes.projectId = project.id;
      changes.timestamp = new Date().toISOString();
    }
    return JSON.stringify(changes, null, 2);
  };

  const handleSubmit = () => {
    const diff = buildDiff();
    setDiffContent(diff);
    setDiffVisible(true);

    // Try File System Access API
    if ('showSaveFilePicker' in window) {
      (async () => {
        try {
          const handle = await (window as any).showSaveFilePicker({
            suggestedName: `update_${project.id}_${Date.now()}.json`,
            types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }],
          });
          const writable = await handle.createWritable();
          await writable.write(diff);
          await writable.close();
          showToast('Changes saved to file!');
        } catch {
          // User cancelled or not supported — diff is shown below
        }
      })();
    } else {
      showToast('Changes ready — copy JSON diff below');
    }
  };

  const copyDiff = () => {
    navigator.clipboard.writeText(diffContent);
    showToast('JSON diff copied to clipboard');
  };

  return (
    <div style={{ marginTop: 8, padding: '10px', background: colors.bg, border: `1px solid ${colors.border2}`, borderRadius: 5 }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: colors.text3, marginBottom: 8 }}>Action Submission</div>

      {pendingTasks.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: colors.text3, marginBottom: 4 }}>Mark prerequisites done:</div>
          {pendingTasks.map((task, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, padding: '3px 0', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={completedTasks.has(i)}
                onChange={() => toggleTask(i)}
                style={{ marginTop: 2, accentColor: colors.green }}
              />
              <span style={{ fontSize: 11, color: completedTasks.has(i) ? colors.green : colors.text2 }}>{task.text}</span>
            </label>
          ))}
        </div>
      )}

      {project.blocker && (
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: colors.text3, marginBottom: 4 }}>Clear blocker (explain resolution):</div>
          <textarea
            value={blockerNote}
            onChange={e => setBlockerNote(e.target.value)}
            placeholder="How was the blocker resolved?"
            style={{ width: '100%', background: colors.surface, border: `1px solid ${colors.border2}`, borderRadius: 3, padding: '5px 7px', color: colors.text2, fontSize: 11, fontFamily: 'inherit', resize: 'vertical', minHeight: 40, outline: 'none' }}
          />
        </div>
      )}

      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 10, color: colors.text3, marginBottom: 4 }}>Add note:</div>
        <textarea
          value={generalNote}
          onChange={e => setGeneralNote(e.target.value)}
          placeholder="Context, decisions, or status update..."
          style={{ width: '100%', background: colors.surface, border: `1px solid ${colors.border2}`, borderRadius: 3, padding: '5px 7px', color: colors.text2, fontSize: 11, fontFamily: 'inherit', resize: 'vertical', minHeight: 40, outline: 'none' }}
        />
      </div>

      <button
        onClick={handleSubmit}
        style={{ width: '100%', padding: '6px', background: 'rgba(59,130,246,.1)', border: `1px solid ${colors.blue}`, borderRadius: 3, color: '#60a5fa', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
      >
        Submit Changes
      </button>

      {diffVisible && (
        <div style={{ marginTop: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ fontSize: 10, color: colors.text3 }}>JSON diff (copy into portfolio_data.json or save):</div>
            <button onClick={copyDiff} style={{ fontSize: 10, padding: '2px 7px', background: 'rgba(99,102,241,.1)', border: `1px solid ${colors.border2}`, borderRadius: 3, color: colors.sys, cursor: 'pointer', fontFamily: 'inherit' }}>Copy</button>
          </div>
          <pre style={{ fontSize: 10, color: colors.text2, background: colors.surface, border: `1px solid ${colors.border2}`, borderRadius: 3, padding: '8px', overflow: 'auto', maxHeight: 200 }}>
            {diffContent}
          </pre>
        </div>
      )}
    </div>
  );
}
