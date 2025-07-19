import { useQuery } from '@tanstack/react-query';
import { listingService } from '../services/listingService';

export const useListingDetail = (id: number) => {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: () => listingService.getListing(id),
    enabled: !!id,
  });
};