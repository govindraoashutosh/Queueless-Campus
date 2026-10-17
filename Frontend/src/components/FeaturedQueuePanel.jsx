import { ArrowRight } from 'lucide-react';

const FeaturedQueuePanel = ({ onExplore }) => {
  return (
    <div
      className="glass-light-hero"
      style={{
        padding: '32px 30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '235px'
      }}
    >
      {/* Pill Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '5px 14px',
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.95)',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
          marginBottom: '16px'
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: '800',
            letterSpacing: '0.9px',
            color: '#2563eb',
            textTransform: 'uppercase'
          }}
        >
          YOUR CAMPUS, SIMPLIFIED
        </span>
      </div>

      {/* Main Heading */}
      <h2
        style={{
          fontSize: '34px',
          fontWeight: '900',
          lineHeight: 1.15,
          letterSpacing: '-0.8px',
          color: '#0f172a',
          marginBottom: '10px'
        }}
      >
        Save Time.<br />Do More.
      </h2>

      {/* Subtext */}
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.5,
          color: '#334155',
          fontWeight: '500',
          maxWidth: '380px',
          marginBottom: '22px'
        }}
      >
        Join virtual queues for campus services and get real-time updates.
      </p>

      {/* Primary Pill Button */}
      <button
        onClick={onExplore}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          borderRadius: '9999px',
          border: 'none',
          background: '#2563eb',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#1d4ed8';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#2563eb';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <span>Explore Services</span>
        <ArrowRight size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default FeaturedQueuePanel;
