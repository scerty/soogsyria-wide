// src/components/common/JobsSidebar.tsx

import React, { useMemo } from 'react';
import { 
  JOB_FILTER_REGISTRY, 
  getDynamicJobFilterOptions,
  JobFilterConfig,
} from '../../config/jobFilters';
import { JobFilters } from '../../config/jobFilters';
import { CheckboxFilter } from './filters/CheckboxFilter';
import { RangeFilter } from './filters/RangeFilter';
import { ButtonGroupFilter } from './filters/ButtonGroupFilter';

interface JobsSidebarProps {
  filters: JobFilters;
  setFilters: (filters: JobFilters | ((prev: JobFilters) => JobFilters)) => void;
  activeTab: string;
  activeSubCategory?: string;
  resetFilters: () => void;
}

export const JobsSidebar: React.FC<JobsSidebarProps> = ({
  filters,
  setFilters,
  activeTab,
  activeSubCategory,
  resetFilters,
}) => {
  console.log('🎛️ Jobs Sidebar render with filters:', filters);

  const handleFilterChange = (key: string, value: any) => {
    console.log(`🔧 Job Filter change: ${key} =`, value);
    
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [key]: value,
      };
      
      console.log('📝 New job filters state:', newFilters);
      return newFilters;
    });
  };

  // حساب الفلاتر المرئية
  const visibleFilters = useMemo(() => {
    const visible = JOB_FILTER_REGISTRY.filter(config => {
      if (!config.visibleWhen) return true;
      return config.visibleWhen(filters, activeTab, activeSubCategory);
    });
    console.log('👁️ Visible job filters:', visible.map(f => f.key));
    return visible;
  }, [filters, activeTab, activeSubCategory]);

  const renderFilter = (config: JobFilterConfig) => {
    console.log(`🎨 Rendering job filter: ${config.key}`);
    
    // الحصول على الخيارات الديناميكية
    let options = config.options || [];
    if (['jobType', 'experienceLevel', 'company', 'industry', 'skills', 'education', 'workArrangement', 'contractType', 'benefits'].includes(config.key)) {
      options = getDynamicJobFilterOptions(config.key, activeTab, activeSubCategory, filters) || config.options || [];
    }

    const currentValue = (filters as any)[config.key];
    console.log(`📊 Job Filter ${config.key} current value:`, currentValue);

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
              <span className="text-purple-600">{activeSubCategory}</span>
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