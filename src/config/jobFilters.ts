// src/config/jobFilters.ts

import { FilterOption } from '../types/listing';

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

// أنواع الوظائف
const JOB_TYPES: FilterOption[] = [
  { label: 'دوام كامل', value: 'full-time', count: 1456 },
  { label: 'دوام جزئي', value: 'part-time', count: 987 },
  { label: 'عمل حر', value: 'freelance', count: 876 },
  { label: 'تدريب', value: 'internship', count: 345 },
  { label: 'عقد مؤقت', value: 'contract', count: 234 },
  { label: 'عمل موسمي', value: 'seasonal', count: 156 },
];

// مستوى الخبرة
const EXPERIENCE_LEVELS: FilterOption[] = [
  { label: 'مبتدئ (0-2 سنة)', value: 'entry', count: 756 },
  { label: 'متوسط (2-5 سنوات)', value: 'mid', count: 1234 },
  { label: 'خبير (5-10 سنوات)', value: 'senior', count: 987 },
  { label: 'مدير (10+ سنوات)', value: 'executive', count: 345 },
  { label: 'بدون خبرة', value: 'no-experience', count: 456 },
];

// الشركات الشائعة
const COMPANIES: FilterOption[] = [
  { label: 'شركة الاتصالات السورية', value: 'syriatel', count: 45 },
  { label: 'المصرف التجاري السوري', value: 'cbs', count: 38 },
  { label: 'شركة الخليج للبترول', value: 'gulf-oil', count: 32 },
  { label: 'مجموعة شام القابضة', value: 'sham-holding', count: 28 },
  { label: 'بنك بيمو السعودي الفرنسي', value: 'bemo', count: 25 },
  { label: 'شركة الفرات للبترول', value: 'furat-oil', count: 22 },
  { label: 'مصرف سوريا والمهجر', value: 'syria-gulf-bank', count: 20 },
  { label: 'شركة الشرق للتأمين', value: 'orient-insurance', count: 18 },
];

// الصناعات
const INDUSTRIES: FilterOption[] = [
  { label: 'تكنولوجيا المعلومات', value: 'it', count: 567 },
  { label: 'المصارف والمالية', value: 'banking', count: 456 },
  { label: 'الطب والصحة', value: 'healthcare', count: 389 },
  { label: 'التعليم', value: 'education', count: 345 },
  { label: 'الهندسة والبناء', value: 'engineering', count: 298 },
  { label: 'التسويق والإعلان', value: 'marketing', count: 267 },
  { label: 'المبيعات', value: 'sales', count: 234 },
  { label: 'الموارد البشرية', value: 'hr', count: 198 },
  { label: 'المحاسبة والمالية', value: 'accounting', count: 189 },
  { label: 'السياحة والضيافة', value: 'tourism', count: 156 },
  { label: 'النقل واللوجستيات', value: 'logistics', count: 134 },
  { label: 'الإعلام والصحافة', value: 'media', count: 112 },
];

// المهارات المطلوبة
const SKILLS: FilterOption[] = [
  { label: 'Microsoft Office', value: 'ms-office', count: 1234 },
  { label: 'اللغة الإنجليزية', value: 'english', count: 1156 },
  { label: 'خدمة العملاء', value: 'customer-service', count: 987 },
  { label: 'المبيعات', value: 'sales-skills', count: 876 },
  { label: 'التسويق الرقمي', value: 'digital-marketing', count: 756 },
  { label: 'المحاسبة', value: 'accounting', count: 654 },
  { label: 'إدارة المشاريع', value: 'project-management', count: 567 },
  { label: 'التصميم الجرافيكي', value: 'graphic-design', count: 456 },
  { label: 'البرمجة', value: 'programming', count: 389 },
  { label: 'إدارة الموارد البشرية', value: 'hr-management', count: 345 },
  { label: 'التحليل المالي', value: 'financial-analysis', count: 298 },
  { label: 'إدارة المخازن', value: 'inventory-management', count: 234 },
];

// المؤهل التعليمي
const EDUCATION_LEVELS: FilterOption[] = [
  { label: 'ثانوية عامة', value: 'high-school', count: 456 },
  { label: 'دبلوم متوسط', value: 'diploma', count: 567 },
  { label: 'بكالوريوس', value: 'bachelor', count: 1234 },
  { label: 'ماجستير', value: 'master', count: 345 },
  { label: 'دكتوراه', value: 'phd', count: 89 },
  { label: 'شهادة مهنية', value: 'professional', count: 234 },
];

// ترتيب العمل
const WORK_ARRANGEMENTS: FilterOption[] = [
  { label: 'في المكتب', value: 'office', count: 1456 },
  { label: 'عن بُعد', value: 'remote', count: 567 },
  { label: 'مختلط', value: 'hybrid', count: 789 },
  { label: 'سفر مطلوب', value: 'travel', count: 234 },
];

// نوع العقد
const CONTRACT_TYPES: FilterOption[] = [
  { label: 'عقد دائم', value: 'permanent', count: 1234 },
  { label: 'عقد مؤقت', value: 'temporary', count: 567 },
  { label: 'عقد مشروع', value: 'project', count: 345 },
  { label: 'تدريب', value: 'internship', count: 234 },
  { label: 'تطوع', value: 'volunteer', count: 123 },
];

// المزايا
const BENEFITS: FilterOption[] = [
  { label: 'تأمين صحي', value: 'health-insurance', count: 987 },
  { label: 'إجازة مدفوعة', value: 'paid-leave', count: 876 },
  { label: 'مكافآت', value: 'bonuses', count: 756 },
  { label: 'تدريب وتطوير', value: 'training', count: 654 },
  { label: 'مرونة في العمل', value: 'flexible-hours', count: 567 },
  { label: 'وجبات مجانية', value: 'free-meals', count: 456 },
  { label: 'نقل مجاني', value: 'transportation', count: 345 },
  { label: 'سكن', value: 'accommodation', count: 234 },
];

// دالة للحصول على خيارات الفلاتر الديناميكية
export const getDynamicJobFilterOptions = (
  filterKey: string, 
  activeTab: string, 
  subCategory?: string,
  filters?: any
): FilterOption[] => {
  switch (filterKey) {
    case 'jobType':
      return JOB_TYPES;
    case 'experienceLevel':
      return EXPERIENCE_LEVELS;
    case 'company':
      return COMPANIES;
    case 'industry':
      return INDUSTRIES;
    case 'skills':
      return SKILLS;
    case 'education':
      return EDUCATION_LEVELS;
    case 'workArrangement':
      return WORK_ARRANGEMENTS;
    case 'contractType':
      return CONTRACT_TYPES;
    case 'benefits':
      return BENEFITS;
    default:
      return [];
  }
};

// تكوين الفلاتر للوظائف
export interface JobFilterConfig {
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

export const JOB_FILTER_REGISTRY: JobFilterConfig[] = [
  {
    title: 'المنطقة',
    key: 'locations',
    type: 'checkbox',
    options: GOVERNORATES,
  },
  {
    title: 'نوع الوظيفة',
    key: 'jobType',
    type: 'checkbox',
    options: JOB_TYPES,
  },
  {
    title: 'مستوى الخبرة',
    key: 'experienceLevel',
    type: 'checkbox',
    options: EXPERIENCE_LEVELS,
  },
  {
    title: 'الراتب الشهري',
    key: 'salary',
    type: 'range',
    placeholder: {
      from: 'من (ل.س)',
      to: 'إلى (ل.س)',
    },
  },
  {
    title: 'الشركة',
    key: 'company',
    type: 'checkbox',
    options: COMPANIES,
  },
  {
    title: 'الصناعة',
    key: 'industry',
    type: 'checkbox',
    options: INDUSTRIES,
  },
  {
    title: 'المهارات المطلوبة',
    key: 'skills',
    type: 'checkbox',
    options: SKILLS,
  },
  {
    title: 'المؤهل التعليمي',
    key: 'education',
    type: 'checkbox',
    options: EDUCATION_LEVELS,
  },
  {
    title: 'ترتيب العمل',
    key: 'workArrangement',
    type: 'buttonGroup',
    options: WORK_ARRANGEMENTS,
  },
  {
    title: 'نوع العقد',
    key: 'contractType',
    type: 'buttonGroup',
    options: CONTRACT_TYPES,
  },
  {
    title: 'المزايا',
    key: 'benefits',
    type: 'checkbox',
    options: BENEFITS,
  },
];

// Helper function to build API query params from filters
export const buildJobQueryParams = (
  filters: any, 
  activeTab: string, 
  subCategory?: string
): Record<string, any> => {
  console.log('🏗️ Building job query params from filters:', filters);
  
  const params: Record<string, any> = {
    type: 'job',
  };

  // تحديد نوع العملية حسب التصنيف الرئيسي
  const operationType = 
    activeTab === 'البحث عن وظيفة' ? 'job_search' :
    activeTab === 'نشر وظيفة' ? 'job_post' :
    activeTab === 'خدمات مهنية' ? 'professional_services' :
    activeTab === 'تدريب' ? 'training' : 'job_search';
  
  params['job_detail__operation_type'] = operationType;

  console.log('📝 Base job params:', params);

  // إضافة التصنيف الفرعي إذا كان متوفراً
  if (subCategory) {
    params['job_detail__sub_category'] = subCategory;
  }

  // تطبيق الفلاتر
  Object.entries(filters).forEach(([key, value]) => {
    console.log(`🔧 Processing job filter: ${key} =`, value);
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
      case 'jobType':
        if (Array.isArray(value) && value.length > 0) {
          params['job_detail__job_type__in'] = value.join(',');
        }
        break;
      case 'experienceLevel':
        if (Array.isArray(value) && value.length > 0) {
          params['job_detail__experience_level__in'] = value.join(',');
        }
        break;
      case 'salary':
        if (typeof value === 'object') {
          if (value.from !== undefined) params['job_detail__salary_from__gte'] = value.from;
          if (value.to !== undefined) params['job_detail__salary_to__lte'] = value.to;
        }
        break;
      case 'company':
        if (Array.isArray(value) && value.length > 0) {
          params['job_detail__company__in'] = value.join(',');
        }
        break;
      case 'industry':
        if (Array.isArray(value) && value.length > 0) {
          params['job_detail__industry__in'] = value.join(',');
        }
        break;
      case 'skills':
        if (Array.isArray(value) && value.length > 0) {
          params['job_detail__required_skills__contains'] = value.join(',');
        }
        break;
      case 'education':
        if (Array.isArray(value) && value.length > 0) {
          params['job_detail__education_level__in'] = value.join(',');
        }
        break;
      case 'workArrangement':
        if (Array.isArray(value) && value.length > 0) {
          params['job_detail__work_arrangement__in'] = value.join(',');
        }
        break;
      case 'contractType':
        if (Array.isArray(value) && value.length > 0) {
          params['job_detail__contract_type__in'] = value.join(',');
        }
        break;
      case 'benefits':
        if (Array.isArray(value) && value.length > 0) {
          params['job_detail__benefits__contains'] = value.join(',');
        }
        break;
    }
  });

  console.log('✅ Final job query params:', params);
  return params;
};

// Helper functions for URL parameters
export const jobFiltersToUrlParams = (filters: any): URLSearchParams => {
  const params = new URLSearchParams();
  
  console.log('📤 Converting job filters to URL params:', filters);
  
  Object.entries(filters).forEach(([key, value]) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      console.log(`⏭️ Skipping empty job filter: ${key}`);
      return;
    }
    
    if (Array.isArray(value) && value.length > 0) {
      console.log(`📋 Array job filter: ${key} = [${value.join(', ')}]`);
      params.set(key, value.join(','));
    } else if (typeof value === 'object' && value !== null) {
      if ((value.from !== undefined && value.from !== '') || (value.to !== undefined && value.to !== '')) {
        const rangeValue = [];
        if (value.from !== undefined && value.from !== '') rangeValue.push(`from:${value.from}`);
        if (value.to !== undefined && value.to !== '') rangeValue.push(`to:${value.to}`);
        if (rangeValue.length > 0) {
          console.log(`📊 Range job filter: ${key} = ${rangeValue.join('|')}`);
          params.set(key, rangeValue.join('|'));
        }
      }
    } else if (typeof value === 'string' || typeof value === 'number') {
      console.log(`📝 Simple job filter: ${key} = ${value}`);
      params.set(key, String(value));
    }
  });
  
  console.log('✅ Final job URL params:', Object.fromEntries(params.entries()));
  return params;
};

export const urlParamsToJobFilters = (searchParams: URLSearchParams): any => {
  const filters: any = {};
  
  // قائمة الفلاتر التي يجب أن تكون دائماً arrays
  const arrayFilters = [
    'locations',
    'jobType',
    'experienceLevel',
    'company',
    'industry',
    'skills',
    'education',
    'workArrangement',
    'contractType',
    'benefits'
  ];
  
  console.log('📥 Converting job URL params to filters:', Object.fromEntries(searchParams.entries()));
  
  for (const [key, value] of searchParams.entries()) {
    // Skip tab and subCategory params
    if (key === 'tab' || key === 'subCategory') {
      console.log(`⏭️ Skipping system param: ${key}`);
      continue;
    }
    
    if (value.includes(',')) {
      // Array values
      console.log(`📋 Parsing job array: ${key} = [${value}]`);
      filters[key] = value.split(',');
    } else if (value.includes('|')) {
      // Range values
      console.log(`📊 Parsing job range: ${key} = ${value}`);
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
      console.log(`📝 Parsing job simple: ${key} = ${value}`);
      
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
  
  console.log('✅ Final job filters object:', filters);
  return filters;
};