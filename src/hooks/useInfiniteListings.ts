// src/hooks/useInfiniteListings.ts

import { useInfiniteQuery } from '@tanstack/react-query';
import { listingService, PaginatedListings } from '../services/listingService';

export function useInfiniteListings(limit = 20) {
  return useInfiniteQuery<PaginatedListings>(
    ['infiniteListings', limit],
    ({ pageParam = 0 }) => listingService.getListings(limit, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextOffset,
      staleTime: 1000 * 60 * 5, // 5 دقائق
      cacheTime: 1000 * 60 * 10,
    }
  );
}
