// src/components/common/filters/RangeFilter.tsx

import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

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
  const [localFromValue, setLocalFromValue] = useState<string>(fromValue?.toString() || '');
  const [localToValue, setLocalToValue] = useState<string>(toValue?.toString() || '');
  const [hasChanges, setHasChanges] = useState(false);

  // تحديث القيم المحلية عند تغيير القيم الخارجية
  useEffect(() => {
    setLocalFromValue(fromValue?.toString() || '');
    setLocalToValue(toValue?.toString() || '');
    setHasChanges(false);
  }, [fromValue, toValue]);

  // التحقق من وجود تغييرات
  useEffect(() => {
    const currentFrom = localFromValue === '' ? undefined : Number(localFromValue);
    const currentTo = localToValue === '' ? undefined : Number(localToValue);
    
    const hasFromChanged = currentFrom !== fromValue;
    const hasToChanged = currentTo !== toValue;
    
    setHasChanges(hasFromChanged || hasToChanged);
  }, [localFromValue, localToValue, fromValue, toValue]);

  const handleFromChange = (value: string) => {
    setLocalFromValue(value);
  };

  const handleToChange = (value: string) => {
    setLocalToValue(value);
  };

  const handleApply = () => {
    const fromNum = localFromValue === '' ? undefined : Number(localFromValue);
    const toNum = localToValue === '' ? undefined : Number(localToValue);
    
    onChange({
      from: localFromValue === '' ? undefined : (isNaN(fromNum!) ? undefined : fromNum),
      to: localToValue === '' ? undefined : (isNaN(toNum!) ? undefined : toNum),
    });
    
    setHasChanges(false);
  };

  return (
    <div>
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="space-y-2">
        <div className="flex space-x-2 space-x-reverse">
          <input
            type="number"
            min="0"
            placeholder={placeholder.from}
            value={localFromValue}
            onChange={e => handleFromChange(e.target.value)}
            className="w-1/2 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            type="number"
            min="0"
            placeholder={placeholder.to}
            value={localToValue}
            onChange={e => handleToChange(e.target.value)}
            className="w-1/2 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        {hasChanges && (
          <button
            onClick={handleApply}
            className="w-full bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
          >
            <Check className="w-3 h-3" />
            <span>تطبيق</span>
          </button>
        )}
      </div>
    </div>
  );
};
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