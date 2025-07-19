import React, { useMemo } from 'react';
import { 
  FILTER_REGISTRY, 
  getDynamicFilterOptions,
  FilterConfig,
  getHierarchicalLocations
} from '../../config/realEstateFilters';
import { Filters } from '../../hooks/useUrlFilters';
import { CheckboxFilter } from './filters/CheckboxFilter';
import { RangeFilter } from './filters/RangeFilter';
import { ButtonGroupFilter } from './filters/ButtonGroupFilter';

interface RealEstateSidebarProps {
  filters: Filters;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
  activeTab: string;
  activeSubCategory?: string;
  resetFilters: () => void;
}

export const RealEstateSidebar: React.FC<RealEstateSidebarProps> = ({
  filters,
  setFilters,
  activeTab,
  activeSubCategory,
  resetFilters,
}) => {
  console.log('🎛️ Sidebar render with filters:', filters);

  const handleFilterChange = (key: string, value: any) => {
    console.log(`🔧 Filter change: ${key} =`, value);
    
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [key]: value,
      };
      console.log('📝 New filters state:', newFilters);
      return newFilters;
    });
  };

  const handleGovernorateToggle = (governorate: string, isSelected: boolean) => {
    console.log(`🏛️ Governorate toggle: ${governorate} = ${isSelected}`);
    
    setFilters(prev => {
      let newLocations = [...(prev.locations || [])];
      
      if (!isSelected) {
        // إزالة المحافظة وجميع مناطقها
        newLocations = newLocations.filter(loc => {
          // إزالة المحافظة نفسها
          if (loc === governorate) return false;
          
          // إزالة جميع المناطق التابعة لهذه المحافظة
          const allAreas = (AREAS_BY_GOVERNORATE[governorate] || []).map(area => area.value);
          
          return !allAreas.includes(loc);
        });
      } else {
        // إضافة المحافظة إذا لم تكن موجودة
        if (!newLocations.includes(governorate)) {
          newLocations.push(governorate);
        }
      }
      
      return {
        ...prev,
        locations: newLocations,
      };
    });
  };

  // حساب الفلاتر المرئية
  const visibleFilters = useMemo(() => {
    const visible = FILTER_REGISTRY.filter(config => {
      if (!config.visibleWhen) return true;
      return config.visibleWhen(filters, activeTab, activeSubCategory);
    });
    console.log('👁️ Visible filters:', visible.map(f => f.key));
    return visible;
  }, [filters, activeTab, activeSubCategory]);

  const renderFilter = (config: FilterConfig) => {
    console.log(`🎨 Rendering filter: ${config.key}`);
    
    // الحصول على الخيارات الديناميكية
    let options = config.options || [];
    if (config.key === 'locations') {
      // الحصول على المحافظات المحددة
      const selectedGovernorates = (filters.locations || []).filter(loc => {
        return getHierarchicalLocations([]).some(opt => 
          opt.isGovernorate && opt.value === loc
        );
      });
      options = getHierarchicalLocations(selectedGovernorates);
    } else if (['propertyType', 'amenities'].includes(config.key)) {
      options = getDynamicFilterOptions(config.key, activeTab, activeSubCategory, filters);
    }

    const currentValue = (filters as any)[config.key];
    console.log(`📊 Filter ${config.key} current value:`, currentValue);

    switch (config.type) {
      case 'checkbox':
        return (
          <CheckboxFilter
            key={config.key}
            title={config.title}
            options={options}
            selectedValues={currentValue || []}
            onChange={(values) => handleFilterChange(config.key, values)}
            onGovernorateToggle={config.key === 'locations' ? handleGovernorateToggle : undefined}
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
              <span className="text-green-600">{activeSubCategory}</span>
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