import { useState } from 'react';
import { PortfolioData } from '../types';
import { colors } from '../theme';

interface Props {
  data: PortfolioData;
  sidebarW: number;
  topbarH: number;
  onMenuClick: () => void;
}

const COLOR_MAP: Record<string, string> = {
  green: colors.green,
  blue: colors.blue,
  yellow: colors.yellow,
  red: colors.red,
};

const ALERT_COLOR: Record<string, string> = {
  red: colors.red,
  yellow: colors.yellow,
  green: colors.green,
};

export default function Topbar({ data, sidebarW, topbarH, onMenuClick }: Props) {
  const [alertIdx, setAlertIdx] = useState(0);
  const alerts = data.topbar.alerts;

  return (
    <header
      className="topbar-main"
      style={{
        position: 'fixed',
        top: 0,
        left: sidebarW,
        right: 0,
        height: topbarH,
        background: colors.surface,
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 18px',
        gap: 14,
        zIndex: 99,
      }}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        style={{ display: 'none', background: 'none', border: 'none', color: colors.text2, cursor: 'pointer', fontSize: 18, padding: 0, lineHeight: 1 }}
        className="menu-btn"
      >
        ☰
      </button>

      {data.topbar.stats.map((stat, i) => (
        <span key={i} style={{ display: 'flex' }}>
          {i > 0 && <div style={{ width: 1, height: 28, background: colors.border, flexShrink: 0, marginRight: 14 }} />}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 40 }}>
            <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1, color: stat.color ? COLOR_MAP[stat.color] || stat.color : colors.text }}>{stat.value}</div>
            <div style={{ fontSize: 9, color: colors.text3, textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 2 }}>{stat.label}</div>
          </div>
        </span>
      ))}

      <div style={{ width: 1, height: 28, background: colors.border, flexShrink: 0 }} />

      {/* Alert ticker */}
      <div style={{ flex: 1, padding: '5px 10px', background: colors.surface2, borderRadius: 6, border: `1px solid ${colors.border2}`, cursor: 'pointer', overflow: 'hidden' }}
        onClick={() => setAlertIdx((alertIdx + 1) % alerts.length)}
      >
        <div style={{ fontSize: 9, color: colors.text3, textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 3 }}>
          Status — {data.topbar.statusDate}
        </div>
        <div style={{ fontSize: 10, color: ALERT_COLOR[alerts[alertIdx]?.type] || colors.text2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {alerts[alertIdx]?.text}
        </div>
        <div style={{ fontSize: 9, color: colors.text3, marginTop: 1 }}>{alertIdx + 1}/{alerts.length} — click to cycle</div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
