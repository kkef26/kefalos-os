import { PortfolioData, FocusItem } from '../types';
import { colors, BRAND_COLOR } from '../theme';

interface Props {
  data: PortfolioData;
  showToast: (msg: string) => void;
}

const STAT_COLOR: Record<string, string> = {
  green: colors.green,
  yellow: colors.yellow,
  red: colors.red,
};

export default function FocusZone({ data, showToast }: Props) {
  const fz = data.focusZone;

  const scrollTo = (id?: string) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{
      marginBottom: 24,
      background: 'linear-gradient(135deg,rgba(99,102,241,.06),rgba(59,130,246,.04))',
      border: '1px solid rgba(99,102,241,.25)',
      borderRadius: 10,
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${colors.sys},${colors.blue},${colors.sys})` }} />

      <div style={{ padding: '14px 18px 10px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(99,102,241,.12)' }}>
        <h2 style={{ fontSize: 13, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: colors.sys, flex: 1 }}>🎯 Focus Zone</h2>
        <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 12, background: 'rgba(99,102,241,.15)', color: '#a5b4fc', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase' }}>{fz.mode}</span>
        <span style={{ fontSize: 10, color: colors.text3 }}>{fz.updated}</span>
      </div>

      <div style={{ padding: '12px 18px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {/* Active Work */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: colors.text3, marginBottom: 2 }}>Active Sprint Work</div>
          {fz.activeWork.map((item, i) => (
            <FocusCard key={i} item={item} scrollTo={scrollTo} />
          ))}
        </div>

        {/* Pipeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: colors.text3, marginBottom: 2 }}>{fz.pipeline.title}</div>
          {fz.pipeline.items.map((item: any, i: number) => (
            <FocusCard key={i} item={item} scrollTo={scrollTo} />
          ))}
        </div>

        {/* Divider */}
        <div style={{ gridColumn: '1/-1', borderTop: '1px solid rgba(99,102,241,.1)', margin: '2px 0' }} />

        {/* Stats */}
        <div style={{ gridColumn: '1/-1', display: 'flex', gap: 16, paddingTop: 6, flexWrap: 'wrap' }}>
          {fz.stats.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.color ? STAT_COLOR[s.color] || s.color : colors.text }}>{s.value}</div>
              <div style={{ fontSize: 9, color: colors.text3, textTransform: 'uppercase', letterSpacing: '.06em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FocusCard({ item, scrollTo }: { item: FocusItem & { name: string; blocker?: string }; scrollTo: (id?: string) => void }) {
  const brandColor = BRAND_COLOR[item.brand] || colors.text2;
  const statusColor = item.statusColor === 'green' ? colors.green : item.statusColor === 'red' ? colors.red : item.statusColor === 'yellow' ? colors.yellow : colors.text3;

  return (
    <div
      onClick={() => scrollTo(item.projectId)}
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border2}`,
        borderRadius: 7,
        padding: '10px 13px',
        borderLeft: `3px solid ${item.projectId ? colors.sys : 'transparent'}`,
        cursor: item.projectId ? 'pointer' : 'default',
        transition: 'all .2s',
      }}
      onMouseEnter={e => { if (item.projectId) e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,.2)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: brandColor, flexShrink: 0 }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.text }}>{item.name}</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: statusColor, marginLeft: 'auto' }}>{item.status}</span>
      </div>
      <div style={{ fontSize: 10, color: colors.text3, marginBottom: 5, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{item.desc}</div>
      {item.action && (
        <div style={{ fontSize: 11, color: colors.text2, padding: '4px 8px', background: 'rgba(16,185,129,.06)', border: '1px solid rgba(16,185,129,.12)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ color: colors.green }}>▶</span>{item.action}
        </div>
      )}
      {item.blocker && (
        <div style={{ fontSize: 11, color: '#fca5a5', padding: '4px 8px', background: 'rgba(239,68,68,.06)', border: '1px solid rgba(239,68,68,.12)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ color: colors.red }}>⚠</span>{item.blocker}
        </div>
      )}
    </div>
  );
}
