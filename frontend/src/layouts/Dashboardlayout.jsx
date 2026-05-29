import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Dashboardlayout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2rem', backgroundColor: 'var(--bg-app)' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboardlayout;