import Navbar from '../components/layout/Navbar.jsx';

export default function AuthLayout({ children }) {
  return (
    <div className="page">
      <Navbar />
      <main
        style={{
          minHeight: 'calc(100vh - 68px)',
          display: 'grid',
          placeItems: 'center',
          padding: '40px 20px',
        }}
      >
        {children}
      </main>
    </div>
  );
}
