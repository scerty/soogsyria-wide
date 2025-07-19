// src/components/common/filters/RangeFilter.tsx

import React from 'react';

interface RangeFilterProps {
  title: string;
  fromValue?: number;
  toValue?: number;
  onChange: (range: { from?: number; to?: number }) => void;
  placeholder?: {
    from?: string;
    to?: string;
  };
}

export const RangeFilter: React.FC<RangeFilterProps> = ({
  title,
  fromValue,
  toValue,
  onChange,
  placeholder = { from: 'من', to: 'إلى' },
}) => {
  const handleFromChange = (value: string) => {
    const num = value === '' ? undefined : Number(value);
    onChange({
      from: value === '' ? undefined : (isNaN(num) ? undefined : num),
      to: toValue,
    });
  };

  const handleToChange = (value: string) => {
    const num = value === '' ? undefined : Number(value);
    onChange({
      from: fromValue,
      to: value === '' ? undefined : (isNaN(num) ? undefined : num),
    });
  };

  return (
    <div>
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="flex space-x-2 space-x-reverse mb-2">
        <input
          type="number"
          min="0"
          placeholder={placeholder.from}
          value={fromValue ?? ''}
          onChange={e => handleFromChange(e.target.value)}
          className="w-1/2 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <input
          type="number"
          min="0"
          placeholder={placeholder.to}
          value={toValue ?? ''}
          onChange={e => handleToChange(e.target.value)}
          className="w-1/2 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};