// src/services/listingService.ts

import api from './api';
import { Listing, ListingFormData } from '../types/listing';

export interface PaginatedListings {
  results: Listing[];
  count: number;
  nextOffset: number | null;
}

// Cloudflare credentials from env
const CF_ACCOUNT_ID = import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID as string;
const CF_API_TOKEN   = import.meta.env.VITE_CLOUDFLARE_API_TOKEN as string;

export const listingService = {
  /**
   * Fetch a page of listings with:
   * - limit/offset pagination
   * - optional filters (e.g. { type: 'real_estate', 'estate_detail__operation_type': 'sale' })
   */
  getListings: async (
    limit = 20,
    offset = 0,
    filters: Record<string, string> = {},
    search?: string
  ): Promise<PaginatedListings> => {
    // Build query string with pagination + filters
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
      ...filters,
    });

    // Add search query if provided
    if (search && search.trim()) {
      params.set('search', search.trim());
    }

   // console.log('🌐 API call URL:', `/api/soogsyrialistings/?${params.toString()}`);
   // console.log('📤 API call params object:', Object.fromEntries(params.entries()));

    const response = await api.get<{
      results: Listing[];
      count: number;
    }>(`/api/soogsyrialistings/?${params.toString()}`);

    console.log('📥 API response:', {
      resultsCount: response.data.results.length,
      totalCount: response.data.count
    });

    const { results, count } = response.data;
    // حساب الـ nextOffset
    const nextOffset =
      results.length === limit && offset + limit < count
        ? offset + limit
        : null;

    return { results, count, nextOffset };
  },

  /**
   * Fetch the detail for a single listing by ID.
   */
  getListing: async (id: number): Promise<Listing> => {
    const response = await api.get<Listing>(`/api/soogsyrialistings/${id}/`);
    return response.data;
  },

  /**
   * Create a new listing. Expects full ListingFormData shape.
   */
  createListing: async (data: ListingFormData): Promise<Listing> => {
    const response = await api.post<Listing>(
      '/api/soogsyrialistings/',
      data
    );
    return response.data;
  },

  /**
   * Update an existing listing by ID.
   */
  updateListing: async (
    id: number,
    data: ListingFormData
  ): Promise<Listing> => {
    const response = await api.put<Listing>(
      `/api/soogsyrialistings/${id}/`,
      data
    );
    return response.data;
  },

  /**
   * Delete a listing by ID.
   */
  deleteListing: async (id: number): Promise<void> => {
    await api.delete(`/api/soogsyrialistings/${id}/`);
  },

  /**
   * Upload a single File to Cloudflare Images and return its image ID.
   */
  uploadToCloudflare: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/images/v1`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
        },
        body: formData,
      }
    );
    const body = await res.json();

    if (!body.success) {
      console.error('Cloudflare upload error:', body.errors);
      throw new Error('Cloudflare upload failed');
    }

    return body.result.id as string;
  },
};
