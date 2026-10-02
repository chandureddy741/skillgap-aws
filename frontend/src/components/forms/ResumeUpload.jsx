import { useRef, useState } from 'react';
import { UploadCloud, FileText } from 'lucide-react';

export default function ResumeUpload({ file, setFile }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) setFile(dropped);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      style={{
        border: `2px dashed ${dragging ? 'var(--blue)' : 'var(--border)'}`,
        borderRadius: 'var(--radius)',
        padding: 40,
        textAlign: 'center',
        cursor: 'pointer',
        background: dragging ? 'var(--light-blue)' : 'var(--white)',
        transition: 'background 0.2s ease, border-color 0.2s ease',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        style={{ display: 'none' }}
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      {file ? (
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 600 }}>
          <FileText size={20} color="var(--blue)" /> {file.name}
        </p>
      ) : (
        <>
          <UploadCloud size={36} color="var(--blue)" />
          <p style={{ fontWeight: 600, marginTop: 10 }}>Click or drag your resume PDF here</p>
          <p style={{ fontSize: 13, color: 'var(--text-soft)', marginTop: 4 }}>PDF only, max 5 MB</p>
        </>
      )}
    </div>
  );
}
