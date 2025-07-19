// src/components/common/filters/CheckboxFilter.tsx

import React from 'react';
import { FilterOption } from '../../../types/listing';

interface CheckboxFilterProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  onGovernorateToggle?: (governorate: string, isSelected: boolean) => void;
}

export const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  title,
  options,
  selectedValues,
  onChange,
  onGovernorateToggle,
}) => {
  console.log(`☑️ CheckboxFilter ${title}:`, { selectedValues, optionsCount: options.length });

  const toggleValue = (value: string) => {
    console.log(`🔄 Toggling value: ${value}`);
    
    // التحقق من أن هذا العنصر محافظة
    const option = options.find(opt => opt.value === value);
    if (option?.isGovernorate && onGovernorateToggle) {
      const isCurrentlySelected = selectedValues.includes(value);
      onGovernorateToggle(value, !isCurrentlySelected);
    }
    
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    console.log(`📝 New values:`, newValues);
    onChange(newValues);
  };

  if (options.length === 0) return null;

  // تجميع الخيارات حسب المحافظة
  const groupedOptions = options.reduce((acc, option) => {
    if (option.isGovernorate) {
      if (!acc[option.value]) {
        acc[option.value] = { governorate: option, areas: [] };
      }
    } else if (option.parentGovernorate) {
      if (!acc[option.parentGovernorate]) {
        acc[option.parentGovernorate] = { governorate: null, areas: [] };
      }
      acc[option.parentGovernorate].areas.push(option);
    }
    return acc;
  }, {} as Record<string, { governorate: FilterOption | null; areas: FilterOption[] }>);

  return (
    <div>
      <h3 className="font-medium mb-1">{title}</h3>
      <div className="space-y-1">
        {Object.entries(groupedOptions).map(([govKey, group]) => (
          <div key={govKey}>
            {/* المحافظة */}
            {group.governorate && (
              <label
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded group font-medium text-gray-900 bg-green-50 border-b border-green-200 mb-1"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(group.governorate.value)}
                    onChange={() => toggleValue(group.governorate.value)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-900 font-medium">
                    {group.governorate.label}
                  </span>
                </div>
                {group.governorate.count !== undefined && (
                  <span className="text-xs text-gray-500 group-hover:text-gray-600">
                    ({group.governorate.count})
                  </span>
                )}
              </label>
            )}
            
            {/* المناطق التابعة */}
            {group.areas.length > 0 && (
              <div className="pr-4 space-y-1">
                {group.areas.map(area => (
                  <label
                    key={area.value}
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1 rounded group text-gray-600"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        checked={selectedValues.includes(area.value)}
                        onChange={() => toggleValue(area.value)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {area.label}
                      </span>
                    </div>
                    {area.count !== undefined && (
                      <span className="text-xs text-gray-500 group-hover:text-gray-600">
                        ({area.count})
                      </span>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};