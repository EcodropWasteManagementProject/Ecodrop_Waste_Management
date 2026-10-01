export const api = {
  getDashboardStats: async () => ({
    citizen: [
      { label: 'Total Reports', value: 18 },
      { label: 'Pending Reports', value: 4 },
      { label: 'Active Pickups', value: 3 },
      { label: 'Completed Pickups', value: 9 },
      { label: 'Eco Points', value: 340 },
    ],
  }),

  login: async (email, _password) => ({
    success: true,
    user: {
      id: 1,
      name: 'Demo Citizen',
      email,
      role: 'CITIZEN',
    },
    token: 'mock-token',
    message: 'Mock login successful.',
  }),

  register: async (payload) => ({
    success: true,
    user: {
      id: Date.now(),
      name: payload.fullName,
      email: payload.email,
      role: payload.role || 'CITIZEN',
    },
    token: 'mock-token',
  }),
}

export default api
