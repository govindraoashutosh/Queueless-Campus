import { useState } from 'react';
import {
  LayoutDashboard,
  Layers,
  ClipboardList,
  Zap,
  Bell,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  Menu,
  X,
  User,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar = ({ activeTab, onTabChange }) => {
  const { user, setUser } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', studentId: '' });

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'tokens', label: 'My Tokens', icon: ClipboardList },
    { id: 'live_queue', label: 'Live Queue', icon: Zap },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'help', label: 'Help Center', icon: HelpCircle },
  ];

  const handleNavClick = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
    setIsOpen(false);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      setUser({
        id: 'usr_ashutosh_101',
        name: authForm.name || 'Ashutosh',
        fullName: authForm.name || 'Ashutosh Kumar',
        studentId: authForm.studentId || '#23CS101',
        role: 'student',
        email: authForm.email || 'ashutosh@campus.edu',
        avatar: 'A'
      });
    } else {
      setUser({
        id: `usr_${Date.now()}`,
        name: authForm.name || 'New Student',
        fullName: authForm.name || 'Campus Student',
        studentId: authForm.studentId || '#24CS202',
        role: 'student',
        email: authForm.email || 'student@campus.edu',
        avatar: (authForm.name || 'S').charAt(0).toUpperCase()
      });
    }
    setShowAuthModal(false);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 1100,
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.7)',
          borderRadius: '12px',
          padding: '8px',
          cursor: 'pointer',
          display: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
        className="mobile-hamburger-btn"
      >
        {isOpen ? <X size={22} color="#0f172a" /> : <Menu size={22} color="#0f172a" />}
      </button>

      {/* Warm-White Glass Sidebar */}
      <aside
        style={{
          width: '230px',
          minWidth: '230px',
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 1000,
          padding: '24px 18px',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--sidebar-bg)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderRight: '1px solid var(--sidebar-border)',
          borderTopRightRadius: '32px',
          borderBottomRightRadius: '32px',
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.03)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}
      >
        {/* Logo Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingLeft: '4px',
            marginBottom: '36px',
            cursor: 'pointer'
          }}
          onClick={() => handleNavClick('dashboard')}
        >
          {/* Custom Squircle Q Logo */}
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '22px',
              letterSpacing: '-0.5px'
            }}
          >
            Q
          </div>
          <div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: '800',
                letterSpacing: '-0.3px',
                color: '#0f172a',
                lineHeight: 1.15
              }}
            >
              QueueLess
            </div>
            <div
              style={{
                fontSize: '10px',
                fontWeight: '700',
                letterSpacing: '1.4px',
                color: '#64748b',
                textTransform: 'uppercase'
              }}
            >
              CAMPUS
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = (activeTab || 'dashboard') === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '14px',
                  border: 'none',
                  background: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? '#2563eb' : '#475569',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: isActive ? '0 4px 14px rgba(0, 0, 0, 0.05)' : 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.color = '#0f172a';
                    e.currentTarget.style.transform = 'translateX(2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#475569';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.5 : 2}
                  style={{
                    color: isActive ? '#2563eb' : '#64748b',
                    transition: 'color 0.2s ease'
                  }}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Student Profile Pill */}
        <div style={{ position: 'relative', marginTop: 'auto', paddingTop: '16px' }}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '10px 12px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.55)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.75)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.55)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Circular Avatar */}
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
                }}
              >
                {user?.avatar || 'A'}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#0f172a',
                    lineHeight: 1.2
                  }}
                >
                  {user?.name || 'Ashutosh'}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: '500',
                    color: '#64748b'
                  }}
                >
                  {user?.studentId || '#23CS101'}
                </div>
              </div>
            </div>
            <ChevronRight size={16} color="#64748b" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div
              style={{
                position: 'absolute',
                bottom: '100%',
                left: 0,
                width: '100%',
                marginBottom: '10px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                padding: '8px',
                zIndex: 1200
              }}
            >
              <div style={{ padding: '8px 10px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                  {user?.fullName || user?.name || 'Ashutosh'}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>
                  {user?.email || 'ashutosh@campus.edu'}
                </div>
              </div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'transparent',
                  color: '#334155',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <User size={15} color="#2563eb" />
                <span>Switch / Login User</span>
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  setAuthMode('signup');
                  setShowAuthModal(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'transparent',
                  color: '#334155',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <ShieldCheck size={15} color="#10b981" />
                <span>Register New Student</span>
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  setUser({
                    id: 'usr_guest',
                    name: 'Guest',
                    studentId: '#GUEST01',
                    role: 'guest',
                    email: 'guest@campus.edu',
                    avatar: 'G'
                  });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'transparent',
                  color: '#f43f5e',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <LogOut size={15} color="#f43f5e" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Auth Modal */}
      {showAuthModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setShowAuthModal(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '32px',
              width: '100%',
              maxWidth: '420px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAuthModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} color="#64748b" />
            </button>

            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
              {authMode === 'login' ? 'Campus Portal Login' : 'Create Student Account'}
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
              {authMode === 'login'
                ? 'Enter student credentials to view and manage your tokens.'
                : 'Sign up for QueueLess instant virtual queuing.'}
            </p>

            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Student Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ashutosh"
                  value={authForm.name}
                  onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Student ID / Roll No.
                </label>
                <input
                  type="text"
                  placeholder="#23CS101"
                  value={authForm.studentId}
                  onChange={(e) => setAuthForm({ ...authForm, studentId: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Campus Email
                </label>
                <input
                  type="email"
                  placeholder="student@campus.edu"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '10px',
                  padding: '12px',
                  borderRadius: '12px',
                  background: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                }}
              >
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(3px)',
            zIndex: 999
          }}
        />
      )}
    </>
  );
};

export default Sidebar;
