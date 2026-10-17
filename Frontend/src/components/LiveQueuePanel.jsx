import { Coffee, ArrowRight } from 'lucide-react';

const LiveQueuePanel = ({ liveData, onViewLiveQueue }) => {
  const data = liveData || {
    id: 'canteen',
    name: 'Canteen',
    tokenNumber: 'CAN-012',
    status: 'Now Serving',
    counter: 'Counter 2',
    estWait: '~ 3 min'
  };

  return (
    <div
      className="glass-dark-hero"
      style={{
        padding: '26px 28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        minHeight: '235px'
      }}
    >
      {/* Top Header Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}
      >
        {/* Live Now Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="pulse-dot" />
          <span
            style={{
              fontSize: '12px',
              fontWeight: '800',
              letterSpacing: '0.8px',
              color: '#10b981',
              textTransform: 'uppercase'
            }}
          >
            LIVE NOW
          </span>
        </div>

        {/* Coffee Squircle Icon */}
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            background: 'rgba(37, 99, 235, 0.25)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            boxShadow: '0 0 12px rgba(56, 189, 248, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38bdf8'
          }}
        >
          <Coffee size={22} strokeWidth={2.2} />
        </div>
      </div>

      {/* Service Name */}
      <h3
        style={{
          fontSize: '22px',
          fontWeight: '800',
          color: '#ffffff',
          letterSpacing: '-0.3px',
          marginBottom: '12px'
        }}
      >
        {data.name}
      </h3>

      {/* Token Details Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}
      >
        {/* Left Column: Token */}
        <div>
          <div
            style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#94a3b8',
              marginBottom: '2px'
            }}
          >
            Token
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: '900',
              color: '#ffffff',
              letterSpacing: '-0.5px',
              lineHeight: 1.1
            }}
          >
            {data.tokenNumber}
          </div>
          <div
            style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#38bdf8',
              marginTop: '4px'
            }}
          >
            {data.status}
          </div>
        </div>

        {/* Right Column: Counter & Wait */}
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#cbd5e1',
              marginBottom: '4px'
            }}
          >
            {data.counter}
          </div>
          <div
            style={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#ffffff',
              lineHeight: 1.15
            }}
          >
            {data.estWait}
          </div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: '500',
              color: '#94a3b8',
              marginTop: '2px'
            }}
          >
            Est. Wait
          </div>
        </div>
      </div>

      {/* Progress Track with Glowing Cyan Nodes */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          margin: '16px 0 10px 0'
        }}
      >
        {/* Solid glowing active segment */}
        <div
          style={{
            height: '4px',
            flex: 3,
            borderRadius: '9999px',
            background: 'linear-gradient(90deg, #10b981 0%, #00d4ff 100%)',
            boxShadow: '0 0 10px rgba(0, 212, 255, 0.6)'
          }}
        />
        {/* Glowing Queue Nodes */}
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#00d4ff',
            boxShadow: '0 0 8px #00d4ff'
          }}
        />
        <div
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: 'rgba(0, 212, 255, 0.55)'
          }}
        />
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'rgba(0, 212, 255, 0.35)'
          }}
        />
        <div
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: 'rgba(0, 212, 255, 0.2)'
          }}
        />
      </div>

      {/* Bottom Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
        <button
          onClick={onViewLiveQueue}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 18px',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)';
            e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>View Live Queue</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default LiveQueuePanel;
