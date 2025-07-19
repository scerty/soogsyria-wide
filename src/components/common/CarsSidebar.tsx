// src/components/common/CarsSidebar.tsx

import React, { useMemo } from 'react';
import { 
  CAR_FILTER_REGISTRY, 
  getDynamicCarFilterOptions,
  CarFilterConfig,
  getModelsByBrand
} from '../../config/carFilters';
import { CarFilters } from '../../config/carFilters';
import { CheckboxFilter } from './filters/CheckboxFilter';
import { RangeFilter } from './filters/RangeFilter';
import { ButtonGroupFilter } from './filters/ButtonGroupFilter';
import { YearRangeFilter } from './filters/YearRangeFilter';

interface CarsSidebarProps {
  filters: CarFilters;
  setFilters: (filters: CarFilters | ((prev: CarFilters) => CarFilters)) => void;
  activeTab: string;
  activeSubCategory?: string;
  resetFilters: () => void;
}

export const CarsSidebar: React.FC<CarsSidebarProps> = ({
  filters,
  setFilters,
  activeTab,
  activeSubCategory,
  resetFilters,
}) => {
  console.log('🎛️ Cars Sidebar render with filters:', filters);

  const handleFilterChange = (key: string, value: any) => {
    console.log(`🔧 Car Filter change: ${key} =`, value);
    
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [key]: value,
      };
      
      // إذا تم تغيير الماركات، امسح الموديلات
      if (key === 'brands') {
        newFilters.models = [];
      }
      
      console.log('📝 New car filters state:', newFilters);
      return newFilters;
    });
  };

  // حساب الفلاتر المرئية
  const visibleFilters = useMemo(() => {
    const visible = CAR_FILTER_REGISTRY.filter(config => {
      if (!config.visibleWhen) return true;
      return config.visibleWhen(filters, activeTab, activeSubCategory);
    });
    console.log('👁️ Visible car filters:', visible.map(f => f.key));
    return visible;
  }, [filters, activeTab, activeSubCategory]);

  const renderFilter = (config: CarFilterConfig) => {
    console.log(`🎨 Rendering car filter: ${config.key}`);
    
    // الحصول على الخيارات الديناميكية
    let options = config.options || [];
    if (config.key === 'models') {
      options = getModelsByBrand(filters.brands || []);
    } else if (['brands', 'fuelType', 'gearbox', 'bodyType', 'condition', 'color', 'features'].includes(config.key)) {
      options = getDynamicCarFilterOptions(config.key, activeTab, activeSubCategory, filters) || config.options || [];
    }

    const currentValue = (filters as any)[config.key];
    console.log(`📊 Car Filter ${config.key} current value:`, currentValue);

    switch (config.type) {
      case 'checkbox':
        return (
          <CheckboxFilter
            key={config.key}
            title={config.title}
            options={options}
            selectedValues={currentValue || []}
            onChange={(values) => handleFilterChange(config.key, values)}
          />
        );

      case 'range':
        const rangeValue = currentValue || {};
        return (
          <RangeFilter
            key={config.key}
            title={config.title}
            fromValue={rangeValue.from}
            toValue={rangeValue.to}
            onChange={(range) => handleFilterChange(config.key, range)}
            placeholder={config.placeholder}
          />
        );

      case 'yearRange':
        const yearValue = currentValue || {};
        return (
          <YearRangeFilter
            key={config.key}
            title={config.title}
            fromValue={yearValue.from}
            toValue={yearValue.to}
            onChange={(range) => handleFilterChange(config.key, range)}
          />
        );

      case 'buttonGroup':
        return (
          <ButtonGroupFilter
            key={config.key}
            title={config.title}
            options={options}
            selectedValues={currentValue || []}
            onChange={(values) => handleFilterChange(config.key, values)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <aside
      className="w-80 bg-white border-l p-4 space-y-6 sticky top-0 h-screen overflow-auto modern-scrollbar"
      dir="rtl"
    >
      <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">فلترة النتائج</h2>
        <p className="text-sm text-gray-600 mt-1">
          {activeTab}
          {activeSubCategory && (
            <>
              {' - '}
              <span className="text-blue-600">{activeSubCategory}</span>
            </>
          )}
        </p>
      </div>

      {visibleFilters.map(config => renderFilter(config))}

      {/* زر إعادة تعيين الفلاتر */}
      <div className="pt-4 border-t">
        <button
          onClick={resetFilters}
          className="w-full py-2 px-4 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          إعادة تعيين الفلاتر
        </button>
      </div>
    </aside>
  );
};