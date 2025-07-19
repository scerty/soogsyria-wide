export interface FilterOption {
  label: string;
  value: string;
  count?: number;
  isGovernorate?: boolean;
  parentGovernorate?: string;
}

export interface LocationDetail {
  id: number;
  country: string;
  city: string;
  governorate: string;
  area: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
}

export interface Listing {
  id: number;
  type: 'Car' | 'Real Estate' | 'Job' | 'Furniture' | 'car' | 'real_estate' | 'job' | 'furniture' | 'سيارة' | 'عقار' | 'وظيفة' | 'أثاث';
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string | LocationDetail;
  category: string;
  featured: boolean;
  publish_date: string;
  images: ListingImage[];
  advertiser: Advertiser;
  car_detail?: CarDetail;
  real_estate_detail?: RealEstateDetail;
  job_detail?: JobDetail;
  furniture_detail?: FurnitureDetail;
}

export interface ListingImage {
  id: number;
  cf_image_id: string;
  is_primary: boolean;
  order: number;
}

export interface Advertiser {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

export interface CarDetail {
  brand: string;
  series: string;
  year: number;
  mileage: number;
  fuel: string;
  gearbox: string;
  color: string;
  body_type: string;
  condition: string;
  registered: boolean;
}

export interface RealEstateDetail {
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  land_size?: number;
  year_built?: number;
  parking_spaces?: number;
  furnished: boolean;
}

export interface JobDetail {
  job_type: string;
  experience_level: string;
  salary_from?: number;
  salary_to?: number;
  company: string;
  industry: string;
  required_skills?: string;
  education_level: string;
  work_arrangement: string;
  contract_type: string;
  benefits?: string;
  application_deadline?: string;
}

export interface FurnitureDetail {
  item_type: string;
  category: string;
  condition: string;
  material?: string;
  brand?: string;
  color?: string;
  style?: string;
  features?: string;
  warranty_months?: number;
  dimensions?: string;
  weight?: number;
  is_assembled?: boolean;
  assembly_required?: boolean;
}

export interface ListingFormData {
  type: 'Car' | 'Real Estate' | 'Job' | 'Furniture';
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  category: string;
  featured: boolean;
  images: string[];
  car_detail?: Partial<CarDetail>;
  real_estate_detail?: Partial<RealEstateDetail>;
  job_detail?: Partial<JobDetail>;
  furniture_detail?: Partial<FurnitureDetail>;
}

export interface PaginatedListings {
  count: number;
  next: string | null;
  previous: string | null;
  results: Listing[];
}