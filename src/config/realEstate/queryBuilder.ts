// src/config/realEstate/queryBuilder.ts

import { GOVERNORATES } from './locations';

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
          const governorateValues = GOVERNORATES.map(g => g.value);
          const governorates = value.filter(loc => governorateValues.includes(loc));
          const areas = value.filter(loc => !governorateValues.includes(loc));
          
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
      case 'landSize':
        if (typeof value === 'object') {
          if (value.from !== undefined) params['estate_detail__land_area_sqm__gte'] = value.from;
          if (value.to !== undefined) params['estate_detail__land_area_sqm__lte'] = value.to;
        }
        break;
      case 'bedrooms':
        if (Array.isArray(value) && value.length > 0 && !value.includes('all')) {
          const numericValues = value.map(v => parseInt(v)).filter(n => !isNaN(n) && n > 0);
          if (numericValues.length > 0) {
            const minBedrooms = Math.min(...numericValues);
            params['estate_detail__bedrooms__gte'] = minBedrooms;
          }
        }
        break;
      case 'bathrooms':
        if (Array.isArray(value) && value.length > 0 && !value.includes('all')) {
          const numericValues = value.map(v => parseInt(v)).filter(n => !isNaN(n) && n > 0);
          if (numericValues.length > 0) {
            const minBathrooms = Math.min(...numericValues);
            params['estate_detail__bathrooms__gte'] = minBathrooms;
          }
        }
        break;
      case 'floor':
        if (Array.isArray(value) && value.length > 0) {
          // معالجة خاصة للطوابق
          const floorValues = value.map(v => {
            if (v === '5+') return '5,6,7,8,9,10'; // للطوابق 5 فما فوق
            return v;
          }).join(',');
          params['estate_detail__floor__in'] = floorValues;
        }
        break;
      case 'builtYear':
        if (typeof value === 'object') {
          if (value.from !== undefined && value.from !== '') {
            const fromYear = parseInt(value.from);
            if (!isNaN(fromYear)) params['estate_detail__built_year__gte'] = fromYear;
          }
          if (value.to !== undefined && value.to !== '') {
            const toYear = parseInt(value.to);
            if (!isNaN(toYear)) params['estate_detail__built_year__lte'] = toYear;
          }
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
      case 'soilType':
        if (Array.isArray(value) && value.length > 0) {
          params['estate_detail__soil_type__in'] = value.join(',');
        }
        break;
      case 'waterSource':
        if (Array.isArray(value) && value.length > 0) {
          params['estate_detail__water_source__in'] = value.join(',');
        }
        break;
      case 'monthlyFees':
        if (typeof value === 'object') {
          if (value.from !== undefined) params['estate_detail__monthly_fees__gte'] = value.from;
          if (value.to !== undefined) params['estate_detail__monthly_fees__lte'] = value.to;
        }
        break;
    }
  });

  console.log('✅ Final query params:', params);
  return params;
};