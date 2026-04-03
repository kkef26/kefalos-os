import { colors } from '../theme';

interface PotentialItem {
  id: string;
  name: string;
  color: string;
  desc: string;
  note: string;
}

interface Props {
  items: PotentialItem[];
}

export default function Potential({ items }: Props) {
  if (!items || items.length === 0) return null;
  return (
    <section style={{ marginBottom: 28 }} id="potential">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, paddingBottom: 7, borderBottom: `2px solid ${colors.border}` }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: colors.text2 }}>Potential Projects</h2>
        <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 12, fontWeight: 600, background: 'rgba(100,116,139,.1)', color: colors.text3 }}>Ideas not yet greenlit</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(370px,1fr))', gap: 12 }}>
        {items.map(item => (
          <div key={item.id} id={item.id} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 8, borderLeft: `3px solid ${item.color}`, overflow: 'hidden' }}>
            <div style={{ padding: '11px 13px 7px', display: 'flex', alignItems: 'flex-start', gap: 9 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{item.name}</div>
                <div style={{ fontSize: 10, color: colors.text3 }}>{item.desc}</div>
              </div>
              <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, fontWeight: 600, textTransform: 'uppercase', background: 'rgba(100,116,139,.12)', color: '#94a3b8' }}>Potential</span>
            </div>
            <div style={{ padding: '5px 13px 9px', fontSize: 11, color: colors.text3 }}>{item.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
