// src/config/carFilters.ts

import { FilterOption } from '../types/listing';

export interface CarFilters {
  locations: string[];
  brands: string[];
  models: string[];
  yearFrom?: number;
  yearTo?: number;
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
  { label: 'درعا', value: 'daraa', count: 189 },
  { label: 'السويداء', value: 'as-suwayda', count: 28 },
  { label: 'القنيطرة', value: 'quneitra', count: 34 },
];

// الماركات الشائعة
const CAR_BRANDS: FilterOption[] = [
  { label: 'تويوتا', value: 'toyota', count: 1250 },
  { label: 'هيونداي', value: 'hyundai', count: 980 },
  { label: 'كيا', value: 'kia', count: 756 },
  { label: 'نيسان', value: 'nissan', count: 634 },
  { label: 'هوندا', value: 'honda', count: 523 },
  { label: 'فولكس واجن', value: 'volkswagen', count: 445 },
  { label: 'بي إم دبليو', value: 'bmw', count: 389 },
  { label: 'مرسيدس', value: 'mercedes', count: 356 },
  { label: 'أودي', value: 'audi', count: 298 },
  { label: 'فورد', value: 'ford', count: 267 },
  { label: 'شيفروليه', value: 'chevrolet', count: 234 },
  { label: 'مازda', value: 'mazda', count: 198 },
  { label: 'سوبارو', value: 'subaru', count: 156 },
  { label: 'ميتسوبيشي', value: 'mitsubishi', count: 134 },
  { label: 'سوزوكي', value: 'suzuki', count: 112 },
];

// الموديلات حسب الماركة (مثال لتويوتا)
const CAR_MODELS: Record<string, FilterOption[]> = {
  toyota: [
    { label: 'كامري', value: 'camry', count: 234 },
    { label: 'كورولا', value: 'corolla', count: 189 },
    { label: 'يارس', value: 'yaris', count: 156 },
    { label: 'راف 4', value: 'rav4', count: 123 },
    { label: 'هايلاندر', value: 'highlander', count: 98 },
    { label: 'برادو', value: 'prado', count: 87 },
  ],
  hyundai: [
    { label: 'إلنترا', value: 'elantra', count: 198 },
    { label: 'سوناتا', value: 'sonata', count: 167 },
    { label: 'توسان', value: 'tucson', count: 134 },
    { label: 'أكسنت', value: 'accent', count: 112 },
    { label: 'سانتا في', value: 'santa-fe', count: 89 },
  ],
  // يمكن إضافة المزيد من الماركات والموديلات
};

// أنواع الوقود
const FUEL_TYPES: FilterOption[] = [
  { label: 'بنزين', value: 'gasoline', count: 3456 },
  { label: 'ديزل', value: 'diesel', count: 1234 },
  { label: 'هجين', value: 'hybrid', count: 234 },
  { label: 'كهربائي', value: 'electric', count: 45 },
  { label: 'غاز طبيعي', value: 'cng', count: 123 },
];

// ناقل الحركة
const GEARBOX_TYPES: FilterOption[] = [
  { label: 'أوتوماتيك', value: 'automatic', count: 2345 },
  { label: 'يدوي', value: 'manual', count: 1876 },
  { label: 'نصف أوتوماتيك', value: 'semi-automatic', count: 234 },
];

// نوع الهيكل
const BODY_TYPES: FilterOption[] = [
  { label: 'سيدان', value: 'sedan', count: 1456 },
  { label: 'هاتشباك', value: 'hatchback', count: 987 },
  { label: 'SUV', value: 'suv', count: 876 },
  { label: 'كوبيه', value: 'coupe', count: 345 },
  { label: 'ستيشن واجن', value: 'wagon', count: 234 },
  { label: 'بيك أب', value: 'pickup', count: 198 },
  { label: 'كابريو', value: 'convertible', count: 87 },
  { label: 'فان', value: 'van', count: 156 },
];

// حالة السيارة
const CAR_CONDITIONS: FilterOption[] = [
  { label: 'جديدة', value: 'new', count: 456 },
  { label: 'مستعملة - ممتازة', value: 'excellent', count: 1234 },
  { label: 'مستعملة - جيدة جداً', value: 'very-good', count: 987 },
  { label: 'مستعملة - جيدة', value: 'good', count: 654 },
  { label: 'تحتاج إصلاح', value: 'needs-repair', count: 234 },
];

// الألوان
const CAR_COLORS: FilterOption[] = [
  { label: 'أبيض', value: 'white', count: 1456 },
  { label: 'أسود', value: 'black', count: 987 },
  { label: 'فضي', value: 'silver', count: 876 },
  { label: 'رمادي', value: 'gray', count: 654 },
  { label: 'أحمر', value: 'red', count: 345 },
  { label: 'أزرق', value: 'blue', count: 298 },
  { label: 'أخضر', value: 'green', count: 156 },
  { label: 'بني', value: 'brown', count: 123 },
  { label: 'ذهبي', value: 'gold', count: 98 },
  { label: 'برتقالي', value: 'orange', count: 67 },
];

// المميزات والإضافات
const CAR_FEATURES: FilterOption[] = [
  { label: 'مكيف هواء', value: 'air-conditioning', count: 3456 },
  { label: 'نظام ABS', value: 'abs', count: 2345 },
  { label: 'وسائد هوائية', value: 'airbags', count: 2876 },
  { label: 'نوافذ كهربائية', value: 'power-windows', count: 2654 },
  { label: 'مقاعد جلدية', value: 'leather-seats', count: 1234 },
  { label: 'فتحة سقف', value: 'sunroof', count: 567 },
  { label: 'نظام ملاحة GPS', value: 'gps', count: 876 },
  { label: 'كاميرا خلفية', value: 'rear-camera', count: 1456 },
  { label: 'حساسات ركن', value: 'parking-sensors', count: 1234 },
  { label: 'بلوتوث', value: 'bluetooth', count: 1876 },
  { label: 'مثبت سرعة', value: 'cruise-control', count: 987 },
  { label: 'إضاءة LED', value: 'led-lights', count: 654 },
  { label: 'مقاعد مدفأة', value: 'heated-seats', count: 345 },
  { label: 'نظام صوتي متقدم', value: 'premium-audio', count: 456 },
];

// عدد الأبواب
const DOOR_OPTIONS: FilterOption[] = [
  { label: '2 باب', value: '2', count: 456 },
  { label: '3 أبواب', value: '3', count: 234 },
  { label: '4 أبواب', value: '4', count: 2345 },
  { label: '5 أبواب', value: '5', count: 1876 },
];

// عدد المقاعد
const SEAT_OPTIONS: FilterOption[] = [
  { label: '2 مقعد', value: '2', count: 234 },
  { label: '4 مقاعد', value: '4', count: 456 },
  { label: '5 مقاعد', value: '5', count: 2876 },
  { label: '7 مقاعد', value: '7', count: 987 },
  { label: '8+ مقاعد', value: '8+', count: 234 },
];

// دالة للحصول على الموديلات حسب الماركة
export const getModelsByBrand = (selectedBrands: string[]): FilterOption[] => {
  const models: FilterOption[] = [];
  selectedBrands.forEach(brand => {
    const brandModels = CAR_MODELS[brand] || [];
    brandModels.forEach(model => {
      models.push({ ...model, parentBrand: brand });
    });
  });
  return models;
};

// تكوين الفلاتر للسيارات
export interface CarFilterConfig {
  title: string;
  key: string;
  type: 'checkbox' | 'range' | 'buttonGroup' | 'select' | 'yearRange';
  options?: FilterOption[];
  visibleWhen?: (filters: any, activeTab?: string, activeSubCategory?: string) => boolean;
  placeholder?: {
    from?: string;
    to?: string;
  };
}

export const CAR_FILTER_REGISTRY: CarFilterConfig[] = [
  {
    title: 'المنطقة',
    key: 'locations',
    type: 'checkbox',
    options: GOVERNORATES,
  },
  {
    title: 'الماركة',
    key: 'brands',
    type: 'checkbox',
    options: CAR_BRANDS,
  },
  {
    title: 'الموديل',
    key: 'models',
    type: 'checkbox',
    options: [], // سيتم ملؤها ديناميكياً
    visibleWhen: (filters) => filters.brands && filters.brands.length > 0,
  },
  {
    title: 'سنة الصنع',
    key: 'year',
    type: 'yearRange',
    placeholder: {
      from: 'من سنة',
      to: 'إلى سنة',
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
    title: 'المسافة المقطوعة (كم)',
    key: 'mileage',
    type: 'range',
    placeholder: {
      from: 'من',
      to: 'إلى',
    },
  },
  {
    title: 'نوع الوقود',
    key: 'fuelType',
    type: 'checkbox',
    options: FUEL_TYPES,
  },
  {
    title: 'ناقل الحركة',
    key: 'gearbox',
    type: 'checkbox',
    options: GEARBOX_TYPES,
  },
  {
    title: 'نوع الهيكل',
    key: 'bodyType',
    type: 'checkbox',
    options: BODY_TYPES,
  },
  {
    title: 'حالة السيارة',
    key: 'condition',
    type: 'checkbox',
    options: CAR_CONDITIONS,
  },
  {
    title: 'اللون',
    key: 'color',
    type: 'checkbox',
    options: CAR_COLORS,
  },
  {
    title: 'حجم المحرك (لتر)',
    key: 'engineSize',
    type: 'range',
    placeholder: {
      from: 'من',
      to: 'إلى',
    },
  },
  {
    title: 'عدد الأبواب',
    key: 'doors',
    type: 'buttonGroup',
    options: DOOR_OPTIONS,
  },
  {
    title: 'عدد المقاعد',
    key: 'seats',
    type: 'buttonGroup',
    options: SEAT_OPTIONS,
  },
  {
    title: 'المميزات والإضافات',
    key: 'features',
    type: 'checkbox',
    options: CAR_FEATURES,
  },
];

// Helper function to get dynamic filter options
export const getDynamicCarFilterOptions = (
  filterKey: string, 
  activeTab: string, 
  subCategory?: string,
  filters?: any
): FilterOption[] => {
  switch (filterKey) {
    case 'models':
      return getModelsByBrand(filters?.brands || []);
    default:
      return [];
  }
};

// Helper function to build API query params from filters
export const buildCarQueryParams = (
  filters: any, 
  activeTab: string, 
  subCategory?: string
): Record<string, any> => {
  console.log('🏗️ Building car query params from filters:', filters);
  
  const params: Record<string, any> = {
    type: 'car',
  };

  // تحديد نوع العملية حسب التصنيف الرئيسي
  const operationType = 
    activeTab === 'بيع' ? 'sale' :
    activeTab === 'إيجار' ? 'rent' :
    activeTab === 'شراء' ? 'buy' :
    activeTab === 'تجاري' ? 'commercial' : 'sale';
  
  params['car_detail__operation_type'] = operationType;

  console.log('📝 Base car params:', params);

  // إضافة التصنيف الفرعي إذا كان متوفراً
  if (subCategory) {
    params['car_detail__sub_category'] = subCategory;
  }

  // تطبيق الفلاتر
  Object.entries(filters).forEach(([key, value]) => {
    console.log(`🔧 Processing car filter: ${key} =`, value);
    if (!value) return;
    
    switch (key) {
      case 'locations':
        if (Array.isArray(value) && value.length > 0) {
          params['location__slug__in'] = value.join(',');
        }
        break;
      case 'brands':
        if (Array.isArray(value) && value.length > 0) {
          params['car_detail__brand__in'] = value.join(',');
        }
        break;
      case 'models':
        if (Array.isArray(value) && value.length > 0) {
          params['car_detail__series__in'] = value.join(',');
        }
        break;
      case 'year':
        if (typeof value === 'object') {
          if (value.from !== undefined) params['car_detail__year__gte'] = value.from;
          if (value.to !== undefined) params['car_detail__year__lte'] = value.to;
        }
        break;
      case 'price':
        if (typeof value === 'object') {
          if (value.from !== undefined) params['price__gte'] = value.from;
          if (value.to !== undefined) params['price__lte'] = value.to;
        }
        break;
      case 'mileage':
        if (typeof value === 'object') {
          if (value.from !== undefined) params['car_detail__mileage_km__gte'] = value.from;
          if (value.to !== undefined) params['car_detail__mileage_km__lte'] = value.to;
        }
        break;
      case 'fuelType':
        if (Array.isArray(value) && value.length > 0) {
          params['car_detail__fuel_type__in'] = value.join(',');
        }
        break;
      case 'gearbox':
        if (Array.isArray(value) && value.length > 0) {
          params['car_detail__gearbox__in'] = value.join(',');
        }
        break;
      case 'bodyType':
        if (Array.isArray(value) && value.length > 0) {
          params['car_detail__body_type__in'] = value.join(',');
        }
        break;
      case 'condition':
        if (Array.isArray(value) && value.length > 0) {
          params['car_detail__condition__in'] = value.join(',');
        }
        break;
      case 'color':
        if (Array.isArray(value) && value.length > 0) {
          params['car_detail__color__in'] = value.join(',');
        }
        break;
      case 'engineSize':
        if (typeof value === 'object') {
          if (value.from !== undefined) params['car_detail__engine_size__gte'] = value.from;
          if (value.to !== undefined) params['car_detail__engine_size__lte'] = value.to;
        }
        break;
      case 'doors':
        if (Array.isArray(value) && value.length > 0) {
          params['car_detail__doors__in'] = value.join(',');
        }
        break;
      case 'seats':
        if (Array.isArray(value) && value.length > 0) {
          params['car_detail__seats__in'] = value.join(',');
        }
        break;
      case 'features':
        if (Array.isArray(value) && value.length > 0) {
          params['car_detail__features__contains'] = value.join(',');
        }
        break;
    }
  });

  console.log('✅ Final car query params:', params);
  return params;
};

// Helper functions for URL parameters
export const carFiltersToUrlParams = (filters: any): URLSearchParams => {
  const params = new URLSearchParams();
  
  console.log('📤 Converting car filters to URL params:', filters);
  
  Object.entries(filters).forEach(([key, value]) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      console.log(`⏭️ Skipping empty car filter: ${key}`);
      return;
    }
    
    if (Array.isArray(value) && value.length > 0) {
      console.log(`📋 Array car filter: ${key} = [${value.join(', ')}]`);
      params.set(key, value.join(','));
    } else if (typeof value === 'object' && value !== null) {
      if ((value.from !== undefined && value.from !== '') || (value.to !== undefined && value.to !== '')) {
        const rangeValue = [];
        if (value.from !== undefined && value.from !== '') rangeValue.push(`from:${value.from}`);
        if (value.to !== undefined && value.to !== '') rangeValue.push(`to:${value.to}`);
        if (rangeValue.length > 0) {
          console.log(`📊 Range car filter: ${key} = ${rangeValue.join('|')}`);
          params.set(key, rangeValue.join('|'));
        }
      }
    } else if (typeof value === 'string' || typeof value === 'number') {
      console.log(`📝 Simple car filter: ${key} = ${value}`);
      params.set(key, String(value));
    }
  });
  
  console.log('✅ Final car URL params:', Object.fromEntries(params.entries()));
  return params;
};

export const urlParamsToCarFilters = (searchParams: URLSearchParams): any => {
  const filters: any = {};
  
  // قائمة الفلاتر التي يجب أن تكون دائماً arrays
  const arrayFilters = [
    'locations',
    'brands',
    'models',
    'fuelType',
    'gearbox',
    'bodyType',
    'condition',
    'color',
    'doors',
    'seats',
    'features'
  ];
  
  console.log('📥 Converting car URL params to filters:', Object.fromEntries(searchParams.entries()));
  
  for (const [key, value] of searchParams.entries()) {
    // Skip tab and subCategory params
    if (key === 'tab' || key === 'subCategory') {
      console.log(`⏭️ Skipping system param: ${key}`);
      continue;
    }
    
    if (value.includes(',')) {
      // Array values
      console.log(`📋 Parsing car array: ${key} = [${value}]`);
      filters[key] = value.split(',');
    } else if (value.includes('|')) {
      // Range values
      console.log(`📊 Parsing car range: ${key} = ${value}`);
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
      console.log(`📝 Parsing car simple: ${key} = ${value}`);
      
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
  
  console.log('✅ Final car filters object:', filters);
  return filters;
};