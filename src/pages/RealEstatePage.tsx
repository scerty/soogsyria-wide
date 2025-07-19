// src/pages/RealEstatePage.tsx

import React, { useState, FormEvent, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Home as HomeIcon,
  Grid,
  Globe,
} from 'lucide-react';
import { listingService, PaginatedListings } from '../services/listingService';
import ListingCard from '../components/listings/ListingCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const TABS = ['شراء', 'إيجار', 'بيع', 'رهن'] as const;
type Tab = typeof TABS[number];

// بيانات التصنيفات الفرعية مع المسارات
const SUB_CATEGORIES: Record<
  Tab,
  { label: string; icon: React.FC<{ className?: string }>; path: string }[]
> = {
  شراء: [
    { label: 'عقارات للبيع', icon: HomeIcon, path: '/properties/buy/residential' },
    { label: 'عقارات جديدة', icon: HomeIcon, path: '/properties/buy/new-properties' },
    { label: 'بيوت عطلات', icon: HomeIcon, path: '/properties/buy/vacation-homes' },
    { label: 'عقارات بالخارج', icon: Globe, path: '/properties/buy/international' },
    { label: 'مقاسم سكنية ', icon: Grid, path: '/properties/buy/land' },
   
  ],
  إيجار: [
    { label: 'تأجير شقة', icon: HomeIcon, path: '/properties/rent/apartments' },
    { label: 'تأجير بيت عطلات', icon: HomeIcon, path: '/properties/rent/vacation-homes' },
    { label: 'مكاتب وتجاري', icon: Grid, path: '/properties/rent/commercial' },
    { label: 'قطع أراضي', icon: Grid, path: '/properties/rent/land' },
    { label: 'اراضي زراعية', icon: Globe, path: '/properties/rent/agriculture' },
    { label: 'اخر', icon: HomeIcon, path: '/properties/rent/other' },
  ],
  بيع: [
    { label: 'بيع عقار', icon: HomeIcon, path: '/properties/sell/residential' },
    { label: 'بيع بيت عطلات', icon: HomeIcon, path: '/properties/sell/vacation-homes' },
    { label: 'بيع قطعة أرض', icon: Grid, path: '/properties/sell/land' },
    { label: 'بيع تجاري', icon: Grid, path: '/properties/sell/commercial' },
    { label: 'بيع زراعة', icon: Globe, path: '/properties/sell/agriculture' },
    { label: 'أخرى', icon: HomeIcon, path: '/properties/sell/other' },
  ],
  رهن: [
    { label: 'عقار تجاري', icon: Grid, path: '/properties/commercial/properties' },
    { label: 'مكاتب ومستودعات', icon: Grid, path: '/properties/commercial/offices' },
    { label: 'تجزئة', icon: HomeIcon, path: '/properties/commercial/retail' },
    { label: 'صناعي', icon: Globe, path: '/properties/commercial/industrial' },
    { label: 'زراعة', icon: Globe, path: '/properties/commercial/agriculture' },
    { label: 'أخرى', icon: HomeIcon, path: '/properties/commercial/other' },
  ],
};

export default function RealEstatePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('شراء');
  const [query, setQuery] = useState('');
  const limit = 20;

  // Intersection Observer sentinel
  const { ref, inView } = useInView({ rootMargin: '200px' });

  // جلب الإعلانات بناءً على التصنيف الرئيسي فقط
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<PaginatedListings, Error>({
    queryKey: ['realEstateListings', activeTab],
    queryFn: ({ pageParam = 0 }) => {
      const operationType = 
        activeTab === 'بيع' ? 'sale' :
        activeTab === 'إيجار' ? 'rent' :
        activeTab === 'شراء' ? 'buy' :
        activeTab === 'تجاري' ? 'commercial' : 'sale';
      
      return listingService.getListings(limit, pageParam, {
        type: 'real_estate',
        'estate_detail__operation_type': operationType,
      });
    },
    getNextPageParam: (lastPage) => lastPage.nextOffset ?? undefined,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  // دمج النتائج
  const listings = data?.pages.flatMap((p) => p.results) ?? [];

  // جلب الصفحة التالية عند الاقتراب من الأسفل
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // تحديث التبويب من URL عند التحميل الأول
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab') as Tab;
    if (tabFromUrl && TABS.includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  // تحديث URL عند تغيير التبويب
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    const newParams = new URLSearchParams();
    newParams.set('tab', tab);
    setSearchParams(newParams);
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    // يمكن إضافة منطق البحث النصي هنا
  };

  const handleSubCategoryClick = (path: string) => {
    navigate(path);
  };

  const heroBg =
    'https://assets.finn.no/img/realestate-front/1.0.12/kveldssol_md.webp';

  return (
    <div dir="rtl" className="relative">
      {/* HERO full-bleed */}
      <section className="relative w-screen left-1/2 -translate-x-1/2 h-[350px] overflow-hidden">
        <img
          src={heroBg}
          alt="خلفية رئيسية"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            ابحث عن عقارك المثالي
          </h1>
          <p className="text-lg md:text-xl mb-6">
            آلاف العقارات في جميع أنحاء سوريا
          </p>
          <form
            onSubmit={onSearch}
            className="flex flex-col sm:flex-row gap-2 max-w-2xl w-full"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن عنوان أو مكان أو رمز بريدي"
                className="w-full py-3 pr-10 pl-4 rounded-full text-gray-800"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-white text-gray-900 rounded-full font-medium"
            >
              بحث
            </button>
            <button
              type="button"
              className="flex items-center space-x-2 space-x-reverse px-4 py-3 bg-white text-gray-900 rounded-full font-medium"
            >
              <MapPin className="w-5 h-5" />
              <span>خريطة</span>
            </button>
          </form>
        </div>

        {/* التبويبات */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-12 space-x-reverse border-b-2 border-white/70 pb-2">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`pb-1 text-lg font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-white border-b-2 border-green-500'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* التصنيفات الفرعية - قابلة للنقر للانتقال لصفحات الفلترة */}
      <div className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            اختر التصنيف الفرعي للبحث المتقدم
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SUB_CATEGORIES[activeTab].map(({ label, icon: Icon, path }, index) => (
              <button
                key={`${label}-${index}`}
                type="button"
                onClick={() => handleSubCategoryClick(path)}
                className="flex items-center justify-center space-x-2 space-x-reverse px-4 py-3 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition group"
              >
                <Icon className="w-6 h-6 text-gray-600 group-hover:text-green-600" />
                <span className="text-base font-medium text-gray-700 group-hover:text-green-700">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي - عرض بسيط للإعلانات */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* شريط المعلومات */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  عقارات {activeTab}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  للبحث المتقدم والفلترة، اختر التصنيف الفرعي أعلاه
                </p>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="text-sm text-gray-600">
                  {data?.pages[0]?.count || 0} إعلان
                </span>
                <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">عرض على الخريطة</span>
                </button>
              </div>
            </div>
          </div>

          {/* شبكة الإعلانات */}
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center text-red-600">
              حدث خطأ أثناء جلب العقارات.
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-600 mb-4">لا توجد عقارات في هذا التصنيف</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>

              <div className="py-8 text-center">
                {isFetchingNextPage ? (
                  <LoadingSpinner />
                ) : hasNextPage ? (
                  <div ref={ref} className="h-6" />
                ) : (
                  <p className="text-gray-500">
                    لا توجد المزيد من العقارات.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}