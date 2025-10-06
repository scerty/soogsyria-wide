// src/config/realEstate/types.ts

import { FilterOption } from '../../types/listing';

export interface RealEstateFilters {
  locations: string[];
  operationType: string[];
  propertyType: string[];
  condition: string[];
  ownershipType: string[];
  investmentType: string[];
  price?: { from?: number; to?: number };
  size?: { from?: number; to?: number };
  landSize?: { from?: number; to?: number };
  bedrooms: string[];
  bathrooms: string[];
  floor: string[];
  builtYear?: { from?: number; to?: number };
  amenities: string[];
  soilType: string[];
  waterSource: string[];
  monthlyFees?: { from?: number; to?: number };
}

export interface FilterConfig {
  title: string;
  key: string;
  type: 'checkbox' | 'range' | 'buttonGroup' | 'select';
  options?: FilterOption[];
  visibleWhen?: (filters: any, activeTab?: string, activeSubCategory?: string) => boolean;
  placeholder?: {
    from?: string;
    to?: string;
  };
  multiSelect?: boolean;
}