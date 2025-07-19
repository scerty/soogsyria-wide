// src/components/common/Layout.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Plus, MessageSquare, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* شريط التنقل العلوي */}
      <nav className="bg-white/95  py-3        backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            {/* الشعار */}
            <Link to="/" className="flex items-center space-x-3 space-x-reverse group">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent group-hover:from-green-700 group-hover:to-emerald-700 transition-all duration-300">
                سوق سوريا
              </span>
            </Link>

            {/* أزرار تحميل التطبيق - في الوسط */}
            <div className="hidden lg:flex items-center space-x-3 space-x-reverse">
              <div className="text-sm text-gray-600 font-medium ml-3">حمّل التطبيق:</div>
              <a
                href="#"
                className="inline-flex items-center space-x-2 space-x-reverse bg-black text-white rounded-lg px-3 py-2 text-xs hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div className="text-right">
                  <div className="text-[10px] text-gray-300 leading-none">متوفر على</div>
                  <div className="text-xs font-semibold leading-none">App Store</div>
                </div>
              </a>
              
              <a
                href="#"
                className="inline-flex items-center space-x-2 space-x-reverse bg-black text-white rounded-lg px-3 py-2 text-xs hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-right">
                  <div className="text-[10px] text-gray-300 leading-none">احصل عليه من</div>
                  <div className="text-xs font-semibold leading-none">Google Play</div>
                </div>
              </a>
            </div>
            
            {/* روابط الإجراءات */}
            <div className="flex items-center space-x-6 space-x-reverse">
              {/* التنبيهات */}
              <Link
                to="/alerts"
                className="relative flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-green-600 transition-all duration-300 group"
              >
                <div className="relative p-2 rounded-lg group-hover:bg-green-50 transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4">
                    3
                  </span>
                </div>
                <span className="hidden md:block text-sm font-medium">التنبيهات</span>
              </Link>

              {/* إضافة إعلان */}
              <Link
                to="/create"
                className="flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg group"
              >
                <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-sm font-medium">إضافة إعلان</span>
              </Link>

              {/* الرسائل */}
              <Link
                to="/messages"
                className="relative flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-blue-600 transition-all duration-300 group"
              >
                <div className="relative p-2 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex items-center justify-center bg-blue-500 text-white text-[10px] font-bold rounded-full w-4 h-4">
                    5
                  </span>
                </div>
                <span className="hidden md:block text-sm font-medium">الرسائل</span>
              </Link>

              {/* تسجيل دخول/خروج */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-purple-600 transition-all duration-300 group"
                  >
                    <div className="relative">
                      <img
                        src="https://ui-avatars.com/api/?name=أحمد محمد&background=10b981&color=fff&size=32"
                        alt="الصورة الشخصية"
                        className="w-8 h-8 rounded-full border-2 border-gray-200 group-hover:border-purple-300 transition-colors"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <span className="hidden md:block text-sm font-medium">ملفي</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 space-x-reverse text-gray-500 hover:text-red-600 transition-all duration-300 p-2 rounded-lg hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden lg:block text-sm font-medium">خروج</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 space-x-reverse bg-white text-green-600 border-2 border-green-600 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="text-sm font-medium">تسجيل دخول</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <main className="pb-8">{children}</main>

      {/* الفوتر */}
      <footer className="bg-gray-900 text-white" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* القسم الرئيسي للفوتر */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* معلومات الموقع */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <span className="text-2xl font-bold text-green-400">
                  سوق سوريا
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                منصة سوق سوريا هي الوجهة الأولى للبيع والشراء في سوريا. نوفر بيئة آمنة وموثوقة للتجارة الإلكترونية مع خدمات متميزة لجميع المستخدمين.
              </p>
              
              {/* أزرار تحميل التطبيق */}
              <div className="flex space-x-2 space-x-reverse">
                <a
                  href="#"
                  className="inline-flex items-center space-x-1 space-x-reverse bg-black rounded-lg px-3 py-2 hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-4 h-4 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div className="text-right">
                    <div className="text-xs text-gray-300 leading-none">متوفر على</div>
                    <div className="text-sm font-semibold text-white leading-none">App Store</div>
                  </div>
                </a>
                
                <a
                  href="#"
                  className="inline-flex items-center space-x-1 space-x-reverse bg-black rounded-lg px-3 py-2 hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-4 h-4 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-right">
                    <div className="text-xs text-gray-300 leading-none">احصل عليه من</div>
                    <div className="text-sm font-semibold text-white leading-none">Google Play</div>
                  </div>
                </a>
              </div>
              
              {/* روابط التواصل الاجتماعي */}
              <div className="flex space-x-4 space-x-reverse mt-4">
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* روابط سريعة */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link to="/cars" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    السيارات
                  </Link>
                </li>
                <li>
                  <Link to="/properties" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    العقارات
                  </Link>
                </li>
                <li>
                  <Link to="/create" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    إضافة إعلان
                  </Link>
                </li>
                <li>
                  <Link to="/messages" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    الرسائل
                  </Link>
                </li>
                <li>
                  <Link to="/alerts" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    التنبيهات
                  </Link>
                </li>
              </ul>
            </div>

            {/* الفئات */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">الفئات</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/cars" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    سيارات وتخييم
                  </Link>
                </li>
                <li>
                  <Link to="/properties" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    عقارات
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    قوارب
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    دراجات
                  </a>
                </li>
                <li>
                  <Link to="/jobs" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    وظائف
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    إلكترونيات
                  </a>
                </li>
              </ul>
            </div>

            {/* الدعم والمساعدة */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">الدعم والمساعدة</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/help" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    مركز المساعدة
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    شروط الاستخدام
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link to="/safety" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    قواعد الأمان
                  </Link>
                </li>
                <li>
                  <Link to="/report" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    الإبلاغ عن مشكلة
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* معلومات الاتصال */}
          <div className="border-t border-gray-800 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium">اتصل بنا</h4>
                  <p className="text-gray-300 text-sm">+963 11 123 4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium">راسلنا</h4>
                  <p className="text-gray-300 text-sm">info@sooqsyria.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium">موقعنا</h4>
                  <p className="text-gray-300 text-sm">دمشق، سوريا</p>
                </div>
              </div>
            </div>
          </div>

          {/* حقوق النشر */}
          <div className="border-t border-gray-800 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 md:space-x-reverse mb-4 md:mb-0">
                <div className="text-gray-400 text-sm">
                  © 2024 سوق سوريا. جميع الحقوق محفوظة.
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-sm">
                  <span className="text-gray-500">تطوير</span>
                  <a 
                    href="https://devsy.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 space-x-reverse text-green-400 hover:text-green-300 transition-colors font-medium"
                  >
                    <span>DevSy</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-6 space-x-reverse text-sm">
                <Link to="/terms" className="text-gray-400 hover:text-green-400 transition-colors">
                  الشروط والأحكام
                </Link>
                <Link to="/privacy" className="text-gray-400 hover:text-green-400 transition-colors">
                  سياسة الخصوصية
                </Link>
                <Link to="/privacy" className="text-gray-400 hover:text-green-400 transition-colors">
                  سياسة الكوكيز
                </Link>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse text-gray-600 text-sm">
                <Link to="/furniture" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  أثاث وإلكترونيات
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;