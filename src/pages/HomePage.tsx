// src/pages/HomePage.tsx

import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import {
  Search,
  Home,
  Truck,
  Anchor,
  Bike,
  Briefcase,
  Tv,
  Gift,
  Download,
  Star,
  Users,
  Shield,
  Zap,
  Smartphone,
  ArrowRight,
} from 'lucide-react';
import ListingCard from '../components/listings/ListingCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { listingService, PaginatedListings } from '../services/listingService';
import '../index.css';

interface تعريف_التصنيف {
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  filter: { type?: string };
}

const الفئات: تعريف_التصنيف[] = [
  { label: 'الرئيسية',        icon: Home,      filter: {} },
  { label: 'سيارات وتخييم',    icon: Truck,     filter: { type: 'car' } },
  { label: 'قوارب',           icon: Anchor,    filter: {} },
  { label: 'دراجات',          icon: Bike,      filter: {} },
  { label: 'وظائف',           icon: Briefcase, filter: {} },
  { label: 'إلكترونيات',      icon: Tv,        filter: {} },
  { label: 'عقارات',          icon: Gift,      filter: { type: 'real_estate' } },
];

const HomePage: React.FC = () => {
  const limit = 20;

  // حالات البحث والفئة المحددة
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<تعريف_التصنيف['filter']>({});

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PaginatedListings, Error>({
    queryKey: ['listings', selectedCategory, query],
    queryFn: ({ pageParam = 0 }) =>
      listingService.getListings(limit, pageParam, selectedCategory, query),
    getNextPageParam: lastPage => lastPage.nextOffset ?? undefined,
    staleTime: 1000 * 60 * 5,   // 5 دقائق
    cacheTime: 1000 * 60 * 30,  // 30 دقيقة
  });

  // دمج نتائج الصفحات في قائمة واحدة
  const listings = data?.pages.flatMap(p => p.results) ?? [];

  // مراقب نهاية الصفحة للتمرير اللانهائي
  const { ref, inView } = useInView({ rootMargin: '200px' });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // معالج إرسال البحث
  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // عند تغيير query، React Query سيعيد تحميل البيانات تلقائياً
  };

  return (
    <div dir="rtl" className="bg-gray-50 min-h-screen">
      {/* هيرو قسم التطبيق */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 overflow-hidden py-12">
        {/* خلفية مزخرفة */}
        <div className="absolute inset-0 opacity-5 overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full blur-xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* المحتوى النصي */}
            <div className="text-center lg:text-right">
              <div className="inline-flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="text-white text-sm font-medium">جديد! تطبيق سوق سوريا</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                تسوق بسهولة
                <br />
                <span className="text-green-200 animate-pulse">من هاتفك</span>
              </h1>
              
              <p className="text-xl text-green-100 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                اكتشف آلاف الإعلانات، تواصل مع البائعين، واحصل على أفضل العروض - كل ذلك من تطبيق واحد سهل الاستخدام
              </p>

              {/* مميزات سريعة */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center space-x-3 space-x-reverse text-white">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Search className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">بحث سريع</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse text-white">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">تعامل آمن</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse text-white">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">مجتمع موثوق</span>
                </div>
              </div>

              {/* أزرار التحميل */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse mb-6">
                <a
                  href="#"
                  className="inline-flex items-center space-x-3 space-x-reverse bg-black text-white rounded-xl px-6 py-3 hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div className="text-right">
                    <div className="text-xs text-gray-300 leading-none">متوفر على</div>
                    <div className="text-sm font-semibold leading-none">App Store</div>
                  </div>
                </a>
                
                <a
                  href="#"
                  className="inline-flex items-center space-x-3 space-x-reverse bg-black text-white rounded-xl px-6 py-3 hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-right">
                    <div className="text-xs text-gray-300 leading-none">احصل عليه من</div>
                    <div className="text-sm font-semibold leading-none">Google Play</div>
                  </div>
                </a>
              </div>

              {/* إحصائيات سريعة */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 space-x-reverse text-green-100">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Star className="w-4 h-4 text-yellow-300 fill-current" />
                  <span className="text-sm">4.8 تقييم</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">+100K تحميل</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">+50K مستخدم</span>
                </div>
              </div>
            </div>

            {/* صورة الهاتف */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* إطار الهاتف */}
                <div className="relative bg-gray-900 rounded-3xl p-2 shadow-2xl">
                  <div className="bg-white rounded-2xl overflow-hidden w-64 h-[420px] relative">
                    {/* شريط الحالة */}
                    <div className="bg-gray-100 h-6 flex items-center justify-between px-4 text-xs text-gray-600">
                      <span>9:41</span>
                      <div className="flex space-x-1">
                        <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                        <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                        <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* محتوى التطبيق */}
                    <div className="p-4 h-full bg-gradient-to-b from-green-50 to-white">
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-bold text-green-600 mb-1">سوق سوريا</h3>
                        <p className="text-xs text-gray-600">اكتشف أفضل العروض</p>
                      </div>
                      
                      {/* شريط البحث المصغر */}
                      <div className="bg-white rounded-full p-2 mb-4 shadow-sm border">
                        <div className="flex items-center space-x-2 space-x-reverse text-gray-400">
                          <Search className="w-3 h-3" />
                          <span className="text-xs">ابحث عن أي شيء...</span>
                        </div>
                      </div>
                      
                      {/* فئات مصغرة */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {الفئات.slice(1, 7).map((cat, index) => {
                          const Icon = cat.icon;
                          return (
                            <div 
                              key={index} 
                              className="bg-white rounded-lg p-2 text-center shadow-sm"
                            >
                              <Icon className="w-4 h-4 mx-auto mb-1 text-green-600" />
                              <span className="text-[8px] text-gray-600">{cat.label}</span>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* إعلانات مصغرة */}
                      <div className="space-y-2">
                        <div className="bg-white rounded-lg p-2 shadow-sm">
                          <div className="w-full h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 animate-pulse"></div>
                          <div className="text-xs font-medium text-gray-800">تويوتا كامري 2023</div>
                          <div className="text-xs text-green-600 font-bold animate-pulse">85,000 ل.س</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-300 animate-slideInRight">
                          <div className="w-full h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 animate-pulse delay-300"></div>
                          <div className="text-xs font-medium text-gray-800">شقة في المزة</div>
                          <div className="text-xs text-green-600 font-bold animate-pulse delay-500">45M ل.س</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-300 animate-slideInLeft delay-700">
                          <div className="w-full h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 animate-pulse delay-700"></div>
                          <div className="text-xs font-medium text-gray-800">BMW X5 2022</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* عناصر تفاعلية حول الهاتف */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                  <Download className="w-5 h-5 text-green-600" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* شريط البحث الرئيسي */}
      <section className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <form onSubmit={onSearch} className="flex justify-center">
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="ابحث عن iPhone أو fjordhest"
                className="w-full border border-gray-300 rounded-full py-3 pr-4 pl-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* قائمة الفئات */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-center items-center space-x-8 space-x-reverse">
            {الفئات.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory.type === cat.filter.type;
              return (
                <button
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.filter)}
                  className={`flex flex-col items-center text-xs p-2 transition-colors ${
                    isActive ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="font-medium">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* القسم الرئيسي للإعلانات */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <div className="text-center text-red-600 py-12">
            <div className="text-lg font-medium mb-2">خطأ في تحميل الإعلانات</div>
            <div className="text-sm">{error.message}</div>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            <div className="text-lg font-medium mb-2">لم يتم العثور على أي إعلانات</div>
            <div className="text-sm">جرب البحث بكلمات مختلفة أو اختر فئة أخرى</div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                توصيات لك
              </h2>
              <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                <span>{data?.pages[0]?.count || 0} إعلان</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {listings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            {/* sentinel للتمرير اللانهائي */}
            <div className="py-8 text-center">
              {isFetchingNextPage ? (
                <LoadingSpinner />
              ) : hasNextPage ? (
                <div ref={ref} className="h-6" />
              ) : (
                <div className="text-gray-600">
                  <div className="text-lg font-medium mb-2">انتهت الإعلانات</div>
                  <div className="text-sm">لا توجد إعلانات إضافية للعرض</div>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default HomePage;