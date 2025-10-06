// src/config/realEstateFilters.ts
// هذا الملف للتوافق مع الإستيرادات الموجودة - يعيد تصدير من المجلد الجديد

export * from './realEstate';

// تصدير الثوابت الرئيسية للتوافق مع الكود الموجود
export { 
  FILTER_REGISTRY,
  GOVERNORATES,
  AREAS_BY_GOVERNORATE,
  getHierarchicalLocations,
  buildQueryParams,
  filtersToUrlParams,
  urlParamsToFilters,
  getDynamicFilterOptions
} from './realEstate';

// تصدير الأنواع
export type { RealEstateFilters, FilterConfig } from './realEstate';