import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProviderReviews,
  getUserReviews,
  submitReview,
} from "../../api/apiHandler";

// 📝 Submit or update a review
export const useReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitReview,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(["providerReviews", variables.providerId]);
    },
  });
};

// 📖 Get reviews for a provider
export const useGetProviderReviews = (providerId) => {
  return useQuery({
    queryKey: ["providerReviews", providerId],
    queryFn: () => getProviderReviews(providerId),
    enabled: !!providerId,
  });
};

// 📖 Get all reviews written by a user
export const useGetUserReviews = (userId) => {
  return useQuery({
    queryKey: ["userReviews", userId],
    queryFn: () => getUserReviews(userId),
    enabled: !!userId,
  });
};
