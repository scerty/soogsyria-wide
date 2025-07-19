// src/config/furnitureFilters.ts

import { FilterOption } from '../types/listing';

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

// المحافظات السورية
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

// أنواع العناصر
const ITEM_TYPES: FilterOption[] = [
  // أثاث
  { label: 'أريكة', value: 'sofa', count: 1456 },
  { label: 'كرسي', value: 'chair', count: 987 },
  { label: 'طاولة', value: 'table', count: 876 },
  { label: 'سرير', value: 'bed', count: 654 },
  { label: 'خزانة', value: 'wardrobe', count: 567 },
  { label: 'مكتبة', value: 'bookcase', count: 456 },
  { label: 'مكتب', value: 'desk', count: 345 },
  { label: 'كومودينو', value: 'nightstand', count: 234 },
  { label: 'طاولة طعام', value: 'dining-table', count: 198 },
  
  // إلكترونيات
  { label: 'تلفزيون', value: 'tv', count: 876 },
  { label: 'هاتف ذكي', value: 'smartphone', count: 765 },
  { label: 'كمبيوتر محمول', value: 'laptop', count: 654 },
  { label: 'كمبيوتر مكتبي', value: 'desktop', count: 543 },
  { label: 'جهاز لوحي', value: 'tablet', count: 432 },
  { label: 'سماعات', value: 'headphones', count: 321 },
  { label: 'مكبرات صوت', value: 'speakers', count: 210 },
  { label: 'ثلاجة', value: 'refrigerator', count: 198 },
  { label: 'غسالة', value: 'washing-machine', count: 187 },
  { label: 'مكيف هواء', value: 'air-conditioner', count: 176 },
];

// حالة العناصر
const ITEM_CONDITIONS: FilterOption[] = [
  { label: 'جديد', value: 'new', count: 456 },
  { label: 'ممتاز', value: 'excellent', count: 1234 },
  { label: 'جيد جداً', value: 'very-good', count: 987 },
  { label: 'جيد', value: 'good', count: 654 },
  { label: 'مستعمل', value: 'used', count: 345 },
  { label: 'يحتاج إصلاح', value: 'needs-repair', count: 234 },
];

// المواد
const MATERIALS: FilterOption[] = [
  { label: 'خشب', value: 'wood', count: 1456 },
  { label: 'معدن', value: 'metal', count: 987 },
  { label: 'زجاج', value: 'glass', count: 876 },
  { label: 'بلاستيك', value: 'plastic', count: 654 },
  { label: 'قماش', value: 'fabric', count: 567 },
  { label: 'جلد', value: 'leather', count: 456 },
  { label: 'رخام', value: 'marble', count: 345 },
  { label: 'خشب متين', value: 'solid-wood', count: 234 },
  { label: 'خشب مضغوط', value: 'mdf', count: 198 },
  { label: 'راتنج', value: 'resin', count: 156 },
];

// الماركات
const BRANDS: FilterOption[] = [
  // أثاث
  { label: 'إيكيا', value: 'ikea', count: 456 },
  { label: 'هوم سنتر', value: 'home-center', count: 345 },
  { label: 'زارا هوم', value: 'zara-home', count: 234 },
  { label: 'سيتي هوم', value: 'city-home', count: 198 },
  
  // إلكترونيات
  { label: 'سامسونج', value: 'samsung', count: 876 },
  { label: 'إل جي', value: 'lg', count: 765 },
  { label: 'سوني', value: 'sony', count: 654 },
  { label: 'آبل', value: 'apple', count: 543 },
  { label: 'هواوي', value: 'huawei', count: 432 },
  { label: 'شاومي', value: 'xiaomi', count: 321 },
  { label: 'فيليبس', value: 'philips', count: 210 },
  { label: 'بوش', value: 'bosch', count: 198 },
  { label: 'أخرى', value: 'other', count: 567 },
];

// الألوان
const COLORS: FilterOption[] = [
  { label: 'أبيض', value: 'white', count: 1456 },
  { label: 'أسود', value: 'black', count: 987 },
  { label: 'بني', value: 'brown', count: 876 },
  { label: 'رمادي', value: 'gray', count: 654 },
  { label: 'بيج', value: 'beige', count: 567 },
  { label: 'أزرق', value: 'blue', count: 456 },
  { label: 'أخضر', value: 'green', count: 345 },
  { label: 'أحمر', value: 'red', count: 234 },
  { label: 'أصفر', value: 'yellow', count: 198 },
  { label: 'برتقالي', value: 'orange', count: 156 },
  { label: 'وردي', value: 'pink', count: 134 },
  { label: 'بنفسجي', value: 'purple', count: 112 },
];

// الفئات
const CATEGORIES: FilterOption[] = [
  // أثاث
  { label: 'أثاث منزلي', value: 'home-furniture', count: 1456 },
  { label: 'أثاث مكتبي', value: 'office-furniture', count: 987 },
  { label: 'غرف نوم', value: 'bedroom', count: 876 },
  { label: 'غرف معيشة', value: 'living-room', count: 654 },
  { label: 'مطابخ', value: 'kitchen', count: 567 },
  { label: 'إضاءة', value: 'lighting', count: 456 },
  
  // إلكترونيات
  { label: 'تلفزيونات وصوتيات', value: 'tv-audio', count: 876 },
  { label: 'هواتف وأجهزة لوحية', value: 'phones-tablets', count: 765 },
  { label: 'كمبيوترات', value: 'computers', count: 654 },
  { label: 'أجهزة منزلية', value: 'home-appliances', count: 543 },
  { label: 'إكسسوارات إلكترونية', value: 'electronics-accessories', count: 432 },
];

// المزايا
const FEATURES: FilterOption[] = [
  // أثاث
  { label: 'قابل للطي', value: 'foldable', count: 456 },
  { label: 'قابل للتمدد', value: 'extendable', count: 345 },
  { label: 'قابل للتحويل', value: 'convertible', count: 234 },
  { label: 'قابل للتخزين', value: 'storage', count: 198 },
  { label: 'مقاوم للماء', value: 'waterproof', count: 156 },
  
  // إلكترونيات
  { label: 'شاشة عالية الدقة', value: 'hd-screen', count: 876 },
  { label: 'بلوتوث', value: 'bluetooth', count: 765 },
  { label: 'واي فاي', value: 'wifi', count: 654 },
  { label: 'شحن سريع', value: 'fast-charging', count: 543 },
  { label: 'مقاوم للماء', value: 'water-resistant', count: 432 },
  { label: 'كاميرا عالية الدقة', value: 'hd-camera', count: 321 },
  { label: 'ذاكرة كبيرة', value: 'large-memory', count: 210 },
];

// تكوين الفلاتر للأثاث والإلكترونيات
export interface FurnitureFilterConfig {
  title: string;
  key: string;
  type: 'checkbox' | 'range' | 'buttonGroup' | 'select';
  options?: FilterOption[];
  visibleWhen?: (filters: any, activeTab?: string, activeSubCategory?: string) => boolean;
  placeholder?: {
    from?: string;
    to?: string;
  };
}

export const FURNITURE_FILTER_REGISTRY: FurnitureFilterConfig[] = [
  {
    title: 'المنطقة',
    key: 'locations',
    type: 'checkbox',
    options: GOVERNORATES,
  },
  {
    title: 'نوع العنصر',
    key: 'itemType',
    type: 'checkbox',
    options: ITEM_TYPES,
  },
  {
    title: 'الفئة',
    key: 'category',
    type: 'checkbox',
    options: CATEGORIES,
  },
  {
    title: 'الحالة',
    key: 'condition',
    type: 'checkbox',
    options: ITEM_CONDITIONS,
  },
  {
    title: 'المادة',
    key: 'material',
    type: 'checkbox',
    options: MATERIALS,
    visibleWhen: (filters, activeTab, activeSubCategory) => {
      // إظهار فقط للأثاث وليس للإلكترونيات
      return !activeSubCategory?.includes('تلفزيونات') && 
             !activeSubCategory?.includes('أجهزة') && 
             !activeSubCategory?.includes('هواتف') && 
             !activeSubCategory?.includes('صوتيات') && 
             !activeSubCategory?.includes('إلكترونيات');
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
    visibleWhen: (filters, activeTab) => activeTab !== 'مجاني',
  },
  {
    title: 'الماركة',
    key: 'brand',
    type: 'checkbox',
    options: BRANDS,
  },
  {
    title: 'اللون',
    key: 'color',
    type: 'checkbox',
    options: COLORS,
  },
  {
    title: 'المزايا',
    key: 'features',
    type: 'checkbox',
    options: FEATURES,
  },
  {
    title: 'فترة الضمان (بالأشهر)',
    key: 'warranty',
    type: 'range',
    placeholder: {
      from: 'من',
      to: 'إلى',
    },
    visibleWhen: (filters, activeTab, activeSubCategory) => {
      // إظهار فقط للإلكترونيات
      return activeSubCategory?.includes('تلفزيونات') || 
             activeSubCategory?.includes('أجهزة') || 
             activeSubCategory?.includes('هواتف') || 
             activeSubCategory?.includes('صوتيات') || 
             activeSubCategory?.includes('إلكترونيات');
    },
  },
];

// Helper function to build API query params from filters
export const buildFurnitureQueryParams = (
  filters: any, 
  activeTab: string, 
  subCategory?: string
): Record<string, any> => {
  console.log('🏗️ Building furniture query params from filters:', filters);
  
  const params: Record<string, any> = {
    type: 'furniture',
  };

  // تحديد نوع العملية حسب التصنيف الرئيسي
  const operationType = 
    activeTab === 'بيع' ? 'sale' :
    activeTab === 'شراء' ? 'buy' :
    activeTab === 'مجاني' ? 'free' : 'buy';
  
  params['furniture_detail__operation_type'] = operationType;

  console.log('📝 Base furniture params:', params);

  // إضافة التصنيف الفرعي إذا كان متوفراً
  if (subCategory) {
    params['furniture_detail__sub_category'] = subCategory;
  }

  // تطبيق الفلاتر
  Object.entries(filters).forEach(([key, value]) => {
    console.log(`🔧 Processing furniture filter: ${key} =`, value);
    if (!value) return;
    
    switch (key) {
      case 'locations':
        if (Array.isArray(value) && value.length > 0) {
          // فصل المحافظات عن المناطق
          const governorateValues = ['damascus', 'damascus-countryside', 'aleppo', 'latakia', 'tartous', 'homs', 'hama', 'idlib', 'deir-ez-zor', 'raqqa', 'al-hasakah', 'dara', 'as-suwayda', 'quneitra'];
          const governorates = value.filter(loc => governorateValues.includes(loc));
          const areas = value.filter(loc => !governorateValues.includes(loc));
          
          if (governorates.length > 0) {
            params['location__governorate__slug_en__in'] = governorates.join(',');
          }
          if (areas.length > 0) {
            params['location__area__slug_en__in'] = areas.join(',');
            params['location__sub_area__slug_en__in'] = areas.join(',');
          }
        }
        break;
      case 'itemType':
        if (Array.isArray(value) && value.length > 0) {
          params['furniture_detail__item_type__in'] = value.join(',');
        }
        break;
      case 'category':
        if (Array.isArray(value) && value.length > 0) {
          params['furniture_detail__category__in'] = value.join(',');
        }
        break;
      case 'condition':
        if (Array.isArray(value) && value.length > 0) {
          params['furniture_detail__condition__in'] = value.join(',');
        }
        break;
      case 'material':
        if (Array.isArray(value) && value.length > 0) {
          params['furniture_detail__material__in'] = value.join(',');
        }
        break;
      case 'price':
        if (typeof value === 'object') {
          if (value.from !== undefined) params['price__gte'] = value.from;
          if (value.to !== undefined) params['price__lte'] = value.to;
        }
        break;
      case 'brand':
        if (Array.isArray(value) && value.length > 0) {
          params['furniture_detail__brand__in'] = value.join(',');
        }
        break;
      case 'color':
        if (Array.isArray(value) && value.length > 0) {
          params['furniture_detail__color__in'] = value.join(',');
        }
        break;
      case 'features':
        if (Array.isArray(value) && value.length > 0) {
          params['furniture_detail__features__contains'] = value.join(',');
        }
        break;
      case 'warranty':
        if (typeof value === 'object') {
          if (value.from !== undefined) params['furniture_detail__warranty_months__gte'] = value.from;
          if (value.to !== undefined) params['furniture_detail__warranty_months__lte'] = value.to;
        }
        break;
    }
  });

  console.log('✅ Final furniture query params:', params);
  return params;
};

// Helper functions for URL parameters
export const furnitureFiltersToUrlParams = (filters: any): URLSearchParams => {
  const params = new URLSearchParams();
  
  console.log('📤 Converting furniture filters to URL params:', filters);
  
  Object.entries(filters).forEach(([key, value]) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      console.log(`⏭️ Skipping empty furniture filter: ${key}`);
      return;
    }
    
    if (Array.isArray(value) && value.length > 0) {
      console.log(`📋 Array furniture filter: ${key} = [${value.join(', ')}]`);
      params.set(key, value.join(','));
    } else if (typeof value === 'object' && value !== null) {
      if ((value.from !== undefined && value.from !== '') || (value.to !== undefined && value.to !== '')) {
        const rangeValue = [];
        if (value.from !== undefined && value.from !== '') rangeValue.push(`from:${value.from}`);
        if (value.to !== undefined && value.to !== '') rangeValue.push(`to:${value.to}`);
        if (rangeValue.length > 0) {
          console.log(`📊 Range furniture filter: ${key} = ${rangeValue.join('|')}`);
          params.set(key, rangeValue.join('|'));
        }
      }
    } else if (typeof value === 'string' || typeof value === 'number') {
      console.log(`📝 Simple furniture filter: ${key} = ${value}`);
      params.set(key, String(value));
    }
  });
  
  console.log('✅ Final furniture URL params:', Object.fromEntries(params.entries()));
  return params;
};

export const urlParamsToFurnitureFilters = (searchParams: URLSearchParams): any => {
  const filters: any = {};
  
  // قائمة الفلاتر التي يجب أن تكون دائماً arrays
  const arrayFilters = [
    'locations',
    'itemType',
    'category',
    'condition',
    'material',
    'brand',
    'color',
    'features'
  ];
  
  console.log('📥 Converting furniture URL params to filters:', Object.fromEntries(searchParams.entries()));
  
  for (const [key, value] of searchParams.entries()) {
    // Skip tab and subCategory params
    if (key === 'tab' || key === 'subCategory') {
      console.log(`⏭️ Skipping system param: ${key}`);
      continue;
    }
    
    if (value.includes(',')) {
      // Array values
      console.log(`📋 Parsing furniture array: ${key} = [${value}]`);
      filters[key] = value.split(',');
    } else if (value.includes('|')) {
      // Range values
      console.log(`📊 Parsing furniture range: ${key} = ${value}`);
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
      console.log(`📝 Parsing furniture simple: ${key} = ${value}`);
      
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
  
  console.log('✅ Final furniture filters object:', filters);
  return filters;
};