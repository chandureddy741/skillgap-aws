export default function Loader({ text = 'AI is thinking…' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: 40 }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '4px solid var(--light-blue)',
          borderTopColor: 'var(--blue)',
          animation: 'spin 0.9s linear infinite',
        }}
      />
      <p style={{ color: 'var(--text-soft)', fontWeight: 500 }}>{text}</p>
    </div>
  );
}
