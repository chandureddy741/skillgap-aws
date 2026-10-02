import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(30, 41, 59, 0.4)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        className="glass-card fade-up"
        style={{ maxWidth: 640, width: '92%', maxHeight: '80vh', overflow: 'auto', padding: 28, background: 'var(--white)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3>{title}</h3>
          <button onClick={onClose} style={{ background: 'none' }}>
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
