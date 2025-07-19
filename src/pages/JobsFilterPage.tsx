// src/pages/JobsFilterPage.tsx

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { MapPin, ArrowRight } from 'lucide-react';
import ListingCard from '../components/listings/ListingCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { listingService, PaginatedListings } from '../services/listingService';
import { JobsSidebar } from '../components/common/JobsSidebar';
import { useUrlFilters } from '../hooks/useUrlFilters';
import { buildJobQueryParams } from '../config/jobFilters';

// خريطة المسارات إلى التصنيفات
const PATH_TO_CATEGORY: Record<string, { tab: string; subCategory: string; title: string }> = {
  // البحث عن وظيفة
  'search/full-time': { tab: 'البحث عن وظيفة', subCategory: 'وظائف بدوام كامل', title: 'وظائف بدوام كامل' },
  'search/part-time': { tab: 'البحث عن وظيفة', subCategory: 'وظائف بدوام جزئي', title: 'وظائف بدوام جزئي' },
  'search/freelance': { tab: 'البحث عن وظيفة', subCategory: 'عمل حر', title: 'فرص عمل حر' },
  'search/internship': { tab: 'البحث عن وظيفة', subCategory: 'تدريب وتطوع', title: 'فرص تدريب وتطوع' },
  'search/remote': { tab: 'البحث عن وظيفة', subCategory: 'عمل عن بُعد', title: 'وظائف عن بُعد' },
  'search/seasonal': { tab: 'البحث عن وظيفة', subCategory: 'وظائف موسمية', title: 'وظائف موسمية' },
  
  // نشر وظيفة
  'post/regular': { tab: 'نشر وظيفة', subCategory: 'نشر وظيفة عادية', title: 'نشر وظيفة عادية' },
  'post/featured': { tab: 'نشر وظيفة', subCategory: 'نشر وظيفة مميزة', title: 'نشر وظيفة مميزة' },
  'post/internship': { tab: 'نشر وظيفة', subCategory: 'نشر تدريب', title: 'نشر فرص تدريب' },
  'post/freelance': { tab: 'نشر وظيفة', subCategory: 'نشر عمل حر', title: 'نشر مشاريع حرة' },
  'post/remote': { tab: 'نشر وظيفة', subCategory: 'نشر عمل عن بُعد', title: 'نشر وظائف عن بُعد' },
  'post/recruitment': { tab: 'نشر وظيفة', subCategory: 'خدمات التوظيف', title: 'خدمات التوظيف' },
  
  // خدمات مهنية
  'services/cv-writing': { tab: 'خدمات مهنية', subCategory: 'كتابة السيرة الذاتية', title: 'خدمات كتابة السيرة الذاتية' },
  'services/career-consulting': { tab: 'خدمات مهنية', subCategory: 'استشارات مهنية', title: 'استشارات مهنية' },
  'services/training': { tab: 'خدمات مهنية', subCategory: 'تدريب مهني', title: 'خدمات التدريب المهني' },
  'services/recruitment': { tab: 'خدمات مهنية', subCategory: 'خدمات التوظيف', title: 'خدمات التوظيف' },
  'services/skills': { tab: 'خدمات مهنية', subCategory: 'تطوير المهارات', title: 'خدمات تطوير المهارات' },
  'services/other': { tab: 'خدمات مهنية', subCategory: 'أخرى', title: 'خدمات مهنية أخرى' },
  
  // تدريب
  'training/technical': { tab: 'تدريب', subCategory: 'دورات تقنية', title: 'دورات تقنية' },
  'training/management': { tab: 'تدريب', subCategory: 'دورات إدارية', title: 'دورات إدارية' },
  'training/languages': { tab: 'تدريب', subCategory: 'دورات لغات', title: 'دورات لغات' },
  'training/marketing': { tab: 'تدريب', subCategory: 'دورات تسويق', title: 'دورات تسويق' },
  'training/finance': { tab: 'تدريب', subCategory: 'دورات مالية', title: 'دورات مالية' },
  'training/other': { tab: 'تدريب', subCategory: 'أخرى', title: 'دورات أخرى' },
};

export default function JobsFilterPage() {
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
      navigate('/jobs');
    }
  }, [categoryInfo, navigate]);

  if (!categoryInfo) {
    return <LoadingSpinner />;
  }

  const { tab: activeTab, subCategory: activeSubCategory, title } = categoryInfo;

  const { filters, setFilters, resetFilters } = useUrlFilters(activeTab, activeSubCategory, 'job');

  // Debug logs
  console.log('🔍 Current job filters:', filters);
  console.log('🔗 Job query params:', buildJobQueryParams(filters, activeTab, activeSubCategory));
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
    queryKey: ['filteredJobs', activeTab, activeSubCategory, JSON.stringify(filters)],
    queryFn: ({ pageParam = 0 }) =>
      listingService.getListings(
        limit, 
        pageParam, 
        buildJobQueryParams(filters, activeTab, activeSubCategory),
        undefined // search query
      ),
    getNextPageParam: last => last.nextOffset ?? undefined,
    staleTime: 5 * 60_000,
    cacheTime: 30 * 60_000,
  });

  const listings = data?.pages.flatMap(p => p.results) ?? [];
  
  // Debug log for results
  console.log('📋 Job listings count:', listings.length);
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
      <JobsSidebar
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
              onClick={() => navigate('/jobs')}
              className="hover:text-purple-600 transition-colors"
            >
              الوظائف
            </button>
            <ArrowRight className="w-4 h-4" />
            <button 
              onClick={() => navigate(`/jobs?tab=${activeTab}`)}
              className="hover:text-purple-600 transition-colors"
            >
              {activeTab}
            </button>
            <ArrowRight className="w-4 h-4" />
            <span className="text-purple-600 font-medium">{activeSubCategory}</span>
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
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option>تاريخ النشر</option>
                  <option>الراتب: من الأعلى للأقل</option>
                  <option>الراتب: من الأقل للأعلى</option>
                  <option>الشركة: أ-ي</option>
                  <option>المسمى الوظيفي: أ-ي</option>
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
            حدث خطأ أثناء جلب الوظائف: {error.message}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-600 mb-4">لا توجد وظائف تطابق معايير البحث</div>
            <button
              onClick={resetFilters}
              className="text-purple-600 hover:underline"
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