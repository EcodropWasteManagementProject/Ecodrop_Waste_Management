export const wasteTypeOptions = [
  'Organic',
  'Plastic',
  'Paper',
  'Glass',
  'Metal',
  'Electronic',
  'Mixed',
  'Other',
]

export const priorityOptions = ['Low', 'Medium', 'High']

export const mockUsers = [
  {
    id: 1,
    name: 'Ayesha Rahman',
    email: 'citizen@ecodrop.com',
    role: 'CITIZEN',
    phone: '+8801700000001',
    address: 'Sylhet, Bangladesh',
    status: 'ACTIVE',
  },
  {
    id: 2,
    name: 'Nabil Hasan',
    email: 'vendor@ecodrop.com',
    role: 'VENDOR',
    phone: '+8801700000002',
    address: 'Dhaka, Bangladesh',
    status: 'ACTIVE',
  },
  {
    id: 3,
    name: 'Sanjida Akter',
    email: 'admin@ecodrop.com',
    role: 'ADMIN',
    phone: '+8801700000003',
    address: 'Chattogram, Bangladesh',
    status: 'ACTIVE',
  },
]

export const mockReports = [
  {
    id: 101,
    title: 'Overflowing waste near market',
    description: 'Large mixed waste pile is blocking the street near the main market.',
    wasteType: 'Mixed',
    location: 'Sylhet Sadar',
    priority: 'High',
    status: 'PENDING',
    createdAt: '2026-09-01',
    assignedVendor: 'GreenRoute Collectors',
  },
  {
    id: 102,
    title: 'Plastic bottles by bus stop',
    description: 'Plastic and bottle waste is piling up beside the bus stand after rain.',
    wasteType: 'Plastic',
    location: 'Zindabazar',
    priority: 'Medium',
    status: 'ASSIGNED',
    createdAt: '2026-09-03',
    assignedVendor: 'EcoCycle Logistics',
  },
  {
    id: 103,
    title: 'Electronic waste dumped in alley',
    description: 'Old electronics were left behind near residential block D.',
    wasteType: 'Electronic',
    location: 'Amberkhana',
    priority: 'High',
    status: 'IN_PROGRESS',
    createdAt: '2026-09-05',
    assignedVendor: 'Recycle Works Ltd.',
  },
  {
    id: 104,
    title: 'Paper waste at school gate',
    description: 'School gate has a large pile of paper cartons and old books.',
    wasteType: 'Paper',
    location: 'Uposhohor',
    priority: 'Low',
    status: 'RESOLVED',
    createdAt: '2026-08-27',
    assignedVendor: 'GreenRoute Collectors',
  },
]

export const mockPickups = [
  {
    id: 201,
    wasteType: 'Plastic',
    quantity: '3 sacks',
    address: 'Sylhet Sadar Road 7',
    preferredDate: '2026-09-14',
    status: 'PENDING',
    assignedVendor: 'EcoCycle Logistics',
    notes: 'Please collect before 10am.',
  },
  {
    id: 202,
    wasteType: 'Organic',
    quantity: '2 bins',
    address: 'Zindabazar Market',
    preferredDate: '2026-09-12',
    status: 'ASSIGNED',
    assignedVendor: 'GreenRoute Collectors',
    notes: 'Kitchen waste and garden waste.',
  },
  {
    id: 203,
    wasteType: 'Metal',
    quantity: '1 truckload',
    address: 'Uposhohor Lane',
    preferredDate: '2026-09-10',
    status: 'COMPLETED',
    assignedVendor: 'Recycle Works Ltd.',
    notes: 'Scrap metal ready.',
  },
]

export const mockNotifications = [
  {
    id: 1,
    title: 'Pickup accepted',
    message: 'Your plastic pickup has been accepted by EcoCycle Logistics.',
    date: '2026-09-09',
    read: false,
  },
  {
    id: 2,
    title: 'Report resolved',
    message: 'The electronic waste report near Amberkhana was marked resolved.',
    date: '2026-09-08',
    read: true,
  },
  {
    id: 3,
    title: 'Eco points earned',
    message: 'You earned 10 eco points for submitting a valid waste report.',
    date: '2026-09-07',
    read: false,
  },
]

export const mockEcoPoints = {
  current: 340,
  level: 'Eco Champion',
  history: [
    { id: 1, title: 'Waste report submitted', points: 10, date: '2026-09-05' },
    { id: 2, title: 'Pickup completed', points: 20, date: '2026-09-02' },
    { id: 3, title: 'Recycling activity', points: 10, date: '2026-08-28' },
  ],
}

export const mockAIConversations = [
  { sender: 'user', text: 'Can I recycle this plastic bottle?' },
  {
    sender: 'assistant',
    text: 'Yes, rinse it and place it in the plastic recycling bin if your local system accepts PET bottles. Remove the cap if required and keep it clean.',
  },
]

export const mockAnalytics = {
  reportsByType: [
    { name: 'Plastic', value: 26 },
    { name: 'Organic', value: 19 },
    { name: 'Paper', value: 17 },
    { name: 'Electronic', value: 11 },
    { name: 'Mixed', value: 27 },
  ],
  reportsByStatus: [
    { name: 'Pending', value: 12 },
    { name: 'Assigned', value: 8 },
    { name: 'In Progress', value: 5 },
    { name: 'Resolved', value: 14 },
  ],
  monthlyActivity: [
    { month: 'Jan', value: 42 },
    { month: 'Feb', value: 58 },
    { month: 'Mar', value: 63 },
    { month: 'Apr', value: 54 },
    { month: 'May', value: 70 },
    { month: 'Jun', value: 81 },
  ],
}

export const mockVendorList = [
  {
    id: 1,
    name: 'EcoCycle Logistics',
    location: 'Sylhet',
    status: 'APPROVED',
    workload: 21,
  },
  {
    id: 2,
    name: 'GreenRoute Collectors',
    location: 'Dhaka',
    status: 'APPROVED',
    workload: 17,
  },
  {
    id: 3,
    name: 'Recycle Works Ltd.',
    location: 'Chattogram',
    status: 'PENDING',
    workload: 9,
  },
]

export const mockDashboardStats = {
  citizen: [
    { label: 'Total Reports', value: 18 },
    { label: 'Pending Reports', value: 4 },
    { label: 'Active Pickups', value: 3 },
    { label: 'Completed Pickups', value: 9 },
    { label: 'Eco Points', value: 340 },
  ],
  vendor: [
    { label: 'Pending Pickups', value: 8 },
    { label: 'Assigned Pickups', value: 12 },
    { label: 'Completed Pickups', value: 34 },
    { label: 'Avg. Response Time', value: '2.4 days' },
  ],
  admin: [
    { label: 'Total Users', value: 128 },
    { label: 'Total Vendors', value: 18 },
    { label: 'Total Reports', value: 236 },
    { label: 'Pending Reports', value: 21 },
    { label: 'Completed Pickups', value: 112 },
  ],
}

export const publicFactCards = [
  {
    title: 'Faster waste reporting',
    description: 'Report illegal dumping or overflowing bins in minutes and track the status online.',
  },
  {
    title: 'Smarter recycling guidance',
    description: 'Use the built-in AI assistant for practical waste sorting and disposal tips.',
  },
  {
    title: 'Transparent pickups',
    description: 'Track pickup assignments, vendor updates, and completion from one dashboard.',
  },
]

export const recyclingGuide = [
  { type: 'Organic', tips: 'Place food scraps and garden waste in compost bins when local rules allow.' },
  { type: 'Plastic', tips: 'Clean and dry bottles before disposal; sort by local resin or PET codes.' },
  { type: 'Paper', tips: 'Keep paper dry and separate from food-contaminated materials.' },
  { type: 'Glass', tips: 'Avoid mixing broken glass with regular recyclables unless a local collection rule allows it.' },
  { type: 'Metal', tips: 'Separate scrap metal and cans from mixed waste and deliver to approved collection points.' },
  { type: 'Electronic', tips: 'Do not place e-waste in regular bins; arrange a pickup or facility drop-off.' },
  { type: 'Mixed', tips: 'When uncertain, keep items out of general bins until a local collection decision is confirmed.' },
  { type: 'Other', tips: 'Check local municipal guidance before discarding bulky or hazardous waste.' },
]
