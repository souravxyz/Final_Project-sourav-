import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelBooking,
  createBooking,
  getBookedSlots,
  updateBookingStatus,
} from "../../api/apiHandler";

export const useBookedSlots = (providerId, date) => {
  return useQuery({
    queryKey: ["bookedSlots", providerId, date],
    queryFn: () => getBookedSlots(providerId, date),
    enabled: !!providerId && !!date,
  });
};

export const useCreateBooking = () => {
  return useMutation({ mutationFn: createBooking });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, status }) =>
      updateBookingStatus(bookingId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providerBookings"] });
    },
  });
};
export const useCancelBooking = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerBookings", userId] });
    },
  });
};
