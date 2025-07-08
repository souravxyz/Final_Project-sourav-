const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    profile: "/auth/profile",
    resetPassword: "/auth/reset-password",
    forgetPassword: "/auth/forget-password",
    resetPasswordWithToken: (token) => `/auth/reset-password/${token}`,

    logout: "/auth/logout",
  },

  provider: {
    bookings: (id) => `/bookings/provider/${id}/all`,
    profile: "/providers", // we’ll filter by logged-in user
    profileByUserId: (userId) => `/providers/user/${userId}`, // only used in dashboard
    profileById: (id) => `/providers/${id}`,
  },

  customer: {
    bookings: (id) => `/bookings/user/${id}`,
    cancelBooking: (bookingId) => `/bookings/status/${bookingId}`,
  },
  booking: {
    create: "/bookings",
    slots: (providerId) => `/bookings/provider/${providerId}`,
    updateStatus: (bookingId) => `/bookings/status/${bookingId}`,
  },
  review: {
    createOrUpdate: "/reviews", // POST (body contains providerId)
    getByProviderId: (providerId) => `/reviews/${providerId}`, // GET
    getByUserId: (userId) => `/reviews/user/${userId}`,//reviews of the user
  },
};

export default endpoints;
