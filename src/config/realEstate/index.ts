// src/config/realEstate/index.ts

// إعادة تصدير جميع المكونات
export * from './types';
export * from './locations';
export * from './propertyTypes';
export * from './filterOptions';
export * from './filterRegistry';
export * from './queryBuilder';
export * from './urlHelpers';
export * from './dynamicFilters';

// تصدير الثوابت الرئيسية
export { FILTER_REGISTRY } from './filterRegistry';
export { GOVERNORATES, AREAS_BY_GOVERNORATE, getHierarchicalLocations } from './locations';
export { buildQueryParams } from './queryBuilder';
export { filtersToUrlParams, urlParamsToFilters } from './urlHelpers';
export { getDynamicFilterOptions } from './dynamicFilters';