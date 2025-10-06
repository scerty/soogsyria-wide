// src/hooks/useUrlFilters.ts

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { filtersToUrlParams, urlParamsToFilters } from '../config/realEstateFilters';
import { carFiltersToUrlParams, urlParamsToCarFilters } from '../config/carFilters';
import { jobFiltersToUrlParams, urlParamsToJobFilters } from '../config/jobFilters';
import { furnitureFiltersToUrlParams, urlParamsToFurnitureFilters } from '../config/furnitureFilters';

export interface Filters {
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

// Car filters interface
export interface CarFilters {
  locations: string[];
  brands: string[];
  models: string[];
  year?: { from?: number; to?: number };
  price?: { from?: number; to?: number };
  mileage?: { from?: number; to?: number };
  fuelType: string[];
  gearbox: string[];
  bodyType: string[];
  condition: string[];
  color: string[];
  features: string[];
  engineSize?: { from?: number; to?: number };
  doors: string[];
  seats: string[];
}

// Job filters interface
export interface JobFilters {
  locations: string[];
  jobType: string[];
  experienceLevel: string[];
  salary?: { from?: number; to?: number };
  company: string[];
  industry: string[];
  skills: string[];
  education: string[];
  workArrangement: string[];
  contractType: string[];
  benefits: string[];
}

// Furniture filters interface
export interface FurnitureFilters {
  locations: string[];
  itemType: string[];
  condition: string[];
  material: string[];
  price?: { from?: number; to?: number };
  brand: string[];
  color: string[];
  category: string[];
  features: string[];
  warranty?: { from?: number; to?: number };
}

const defaultFilters: Filters = {
  locations: [],
  operationType: [],
  propertyType: [],
  condition: [],
  ownershipType: [],
  investmentType: [],
  bedrooms: [],
  bathrooms: [],
  floor: [],
  amenities: [],
  soilType: [],
  waterSource: [],
};

const defaultCarFilters: CarFilters = {
  locations: [],
  brands: [],
  models: [],
  fuelType: [],
  gearbox: [],
  bodyType: [],
  condition: [],
  color: [],
  features: [],
  doors: [],
  seats: [],
};

const defaultJobFilters: JobFilters = {
  locations: [],
  jobType: [],
  experienceLevel: [],
  company: [],
  industry: [],
  skills: [],
  education: [],
  workArrangement: [],
  contractType: [],
  benefits: [],
};

const defaultFurnitureFilters: FurnitureFilters = {
  locations: [],
  itemType: [],
  condition: [],
  material: [],
  brand: [],
  color: [],
  category: [],
  features: [],
};

export const useUrlFilters = (activeTab: string, activeSubCategory?: string, filterType: 'real_estate' | 'car' | 'job' | 'furniture' = 'real_estate') => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const isCarFilter = filterType === 'car';
  const isJobFilter = filterType === 'job';
  const isFurnitureFilter = filterType === 'furniture';
  
  const defaults = isCarFilter ? defaultCarFilters : 
                   isJobFilter ? defaultJobFilters : 
                   isFurnitureFilter ? defaultFurnitureFilters : 
                   defaultFilters;
                   
  const urlToFilters = isCarFilter ? urlParamsToCarFilters : 
                       isJobFilter ? urlParamsToJobFilters : 
                       isFurnitureFilter ? urlParamsToFurnitureFilters : 
                       urlParamsToFilters;
                       
  const filtersToUrl = isCarFilter ? carFiltersToUrlParams : 
                       isJobFilter ? jobFiltersToUrlParams : 
                       isFurnitureFilter ? furnitureFiltersToUrlParams : 
                       filtersToUrlParams;
  
  // Initialize filters from URL immediately
  const [filters, setFiltersState] = useState(() => {
    const urlFilters = urlToFilters(searchParams);
    const initialFilters = { ...defaults, ...urlFilters };
    console.log('🚀 Initial filters from URL:', initialFilters);
    return initialFilters;
  });

  // Update filters when URL changes (browser back/forward)
  useEffect(() => {
    const urlFilters = urlToFilters(searchParams);
    const newFilters = { ...defaults, ...urlFilters };
    console.log('🔄 URL changed, updating filters:', newFilters);
    setFiltersState(newFilters);
  }, [searchParams]);

  const setFilters = (newFilters: any | ((prev: any) => any)) => {
    const updatedFilters = typeof newFilters === 'function' ? newFilters(filters) : newFilters;
    console.log('✏️ Setting new filters:', updatedFilters);
    
    // Update local state immediately
    setFiltersState(updatedFilters);
    
    // Update URL with filters
    const urlParams = filtersToUrl(updatedFilters);
    
    // Preserve tab and subcategory params
    if (activeTab) urlParams.set('tab', activeTab);
    if (activeSubCategory) urlParams.set('subCategory', activeSubCategory);
    
    console.log('🔗 Updating URL params:', Object.fromEntries(urlParams.entries()));
    setSearchParams(urlParams, { replace: true }); // Use replace to avoid history pollution
  };

  const resetFilters = () => {
    console.log('🔄 Resetting filters');
    setFiltersState(defaults);
    const urlParams = new URLSearchParams();
    if (activeTab) urlParams.set('tab', activeTab);
    if (activeSubCategory) urlParams.set('subCategory', activeSubCategory);
    setSearchParams(urlParams, { replace: true });
  };

  return {
    filters,
    setFilters,
    resetFilters,
  };
};