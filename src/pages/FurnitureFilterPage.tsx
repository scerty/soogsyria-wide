// src/pages/FurnitureFilterPage.tsx

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { MapPin, ArrowRight } from 'lucide-react';
import ListingCard from '../components/listings/ListingCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { listingService, PaginatedListings } from '../services/listingService';
import { FurnitureSidebar } from '../components/common/FurnitureSidebar';
import { useUrlFilters } from '../hooks/useUrlFilters';
import { buildFurnitureQueryParams } from '../config/furnitureFilters';

// خريطة المسارات إلى التصنيفات
const PATH_TO_CATEGORY: Record<string, { tab: string; subCategory: string; title: string }> = {
  // شراء
  'buy/home': { tab: 'شراء', subCategory: 'أثاث منزلي', title: 'أثاث منزلي للشراء' },
  'buy/office': { tab: 'شراء', subCategory: 'أثاث مكتبي', title: 'أثاث مكتبي للشراء' },
  'buy/bedroom': { tab: 'شراء', subCategory: 'غرف نوم', title: 'غرف نوم للشراء' },
  'buy/living-room': { tab: 'شراء', subCategory: 'غرف معيشة', title: 'غرف معيشة للشراء' },
  'buy/kitchen': { tab: 'شراء', subCategory: 'مطابخ', title: 'مطابخ للشراء' },
  'buy/lighting': { tab: 'شراء', subCategory: 'إضاءة', title: 'إضاءة للشراء' },
  'buy/tvs': { tab: 'شراء', subCategory: 'تلفزيونات', title: 'تلفزيونات للشراء' },
  'buy/appliances': { tab: 'شراء', subCategory: 'أجهزة منزلية', title: 'أجهزة منزلية للشراء' },
  'buy/phones': { tab: 'شراء', subCategory: 'هواتف وأجهزة لوحية', title: 'هواتف وأجهزة لوحية للشراء' },
  'buy/audio': { tab: 'شراء', subCategory: 'صوتيات', title: 'صوتيات للشراء' },
  'buy/accessories': { tab: 'شراء', subCategory: 'إكسسوارات إلكترونية', title: 'إكسسوارات إلكترونية للشراء' },
  
  // بيع
  'sell/home': { tab: 'بيع', subCategory: 'بيع أثاث منزلي', title: 'أثاث منزلي للبيع' },
  'sell/office': { tab: 'بيع', subCategory: 'بيع أثاث مكتبي', title: 'أثاث مكتبي للبيع' },
  'sell/bedroom': { tab: 'بيع', subCategory: 'بيع غرف نوم', title: 'غرف نوم للبيع' },
  'sell/living-room': { tab: 'بيع', subCategory: 'بيع غرف معيشة', title: 'غرف معيشة للبيع' },
  'sell/kitchen': { tab: 'بيع', subCategory: 'بيع مطابخ', title: 'مطابخ للبيع' },
  'sell/lighting': { tab: 'بيع', subCategory: 'بيع إضاءة', title: 'إضاءة للبيع' },
  'sell/tvs': { tab: 'بيع', subCategory: 'بيع تلفزيونات', title: 'تلفزيونات للبيع' },
  'sell/appliances': { tab: 'بيع', subCategory: 'بيع أجهزة منزلية', title: 'أجهزة منزلية للبيع' },
  'sell/phones': { tab: 'بيع', subCategory: 'بيع هواتف وأجهزة لوحية', title: 'هواتف وأجهزة لوحية للبيع' },
  'sell/audio': { tab: 'بيع', subCategory: 'بيع صوتيات', title: 'صوتيات للبيع' },
  'sell/accessories': { tab: 'بيع', subCategory: 'بيع إكسسوارات إلكترونية', title: 'إكسسوارات إلكترونية للبيع' },
  
  // مجاني
  'free/home': { tab: 'مجاني', subCategory: 'أثاث منزلي مجاني', title: 'أثاث منزلي مجاني' },
  'free/office': { tab: 'مجاني', subCategory: 'أثاث مكتبي مجاني', title: 'أثاث مكتبي مجاني' },
  'free/bedroom': { tab: 'مجاني', subCategory: 'غرف نوم مجانية', title: 'غرف نوم مجانية' },
  'free/living-room': { tab: 'مجاني', subCategory: 'غرف معيشة مجانية', title: 'غرف معيشة مجانية' },
  'free/kitchen': { tab: 'مجاني', subCategory: 'مطابخ مجانية', title: 'مطابخ مجانية' },
  'free/lighting': { tab: 'مجاني', subCategory: 'إضاءة مجانية', title: 'إضاءة مجانية' },
  'free/electronics': { tab: 'مجاني', subCategory: 'إلكترونيات مجانية', title: 'إلكترونيات مجانية' },
};

export default function FurnitureFilterPage() {
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
      navigate('/furniture');
    }
  }, [categoryInfo, navigate]);

  if (!categoryInfo) {
    return <LoadingSpinner />;
  }

  const { tab: activeTab, subCategory: activeSubCategory, title } = categoryInfo;

  const { filters, setFilters, resetFilters } = useUrlFilters(activeTab, activeSubCategory, 'furniture');

  // Debug logs
  console.log('🔍 Current furniture filters:', filters);
  console.log('🔗 Furniture query params:', buildFurnitureQueryParams(filters, activeTab, activeSubCategory));
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
    queryKey: ['filteredFurniture', activeTab, activeSubCategory, JSON.stringify(filters)],
    queryFn: ({ pageParam = 0 }) =>
      listingService.getListings(
        limit, 
        pageParam, 
        buildFurnitureQueryParams(filters, activeTab, activeSubCategory),
        undefined // search query
      ),
    getNextPageParam: last => last.nextOffset ?? undefined,
    staleTime: 5 * 60_000,
    cacheTime: 30 * 60_000,
  });

  const listings = data?.pages.flatMap(p => p.results) ?? [];
  
  // Debug log for results
  console.log('📋 Furniture listings count:', listings.length);
  console.log('📈 Total count:', data?.pages[0]?.count || 0);
  console.log('🔄 Is loading:', isLoading, 'Has next page:', hasNextPage);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-50">
      {/* السايد بار */}
      <FurnitureSidebar
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
              onClick={() => navigate('/furniture')}
              className="hover:text-amber-600 transition-colors"
            >
              الأثاث والإلكترونيات
            </button>
            <ArrowRight className="w-4 h-4" />
            <button 
              onClick={() => navigate(`/furniture?tab=${activeTab}`)}
              className="hover:text-amber-600 transition-colors"
            >
              {activeTab}
            </button>
            <ArrowRight className="w-4 h-4" />
            <span className="text-amber-600 font-medium">{activeSubCategory}</span>
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
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option>تاريخ النشر</option>
                  <option>السعر: من الأقل للأعلى</option>
                  <option>السعر: من الأعلى للأقل</option>
                  <option>الحالة: الأفضل أولاً</option>
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
            حدث خطأ أثناء جلب الأثاث والإلكترونيات: {error.message}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-600 mb-4">لا توجد إعلانات تطابق معايير البحث</div>
            <button
              onClick={resetFilters}
              className="text-amber-600 hover:underline"
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