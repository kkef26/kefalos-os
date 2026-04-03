import { Market } from '../types';
import { colors } from '../theme';
import ProjectCard from './ProjectCard';

interface Props {
  market: Market;
  showToast: (msg: string) => void;
}

const BADGE_BG: Record<string, string> = {
  blue: 'rgba(59,130,246,.1)',
  red: 'rgba(239,68,68,.1)',
};
const BADGE_COLOR: Record<string, string> = {
  blue: '#60a5fa',
  red: '#f87171',
};

export default function MarketSection({ market, showToast }: Props) {
  return (
    <section style={{ marginBottom: 28 }} id={market.id}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, paddingBottom: 7, borderBottom: `2px solid ${colors.border}` }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: colors.text2 }}>{market.name}</h2>
        <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 12, fontWeight: 600, background: BADGE_BG[market.badgeColor] || 'rgba(100,116,139,.1)', color: BADGE_COLOR[market.badgeColor] || colors.text3 }}>
          {market.badge}
        </span>
        {market.extraNote && (
          <span style={{ fontSize: 10, color: colors.green, marginLeft: 8 }}>
            ✓ <code style={{ background: colors.surface2, padding: '1px 4px', borderRadius: 3 }}>greece-portfolio</code> Supabase live — all migrations applied
          </span>
        )}
      </div>

      {market.brands.map(brand => (
        <div key={brand.id} style={{ marginBottom: 22 }} id={brand.id}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 9 }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: brand.color }} />
            <h3 style={{ fontSize: 12, fontWeight: 700, color: colors.text2, letterSpacing: '.04em' }}>{brand.name}</h3>
            {brand.subtitle && <span style={{ fontSize: 10, color: colors.text3, marginLeft: 3 }}>{brand.subtitle}</span>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(370px,1fr))', gap: 12 }}>
            {brand.projects.map(project => (
              <ProjectCard key={project.id} project={project} brandColor={brand.color} showToast={showToast} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
