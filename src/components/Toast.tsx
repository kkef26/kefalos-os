import { colors } from '../theme';

interface Props {
  message: string;
}

export default function Toast({ message }: Props) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 18,
      right: 18,
      padding: '9px 14px',
      background: colors.surface3,
      border: `1px solid ${colors.border2}`,
      borderRadius: 5,
      color: colors.text,
      fontSize: 12,
      zIndex: 999,
      opacity: message ? 1 : 0,
      transform: message ? 'translateY(0)' : 'translateY(6px)',
      transition: 'all .2s',
      pointerEvents: 'none',
    }}>
      {message}
    </div>
  );
}
