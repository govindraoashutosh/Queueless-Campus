import { createContext, useContext, useState, useEffect } from 'react';
import {
  authService,
  statsService,
  queueService,
  tokenService,
  featuredQueueService,
  notificationService,
  announcementService
} from '../services/api';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Theme state with localStorage persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('queueless_theme') || 'light';
  });

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [services, setServices] = useState([]);
  const [featuredQueues, setFeaturedQueues] = useState([]);
  const [liveQueue, setLiveQueue] = useState(null);
  const [userTokens, setUserTokens] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toastMessage, setToastMessage] = useState(null);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('queueless_theme', theme);
  }, [theme]);

  // Theme toggle with smooth transition
  const toggleTheme = (e) => {
    // If coordinate passed or click event
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Toast notification helper
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Load initial data
  const loadInitialData = async () => {
    try {
      setLoading(true);

      const [userData, statsData, servicesData, liveData, featuredData, notifs, ann] =
        await Promise.all([
          authService.getCurrentUser(),
          statsService.getDashboardStats(),
          queueService.getAllServices(),
          featuredQueueService.getLiveQueue(),
          featuredQueueService.getFeaturedQueues(),
          notificationService.getNotifications(),
          announcementService.getAnnouncements()
        ]);

      setUser(userData);
      setStats(statsData);
      setServices(servicesData);
      setLiveQueue(liveData);
      setFeaturedQueues(featuredData);
      setNotifications(notifs);
      setAnnouncements(ann);

      if (userData?.id) {
        const tokensData = await tokenService.getUserTokens(userData.id);
        setUserTokens(tokensData);
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Join Queue action
  const joinQueue = async (serviceId) => {
    try {
      const result = await queueService.joinQueue(serviceId, user);
      if (result.success) {
        // Refresh stats and tokens
        const [updatedStats, updatedTokens, updatedServices, updatedNotifs] = await Promise.all([
          statsService.getDashboardStats(),
          tokenService.getUserTokens(user?.id),
          queueService.getAllServices(),
          notificationService.getNotifications()
        ]);
        setStats(updatedStats);
        setUserTokens(updatedTokens);
        setServices(updatedServices);
        setNotifications(updatedNotifs);

        showToast(
          `Token ${result.token.tokenNumber} issued! Position #${result.position} in ${result.token.serviceName}.`,
          'success'
        );
        return result.token;
      }
    } catch (err) {
      showToast('Could not join queue. Please try again.', 'error');
      console.error(err);
    }
  };

  // Cancel / Leave Queue action
  const leaveQueue = async (tokenNumber) => {
    try {
      await queueService.leaveQueue(tokenNumber);
      const [updatedStats, updatedTokens, updatedServices] = await Promise.all([
        statsService.getDashboardStats(),
        tokenService.getUserTokens(user?.id),
        queueService.getAllServices()
      ]);
      setStats(updatedStats);
      setUserTokens(updatedTokens);
      setServices(updatedServices);
      showToast(`Token #${tokenNumber} cancelled.`, 'info');
    } catch (err) {
      console.error(err);
      showToast('Failed to cancel token.', 'error');
    }
  };

  // Mark all notifications read
  const markNotificationsRead = async () => {
    await notificationService.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    user,
    setUser,
    stats,
    setStats,
    services,
    setServices,
    featuredQueues,
    setFeaturedQueues,
    liveQueue,
    setLiveQueue,
    userTokens,
    setUserTokens,
    notifications,
    announcements,
    loading,
    setLoading,
    activeTab,
    setActiveTab,
    joinQueue,
    leaveQueue,
    markNotificationsRead,
    toastMessage,
    showToast,
    refreshData: loadInitialData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
