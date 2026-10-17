import { useApp } from '../context/AppContext';
import Sidebar from '../components/Sidebar';
import TokenCard from '../components/TokenCard';
import backgroundImg from '../assets/Day-to-Night Campus Portal.png';
import '../styles/globals.css';

const MyTokens = () => {
  const { userTokens, leaveQueue, showToast } = useApp();

  const handleCancelToken = async (tokenNumber) => {
    await leaveQueue(tokenNumber);
  };

  const handleViewToken = (token) => {
    showToast(`Token ${token.tokenNumber}: Position #${token.position} at ${token.counter}.`);
  };

  return (
    <div
      className="app-layout"
      style={{
        backgroundImage: `url("${backgroundImg}")`,
      }}
    >
      <Sidebar activeTab="tokens" />

      <main
        style={{
          flex: 1,
          padding: '28px 36px',
          minHeight: '100vh',
          maxWidth: '1400px'
        }}
      >
        <div style={{ marginBottom: '28px' }}>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: '800',
              color: 'var(--text-light-side)',
              marginBottom: '6px'
            }}
          >
            My Active Tokens
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Real-time status of your active virtual tokens across campus
          </p>
        </div>

        {userTokens.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 24px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.65)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              margin: '40px auto'
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎫</div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>
              No active tokens
            </h2>
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Head over to Dashboard and click "Join Queue" on any campus service to get your live token.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            {userTokens.map((token) => (
              <TokenCard
                key={token.tokenNumber}
                token={token}
                onCancel={handleCancelToken}
                onView={handleViewToken}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyTokens;
