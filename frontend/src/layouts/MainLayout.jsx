import AppSidebar from '../components/appshell/AppSidebar.jsx';

export default function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <AppSidebar />
      <main className="app-main">
        <div className="app-main-inner">{children}</div>
      </main>
    </div>
  );
}
