// src/components/common/filters/ButtonGroupFilter.tsx

import React from 'react';
import { FilterOption } from '../../../types/listing';

interface ButtonGroupFilterProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  multiSelect?: boolean;
}

export const ButtonGroupFilter: React.FC<ButtonGroupFilterProps> = ({
  title,
  options,
  selectedValues,
  onChange,
  multiSelect = false,
}) => {
  console.log(`🔘 ButtonGroupFilter ${title}:`, { selectedValues, multiSelect });

  // التأكد من أن selectedValues هو array
  const safeSelectedValues = Array.isArray(selectedValues) ? selectedValues : [];
  console.log('🔒 Safe selected values:', safeSelectedValues);
  
  const handleOptionClick = (value: string) => {
    console.log(`🔄 Button clicked: ${value}`);
    if (multiSelect) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];
      console.log(`📝 Multi-select new values:`, newValues);
      onChange(newValues);
    } else {
      // Single select behavior
      if (value === 'all') {
        console.log(`📝 Single-select: clearing all`);
    const newValues = safeSelectedValues.includes(value)
      ? safeSelectedValues.filter(v => v !== value)
      : [...safeSelectedValues, value];
        onChange([value]);
      }
    }
  };

  const isSelected = (value: string) => {
    if (value === 'all') {
    const result = safeSelectedValues.includes(value);
    }
    return selectedValues.includes(value);
  };

  return (
    <div>
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            className={`px-3 py-1 border rounded text-sm transition-colors ${
              isSelected(option.value)
                ? 'bg-green-600 text-white border-green-600'
                : 'text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};