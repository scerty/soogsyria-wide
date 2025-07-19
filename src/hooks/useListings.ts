import { useQuery } from '@tanstack/react-query';
import { listingService } from '../services/listingService';

export const useListings = (limit = 20, offset = 0) => {
  return useQuery({
    queryKey: ['listings', limit, offset],
    queryFn: () => listingService.getListings(limit, offset),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};