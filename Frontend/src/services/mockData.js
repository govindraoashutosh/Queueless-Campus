// Mock Data for QueueLess Campus Dashboard
// Demonstrates realistic campus queue states and student profile

export const mockUser = {
  id: 'usr_ashutosh_101',
  name: 'Ashutosh',
  fullName: 'Ashutosh Kumar',
  studentId: '#23CS101',
  department: 'Computer Science & Engineering',
  semester: '6th Semester',
  email: 'ashutosh@campus.edu',
  role: 'student',
  avatar: 'A',
  joinedDate: 'August 2023'
};

export const mockDashboardStats = {
  peopleWaiting: 12,
  waitingTrend: -20, // 20% reduction (green)
  avgWaitTime: '~15 min',
  avgWaitMinutes: 15,
  waitTrend: 10, // 10% increase (salmon/red)
  activeTokens: 1,
  activeTokensString: '01',
  activeCounters: 5,
  countersTrend: 2, // +2 counters active
  serviceUptime: '98%',
  uptimeStatus: 'Online'
};

export const mockLiveNowQueue = {
  id: 'canteen',
  name: 'Canteen',
  category: 'Food & Dining',
  isLive: true,
  tokenNumber: 'CAN-012',
  status: 'Now Serving',
  counter: 'Counter 2',
  estWait: '~ 3 min',
  estWaitMinutes: 3,
  currentStep: 3,
  totalSteps: 5,
  totalWaiting: 8,
  servingHistory: ['CAN-009', 'CAN-010', 'CAN-011', 'CAN-012']
};

export const mockServices = [
  {
    id: 'canteen',
    name: 'Canteen',
    category: 'Food & Dining',
    iconType: 'coffee',
    queueLength: 8,
    avgWaitTime: 12,
    avgWaitDisplay: '~ 12 min',
    status: 'active',
    location: 'Student Union, Ground Floor',
    operatingHours: '8:30 AM - 9:00 PM',
    counter: 'Counter 2',
    isLightSide: true,
    themeColor: '#f59e0b',
    description: 'Fresh cafeteria snacks, meals, and beverage counter.'
  },
  {
    id: 'printout',
    name: 'Printout Shop',
    category: 'Academics',
    iconType: 'printer',
    queueLength: 4,
    avgWaitTime: 8,
    avgWaitDisplay: '~ 8 min',
    status: 'active',
    location: 'Central Library, 1st Floor',
    operatingHours: '9:00 AM - 7:00 PM',
    counter: 'Counter 1',
    isLightSide: true,
    themeColor: '#8b5cf6',
    description: 'Document printing, spiral binding, and project reports.'
  },
  {
    id: 'student_services',
    name: 'Student Services',
    category: 'Administration',
    iconType: 'graduation-cap',
    queueLength: 2,
    avgWaitTime: 5,
    avgWaitDisplay: '~ 5 min',
    status: 'active',
    location: 'Admin Block, Room 104',
    operatingHours: '10:00 AM - 4:30 PM',
    counter: 'Counter 4',
    isLightSide: false,
    themeColor: '#10b981',
    description: 'Bonafide certificates, fee verification, and student ID cards.'
  },
  {
    id: 'health_center',
    name: 'Health Center',
    category: 'Medical',
    iconType: 'cross',
    queueLength: 6,
    avgWaitTime: 10,
    avgWaitDisplay: '~ 10 min',
    status: 'active',
    location: 'Campus Clinic, West Wing',
    operatingHours: '24/7 Emergency Care',
    counter: 'Clinic Counter',
    isLightSide: false,
    themeColor: '#f43f5e',
    description: 'General doctor consultation, first aid, and pharmacy pickup.'
  },
  {
    id: 'library_desk',
    name: 'Library Helpdesk',
    category: 'Academics',
    iconType: 'book',
    queueLength: 3,
    avgWaitTime: 6,
    avgWaitDisplay: '~ 6 min',
    status: 'active',
    location: 'Central Library, Main Hall',
    operatingHours: '8:00 AM - 10:00 PM',
    counter: 'Desk 1',
    isLightSide: true,
    themeColor: '#3b82f6',
    description: 'Book reservations, renewals, and thesis archives.'
  },
  {
    id: 'it_support',
    name: 'IT Support Desk',
    category: 'Technical',
    iconType: 'laptop',
    queueLength: 5,
    avgWaitTime: 14,
    avgWaitDisplay: '~ 14 min',
    status: 'active',
    location: 'Tech Tower, 3rd Floor',
    operatingHours: '9:30 AM - 6:00 PM',
    counter: 'Station B',
    isLightSide: false,
    themeColor: '#00d4ff',
    description: 'Campus WiFi setup, LMS access, and student software licenses.'
  }
];

export const mockInitialTokens = [
  {
    tokenNumber: 'CAN-015',
    serviceId: 'canteen',
    serviceName: 'Canteen',
    status: 'waiting',
    position: 3,
    counter: 'Counter 2',
    estimatedWaitTime: 6,
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString()
  }
];

export const mockNotifications = [
  {
    id: 'notif_1',
    title: 'Live Queue Alert',
    message: 'Canteen token CAN-012 is currently being served at Counter 2.',
    time: '2 mins ago',
    unread: true,
    type: 'live'
  },
  {
    id: 'notif_2',
    title: 'Your Token Approaching',
    message: 'Your token CAN-015 has 3 people ahead. Approximate wait 6 min.',
    time: '5 mins ago',
    unread: true,
    type: 'token'
  },
  {
    id: 'notif_3',
    title: 'Campus Notice',
    message: 'Central Library reading hall will remain open until midnight.',
    time: '1 hour ago',
    unread: false,
    type: 'campus'
  }
];

export const mockAnnouncements = [
  {
    id: 'ann_1',
    title: 'Peak Hours Alert',
    content: 'Canteen experiences high rush between 1:00 PM - 2:15 PM. Book tokens 10 minutes in advance!',
    tag: 'Tip',
    date: 'Today'
  },
  {
    id: 'ann_2',
    title: 'Digital Token Validation',
    content: 'Show your live token QR or token number directly at the counter display.',
    tag: 'Feature',
    date: 'Yesterday'
  }
];
