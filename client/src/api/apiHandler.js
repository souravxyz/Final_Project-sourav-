import axiosInstance from "./axiosInstance";
import endpoints from "./endpoints";

// 🔐 Register user with form-data
export const registerUser = async (formData) => {
  const res = await axiosInstance.post(endpoints.auth.register, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// 🔐 Login user
export const loginUser = async (credentials) => {
  const res = await axiosInstance.post(endpoints.auth.login, credentials);
  return res.data;
};
//logout
export const logoutUser = async () => {
  const res = await axiosInstance.get(endpoints.auth.logout);
  return res.data;
};

// 👤 Get current user profile
export const getProfile = async () => {
  const res = await axiosInstance.get(endpoints.auth.profile);
  return res.data;
};
// ✏️ Edit user profile (with optional profile pic)
export const editProfile = async (formData) => {
  const res = await axiosInstance.patch(endpoints.auth.profile, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// 🔐 Reset password
export const resetPassword = async (passwordData) => {
  const res = await axiosInstance.patch("/auth/reset-password", passwordData);
  return res.data;
};

// 🔐 Forgot password
export const forgetPassword = async (emailData) => {
  const res = await axiosInstance.post("/auth/forget-password", emailData);
  return res.data;
};

// reset password from email
export const resetPasswordWithToken = async ({ token, newPassword }) => {
  const res = await axiosInstance.post(
    endpoints.auth.resetPasswordWithToken(token),
    { newPassword }
  );
  return res.data;
};

// 🔐 Get provider dashboard

// 🧑‍🔧 Create or update provider profile
export const saveProviderProfile = async (profileData) => {
  const res = await axiosInstance.post(endpoints.provider.profile, profileData);
  return res.data;
};
export const getProviderBookings = async (providerId) => {
  const res = await axiosInstance.get(endpoints.provider.bookings(providerId));
  return res.data;
};

export const getAllProviders = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const url = `${endpoints.provider.profile}?${params}`;
  const res = await axiosInstance.get(url);
  return res.data;
};

// Get provider profile by ID
export const getProviderById = async (providerId) => {
  const res = await axiosInstance.get(
    endpoints.provider.profileById(providerId)
  );
  return res.data;
};

// get profile by provider's user id
export const getProviderByUserId = async (userId) => {
  const res = await axiosInstance.get(
    endpoints.provider.profileByUserId(userId)
  );
  if (res.data?.message === "Provider not found") {
    return null;
  }
  return res.data;
};

export const getCustomerBookings = async (userId) => {
  const res = await axiosInstance.get(endpoints.customer.bookings(userId));
  return res.data;
};

// booking related APIs
export const getBookedSlots = async (providerId, date) => {
  const res = await axiosInstance.get(
    `${endpoints.booking.slots(providerId)}?date=${date}`
  );
  return res.data.bookedSlots;
};

export const createBooking = async (bookingData) => {
  const res = await axiosInstance.post(endpoints.booking.create, bookingData);
  return res.data;
};

// ❌ Cancel a booking (by updating status)
export const cancelBooking = async (bookingId) => {
  const res = await axiosInstance.patch(
    endpoints.customer.cancelBooking(bookingId),
    {
      status: "cancelled",
    }
  );
  return res.data;
};
// update booking status
export const updateBookingStatus = async (bookingId, status) => {
  const res = await axiosInstance.patch(
    endpoints.booking.updateStatus(bookingId),
    { status }
  );
  return res.data;
};

// 📝 Create or update a review
export const submitReview = async (reviewData) => {
  try {
    const res = await axiosInstance.post(
      endpoints.review.createOrUpdate,
      reviewData
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to submit review");
  }
};

// 📖 Get all reviews for a specific provider
export const getProviderReviews = async (providerId) => {
  const res = await axiosInstance.get(
    endpoints.review.getByProviderId(providerId)
  );
  return res.data;
};

// 📖 Get all reviews for a specific user
export const getUserReviews = async (userId) => {
  const res = await axiosInstance.get(endpoints.review.getByUserId(userId));
  return res.data;
};
