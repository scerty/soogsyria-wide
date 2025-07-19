import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Upload, X } from 'lucide-react';
import { ListingFormData } from '../../types/listing';
import { listingService } from '../../services/listingService';
import { 
  CURRENCY_OPTIONS, 
  LOCATION_OPTIONS, 
  CAR_CATEGORIES, 
  REAL_ESTATE_CATEGORIES,
  FUEL_TYPES,
  GEARBOX_TYPES,
  BODY_TYPES,
  PROPERTY_TYPES
} from '../../utils/constants';

interface ListingFormProps {
  initialData?: Partial<ListingFormData>;
  onSuccess: () => void;
  onCancel?: () => void;
  isEdit?: boolean;
  listingId?: number;
}

const ListingForm: React.FC<ListingFormProps> = ({
  initialData,
  onSuccess,
  onCancel,
  isEdit = false,
  listingId
}) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>(initialData?.images || []);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ListingFormData>({
    defaultValues: initialData || {
      type: 'Car',
      featured: false,
      currency: 'USD',
      images: [],
    }
  });

  const listingType = watch('type');

  const createMutation = useMutation({
    mutationFn: (data: ListingFormData) => listingService.createListing(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      onSuccess();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: ListingFormData) => listingService.updateListing(listingId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['listing', listingId] });
      onSuccess();
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => 
        listingService.uploadToCloudflare(file)
      );
      
      const imageIds = await Promise.all(uploadPromises);
      const newImages = [...uploadedImages, ...imageIds];
      setUploadedImages(newImages);
      setValue('images', newImages);
    } catch (error) {
      console.error('Image upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    setValue('images', newImages);
  };

  const onSubmit = (data: ListingFormData) => {
    const submitData = {
      ...data,
      images: uploadedImages,
    };

    if (isEdit) {
      updateMutation.mutate(submitData);
    } else {
      createMutation.mutate(submitData);
    }
  };

  const categories = listingType === 'Car' ? CAR_CATEGORIES : REAL_ESTATE_CATEGORIES;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نوع الإعلان *
          </label>
          <select
            {...register('type', { required: 'نوع الإعلان مطلوب' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Car">سيارة</option>
            <option value="Real Estate">عقار</option>
          </select>
          {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            التصنيف *
          </label>
          <select
            {...register('category', { required: 'التصنيف مطلوب' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">اختر التصنيف</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          العنوان *
        </label>
        <input
          {...register('title', { required: 'العنوان مطلوب' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="أدخل عنوان الإعلان"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الوصف *
        </label>
        <textarea
          {...register('description', { required: 'الوصف مطلوب' })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="أدخل وصف الإعلان"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            السعر *
          </label>
          <input
            type="number"
            {...register('price', { required: 'السعر مطلوب', min: 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            العملة *
          </label>
          <select
            {...register('currency', { required: 'العملة مطلوبة' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {CURRENCY_OPTIONS.map(currency => (
              <option key={currency.value} value={currency.value}>
                {currency.label}
              </option>
            ))}
          </select>
          {errors.currency && <p className="mt-1 text-sm text-red-600">{errors.currency.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الموقع *
          </label>
          <select
            {...register('location', { required: 'الموقع مطلوب' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">اختر الموقع</option>
            {LOCATION_OPTIONS.map(location => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </select>
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('featured')}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">إعلان مميز</span>
        </label>
      </div>

      {/* Car Details */}
      {listingType === 'Car' && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">تفاصيل السيارة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الماركة</label>
              <input
                {...register('car_detail.brand')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="تويوتا"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الموديل</label>
              <input
                {...register('car_detail.series')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="كامري"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">سنة الصنع</label>
              <input
                type="number"
                {...register('car_detail.year')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2023"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المسافة المقطوعة (كم)</label>
              <input
                type="number"
                {...register('car_detail.mileage')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="10000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع الوقود</label>
              <select
                {...register('car_detail.fuel')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">اختر نوع الوقود</option>
                {FUEL_TYPES.map(fuel => (
                  <option key={fuel.value} value={fuel.value}>{fuel.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ناقل الحركة</label>
              <select
                {...register('car_detail.gearbox')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">اختر ناقل الحركة</option>
                {GEARBOX_TYPES.map(gearbox => (
                  <option key={gearbox.value} value={gearbox.value}>{gearbox.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اللون</label>
              <input
                {...register('car_detail.color')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="أزرق"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع الهيكل</label>
              <select
                {...register('car_detail.body_type')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">اختر نوع الهيكل</option>
                {BODY_TYPES.map(body => (
                  <option key={body.value} value={body.value}>{body.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
              <select
                {...register('car_detail.condition')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">اختر الحالة</option>
                <option value="new">جديدة</option>
                <option value="used">مستعملة</option>
                <option value="certified">معتمدة</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('car_detail.registered')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">مسجلة</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Real Estate Details */}
      {listingType === 'Real Estate' && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">تفاصيل العقار</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع العقار</label>
              <select
                {...register('real_estate_detail.property_type')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">اختر نوع العقار</option>
                {PROPERTY_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">عدد غرف النوم</label>
              <input
                type="number"
                {...register('real_estate_detail.bedrooms')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">عدد الحمامات</label>
              <input
                type="number"
                {...register('real_estate_detail.bathrooms')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المساحة (م²)</label>
              <input
                type="number"
                {...register('real_estate_detail.size')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">مساحة الأرض (م²)</label>
              <input
                type="number"
                {...register('real_estate_detail.land_size')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">سنة البناء</label>
              <input
                type="number"
                {...register('real_estate_detail.year_built')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2020"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">أماكن الوقوف</label>
              <input
                type="number"
                {...register('real_estate_detail.parking_spaces')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('real_estate_detail.furnished')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">مفروش</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Image Upload */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">الصور</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رفع الصور
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">انقر للرفع</span> أو اسحب وأفلت
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF حتى 10 ميجابايت</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {uploadedImages.map((imageId, index) => (
              <div key={index} className="relative">
                <img
                  src={`https://imagedelivery.net/${imageId}/thumbnail`}
                  alt={`صورة ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4 space-x-reverse">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            إلغاء
          </button>
        )}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          العودة
        </button>
        <button
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending || uploading}
          className="px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          {createMutation.isPending || updateMutation.isPending || uploading 
            ? 'جاري الحفظ...' 
            : isEdit 
              ? 'تحديث الإعلان' 
              : 'إنشاء الإعلان'
          }
        </button>
      </div>
    </form>
  );
};

export default ListingForm;