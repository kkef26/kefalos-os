import { PortfolioData } from '../types';
import { colors, DOT_COLORS } from '../theme';

interface Props {
  data: PortfolioData;
  activeSection: string;
  setActiveSection: (s: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  sidebarW: number;
}

const STATUS_DOT_COLOR: Record<string, string> = DOT_COLORS;

export default function Sidebar({ data, activeSection, setActiveSection, sidebarOpen, sidebarW }: Props) {
  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className={`sidebar-nav${sidebarOpen ? ' open' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: sidebarW,
        height: '100vh',
        background: colors.surface,
        borderRight: `1px solid ${colors.border}`,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        overflowY: 'auto',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '14px 16px 12px', borderBottom: `1px solid ${colors.border}`, flexShrink: 0 }}>
        <div style={{ color: colors.sys, fontSize: 15, fontWeight: 700, letterSpacing: '.05em', marginBottom: 2 }}>KEFALOS OS</div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', color: colors.text2, textTransform: 'uppercase' }}>Portfolio Command Center</div>
      </div>

      {/* US Market */}
      <div style={{ padding: '6px 0 2px' }}>
        <div style={{ padding: '4px 16px', fontSize: 10, fontWeight: 700, letterSpacing: '.1em', color: colors.text3, textTransform: 'uppercase', marginBottom: 1 }}>
          US Market <span style={{ display: 'inline-block', fontSize: 9, padding: '1px 5px', borderRadius: 3, marginLeft: 5, fontWeight: 600, background: 'rgba(59,130,246,.15)', color: '#60a5fa' }}>US</span>
        </div>

        <SbBrand name="Grecian Gyro" color={colors.gg} onClick={() => scrollTo('gg')} />
        {[
          { id: 'catering', label: 'Catering', dot: 'green' },
          { id: 'checkback', label: 'Checkback', dot: 'green' },
          { id: 'sidework', label: 'Sidework', dot: 'blue' },
          { id: 'mise', label: 'MISE', dot: 'blue' },
          { id: 'ggconnect', label: 'GGConnect', dot: 'blue' },
          { id: 'smartwatch', label: 'SmartWatch', dot: 'purple' },
          { id: 'admanager', label: 'Ad-manager', dot: 'green' },
        ].map(l => <SbLink key={l.id} label={l.label} dotColor={STATUS_DOT_COLOR[l.dot]} active={activeSection === l.id} onClick={() => scrollTo(l.id)} />)}

        <SbBrand name="Nivio" color={colors.nivio} onClick={() => scrollTo('nivio')} />
        {[
          { id: 'axio', label: 'Axio', dot: 'green' },
          { id: 'tollrouter', label: 'TollRouter', dot: 'blue' },
          { id: 'chameleon', label: 'ChameleonTracker', dot: 'blue' },
          { id: 'marketing', label: 'Marketing_Nivio', dot: 'yellow' },
          { id: 'driveriq', label: 'DriverIQ', dot: 'blue' },
          { id: 'lilbro', label: 'Lil\' BRO', dot: 'green' },
          { id: 'bigbro', label: 'Big BRO', dot: 'yellow' },
          { id: 'bro', label: 'BRO', dot: 'yellow' },
        ].map(l => <SbLink key={l.id} label={l.label} dotColor={STATUS_DOT_COLOR[l.dot]} active={activeSection === l.id} onClick={() => scrollTo(l.id)} />)}
      </div>

      {/* Greece Market */}
      <div style={{ padding: '6px 0 2px' }}>
        <div style={{ padding: '4px 16px', fontSize: 10, fontWeight: 700, letterSpacing: '.1em', color: colors.text3, textTransform: 'uppercase', marginBottom: 1 }}>
          Greece Market <span style={{ display: 'inline-block', fontSize: 9, padding: '1px 5px', borderRadius: 3, marginLeft: 5, fontWeight: 600, background: 'rgba(239,68,68,.15)', color: '#f87171' }}>GR</span>
        </div>

        <SbBrand name="Solid Anadomisi" color={colors.solid} onClick={() => scrollTo('solid')} />
        {[
          { id: 'solid-p', label: 'Solid', dot: 'green' },
          { id: 'pliromi', label: 'Pliromi', dot: 'gray' },
          { id: 'themelio', label: 'Themelio', dot: 'gray' },
        ].map(l => <SbLink key={l.id} label={l.label} dotColor={STATUS_DOT_COLOR[l.dot]} active={activeSection === l.id} onClick={() => scrollTo(l.id)} />)}

        <SbBrand name="Paideia" color={colors.paideia} onClick={() => scrollTo('gr-paideia')} />
        <SbLink label="Paideia App" dotColor={STATUS_DOT_COLOR['blue']} active={activeSection === 'paideia'} onClick={() => scrollTo('paideia')} />

        <SbBrand name="Restaurant Stack" color={colors.greece} onClick={() => scrollTo('gr-stack')} />
        {[
          { id: 'estia', label: 'Estia', dot: 'teal' },
          { id: 'kritiki', label: 'Kritiki', dot: 'gray' },
          { id: 'provoli', label: 'Provoli', dot: 'gray' },
          { id: 'apografi', label: 'Apografi', dot: 'orange' },
        ].map(l => <SbLink key={l.id} label={l.label} dotColor={STATUS_DOT_COLOR[l.dot]} active={activeSection === l.id} onClick={() => scrollTo(l.id)} />)}

        <SbBrand name="Other Greece" color="#f97316" onClick={() => scrollTo('gr-other')} />
        {[
          { id: 'athlisi', label: 'Athlisi', dot: 'orange' },
          { id: 'agrotis', label: 'Agrotis', dot: 'gray' },
        ].map(l => <SbLink key={l.id} label={l.label} dotColor={STATUS_DOT_COLOR[l.dot]} active={activeSection === l.id} onClick={() => scrollTo(l.id)} />)}
      </div>

      {/* Cross-Brand */}
      <div style={{ padding: '6px 0 2px' }}>
        <div style={{ padding: '4px 16px', fontSize: 10, fontWeight: 700, letterSpacing: '.1em', color: colors.text3, textTransform: 'uppercase', marginBottom: 1 }}>Cross-Brand</div>
        <SbLink label="Briefcase" dotColor={STATUS_DOT_COLOR['blue']} active={activeSection === 'briefcase'} onClick={() => scrollTo('briefcase')} />
      </div>

      {/* Pipeline */}
      <div style={{ padding: '6px 0 2px' }}>
        <div style={{ padding: '4px 16px', fontSize: 10, fontWeight: 700, letterSpacing: '.1em', color: colors.text3, textTransform: 'uppercase', marginBottom: 1 }}>Pipeline</div>
        <SbLink label="Potential Projects" dotColor={STATUS_DOT_COLOR['gray']} active={activeSection === 'potential'} onClick={() => scrollTo('potential')} />
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'auto', padding: '10px 16px', borderTop: `1px solid ${colors.border}`, fontSize: 10, color: colors.text3, flexShrink: 0 }}>
        Last updated: <strong>{data.meta.lastUpdated}</strong><br />
        {data.meta.activeProjects} active projects<br />
        <span style={{ color: colors.sys, fontWeight: 600 }}>{data.meta.supabaseTables} Supabase tables · {data.meta.netlifySites} Netlify sites</span>
      </div>
    </nav>
  );
}

function SbBrand({ name, color, onClick }: { name: string; color: string; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{ padding: '5px 16px', display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 600, color: colors.text2, cursor: 'pointer' }}
      onMouseEnter={e => (e.currentTarget.style.background = colors.surface2)}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
      {name}
    </div>
  );
}

function SbLink({ label, dotColor, active, onClick }: { label: string; dotColor: string; active: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '4px 16px 4px 30px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 11,
        color: active ? colors.text : colors.text3,
        cursor: 'pointer',
        borderLeft: `2px solid ${active ? colors.text2 : 'transparent'}`,
        background: active ? colors.surface2 : 'transparent',
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.color = colors.text; e.currentTarget.style.background = colors.surface2; } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.color = colors.text3; e.currentTarget.style.background = 'transparent'; } }}
    >
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
      {label}
    </div>
  );
}
