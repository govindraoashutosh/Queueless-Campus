import { useState } from 'react';
import {
  Coffee,
  Printer,
  GraduationCap,
  BriefcaseMedical,
  Book,
  Laptop,
  ArrowRight,
  Check
} from 'lucide-react';

const iconMap = {
  coffee: Coffee,
  printer: Printer,
  'graduation-cap': GraduationCap,
  cross: BriefcaseMedical,
  book: Book,
  laptop: Laptop
};

const ServiceCard = ({ service, onJoin }) => {
  const [isJoining, setIsJoining] = useState(false);
  const [justJoined, setJustJoined] = useState(false);

  const {
    id,
    name,
    iconType = 'coffee',
    queueLength = 0,
    avgWaitDisplay = '~ 10 min',
    isLightSide = true
  } = service;

  const IconComponent = iconMap[iconType] || Coffee;

  const handleJoinClick = async () => {
    setIsJoining(true);
    if (onJoin) {
      await onJoin(id);
    }
    setIsJoining(false);
    setJustJoined(true);
    setTimeout(() => {
      setJustJoined(false);
    }, 2500);
  };

  const getIconStyles = () => {
    switch (iconType) {
      case 'coffee':
        return {
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          border: '1px solid #fcd34d',
          color: '#d97706'
        };
      case 'printer':
        return {
          background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
          border: '1px solid #c4b5fd',
          color: '#7c3aed'
        };
      case 'graduation-cap':
        return {
          background: 'rgba(16, 185, 129, 0.18)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          color: '#34d399'
        };
      case 'cross':
        return {
          background: 'rgba(244, 63, 94, 0.18)',
          border: '1px solid rgba(244, 63, 94, 0.4)',
          color: '#fb7185'
        };
      default:
        return {
          background: 'rgba(59, 130, 246, 0.15)',
          border: '1px solid rgba(59, 130, 246, 0.35)',
          color: '#3b82f6'
        };
    }
  };

  const iconStyle = getIconStyles();

  return (
    <div
      className={isLightSide ? 'glass-light-surface' : 'glass-dark-surface'}
      style={{
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '175px',
        border: !isLightSide && iconType === 'cross' ? '1px solid rgba(244, 63, 94, 0.3)' : undefined
      }}
    >
      {/* Header Info: Icon + Name + Queue counts */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
        {/* Squircle Icon */}
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            ...iconStyle
          }}
        >
          <IconComponent size={24} strokeWidth={2.2} />
        </div>

        {/* Text Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4
            style={{
              fontSize: '15px',
              fontWeight: '700',
              color: isLightSide ? '#0f172a' : '#ffffff',
              letterSpacing: '-0.2px',
              lineHeight: 1.2,
              marginBottom: '4px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {name}
          </h4>
          <div
            style={{
              fontSize: '12px',
              color: isLightSide ? '#475569' : '#cbd5e1',
              fontWeight: '500',
              lineHeight: 1.3
            }}
          >
            {queueLength} people waiting
          </div>
          <div
            style={{
              fontSize: '12px',
              color: isLightSide ? '#475569' : '#cbd5e1',
              fontWeight: '500',
              lineHeight: 1.3
            }}
          >
            {avgWaitDisplay}
          </div>
        </div>
      </div>

      {/* Action Button: Join Queue */}
      <button
        onClick={handleJoinClick}
        disabled={isJoining}
        className={isLightSide ? 'btn-service-light' : 'btn-service-dark'}
        style={
          isLightSide
            ? {
                background: justJoined ? 'rgba(16, 185, 129, 0.15)' : undefined,
                borderColor: justJoined ? '#10b981' : undefined,
                color: justJoined ? '#10b981' : undefined
              }
            : {
                background: justJoined ? 'rgba(16, 185, 129, 0.45)' : undefined,
                borderColor: justJoined ? '#10b981' : undefined,
                color: '#ffffff'
              }
        }
      >
        {isJoining ? (
          <span>Joining...</span>
        ) : justJoined ? (
          <>
            <Check size={14} strokeWidth={2.5} />
            <span>Token Issued!</span>
          </>
        ) : (
          <>
            <span>Join Queue</span>
            <ArrowRight size={14} strokeWidth={2.5} />
          </>
        )}
      </button>
    </div>
  );
};

export default ServiceCard;
