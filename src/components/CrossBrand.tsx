import { Project } from '../types';
import { colors } from '../theme';
import ProjectCard from './ProjectCard';

interface Props {
  projects: Project[];
  showToast: (msg: string) => void;
}

export default function CrossBrand({ projects, showToast }: Props) {
  if (!projects || projects.length === 0) return null;
  return (
    <section style={{ marginBottom: 28 }} id="briefcase">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, paddingBottom: 7, borderBottom: `2px solid ${colors.border}` }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: colors.text2 }}>Cross-Brand Products</h2>
        <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 12, fontWeight: 600, background: 'rgba(52,211,153,.1)', color: '#34d399' }}>Standalone</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(370px,1fr))', gap: 12 }}>
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} brandColor="#34d399" showToast={showToast} />
        ))}
      </div>
    </section>
  );
}
