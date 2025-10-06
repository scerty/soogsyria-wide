// src/config/realEstate/dynamicFilters.ts

import { FilterOption } from '../../types/listing';
import { getPropertyTypesByCategory } from './propertyTypes';

// Helper function to get dynamic filter options
export const getDynamicFilterOptions = (
  filterKey: string, 
  activeTab: string, 
  subCategory?: string,
  filters?: any
): FilterOption[] => {
  switch (filterKey) {
    case 'propertyType':
      return getPropertyTypesByCategory(activeTab, subCategory);
    default:
      return [];
  }
};