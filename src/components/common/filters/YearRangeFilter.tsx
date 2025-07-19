// src/components/common/filters/YearRangeFilter.tsx

import React from 'react';

interface YearRangeFilterProps {
  title: string;
  fromValue?: number;
  toValue?: number;
  onChange: (range: { from?: number; to?: number }) => void;
}

export const YearRangeFilter: React.FC<YearRangeFilterProps> = ({
  title,
  fromValue,
  toValue,
  onChange,
}) => {
  const currentYear = new Date().getFullYear();
  const startYear = 1990;
  
  // إنشاء قائمة السنوات
  const years = [];
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  const handleFromChange = (value: string) => {
    const num = Number(value);
    onChange({
      from: isNaN(num) ? undefined : num,
      to: toValue,
    });
  };

  const handleToChange = (value: string) => {
    const num = Number(value);
    onChange({
      from: fromValue,
      to: isNaN(num) ? undefined : num,
    });
  };

  return (
    <div>
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="flex space-x-2 space-x-reverse mb-2">
        <select
          value={fromValue || ''}
          onChange={e => handleFromChange(e.target.value)}
          className="w-1/2 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">من سنة</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        
        <select
          value={toValue || ''}
          onChange={e => handleToChange(e.target.value)}
          className="w-1/2 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">إلى سنة</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
};