import { useQuery } from "@tanstack/react-query";
import { getProviderById } from "../../api/apiHandler";

export const useProviderProfile = (providerId) => {
  return useQuery({
    queryKey: ["providerProfile", providerId],
    queryFn: () => getProviderById(providerId),
    enabled: !!providerId,
  });
};

export const useProviderPublicProfile = (providerId) => {
  return useQuery({
    queryKey: ["providerPublicProfile", providerId],
    queryFn: () => getProviderById(providerId),
    enabled: !!providerId,
  });
};
