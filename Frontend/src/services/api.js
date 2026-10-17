// Clean API Service Layer for QueueLess Campus
// Currently connected to realistic mock data.
// Replace the simulateDelay() and mock returns with axios/fetch calls when connecting Node.js/Express backend.

import {
  mockUser,
  mockDashboardStats,
  mockLiveNowQueue,
  mockServices,
  mockInitialTokens,
  mockNotifications,
  mockAnnouncements
} from './mockData';

// Simulated latency helper (set to 0 for instant UI or small ms for realism)
const simulateDelay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

// Local state caches so user interactions (joining queues, switching user) persist within session
let currentUser = { ...mockUser };
let currentStats = { ...mockDashboardStats };
let currentServices = [...mockServices];
let currentTokens = [...mockInitialTokens];
let currentNotifications = [...mockNotifications];

// Helper to generate next sequential token
const generateTokenNumber = (serviceName) => {
  const prefix = serviceName.substring(0, 3).toUpperCase();
  const randomNum = Math.floor(10 + Math.random() * 90);
  return `${prefix}-${randomNum}`;
};

// 1. User & Authentication API
export const authService = {
  getCurrentUser: async () => {
    await simulateDelay();
    // Backend integration:
    // const res = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
    // return res.json();
    return currentUser;
  },

  login: async (credentials) => {
    await simulateDelay();
    // Backend integration:
    // const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
    currentUser = {
      ...currentUser,
      email: credentials?.email || currentUser.email,
      name: credentials?.email?.split('@')[0] || currentUser.name
    };
    return { success: true, token: 'mock-jwt-token-xyz', user: currentUser };
  },

  signup: async (userData) => {
    await simulateDelay();
    // Backend integration:
    // const res = await fetch('/api/auth/signup', { method: 'POST', body: JSON.stringify(userData) });
    currentUser = {
      ...currentUser,
      name: userData.name || 'New Student',
      email: userData.email || 'student@campus.edu',
      studentId: userData.studentId || '#23CS999'
    };
    return { success: true, token: 'mock-jwt-token-abc', user: currentUser };
  },

  logout: async () => {
    await simulateDelay();
    return { success: true };
  }
};

// 2. Dashboard Statistics API
export const statsService = {
  getDashboardStats: async () => {
    await simulateDelay();
    // Backend integration:
    // const res = await fetch('/api/stats/dashboard');
    // return res.json();
    return {
      ...currentStats,
      activeTokens: currentTokens.length,
      activeTokensString: String(currentTokens.length).padStart(2, '0')
    };
  }
};

// 3. Campus Services & Queuing API
export const queueService = {
  getAllServices: async () => {
    await simulateDelay();
    // Backend integration:
    // const res = await fetch('/api/services');
    // return res.json();
    return [...currentServices];
  },

  getServiceById: async (serviceId) => {
    await simulateDelay();
    // Backend integration:
    // const res = await fetch(`/api/services/${serviceId}`);
    return currentServices.find((s) => s.id === serviceId) || null;
  },

  joinQueue: async (serviceId, userPayload = null) => {
    await simulateDelay(250);
    // Backend integration:
    // const res = await fetch(`/api/queues/${serviceId}/join`, { method: 'POST', body: JSON.stringify(userPayload) });
    // return res.json();

    const service = currentServices.find((s) => s.id === serviceId);
    if (!service) {
      throw new Error('Service not found');
    }

    // Increment queue length
    service.queueLength += 1;

    const newTokenNumber = generateTokenNumber(service.name);
    const newToken = {
      tokenNumber: newTokenNumber,
      serviceId: service.id,
      serviceName: service.name,
      status: 'waiting',
      position: service.queueLength,
      counter: service.counter || 'Counter 1',
      estimatedWaitTime: service.avgWaitTime,
      createdAt: new Date().toISOString()
    };

    // Prepend token to active user tokens
    currentTokens = [newToken, ...currentTokens];
    currentStats.activeTokens = currentTokens.length;
    currentStats.activeTokensString = String(currentTokens.length).padStart(2, '0');
    currentStats.peopleWaiting += 1;

    // Add notification
    currentNotifications.unshift({
      id: `notif_${Date.now()}`,
      title: 'Joined Queue!',
      message: `You joined ${service.name} queue as token ${newTokenNumber}. Position #${service.queueLength}.`,
      time: 'Just now',
      unread: true,
      type: 'token'
    });

    return {
      success: true,
      token: newToken,
      position: service.queueLength,
      estimatedWaitTime: service.avgWaitTime
    };
  },

  leaveQueue: async (tokenNumber) => {
    await simulateDelay();
    // Backend integration:
    // const res = await fetch(`/api/queues/tokens/${tokenNumber}/leave`, { method: 'POST' });
    const targetToken = currentTokens.find((t) => t.tokenNumber === tokenNumber);
    if (targetToken) {
      const service = currentServices.find((s) => s.id === targetToken.serviceId);
      if (service && service.queueLength > 0) {
        service.queueLength -= 1;
      }
      currentTokens = currentTokens.filter((t) => t.tokenNumber !== tokenNumber);
      currentStats.activeTokens = currentTokens.length;
      currentStats.activeTokensString = String(currentTokens.length).padStart(2, '0');
    }
    return { success: true };
  }
};

// 4. Token Management API
export const tokenService = {
  getUserTokens: async (userId) => {
    await simulateDelay();
    // Backend integration:
    // const res = await fetch(`/api/users/${userId}/tokens`);
    // return res.json();
    return [...currentTokens];
  },

  getTokenStatus: async (tokenNumber) => {
    await simulateDelay();
    // Backend integration:
    // const res = await fetch(`/api/tokens/${tokenNumber}/status`);
    return currentTokens.find((t) => t.tokenNumber === tokenNumber) || null;
  }
};

// 5. Featured & Live Queue API
export const featuredQueueService = {
  getLiveQueue: async () => {
    await simulateDelay();
    // Backend integration:
    // const res = await fetch('/api/queues/live');
    return { ...mockLiveNowQueue };
  },

  getFeaturedQueues: async () => {
    await simulateDelay();
    return currentServices.slice(0, 3);
  }
};

// 6. Notifications API
export const notificationService = {
  getNotifications: async () => {
    await simulateDelay();
    return [...currentNotifications];
  },

  markAllAsRead: async () => {
    await simulateDelay();
    currentNotifications = currentNotifications.map((n) => ({ ...n, unread: false }));
    return { success: true };
  }
};

// 7. Announcements API
export const announcementService = {
  getAnnouncements: async () => {
    await simulateDelay();
    return [...mockAnnouncements];
  }
};
