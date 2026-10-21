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
}

export default api
