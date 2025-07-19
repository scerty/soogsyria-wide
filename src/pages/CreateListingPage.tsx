// src/pages/CreateListingPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ListingForm from '../components/listings/ListingForm';
import { ArrowRight, Plus, Info } from 'lucide-react';

const CreateListingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSuccess = () => {
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <Info className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              تسجيل الدخول مطلوب
            </h2>
            <p className="text-gray-600">
              يجب تسجيل الدخول أولاً لتتمكن من إنشاء إعلان جديد
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* شريط التنقل العلوي */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              <span className="font-medium">العودة للرئيسية</span>
            </button>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse bg-green-50 px-3 py-1 rounded-full">
                <Plus className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">إنشاء إعلان جديد</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* رأس الصفحة */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              إنشاء إعلان جديد
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              املأ البيانات التالية لإنشاء إعلانك. تأكد من إدخال معلومات دقيقة وواضحة لجذب المشترين المهتمين.
            </p>
          </div>

          {/* نصائح سريعة */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
              <Info className="w-4 h-4 ml-2" />
              نصائح لإعلان ناجح
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• اكتب عنواناً واضحاً ووصفاً مفصلاً</li>
              <li>• أضف صوراً عالية الجودة من زوايا مختلفة</li>
              <li>• حدد السعر بدقة واختر العملة المناسبة</li>
              <li>• املأ جميع التفاصيل الفنية المطلوبة</li>
            </ul>
          </div>
        </div>

        {/* نموذج الإعلان */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              تفاصيل الإعلان
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              جميع الحقول المميزة بـ (*) مطلوبة
            </p>
          </div>
          
          <div className="p-6">
            <ListingForm 
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            معلومات مهمة
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">سياسة النشر</h4>
              <ul className="space-y-1">
                <li>• يتم مراجعة الإعلانات قبل النشر</li>
                <li>• الإعلانات المخالفة سيتم حذفها</li>
                <li>• يمنع نشر إعلانات وهمية أو مضللة</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">نصائح للصور</h4>
              <ul className="space-y-1">
                <li>• استخدم صوراً واضحة وعالية الجودة</li>
                <li>• أضف صوراً من زوايا مختلفة</li>
                <li>• تجنب الصور المكررة أو المشوشة</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;