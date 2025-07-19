// src/config/realEstate/urlHelpers.ts

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
    'amenities',
    'soilType',
    'waterSource'
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
          if (fromValue !== '' && fromValue !== 'undefined') {
            const numValue = Number(fromValue);
            rangeObj.from = isNaN(numValue) ? fromValue : numValue;
          }
        } else if (part.startsWith('to:')) {
          const toValue = part.substring(3);
          if (toValue !== '' && toValue !== 'undefined') {
            const numValue = Number(toValue);
            rangeObj.to = isNaN(numValue) ? toValue : numValue;
          }
        }
      });
      // فقط إضافة الكائن إذا كان يحتوي على قيم فعلية
      if (Object.keys(rangeObj).length > 0) {
        filters[key] = rangeObj;
      }
    } else {
      // Single values
      console.log(`📝 Parsing simple: ${key} = ${value}`);
      
      // التحقق من أن الفلتر يجب أن يكون array
      if (arrayFilters.includes(key)) {
        console.log(`🔄 Converting single value to array for ${key}: [${value}]`);
        filters[key] = [value];
      } else {
        // للقيم الرقمية، تحقق من صحتها
        if (value !== '' && value !== 'undefined') {
          const numValue = Number(value);
          filters[key] = isNaN(numValue) ? value : numValue;
        }
      }
    }
  }
  
  console.log('✅ Final filters object:', filters);
  return filters;
};