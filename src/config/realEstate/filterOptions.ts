// src/config/realEstate/filterOptions.ts

import { FilterOption } from '../../types/listing';

// خيارات غرف النوم (تتطابق مع bedrooms)
export const BEDROOM_OPTS: FilterOption[] = [
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
  { label: '5+', value: '5' },
];

// خيارات الحمامات (تتطابق مع bathrooms)
export const BATHROOM_OPTS: FilterOption[] = [
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
];

// خيارات الطابق (تتطابق مع floor)
export const FLOOR_OPTS: FilterOption[] = [
  { label: 'الأرضي', value: '0' },
  { label: 'الأول', value: '1' },
  { label: 'الثاني', value: '2' },
  { label: 'الثالث', value: '3' },
  { label: 'الرابع', value: '4' },
  { label: 'الخامس فما فوق', value: '5+' },
];

// المرافق (خيارات boolean)
export const AMENITIES: FilterOption[] = [
  { label: 'حديقة', value: 'has_garden' },
  { label: 'موقف سيارة', value: 'has_parking' },
  { label: 'بلكونة', value: 'has_balcony' },
  { label: 'مصعد', value: 'has_elevator' },
];

// أنواع التربة (للأراضي الزراعية)
export const SOIL_TYPES: FilterOption[] = [
  { label: 'طينية', value: 'clay', count: 234 },
  { label: 'رملية', value: 'sandy', count: 198 },
  { label: 'طميية', value: 'loamy', count: 156 },
  { label: 'صخرية', value: 'rocky', count: 89 },
  { label: 'مختلطة', value: 'mixed', count: 123 },
];

// مصادر المياه (للأراضي الزراعية)
export const WATER_SOURCES: FilterOption[] = [
  { label: 'بئر ارتوازي', value: 'artesian_well', count: 234 },
  { label: 'بئر عادي', value: 'regular_well', count: 198 },
  { label: 'نهر', value: 'river', count: 156 },
  { label: 'شبكة عامة', value: 'public_network', count: 123 },
  { label: 'خزان مياه', value: 'water_tank', count: 89 },
];