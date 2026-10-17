import { useState } from 'react';
import { Bell, ChevronDown, Check, Sparkles, UserCheck } from 'lucide-react';
import SearchBar from './SearchBar';
import ThemeSwitch from './ThemeSwitch';
import { useApp } from '../context/AppContext';

const Navbar = ({ onSearch }) => {
  const { user, setUser, notifications, markNotificationsRead } = useApp();
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '26px',
        position: 'relative',
        zIndex: 900,
        background: 'transparent'
      }}
    >
      {/* Search Bar on the Left/Center */}
      <div style={{ flex: 1, maxWidth: '440px', background: 'transparent' }}>
        <SearchBar onSearch={onSearch} />
      </div>

      {/* Right Controls: Theme Switch + Notifications + Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'transparent' }}>
        {/* Sun/Moon Theme Switcher */}
        <ThemeSwitch />

        {/* Notification Bell Button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowNotifMenu(!showNotifMenu);
              setShowProfileMenu(false);
            }}
            aria-label="Campus notifications"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
              position: 'relative',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
            }}
          >
            <Bell size={18} strokeWidth={2.2} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  background: '#ef4444',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: '800',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(15, 23, 42, 0.8)',
                  boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)'
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifMenu && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: '320px',
                borderRadius: '18px',
                background: 'rgba(15, 23, 42, 0.94)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(0, 212, 255, 0.35)',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 212, 255, 0.1)',
                padding: '16px',
                zIndex: 1500
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} color="#00d4ff" />
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
                    Notifications
                  </span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markNotificationsRead}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#38bdf8',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Check size={12} />
                    Mark all read
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8', fontSize: '12px' }}>
                    No notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '12px',
                        background: notif.unread ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 255, 255, 0.04)',
                        border: notif.unread ? '1px solid rgba(0, 212, 255, 0.25)' : '1px solid rgba(255, 255, 255, 0.05)',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff' }}>
                          {notif.title}
                        </span>
                        <span style={{ fontSize: '10px', color: '#94a3b8' }}>{notif.time}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.35 }}>
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Circle Button (Avatar 'A' with Chevron) */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifMenu(false);
            }}
            aria-label="User profile menu"
            style={{
              height: '42px',
              padding: '4px 10px 4px 6px',
              borderRadius: '9999px',
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: '#ffffff',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
            }}
          >
            {/* Circular Avatar */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {user?.avatar || 'A'}
            </div>
            <ChevronDown size={14} color="#cbd5e1" />
          </button>

          {/* Profile Menu Dropdown */}
          {showProfileMenu && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: '240px',
                borderRadius: '16px',
                background: 'rgba(15, 23, 42, 0.94)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(0, 212, 255, 0.35)',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)',
                padding: '12px',
                zIndex: 1500
              }}
            >
              <div style={{ padding: '6px 8px 10px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
                  {user?.fullName || user?.name || 'Ashutosh'}
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                  {user?.studentId || '#23CS101'}
                </div>
                <div style={{ fontSize: '11px', color: '#38bdf8', marginTop: '2px' }}>
                  {user?.email || 'ashutosh@campus.edu'}
                </div>
              </div>

              <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button
                  onClick={() => {
                    setUser({
                      ...user,
                      role: user?.role === 'staff' ? 'student' : 'staff'
                    });
                    setShowProfileMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '8px',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: 'none',
                    color: '#e2e8f0',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <UserCheck size={14} color="#00d4ff" />
                  <span>Switch Role: {user?.role === 'staff' ? 'Student' : 'Staff'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
