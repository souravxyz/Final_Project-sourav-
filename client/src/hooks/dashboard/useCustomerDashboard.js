import { useQuery } from "@tanstack/react-query";
import { getCustomerBookings } from "../../api/apiHandler";

export const useCustomerDashboard = (userId) => {
  const bookingsQuery = useQuery({
    queryKey: ["customerBookings", userId],
    queryFn: () => getCustomerBookings(userId),
    enabled: !!userId,
  });

  return {
    bookings: bookingsQuery.data || [],
    isLoading: bookingsQuery.isLoading,
  };
};

export const useCustomerBookings = (userId) => {
  return useQuery({
    queryKey: ["customerBookings", userId],
    queryFn: () => getCustomerBookings(userId),
    enabled: !!userId,
  });
};
