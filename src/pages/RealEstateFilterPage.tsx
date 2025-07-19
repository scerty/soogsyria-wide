// src/pages/RealEstateFilterPage.tsx

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { MapPin, ArrowRight, Filter } from 'lucide-react';
import ListingCard from '../components/listings/ListingCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { listingService, PaginatedListings } from '../services/listingService';
import { RealEstateSidebar } from '../components/common/RealEstateSidebar';
import { useUrlFilters } from '../hooks/useUrlFilters';
import { buildQueryParams } from '../config/realEstateFilters';

// خريطة المسارات إلى التصنيفات
const PATH_TO_CATEGORY: Record<string, { tab: string; subCategory: string; title: string }> = {
  // شراء
  'buy/residential': { tab: 'شراء', subCategory: 'عقارات للبيع', title: 'عقارات للبيع' },
  'buy/new-properties': { tab: 'شراء', subCategory: 'عقارات جديدة', title: 'عقارات جديدة' },
  'buy/vacation-homes': { tab: 'شراء', subCategory: 'بيوت عطلات', title: 'بيوت عطلات للبيع' },
  'buy/international': { tab: 'شراء', subCategory: 'عقارات بالخارج', title: 'عقارات بالخارج' },
  'buy/land': { tab: 'شراء', subCategory: 'قطع أراضي', title: 'قطع أراضي للبيع' },
  'buy/vacation-land': { tab: 'شراء', subCategory: 'قطع عطلات', title: 'قطع عطلات للبيع' },
  
  // إيجار
  'rent/apartments': { tab: 'إيجار', subCategory: 'تأجير شقة', title: 'شقق للإيجار' },
  'rent/vacation-homes': { tab: 'إيجار', subCategory: 'تأجير بيت عطلات', title: 'بيوت عطلات للإيجار' },
  'rent/commercial': { tab: 'إيجار', subCategory: 'مكاتب وتجاري', title: 'مكاتب وعقارات تجارية للإيجار' },
  'rent/land': { tab: 'إيجار', subCategory: 'قطع أراضي', title: 'أراضي للإيجار' },
  'rent/agriculture': { tab: 'إيجار', subCategory: 'زراعة', title: 'أراضي زراعية للإيجار' },
  'rent/other': { tab: 'إيجار', subCategory: 'أخرى', title: 'عقارات أخرى للإيجار' },
  
  // بيع
  'sell/residential': { tab: 'بيع', subCategory: 'بيع عقار', title: 'عقارات للبيع' },
  'sell/vacation-homes': { tab: 'بيع', subCategory: 'بيع بيت عطلات', title: 'بيوت عطلات للبيع' },
  'sell/land': { tab: 'بيع', subCategory: 'بيع قطعة أرض', title: 'قطع أراضي للبيع' },
  'sell/commercial': { tab: 'بيع', subCategory: 'بيع تجاري', title: 'عقارات تجارية للبيع' },
  'sell/agriculture': { tab: 'بيع', subCategory: 'بيع زراعة', title: 'أراضي زراعية للبيع' },
  'sell/other': { tab: 'بيع', subCategory: 'أخرى', title: 'عقارات أخرى للبيع' },
  
  // تجاري
  'commercial/properties': { tab: 'تجاري', subCategory: 'عقار تجاري', title: 'عقارات تجارية' },
  'commercial/offices': { tab: 'تجاري', subCategory: 'مكاتب ومستودعات', title: 'مكاتب ومستودعات' },
  'commercial/retail': { tab: 'تجاري', subCategory: 'تجزئة', title: 'عقارات تجزئة' },
  'commercial/industrial': { tab: 'تجاري', subCategory: 'صناعي', title: 'عقارات صناعية' },
  'commercial/agriculture': { tab: 'تجاري', subCategory: 'زراعة', title: 'عقارات زراعية تجارية' },
  'commercial/other': { tab: 'تجاري', subCategory: 'أخرى', title: 'عقارات تجارية أخرى' },
};

export default function RealEstateFilterPage() {
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
      navigate('/properties');
    }
  }, [categoryInfo, navigate]);

  if (!categoryInfo) {
    return <LoadingSpinner />;
  }

  const { tab: activeTab, subCategory: activeSubCategory, title } = categoryInfo;

  const { filters, setFilters, resetFilters } = useUrlFilters(activeTab, activeSubCategory);

  // Debug logs
  console.log('🔍 Current filters:', filters);
  console.log('🔗 Query params:', buildQueryParams(filters, activeTab, activeSubCategory));
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
    queryKey: ['filteredRealEstate', activeTab, activeSubCategory, JSON.stringify(filters)],
    queryFn: ({ pageParam = 0 }) =>
      listingService.getListings(
        limit, 
        pageParam, 
        buildQueryParams(filters, activeTab, activeSubCategory),
        undefined // search query
      ),
    getNextPageParam: last => last.nextOffset ?? undefined,
    staleTime: 5 * 60_000,
    cacheTime: 30 * 60_000,
  });

  const listings = data?.pages.flatMap(p => p.results) ?? [];
  
  // Debug log for results
  console.log('📋 Listings count:', listings.length);
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
      <RealEstateSidebar
        filters={filters}
        setFilters={setFilters}
        activeTab={activeTab}
        activeSubCategory={activeSubCategory}
        resetFilters={resetFilters}
      />

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-6 ">
        {/* شريط التنقل */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-2">
            <button 
              onClick={() => navigate('/properties')}
              className="hover:text-green-600 transition-colors"
            >
              العقارات
            </button>
            <ArrowRight className="w-4 h-4" />
            <button 
              onClick={() => navigate(`/properties?tab=${activeTab}`)}
              className="hover:text-green-600 transition-colors"
            >
              {activeTab}
            </button>
            <ArrowRight className="w-4 h-4" />
            <span className="text-green-600 font-medium">{activeSubCategory}</span>
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
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>تاريخ النشر</option>
                  <option>السعر: من الأقل للأعلى</option>
                  <option>السعر: من الأعلى للأقل</option>
                  <option>المساحة: من الأكبر للأصغر</option>
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
            حدث خطأ أثناء جلب العقارات: {error.message}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-600 mb-4">لا توجد عقارات تطابق معايير البحث</div>
            <button
              onClick={resetFilters}
              className="text-green-600 hover:underline"
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