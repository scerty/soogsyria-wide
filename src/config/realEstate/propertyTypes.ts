// src/config/realEstate/propertyTypes.ts

import { FilterOption } from '../../types/listing';

// أنواع العمليات العقارية (تتطابق مع operation_type)
export const OPERATION_TYPES: FilterOption[] = [
  { label: 'للبيع', value: 'sale', count: 1456 },
  { label: 'للإيجار', value: 'rent', count: 987 },
  { label: 'للشراء', value: 'buy', count: 654 },
  { label: 'تجاري', value: 'commercial', count: 345 },
];

// أنواع العقارات (تتطابق مع property_type)
export const PROPERTY_TYPES: FilterOption[] = [
  { label: 'شقة', value: 'apartment', count: 1456 },
  { label: 'منزل مستقل', value: 'villa', count: 987 },
  { label: 'تاون هاوس', value: 'townhouse', count: 654 },
  { label: 'دوبلكس', value: 'duplex', count: 345 },
  { label: 'استوديو', value: 'studio', count: 234 },
  { label: 'بنتهاوس', value: 'penthouse', count: 123 },
  { label: 'مكتب', value: 'office', count: 456 },
  { label: 'محل تجاري', value: 'shop', count: 389 },
  { label: 'مستودع', value: 'warehouse', count: 234 },
  { label: 'أرض سكنية', value: 'residential_land', count: 567 },
  { label: 'أرض تجارية', value: 'commercial_land', count: 345 },
  { label: 'أرض زراعية', value: 'agricultural_land', count: 234 },
];

// حالة العقار (تتطابق مع condition)
export const CONDITIONS: FilterOption[] = [
  { label: 'جديد', value: 'new', count: 456 },
  { label: 'ممتاز', value: 'excellent', count: 1234 },
  { label: 'جيد جداً', value: 'very_good', count: 987 },
  { label: 'جيد', value: 'good', count: 654 },
  { label: 'يحتاج ترميم', value: 'needs_renovation', count: 234 },
];

// نوع الملكية (تتطابق مع ownership_type)
export const OWNERSHIP_TYPES: FilterOption[] = [
  { label: 'ملكية تامة', value: 'full_ownership', count: 1456 },
  { label: 'حق انتفاع', value: 'usufruct', count: 567 },
  { label: 'إيجار طويل الأمد', value: 'long_term_lease', count: 234 },
  { label: 'شراكة', value: 'partnership', count: 123 },
];

// نوع الاستثمار (تتطابق مع investment_type)
export const INVESTMENT_TYPES: FilterOption[] = [
  { label: 'استثمار سكني', value: 'residential_investment', count: 567 },
  { label: 'استثمار تجاري', value: 'commercial_investment', count: 456 },
  { label: 'استثمار سياحي', value: 'tourism_investment', count: 234 },
  { label: 'استثمار زراعي', value: 'agricultural_investment', count: 123 },
];

// دالة للحصول على نوع العقار حسب التصنيف والتصنيف الفرعي
export const getPropertyTypesByCategory = (activeTab: string, subCategory?: string): FilterOption[] => {
  // للتصنيف التجاري
  if (activeTab === 'تجاري' || activeTab === 'commercial') {
    return PROPERTY_TYPES.filter(type => 
      ['office', 'shop', 'warehouse', 'commercial_land'].includes(type.value)
    );
  }
  
  // للتصنيفات الفرعية المحددة
  if (subCategory) {
    if (subCategory.includes('قطع أراضي') || subCategory.includes('أرض')) {
      return PROPERTY_TYPES.filter(type => type.value.includes('_land'));
    }
    if (subCategory.includes('تجاري') || subCategory.includes('مكاتب')) {
      return PROPERTY_TYPES.filter(type => 
        ['office', 'shop', 'warehouse'].includes(type.value)
      );
    }
  }
  
  // افتراضي للعقارات السكنية
  return PROPERTY_TYPES.filter(type => 
    ['apartment', 'villa', 'townhouse', 'duplex', 'studio', 'penthouse'].includes(type.value)
  );
};