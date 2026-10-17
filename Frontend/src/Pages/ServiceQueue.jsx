import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import backgroundImg from '../assets/Day-to-Night Campus Portal.png';
import { useApp } from '../context/AppContext';
import '../styles/globals.css';

const ServiceQueue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, joinQueue } = useApp();

  const service = services.find((s) => s.id === id) || {
    name: id ? id.replace('_', ' ').toUpperCase() : 'Campus Service',
    queueLength: 5,
    avgWaitTime: 10,
    counter: 'Counter 1'
  };

  return (
    <div
      className="app-layout"
      style={{
        backgroundImage: `url("${backgroundImg}")`,
      }}
    >
      <Sidebar activeTab="services" />

      <main
        style={{
          flex: 1,
          padding: '28px 36px',
          minHeight: '100vh',
          maxWidth: '1200px'
        }}
      >
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            color: '#0f172a',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </button>

        <div
          style={{
            padding: '36px',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.75)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
            maxWidth: '650px'
          }}
        >
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
            {service.name}
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
            {service.description || 'Virtual queue and token monitoring system.'}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '14px',
              marginBottom: '24px'
            }}
          >
            <div
              style={{
                padding: '16px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.8)'
              }}
            >
              <div style={{ fontSize: '12px', color: '#64748b' }}>People in Queue</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>
                {service.queueLength}
              </div>
            </div>

            <div
              style={{
                padding: '16px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.8)'
              }}
            >
              <div style={{ fontSize: '12px', color: '#64748b' }}>Average Wait</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>
                ~{service.avgWaitTime} min
              </div>
            </div>
          </div>

          <button
            onClick={() => joinQueue(service.id)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '9999px',
              border: 'none',
              background: '#2563eb',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(37, 99, 235, 0.35)'
            }}
          >
            Join Queue Now
          </button>
        </div>
      </main>
    </div>
  );
};

export default ServiceQueue;
