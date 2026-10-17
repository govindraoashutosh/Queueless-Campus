import Sidebar from '../components/Sidebar';
import backgroundImg from '../assets/Day-to-Night Campus Portal.png';
import '../styles/globals.css';

const StaffDashboard = () => {
  return (
    <div
      className="app-layout"
      style={{
        backgroundImage: `url("${backgroundImg}")`,
      }}
    >
      <Sidebar activeTab="dashboard" />

      <main
        style={{
          flex: 1,
          padding: '28px 36px',
          minHeight: '100vh',
          maxWidth: '1400px'
        }}
      >
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-light-side)', marginBottom: '12px' }}>
          Staff Counter Console
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Call next student tokens, recall no-shows, and mark services completed
        </p>

        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255, 255, 255, 0.7)'
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
            Active Station: Counter 2 (Canteen)
          </h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>
            Use the staff console to ring chimes, advance queue positions, and view student verification tags.
          </p>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
