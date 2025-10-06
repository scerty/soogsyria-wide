// src/config/realEstate/filterRegistry.ts

import { FilterConfig } from './types';
import { OPERATION_TYPES, CONDITIONS, OWNERSHIP_TYPES, INVESTMENT_TYPES } from './propertyTypes';
import { BEDROOM_OPTS, BATHROOM_OPTS, FLOOR_OPTS, AMENITIES, SOIL_TYPES, WATER_SOURCES } from './filterOptions';

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
      return activeTab === 'بيع' || activeTab === 'شراء' || activeTab === 'sale' || activeTab === 'buy';
    },
  },
  {
    title: 'نوع الاستثمار',
    key: 'investmentType',
    type: 'checkbox',
    options: INVESTMENT_TYPES,
    visibleWhen: (filters, activeTab) => {
      // إظهار للاستثمار التجاري
      return activeTab === 'تجاري' || activeTab === 'commercial';
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
    title: 'مساحة الأرض (م²)',
    key: 'landSize',
    type: 'range',
    placeholder: {
      from: 'من',
      to: 'إلى',
    },
    visibleWhen: (filters, activeTab, subCategory) => {
      // إظهار للفلل والمنازل المستقلة والأراضي
      return filters.propertyType?.some((type: string) => 
        ['villa', 'townhouse', 'residential_land', 'commercial_land', 'agricultural_land'].includes(type)
      ) || subCategory?.includes('قطع أراضي');
    },
  },
  {
    title: 'عدد غرف النوم',
    key: 'bedrooms',
    type: 'buttonGroup',
    options: BEDROOM_OPTS,
    visibleWhen: (filters, activeTab, subCategory) => {
      // إظهار فقط للعقارات السكنية
      if (activeTab === 'تجاري' || activeTab === 'commercial') return false;
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
      if (activeTab === 'تجاري' || activeTab === 'commercial') return false;
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
  {
    title: 'نوع التربة',
    key: 'soilType',
    type: 'checkbox',
    options: SOIL_TYPES,
    visibleWhen: (filters, activeTab, subCategory) => {
      // إظهار فقط للأراضي الزراعية
      return filters.propertyType?.includes('agricultural_land') || 
             subCategory?.includes('زراعة') || 
             subCategory?.includes('زراعي');
    },
  },
  {
    title: 'مصدر المياه',
    key: 'waterSource',
    type: 'checkbox',
    options: WATER_SOURCES,
    visibleWhen: (filters, activeTab, subCategory) => {
      // إظهار فقط للأراضي الزراعية
      return filters.propertyType?.includes('agricultural_land') || 
             subCategory?.includes('زراعة') || 
             subCategory?.includes('زراعي');
    },
  },
  {
    title: 'الرسوم الشهرية',
    key: 'monthlyFees',
    type: 'range',
    placeholder: {
      from: 'من (ل.س)',
      to: 'إلى (ل.س)',
    },
    visibleWhen: (filters, activeTab) => {
      // إظهار فقط للإيجار
      return activeTab === 'إيجار' || activeTab === 'rent';
    },
  },
];