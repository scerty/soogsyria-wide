// src/config/realEstateFilters.ts

import { FilterOption } from '../types/listing';

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

// المحافظات السورية (تتطابق مع governorate__slug_en)
const GOVERNORATES: FilterOption[] = [
  { label: 'دمشق', value: 'damascus', count: 2200 },
  { label: 'ريف دمشق', value: 'damascus-countryside', count: 1656 },
  { label: 'حلب', value: 'aleppo', count: 1405 },
  { label: 'اللاذقية', value: 'latakia', count: 2686 },
  { label: 'طرطوس', value: 'tartous', count: 5603 },
  { label: 'حمص', value: 'homs', count: 1860 },
  { label: 'حماة', value: 'hama', count: 299 },
  { label: 'إدلب', value: 'idlib', count: 109 },
  { label: 'دير الزور', value: 'deir-ez-zor', count: 219 },
  { label: 'الرقة', value: 'raqqa', count: 84 },
  { label: 'الحسكة', value: 'al-hasakah', count: 48 },
  { label: 'درعا', value: 'dara', count: 189 },
  { label: 'السويداء', value: 'as-suwayda', count: 28 },
  { label: 'القنيطرة', value: 'quneitra', count: 34 },
];

// المناطق حسب المحافظة (تتطابق مع area__slug_en)
const AREAS_BY_GOVERNORATE: Record<string, FilterOption[]> = {
  damascus: [
    { label: 'المزة', value: 'mazzeh', count: 450 },
    { label: 'أبو رمانة', value: 'abu-rummaneh', count: 380 },
    { label: 'المالكي', value: 'malki', count: 320 },
    { label: 'القصاع', value: 'qassaa', count: 280 },
    { label: 'الشعلان', value: 'shaalan', count: 250 },
    { label: 'المهاجرين', value: 'muhajirin', count: 220 },
    { label: 'كفر سوسة', value: 'kafr-sousa', count: 200 },
    { label: 'دمشق القديمة', value: 'old-damascus', count: 180 },
  ],
  'damascus-countryside': [
    { label: 'جرمانا', value: 'jaramana', count: 300 },
    { label: 'دوما', value: 'douma', count: 250 },
    { label: 'الزبداني', value: 'zabadani', count: 200 },
    { label: 'قطنا', value: 'qatana', count: 180 },
    { label: 'صحنايا', value: 'sahnaya', count: 150 },
    { label: 'التل', value: 'tall', count: 120 },
  ],
  aleppo: [
    { label: 'الفردوس', value: 'firdaws', count: 280 },
    { label: 'الأزيزية', value: 'aziziyeh', count: 250 },
    { label: 'الحمدانية', value: 'hamdaniyeh', count: 220 },
    { label: 'السليمانية', value: 'sulaymaniyeh', count: 200 },
    { label: 'الجميلية', value: 'jamiliyeh', count: 180 },
  ],
  latakia: [
    { label: 'الزراعة', value: 'ziraa', count: 400 },
    { label: 'الرمل الشمالي', value: 'raml-shamali', count: 350 },
    { label: 'الرمل الجنوبي', value: 'raml-janubi', count: 300 },
    { label: 'الصليبة', value: 'salibeh', count: 250 },
  ],
  tartous: [
    { label: 'المشتل', value: 'mashtal', count: 800 },
    { label: 'الثورة', value: 'thawra', count: 700 },
    { label: 'الكورنيش', value: 'corniche', count: 600 },
    { label: 'الوحدة', value: 'wahda', count: 500 },
  ],
  homs: [
    { label: 'حمص', value: 'homs', count: 600 },
    { label: 'الرقاما', value: 'raqama', count: 200 },
    { label: 'الوعر', value: 'waer', count: 300 },
    { label: 'كرم الزيتون', value: 'karm-zeitoun', count: 250 },
  ],
  dara: [
    { label: 'درعا', value: 'dara', count: 400 },
    { label: 'مزيريب', value: 'mzeireb', count: 150 },
    { label: 'الصنمين', value: 'sanamin', count: 120 },
  ],
  'deir-ez-zor': [
    { label: 'دير الزور', value: 'deir-ez-zor', count: 300 },
    { label: 'الميادين', value: 'al-mayadin', count: 100 },
    { label: 'البوكمال', value: 'albukamal', count: 80 },
  ],
};

// دالة للحصول على قائمة المواقع الهرمية
export const getHierarchicalLocations = (selectedGovernorates: string[]): FilterOption[] => {
  const locations: FilterOption[] = [];
  
  // إضافة جميع المحافظات
  GOVERNORATES.forEach(gov => {
    locations.push({ ...gov, isGovernorate: true });
    
    // إذا كانت المحافظة محددة، أضف مناطقها
    if (selectedGovernorates.includes(gov.value)) {
      const areas = AREAS_BY_GOVERNORATE[gov.value] || [];
      areas.forEach(area => {
        locations.push({ ...area, parentGovernorate: gov.value });
      });
    }
  });
  
  return locations;
};

// أنواع العمليات العقارية (تتطابق مع operation_type)
const OPERATION_TYPES: FilterOption[] = [
  { label: 'للبيع', value: 'sale', count: 1456 },
  { label: 'للإيجار', value: 'rent', count: 987 },
  { label: 'للشراء', value: 'buy', count: 654 },
  { label: 'تجاري', value: 'commercial', count: 345 },
];

// أنواع العقارات (تتطابق مع property_type)
const PROPERTY_TYPES: FilterOption[] = [
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
const CONDITIONS: FilterOption[] = [
  { label: 'جديد', value: 'new', count: 456 },
  { label: 'ممتاز', value: 'excellent', count: 1234 },
  { label: 'جيد جداً', value: 'very_good', count: 987 },
  { label: 'جيد', value: 'good', count: 654 },
  { label: 'يحتاج ترميم', value: 'needs_renovation', count: 234 },
];

// نوع الملكية (تتطابق مع ownership_type)
const OWNERSHIP_TYPES: FilterOption[] = [
  { label: 'ملكية تامة', value: 'full_ownership', count: 1456 },
  { label: 'حق انتفاع', value: 'usufruct', count: 567 },
  { label: 'إيجار طويل الأمد', value: 'long_term_lease', count: 234 },
  { label: 'شراكة', value: 'partnership', count: 123 },
];

// نوع الاستثمار (تتطابق مع investment_type)
const INVESTMENT_TYPES: FilterOption[] = [
  { label: 'استثمار سكني', value: 'residential_investment', count: 567 },
  { label: 'استثمار تجاري', value: 'commercial_investment', count: 456 },
  { label: 'استثمار سياحي', value: 'tourism_investment', count: 234 },
  { label: 'استثمار زراعي', value: 'agricultural_investment', count: 123 },
];

// خيارات غرف النوم (تتطابق مع bedrooms)
const BEDROOM_OPTS: FilterOption[] = [
  { label: 'الكل', value: 'all' },
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
  { label: '5+', value: '5' },
];

// خيارات الحمامات (تتطابق مع bathrooms)
const BATHROOM_OPTS: FilterOption[] = [
  { label: 'الكل', value: 'all' },
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
];

// خيارات الطابق (تتطابق مع floor)
const FLOOR_OPTS: FilterOption[] = [
  { label: 'الأرضي', value: '0' },
  { label: 'الأول', value: '1' },
  { label: 'الثاني', value: '2' },
  { label: 'الثالث', value: '3' },
  { label: 'الرابع', value: '4' },
  { label: 'الخامس فما فوق', value: '5+' },
];

// المرافق (خيارات boolean)
const AMENITIES: FilterOption[] = [
  { label: 'حديقة', value: 'has_garden' },
  { label: 'موقف سيارة', value: 'has_parking' },
  { label: 'بلكونة', value: 'has_balcony' },
  { label: 'مصعد', value: 'has_elevator' },
];

// دالة للحصول على نوع العقار حسب التصنيف والتصنيف الفرعي
const getPropertyTypesByCategory = (activeTab: string, subCategory?: string): FilterOption[] => {
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

// تكوين الفلاتر الأساسية
export const FILTER_REGISTRY: FilterConfig[] = [
  {
    title: 'المنطقة',
    key: 'locations',
    type: 'checkbox',
    options: [], // سيتم ملؤها ديناميكياً
  },
  {
    title: 'نوع العملية',
    key: 'operationType',
    type: 'buttonGroup',
    options: OPERATION_TYPES,
  },
  {
    title: 'نوع العقار',
    key: 'propertyType',
    type: 'checkbox',
    options: [], // سيتم ملؤها ديناميكياً
  },
  {
    title: 'حالة العقار',
    key: 'condition',
    type: 'checkbox',
    options: CONDITIONS,
    visibleWhen: (filters, activeTab, subCategory) => {
      // إخفاء للأراضي الفارغة
      return !subCategory?.includes('قطع أراضي') || 
             !filters.propertyType?.includes('residential_land') ||
             !filters.propertyType?.includes('commercial_land');
    },
  },
  {
    title: 'نوع الملكية',
    key: 'ownershipType',
    type: 'checkbox',
    options: OWNERSHIP_TYPES,
    visibleWhen: (filters, activeTab) => {
      // إظهار للبيع والشراء فقط
      return activeTab === 'بيع' || activeTab === 'شراء';
    },
  },
  {
    title: 'نوع الاستثمار',
    key: 'investmentType',
    type: 'checkbox',
    options: INVESTMENT_TYPES,
    visibleWhen: (filters, activeTab) => {
      // إظهار للاستثمار التجاري
      return activeTab === 'تجاري';
    },
  },
  {
    title: 'السعر',
    key: 'price',
    type: 'range',
    placeholder: {
      from: 'من (ل.س)',
      to: 'إلى (ل.س)',
    },
  },
  {
    title: 'المساحة (م²)',
    key: 'size',
    type: 'range',
    placeholder: {
      from: 'من',
      to: 'إلى',
    },
  },
  {
    title: 'عدد غرف النوم',
    key: 'bedrooms',
    type: 'buttonGroup',
    options: BEDROOM_OPTS,
    visibleWhen: (filters, activeTab, subCategory) => {
      // إظهار فقط للعقارات السكنية
      if (activeTab === 'تجاري') return false;
      if (subCategory?.includes('قطع أراضي')) return false;
      if (filters.propertyType?.some((type: string) => 
        type.includes('_land') || ['office', 'shop', 'warehouse'].includes(type)
      )) return false;
      return true;
    },
  },
  {
    title: 'عدد الحمامات',
    key: 'bathrooms',
    type: 'buttonGroup',
    options: BATHROOM_OPTS,
    visibleWhen: (filters, activeTab, subCategory) => {
      // نفس شروط غرف النوم
      if (activeTab === 'تجاري') return false;
      if (subCategory?.includes('قطع أراضي')) return false;
      if (filters.propertyType?.some((type: string) => 
        type.includes('_land') || ['office', 'shop', 'warehouse'].includes(type)
      )) return false;
      return true;
    },
  },
  {
    title: 'الطابق',
    key: 'floor',
    type: 'checkbox',
    options: FLOOR_OPTS,
    visibleWhen: (filters) => {
      // إظهار فقط للشقق والمكاتب
      return filters.propertyType?.some((type: string) => 
        ['apartment', 'office'].includes(type)
      ) || false;
    },
  },
  {
    title: 'سنة البناء',
    key: 'builtYear',
    type: 'range',
    placeholder: {
      from: 'من',
      to: 'إلى',
    },
    visibleWhen: (filters, activeTab, subCategory) => {
      // إخفاء للأراضي الفارغة
      if (subCategory?.includes('قطع أراضي')) return false;
      return !filters.propertyType?.some((type: string) => 
        type.includes('_land')
      );
    },
  },
  {
    title: 'المرافق والخدمات',
    key: 'amenities',
    type: 'checkbox',
    options: AMENITIES,
  },
];

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

// Helper function to build API query params from filters
export const buildQueryParams = (
  filters: any, 
  activeTab: string, 
  subCategory?: string
): Record<string, any> => {
  console.log('🏗️ Building query params from filters:', filters);
  
  const params: Record<string, any> = {
    type: 'real_estate',
  };

  console.log('📝 Base params:', params);

  // تطبيق الفلاتر
  Object.entries(filters).forEach(([key, value]) => {
    console.log(`🔧 Processing filter: ${key} =`, value);
    if (!value) return;
    
    switch (key) {
      case 'locations':
        if (Array.isArray(value) && value.length > 0) {
          // فصل المحافظات عن المناطق والمناطق الفرعية
          const governorates = value.filter(loc => 
            GOVERNORATES.some(gov => gov.value === loc)
          );
          const areas = value.filter(loc => 
            !GOVERNORATES.some(gov => gov.value === loc)
          );
          
          if (governorates.length > 0) {
            params['location__governorate__slug_en__in'] = governorates.join(',');
          }
          if (areas.length > 0) {
            // يمكن أن تكون المناطق في area أو sub_area
            params['location__area__slug_en__in'] = areas.join(',');
            // إضافة فلترة للمناطق الفرعية أيضاً
            params['location__sub_area__slug_en__in'] = areas.join(',');
          }
        }
        break;
      case 'operationType':
        if (Array.isArray(value) && value.length > 0) {
          params['estate_detail__operation_type__in'] = value.join(',');
        }
        break;
      case 'propertyType':
        if (Array.isArray(value) && value.length > 0) {
          params['estate_detail__property_type__in'] = value.join(',');
        }
        break;
      case 'condition':
        if (Array.isArray(value) && value.length > 0) {
          params['estate_detail__condition__in'] = value.join(',');
        }
        break;
      case 'ownershipType':
        if (Array.isArray(value) && value.length > 0) {
          params['estate_detail__ownership_type__in'] = value.join(',');
        }
        break;
      case 'investmentType':
        if (Array.isArray(value) && value.length > 0) {
          params['estate_detail__investment_type__in'] = value.join(',');
        }
        break;
      case 'price':
        if (typeof value === 'object') {
          if (value.from !== undefined) params['price__gte'] = value.from;
          if (value.to !== undefined) params['price__lte'] = value.to;
        }
        break;
      case 'size':
        if (typeof value === 'object') {
          if (value.from !== undefined) params['estate_detail__area_sqm__gte'] = value.from;
          if (value.to !== undefined) params['estate_detail__area_sqm__lte'] = value.to;
        }
        break;
      case 'bedrooms':
        if (Array.isArray(value) && value.length > 0 && !value.includes('all')) {
          const minBedrooms = Math.min(...value.map(Number).filter(n => !isNaN(n)));
          if (!isNaN(minBedrooms)) {
            params['estate_detail__bedrooms__gte'] = minBedrooms;
          }
        }
        break;
      case 'bathrooms':
        if (Array.isArray(value) && value.length > 0 && !value.includes('all')) {
          const minBathrooms = Math.min(...value.map(Number).filter(n => !isNaN(n)));
          if (!isNaN(minBathrooms)) {
            params['estate_detail__bathrooms__gte'] = minBathrooms;
          }
        }
        break;
      case 'floor':
        if (Array.isArray(value) && value.length > 0) {
          params['estate_detail__floor__in'] = value.join(',');
        }
        break;
      case 'builtYear':
        if (typeof value === 'object') {
          if (value.from !== undefined) params['estate_detail__built_year__gte'] = value.from;
          if (value.to !== undefined) params['estate_detail__built_year__lte'] = value.to;
        }
        break;
      case 'amenities':
        if (Array.isArray(value) && value.length > 0) {
          // تطبيق فلاتر boolean للمرافق
          value.forEach(amenity => {
            if (['has_garden', 'has_parking', 'has_balcony', 'has_elevator'].includes(amenity)) {
              params[`estate_detail__${amenity}`] = true;
            }
          });
        }
        break;
    }
  });

  console.log('✅ Final query params:', params);
  return params;
};

// Helper functions for URL parameters
export const filtersToUrlParams = (filters: any): URLSearchParams => {
  const params = new URLSearchParams();
  
  console.log('📤 Converting filters to URL params:', filters);
  
  Object.entries(filters).forEach(([key, value]) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      console.log(`⏭️ Skipping empty filter: ${key}`);
      return;
    }
    
    if (Array.isArray(value) && value.length > 0) {
      console.log(`📋 Array filter: ${key} = [${value.join(', ')}]`);
      params.set(key, value.join(','));
    } else if (typeof value === 'object' && value !== null) {
      if ((value.from !== undefined && value.from !== '') || (value.to !== undefined && value.to !== '')) {
        const rangeValue = [];
        if (value.from !== undefined && value.from !== '') rangeValue.push(`from:${value.from}`);
        if (value.to !== undefined && value.to !== '') rangeValue.push(`to:${value.to}`);
        if (rangeValue.length > 0) {
          console.log(`📊 Range filter: ${key} = ${rangeValue.join('|')}`);
          params.set(key, rangeValue.join('|'));
        }
      }
    } else if (typeof value === 'string' || typeof value === 'number') {
      console.log(`📝 Simple filter: ${key} = ${value}`);
      params.set(key, String(value));
    }
  });
  
  console.log('✅ Final URL params:', Object.fromEntries(params.entries()));
  return params;
};

export const urlParamsToFilters = (searchParams: URLSearchParams): any => {
  const filters: any = {};
  
  // قائمة الفلاتر التي يجب أن تكون دائماً arrays
  const arrayFilters = [
    'locations',
    'operationType',
    'propertyType',
    'condition',
    'ownershipType',
    'investmentType',
    'bedrooms',
    'bathrooms',
    'floor',
    'amenities'
  ];
  
  console.log('📥 Converting URL params to filters:', Object.fromEntries(searchParams.entries()));
  
  for (const [key, value] of searchParams.entries()) {
    // Skip tab and subCategory params
    if (key === 'tab' || key === 'subCategory') {
      console.log(`⏭️ Skipping system param: ${key}`);
      continue;
    }
    
    if (value.includes(',')) {
      // Array values
      console.log(`📋 Parsing array: ${key} = [${value}]`);
      filters[key] = value.split(',');
    } else if (value.includes('|')) {
      // Range values
      console.log(`📊 Parsing range: ${key} = ${value}`);
      const rangeObj: any = {};
      value.split('|').forEach(part => {
        if (part.startsWith('from:')) {
          const fromValue = part.substring(5);
          rangeObj.from = isNaN(Number(fromValue)) ? fromValue : Number(fromValue);
        } else if (part.startsWith('to:')) {
          const toValue = part.substring(3);
          rangeObj.to = isNaN(Number(toValue)) ? toValue : Number(toValue);
        }
      });
      filters[key] = rangeObj;
    } else {
      // Single values
      console.log(`📝 Parsing simple: ${key} = ${value}`);
      
      // التحقق من أن الفلتر يجب أن يكون array
      if (arrayFilters.includes(key)) {
        console.log(`🔄 Converting single value to array for ${key}: [${value}]`);
        filters[key] = [value];
      } else {
        const numValue = Number(value);
        filters[key] = isNaN(numValue) ? value : numValue;
      }
    }
  }
  
  console.log('✅ Final filters object:', filters);
  return filters;
};