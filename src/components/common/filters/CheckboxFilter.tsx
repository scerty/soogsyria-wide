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

  return (
    <div>
      <h3 className="font-medium mb-1">{title}</h3>
      <div className="space-y-1">
        {options.map(option => (
          <label
            key={option.value}
            className={`flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1 rounded group ${
              option.isGovernorate 
                ? 'font-medium text-gray-900 bg-green-50 border-b border-green-200' 
                : option.parentGovernorate 
                  ? 'pr-4 text-gray-600' 
                  : ''
            }`}
          >
            <div className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => toggleValue(option.value)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className={`text-sm group-hover:text-gray-900 ${
                option.isGovernorate 
                  ? 'text-gray-900 font-medium' 
                  : option.parentGovernorate 
                    ? 'text-gray-700' 
                    : 'text-gray-700'
              }`}>
                {option.label}
              </span>
            </div>
            {option.count !== undefined && (
              <span className="text-xs text-gray-500 group-hover:text-gray-600">
                ({option.count})
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};