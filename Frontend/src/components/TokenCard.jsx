import { Clock, CheckCircle2, AlertCircle, Trash2, ArrowUpRight } from 'lucide-react';

const TokenCard = ({ token, onCancel, onView }) => {
  const {
    tokenNumber,
    serviceName,
    status = 'waiting',
    position = 1,
    counter = 'Counter 1',
    estimatedWaitTime = 5,
    createdAt
  } = token;

  const formatTime = (isoString) => {
    if (!isoString) return '--:--';
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '--:--';
    }
  };

  return (
    <div
      style={{
        borderRadius: '20px',
        padding: '22px',
        background: 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.7)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.04)';
      }}
    >
      <div>
        {/* Header: Service + Status Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}
        >
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#2563eb',
                letterSpacing: '0.6px',
                textTransform: 'uppercase'
              }}
            >
              {serviceName}
            </span>
            <h3
              style={{
                fontSize: '28px',
                fontWeight: '900',
                color: '#0f172a',
                letterSpacing: '-0.5px',
                marginTop: '2px'
              }}
            >
              {tokenNumber}
            </h3>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '9999px',
              background: status === 'waiting' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(16, 185, 129, 0.12)',
              border: status === 'waiting' ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
              color: status === 'waiting' ? '#b45309' : '#047857',
              fontSize: '12px',
              fontWeight: '700'
            }}
          >
            {status === 'waiting' ? <Clock size={13} /> : <CheckCircle2 size={13} />}
            <span>{status === 'waiting' ? 'In Queue' : 'Ready'}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '16px',
            padding: '12px 14px',
            borderRadius: '14px',
            background: 'rgba(255, 255, 255, 0.55)',
            border: '1px solid rgba(255, 255, 255, 0.8)'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>Position</div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
              #{position} ahead
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>Assigned Counter</div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
              {counter}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <span style={{ fontSize: '12px', color: '#64748b' }}>
          Issued at {formatTime(createdAt)}
        </span>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onCancel && onCancel(tokenNumber)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              background: 'rgba(239, 68, 68, 0.06)',
              color: '#ef4444',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Trash2 size={13} />
            <span>Cancel</span>
          </button>

          {onView && (
            <button
              onClick={() => onView(token)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                background: '#2563eb',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>Details</span>
              <ArrowUpRight size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
