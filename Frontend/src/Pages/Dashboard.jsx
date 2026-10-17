import { useState, useEffect, useRef } from 'react';
import {
  Users,
  Clock,
  Ticket,
  Timer,
  Zap,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import FeaturedQueuePanel from '../components/FeaturedQueuePanel';
import LiveQueuePanel from '../components/LiveQueuePanel';
import ServiceCard from '../components/ServiceCard';
import TokenCard from '../components/TokenCard';
import backgroundImg from '../assets/Day-to-Night Campus Portal.png';
import '../styles/globals.css';

const Dashboard = () => {
  const {
    user,
    stats,
    services,
    liveQueue,
    userTokens,
    joinQueue,
    leaveQueue,
    toastMessage,
    activeTab,
    setActiveTab
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [showAllServicesModal, setShowAllServicesModal] = useState(false);
  const [showLiveQueueModal, setShowLiveQueueModal] = useState(false);
  const [servicesPage, setServicesPage] = useState(0);
  const servicesSectionRef = useRef(null);

  // Filter services on search
  useEffect(() => {
    if (!services || services.length === 0) return;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const filtered = services.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category?.toLowerCase().includes(q) ||
          s.location?.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q)
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices(services);
    }
  }, [searchQuery, services]);

  const handleExploreServices = () => {
    servicesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleJoinQueue = async (serviceId) => {
    await joinQueue(serviceId);
  };

  const servicesPerPage = 4;
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
  const currentServicesList = filteredServices.slice(
    servicesPage * servicesPerPage,
    (servicesPage + 1) * servicesPerPage
  );

  const handlePrevPage = () => {
    setServicesPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setServicesPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  return (
    <div
      className="app-layout"
      style={{
        backgroundImage: `url("${backgroundImg}")`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: 'transparent'
      }}
    >
      {/* Translucent Left Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          minHeight: '100vh',
          padding: '24px 32px 40px 32px',
          maxWidth: '1600px',
          width: '100%',
          overflowX: 'hidden',
          background: 'transparent'
        }}
      >
        {/* Top Bar: Search, Theme Switcher, Notifications, Profile */}
        <Navbar onSearch={setSearchQuery} />

        {/* View Switcher based on Sidebar Navigation */}
        {activeTab === 'tokens' ? (
          /* My Tokens View */
          <div style={{ animation: 'fadeIn 0.25s ease', background: 'transparent' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                background: 'transparent'
              }}
            >
              <div>
                <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>
                  My Active Tokens
                </h1>
                <p style={{ fontSize: '14px', color: '#475569' }}>
                  Track your virtual queue positions and counter calls
                </p>
              </div>
              <button
                onClick={() => setActiveTab('dashboard')}
                style={{
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255, 255, 255, 0.7)',
                  background: 'rgba(255, 255, 255, 0.65)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#0f172a',
                  cursor: 'pointer'
                }}
              >
                Back to Dashboard
              </button>
            </div>

            {userTokens.length === 0 ? (
              <div
                className="glass-light-surface"
                style={{
                  padding: '60px 24px',
                  textAlign: 'center',
                  maxWidth: '560px',
                  margin: '40px auto'
                }}
              >
                <Ticket size={48} color="#2563eb" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                  No active tokens right now
                </h3>
                <p style={{ fontSize: '14px', color: '#475569', marginTop: '6px' }}>
                  Explore campus services and join a queue to get your live token.
                </p>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  style={{
                    marginTop: '20px',
                    padding: '10px 24px',
                    borderRadius: '9999px',
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Explore Services
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '20px',
                  background: 'transparent'
                }}
              >
                {userTokens.map((token) => (
                  <TokenCard
                    key={token.tokenNumber}
                    token={token}
                    onCancel={leaveQueue}
                  />
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'announcements' ? (
          /* Announcements View */
          <div style={{ animation: 'fadeIn 0.25s ease', background: 'transparent' }}>
            <div style={{ marginBottom: '24px', background: 'transparent' }}>
              <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>
                Campus Announcements
              </h1>
              <p style={{ fontSize: '14px', color: '#475569' }}>
                Official campus notices and QueueLess live updates
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', background: 'transparent' }}>
              <div
                className="glass-light-surface"
                style={{
                  padding: '24px',
                  borderRadius: '20px'
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    background: 'rgba(37, 99, 235, 0.1)',
                    color: '#2563eb',
                    fontSize: '11px',
                    fontWeight: '700',
                    marginBottom: '8px'
                  }}
                >
                  Peak Hours Notice
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '4px 0 6px 0' }}>
                  Canteen Rush Hours (1:00 PM - 2:15 PM)
                </h3>
                <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.5 }}>
                  During peak lunch times, queue wait times can extend to ~20 mins. Pre-order your token using the QueueLess dashboard at 12:45 PM for zero waiting at Counter 2.
                </p>
              </div>

              <div
                className="glass-dark-surface"
                style={{
                  padding: '24px',
                  borderRadius: '20px'
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    background: 'rgba(0, 212, 255, 0.15)',
                    color: '#00d4ff',
                    fontSize: '11px',
                    fontWeight: '700',
                    marginBottom: '8px'
                  }}
                >
                  System Upgrade
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', margin: '4px 0 6px 0' }}>
                  Digital Counter Screens Active Across Campus
                </h3>
                <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.5 }}>
                  All counters at Student Services, Printout Shop, and Health Clinic are now synchronized with live token calling and audio chimes.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Main Dashboard View matching Reference Design */
          <>
            {/* Welcome Heading Section */}
            <section style={{ marginBottom: '22px', background: 'transparent' }}>
              {/* Good Morning Pill Tag */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 14px',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.75)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.85)',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '10px'
                }}
              >
                <span>Good Morning</span>
                <span>☀️</span>
              </div>

              {/* Main Heading */}
              <h1
                style={{
                  fontSize: '32px',
                  fontWeight: '900',
                  color: '#0f172a',
                  letterSpacing: '-0.6px',
                  lineHeight: 1.15,
                  marginBottom: '4px',
                  background: 'transparent'
                }}
              >
                Welcome Back, {user?.name || 'Ashutosh'}!
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#475569',
                  background: 'transparent'
                }}
              >
                Your campus, without queues.
              </p>
            </section>

            {/* Five Compact Statistics Widgets in One Horizontal Row */}
            <section
              className="stats-five-col"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '14px',
                marginBottom: '24px',
                background: 'transparent'
              }}
            >
              {/* Stat 1: 12 People Waiting ↓ 20% (Light side) */}
              <StatCard
                icon={Users}
                label="People Waiting"
                value={stats?.peopleWaiting || 12}
                trend={stats?.waitingTrend || -20}
                isPositiveTrend={true}
                isDarkSide={false}
              />

              {/* Stat 2: ~15 min Average Wait ↑ 10% (Light side) */}
              <StatCard
                icon={Clock}
                label="Average Wait"
                value={stats?.avgWaitTime || '~15 min'}
                trend={stats?.waitTrend || 10}
                isPositiveTrend={false}
                isDarkSide={false}
              />

              {/* Stat 3: 01 Active Token (Light side, near portal) */}
              <StatCard
                icon={Ticket}
                label="Active Token"
                value={stats?.activeTokensString || '01'}
                isDarkSide={false}
              />

              {/* Stat 4: 5 Active Counters ↑ 2 (Dark side) */}
              <StatCard
                icon={Timer}
                label="Active Counters"
                value={stats?.activeCounters || 5}
                trend={stats?.countersTrend || 2}
                trendType="count"
                isPositiveTrend={true}
                isDarkSide={true}
              />

              {/* Stat 5: 98% Service Uptime ● Online (Dark side) */}
              <StatCard
                icon={Zap}
                label="Service Uptime"
                value={stats?.serviceUptime || '98%'}
                status={stats?.uptimeStatus || 'Online'}
                isDarkSide={true}
                iconBgColor="rgba(16, 185, 129, 0.18)"
              />
            </section>

            {/* Middle Row: Light Glass Hero Panel (Left) & Dark Glass Live Queue (Right) */}
            <section
              className="hero-panels-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.25fr 1fr',
                gap: '18px',
                marginBottom: '28px',
                background: 'transparent'
              }}
            >
              {/* Left Panel: Large Transparent Light-Glass Intro Panel */}
              <FeaturedQueuePanel onExplore={handleExploreServices} />

              {/* Right Panel: Dark-Glass Live Queue Panel */}
              <LiveQueuePanel
                liveData={liveQueue}
                onViewLiveQueue={() => setShowLiveQueueModal(true)}
              />
            </section>

            {/* Bottom Row: Campus Services Section */}
            <section ref={servicesSectionRef} style={{ marginBottom: '16px', background: 'transparent' }}>
              {/* Section Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '12px',
                  background: 'transparent'
                }}
              >
                <div style={{ background: 'transparent' }}>
                  <h2
                    style={{
                      fontSize: '22px',
                      fontWeight: '800',
                      color: '#0f172a',
                      letterSpacing: '-0.3px',
                      lineHeight: 1.2
                    }}
                  >
                    Campus Services
                  </h2>
                  <p
                    style={{
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#475569',
                      marginTop: '2px'
                    }}
                  >
                    Choose a service to join the queue
                  </p>
                </div>

                {/* Header Controls: Arrow buttons and "View All Services" */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent' }}>
                  {/* Left Arrow Button */}
                  <button
                    onClick={handlePrevPage}
                    disabled={servicesPage === 0}
                    aria-label="Previous services page"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.22)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      cursor: servicesPage === 0 ? 'not-allowed' : 'pointer',
                      opacity: servicesPage === 0 ? 0.4 : 1,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {/* Right Arrow Button */}
                  <button
                    onClick={handleNextPage}
                    disabled={servicesPage >= totalPages - 1}
                    aria-label="Next services page"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.22)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      cursor: servicesPage >= totalPages - 1 ? 'not-allowed' : 'pointer',
                      opacity: servicesPage >= totalPages - 1 ? 0.4 : 1,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* View All Services Button */}
                  <button
                    onClick={() => setShowAllServicesModal(true)}
                    style={{
                      padding: '9px 18px',
                      borderRadius: '9999px',
                      background: 'rgba(15, 23, 42, 0.65)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(15, 23, 42, 0.85)';
                      e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(15, 23, 42, 0.65)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                    }}
                  >
                    View All Services
                  </button>
                </div>
              </div>

              {/* Four Service Cards Grid */}
              <div
                className="services-four-col"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '16px',
                  background: 'transparent'
                }}
              >
                {currentServicesList.length === 0 ? (
                  <div
                    className="glass-light-surface"
                    style={{
                      gridColumn: '1 / -1',
                      padding: '48px 24px',
                      textAlign: 'center'
                    }}
                  >
                    <AlertCircle size={36} color="#64748b" style={{ marginBottom: '10px' }} />
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
                      No campus services matched "{searchQuery}"
                    </h3>
                    <p style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>
                      Try searching for Canteen, Printout, Student Services, or Clinic.
                    </p>
                  </div>
                ) : (
                  currentServicesList.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onJoin={handleJoinQueue}
                    />
                  ))
                )}
              </div>
            </section>
          </>
        )}
      </main>

      {/* View All Services Modal */}
      {showAllServicesModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setShowAllServicesModal(false)}
        >
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.94)',
              border: '1px solid rgba(0, 212, 255, 0.35)',
              borderRadius: '24px',
              padding: '32px',
              maxWidth: '880px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 212, 255, 0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                paddingBottom: '14px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff' }}>
                  All Campus Services & Counters
                </h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>
                  Live queuing available across all university departments
                </p>
              </div>
              <button
                onClick={() => setShowAllServicesModal(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#ffffff'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '16px'
              }}
            >
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onJoin={async (id) => {
                    await handleJoinQueue(id);
                    setShowAllServicesModal(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Live Queue Detail Modal */}
      {showLiveQueueModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setShowLiveQueueModal(false)}
        >
          <div
            style={{
              background: 'rgba(10, 20, 42, 0.96)',
              border: '1px solid rgba(0, 212, 255, 0.4)',
              borderRadius: '24px',
              padding: '32px',
              maxWidth: '540px',
              width: '100%',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 212, 255, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="pulse-dot" />
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#10b981', letterSpacing: '0.8px' }}>
                  LIVE CANTEEN COUNTER #2
                </span>
              </div>
              <button
                onClick={() => setShowLiveQueueModal(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#ffffff'
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div
              style={{
                textAlign: 'center',
                padding: '24px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>
                Currently Serving
              </div>
              <div style={{ fontSize: '48px', fontWeight: '900', color: '#ffffff', letterSpacing: '-1px' }}>
                {liveQueue?.tokenNumber || 'CAN-012'}
              </div>
              <div style={{ fontSize: '14px', color: '#38bdf8', fontWeight: '600', marginTop: '4px' }}>
                Ready at Counter 2 Pick-up Window
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', marginBottom: '12px' }}>
                Recent Tokens Called:
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['CAN-009', 'CAN-010', 'CAN-011', 'CAN-012'].map((tok, i) => (
                  <span
                    key={tok}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: i === 3 ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      border: i === 3 ? '1px solid #00d4ff' : '1px solid rgba(255, 255, 255, 0.1)',
                      color: i === 3 ? '#00d4ff' : '#94a3b8',
                      fontSize: '12px',
                      fontWeight: '700'
                    }}
                  >
                    {tok} {i === 3 ? '(Now)' : '✓'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="toast-banner">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 size={18} color="#10b981" />
          ) : (
            <AlertCircle size={18} color="#00d4ff" />
          )}
          <span>{toastMessage.message}</span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
