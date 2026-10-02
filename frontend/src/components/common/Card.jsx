export default function Card({ children, style, className = '' }) {
  return (
    <div className={`glass-card ${className}`} style={{ padding: 24, ...style }}>
      {children}
    </div>
  );
}
