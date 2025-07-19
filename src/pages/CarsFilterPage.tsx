// src/pages/CarsFilterPage.tsx

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { MapPin, ArrowRight } from 'lucide-react';
import ListingCard from '../components/listings/ListingCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { listingService, PaginatedListings } from '../services/listingService';
import { CarsSidebar } from '../components/common/CarsSidebar';
import { useUrlFilters } from '../hooks/useUrlFilters';
import { buildCarQueryParams } from '../config/carFilters';

// تحديث استيراد useUrlFilters لاستخدام فلاتر السيارات
// خريطة المسارات إلى التصنيفات
const PATH_TO_CATEGORY: Record<string, { tab: string; subCategory: string; title: string }> = {
  // شراء
  'buy/cars': { tab: 'شراء', subCategory: 'سيارات للبيع', title: 'سيارات للبيع' },
  'buy/new-cars': { tab: 'شراء', subCategory: 'سيارات جديدة', title: 'سيارات جديدة' },
  'buy/classic': { tab: 'شراء', subCategory: 'سيارات كلاسيكية', title: 'سيارات كلاسيكية' },
  'buy/imported': { tab: 'شراء', subCategory: 'سيارات مستوردة', title: 'سيارات مستوردة' },
  'buy/motorcycles': { tab: 'شراء', subCategory: 'دراجات نارية', title: 'دراجات نارية للبيع' },
  'buy/trucks': { tab: 'شراء', subCategory: 'شاحنات', title: 'شاحنات للبيع' },
  
  // إيجار
  'rent/cars': { tab: 'إيجار', subCategory: 'تأجير سيارات', title: 'سيارات للإيجار' },
  'rent/luxury': { tab: 'إيجار', subCategory: 'تأجير فاخرة', title: 'سيارات فاخرة للإيجار' },
  'rent/trucks': { tab: 'إيجار', subCategory: 'تأجير شاحنات', title: 'شاحنات للإيجار' },
  'rent/motorcycles': { tab: 'إيجار', subCategory: 'تأجير دراجات', title: 'دراجات نارية للإيجار' },
  'rent/buses': { tab: 'إيجار', subCategory: 'تأجير حافلات', title: 'حافلات للإيجار' },
  'rent/other': { tab: 'إيجار', subCategory: 'أخرى', title: 'مركبات أخرى للإيجار' },
  
  // بيع
  'sell/cars': { tab: 'بيع', subCategory: 'بيع سيارة', title: 'سيارات للبيع' },
  'sell/motorcycles': { tab: 'بيع', subCategory: 'بيع دراجة نارية', title: 'دراجات نارية للبيع' },
  'sell/trucks': { tab: 'بيع', subCategory: 'بيع شاحنة', title: 'شاحنات للبيع' },
  'sell/parts': { tab: 'بيع', subCategory: 'بيع قطع غيار', title: 'قطع غيار للبيع' },
  'sell/accessories': { tab: 'بيع', subCategory: 'بيع إكسسوارات', title: 'إكسسوارات للبيع' },
  'sell/other': { tab: 'بيع', subCategory: 'أخرى', title: 'مركبات أخرى للبيع' },
  
  // تجاري
  'commercial/vehicles': { tab: 'تجاري', subCategory: 'سيارات تجارية', title: 'سيارات تجارية' },
  'commercial/heavy-trucks': { tab: 'تجاري', subCategory: 'شاحنات ثقيلة', title: 'شاحنات ثقيلة' },
  'commercial/buses': { tab: 'تجاري', subCategory: 'حافلات', title: 'حافلات تجارية' },
  'commercial/heavy-equipment': { tab: 'تجاري', subCategory: 'معدات ثقيلة', title: 'معدات ثقيلة' },
  'commercial/trailers': { tab: 'تجاري', subCategory: 'مقطورات', title: 'مقطورات' },
  'commercial/other': { tab: 'تجاري', subCategory: 'أخرى', title: 'مركبات تجارية أخرى' },
};

export default function CarsFilterPage() {
  const { category, subcategory } = useParams<{ category: string; subcategory: string }>();
  const navigate = useNavigate();
  const limit = 20;
  const { ref, inView } = useInView({ rootMargin: '200px' });

  // الحصول على معلومات التصنيف من المسار
  const pathKey = `${category}/${subcategory}`;
  const categoryInfo = PATH_TO_CATEGORY[pathKey];

  // إذا لم يتم العثور على التصنيف، توجيه إلى الصفحة الرئيسية
  useEffect(() => {
    if (!categoryInfo) {
      navigate('/cars');
    }
  }, [categoryInfo, navigate]);

  if (!categoryInfo) {
    return <LoadingSpinner />;
  }

  const { tab: activeTab, subCategory: activeSubCategory, title } = categoryInfo;

  const { filters, setFilters, resetFilters } = useUrlFilters(activeTab, activeSubCategory, 'car');

  // Debug logs
  console.log('🔍 Current car filters:', filters);
  console.log('🔗 Car query params:', buildCarQueryParams(filters, activeTab, activeSubCategory));
  console.log('📊 Active tab:', activeTab, 'Sub category:', activeSubCategory);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PaginatedListings, Error>({
    queryKey: ['filteredCars', activeTab, activeSubCategory, JSON.stringify(filters)],
    queryFn: ({ pageParam = 0 }) =>
      listingService.getListings(
        limit, 
        pageParam, 
        buildCarQueryParams(filters, activeTab, activeSubCategory),
        undefined // search query
      ),
    getNextPageParam: last => last.nextOffset ?? undefined,
    staleTime: 5 * 60_000,
    cacheTime: 30 * 60_000,
  });

  const listings = data?.pages.flatMap(p => p.results) ?? [];
  
  // Debug log for results
  console.log('📋 Car listings count:', listings.length);
  console.log('📈 Total count:', data?.pages[0]?.count || 0);
  console.log('🔄 Is loading:', isLoading, 'Has next page:', hasNextPage);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-50 px-80">
      {/* السايد بار */}
      <CarsSidebar
        filters={filters}
        setFilters={setFilters}
        activeTab={activeTab}
        activeSubCategory={activeSubCategory}
        resetFilters={resetFilters}
      />

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-6">
        {/* شريط التنقل */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-2">
            <button 
              onClick={() => navigate('/cars')}
              className="hover:text-blue-600 transition-colors"
            >
              السيارات
            </button>
            <ArrowRight className="w-4 h-4" />
            <button 
              onClick={() => navigate(`/cars?tab=${activeTab}`)}
              className="hover:text-blue-600 transition-colors"
            >
              {activeTab}
            </button>
            <ArrowRight className="w-4 h-4" />
            <span className="text-blue-600 font-medium">{activeSubCategory}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-600 mt-1">
                استخدم الفلاتر الجانبية لتخصيص البحث
              </p>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">عرض على الخريطة</span>
              </button>
              
              <span className="text-sm text-gray-600">
                {data?.pages[0]?.count || 0} نتيجة
              </span>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <label htmlFor="sort" className="text-sm text-gray-600">فرز حسب</label>
                <select 
                  id="sort" 
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>تاريخ النشر</option>
                  <option>السعر: من الأقل للأعلى</option>
                  <option>السعر: من الأعلى للأقل</option>
                  <option>سنة الصنع: الأحدث أولاً</option>
                  <option>المسافة المقطوعة: الأقل أولاً</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* النتائج */}
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <div className="text-center text-red-600">
            حدث خطأ أثناء جلب السيارات: {error.message}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-600 mb-4">لا توجد سيارات تطابق معايير البحث</div>
            <button
              onClick={resetFilters}
              className="text-blue-600 hover:underline"
            >
              إعادة تعيين الفلاتر
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {listings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            <div className="py-8 text-center">
              {isFetchingNextPage ? (
                <LoadingSpinner />
              ) : hasNextPage ? (
                <div ref={ref} className="h-6" />
              ) : (
                <p className="text-gray-500">انتهت النتائج</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}