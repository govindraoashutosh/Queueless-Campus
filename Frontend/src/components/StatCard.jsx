import { ArrowDown, ArrowUp } from 'lucide-react';

const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  trendType = 'percent',
  isPositiveTrend = true,
  status,
  isDarkSide = false,
  iconBgColor
}) => {
  return (
    <div
      className={isDarkSide ? 'glass-dark-surface' : 'glass-light-surface'}
      style={{
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        minHeight: '78px',
        minWidth: 0
      }}
    >
      {/* Icon Squircle / Circle */}
      <div
        style={{
          width: '42px',
          height: '42px',
          borderRadius: isDarkSide ? '50%' : '12px',
          background:
            iconBgColor ||
            (isDarkSide
              ? 'rgba(0, 212, 255, 0.15)'
              : 'rgba(37, 99, 235, 0.12)'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isDarkSide ? '#00d4ff' : '#2563eb',
          flexShrink: 0
        }}
      >
        <Icon size={20} strokeWidth={2.2} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Value */}
        <div
          style={{
            fontSize: '22px',
            fontWeight: '800',
            lineHeight: 1.15,
            letterSpacing: '-0.3px',
            color: isDarkSide ? '#ffffff' : '#0f172a',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {value}
        </div>

        {/* Label + Trend / Status Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '2px',
            flexWrap: 'nowrap'
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: '600',
              color: isDarkSide ? '#94a3b8' : '#475569',
              whiteSpace: 'nowrap'
            }}
          >
            {label}
          </span>

          {/* Trend Tag */}
          {trend !== undefined && trend !== null && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                fontSize: '11px',
                fontWeight: '700',
                color: isPositiveTrend
                  ? isDarkSide
                    ? '#38bdf8'
                    : '#10b981'
                  : '#f43f5e',
                whiteSpace: 'nowrap'
              }}
            >
              {trend < 0 ? (
                <ArrowDown size={11} strokeWidth={3} />
              ) : (
                <ArrowUp size={11} strokeWidth={3} />
              )}
              {trendType === 'count' ? Math.abs(trend) : `${Math.abs(trend)}%`}
            </span>
          )}

          {/* Status Tag (e.g. Online) */}
          {status && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: '700',
                color: '#10b981',
                whiteSpace: 'nowrap'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 6px #10b981'
                }}
              />
              {status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
