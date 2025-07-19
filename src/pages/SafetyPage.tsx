// src/pages/SafetyPage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  AlertTriangle,
  Eye,
  Phone,
  CreditCard,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  Info,
  MessageSquare,
  Car,
  Home,
  Flag,
  Lock,
} from 'lucide-react';

const SafetyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'buying' | 'selling' | 'general'>('buying');

  const safetyTips = {
    buying: [
      {
        icon: Eye,
        title: 'تحقق من الإعلان بعناية',
        description: 'اقرأ الوصف كاملاً وتأكد من صحة المعلومات',
        tips: [
          'تحقق من تطابق الصور مع الوصف',
          'ابحث عن تفاصيل واضحة ومحددة',
          'احذر من الأسعار المنخفضة جداً',
          'تأكد من معقولية السعر مقارنة بالسوق',
        ]
      },
      {
        icon: Phone,
        title: 'تواصل بحذر',
        description: 'استخدم وسائل التواصل الآمنة',
        tips: [
          'ابدأ بالرسائل عبر الموقع',
          'لا تشارك معلومات شخصية حساسة',
          'احذر من طلبات التحويل الفوري',
          'تجنب الروابط المشبوهة',
        ]
      },
      {
        icon: MapPin,
        title: 'اختر مكان آمن للقاء',
        description: 'التقي في أماكن عامة ومزدحمة',
        tips: [
          'اختر مكاناً عاماً ومضاءً جيداً',
          'اصطحب صديقاً معك إن أمكن',
          'التقي في ساعات النهار',
          'أخبر شخصاً تثق به عن موعدك',
        ]
      },
      {
        icon: CreditCard,
        title: 'ادفع بأمان',
        description: 'استخدم طرق دفع آمنة وموثوقة',
        tips: [
          'تجنب الدفع المسبق قبل المعاينة',
          'استخدم طرق دفع قابلة للتتبع',
          'احتفظ بإيصالات الدفع',
          'لا تدفع عبر حوالات مجهولة',
        ]
      },
    ],
    selling: [
      {
        icon: Users,
        title: 'تحقق من هوية المشتري',
        description: 'تأكد من جدية المشتري قبل اللقاء',
        tips: [
          'اطلب معلومات اتصال واضحة',
          'تحقق من جدية الاستفسارات',
          'احذر من العروض المبالغ فيها',
          'تجنب المشترين المتعجلين بشكل مشبوه',
        ]
      },
      {
        icon: MapPin,
        title: 'اختر مكان آمن للعرض',
        description: 'اعرض سلعتك في مكان آمن',
        tips: [
          'استقبل المشترين في مكان عام',
          'لا تدع الغرباء يدخلون منزلك',
          'اصطحب صديقاً عند عرض سلع ثمينة',
          'تجنب اللقاءات في أماكن منعزلة',
        ]
      },
      {
        icon: CreditCard,
        title: 'اقبض المال بأمان',
        description: 'تأكد من صحة الدفع قبل التسليم',
        tips: [
          'تحقق من صحة الأوراق النقدية',
          'استخدم تطبيقات الدفع الموثوقة',
          'لا تسلم السلعة قبل تأكيد الدفع',
          'احتفظ بإيصال البيع',
        ]
      },
      {
        icon: Shield,
        title: 'احم معلوماتك الشخصية',
        description: 'لا تشارك معلومات حساسة',
        tips: [
          'لا تشارك رقم هويتك الشخصية',
          'تجنب إعطاء عنوان منزلك الدقيق',
          'استخدم رقم هاتف للتواصل التجاري',
          'احذر من طلبات المعلومات المصرفية',
        ]
      },
    ],
    general: [
      {
        icon: Flag,
        title: 'كيفية الإبلاغ عن المشاكل',
        description: 'ساعدنا في الحفاظ على أمان المجتمع',
        tips: [
          'أبلغ عن الإعلانات المشبوهة فوراً',
          'استخدم زر "الإبلاغ" في كل إعلان',
          'قدم تفاصيل واضحة عن المشكلة',
          'احتفظ بلقطات شاشة كدليل',
        ]
      },
      {
        icon: Lock,
        title: 'حماية الحساب',
        description: 'احم حسابك من الاختراق',
        tips: [
          'استخدم كلمة مرور قوية وفريدة',
          'فعّل المصادقة الثنائية إن أمكن',
          'لا تشارك بيانات دخولك مع أحد',
          'سجل خروج من الأجهزة العامة',
        ]
      },
      {
        icon: MessageSquare,
        title: 'التواصل الآمن',
        description: 'استخدم قنوات التواصل الآمنة',
        tips: [
          'ابدأ المحادثات عبر نظام الرسائل',
          'تجنب مشاركة معلومات حساسة',
          'احذر من الروابط المشبوهة',
          'أبلغ عن الرسائل المسيئة',
        ]
      },
    ]
  };

  const redFlags = [
    {
      icon: XCircle,
      title: 'أسعار منخفضة جداً',
      description: 'أسعار أقل بكثير من السوق قد تكون مؤشر على احتيال'
    },
    {
      icon: XCircle,
      title: 'طلب دفع مسبق',
      description: 'طلب تحويل أموال قبل المعاينة أو اللقاء'
    },
    {
      icon: XCircle,
      title: 'معلومات غير واضحة',
      description: 'إعلانات بمعلومات ناقصة أو غامضة'
    },
    {
      icon: XCircle,
      title: 'ضغط للإسراع',
      description: 'محاولة الضغط عليك لاتخاذ قرار سريع'
    },
    {
      icon: XCircle,
      title: 'رفض اللقاء',
      description: 'رفض اللقاء الشخصي أو المعاينة'
    },
    {
      icon: XCircle,
      title: 'طلب معلومات حساسة',
      description: 'طلب معلومات مصرفية أو شخصية غير ضرورية'
    },
  ];

  const goodPractices = [
    {
      icon: CheckCircle,
      title: 'صور واضحة ومتعددة',
      description: 'إعلانات بصور عالية الجودة من زوايا مختلفة'
    },
    {
      icon: CheckCircle,
      title: 'وصف مفصل ودقيق',
      description: 'معلومات شاملة وصادقة عن السلعة'
    },
    {
      icon: CheckCircle,
      title: 'أسعار معقولة',
      description: 'أسعار متوافقة مع السوق المحلي'
    },
    {
      icon: CheckCircle,
      title: 'معلومات اتصال واضحة',
      description: 'بيانات تواصل صحيحة وقابلة للتحقق'
    },
    {
      icon: CheckCircle,
      title: 'استجابة سريعة',
      description: 'رد سريع ومهذب على الاستفسارات'
    },
    {
      icon: CheckCircle,
      title: 'مرونة في المواعيد',
      description: 'استعداد لترتيب مواعيد مناسبة للمعاينة'
    },
  ];

  const emergencyContacts = [
    {
      title: 'الشرطة',
      number: '112',
      description: 'للحالات الطارئة والجرائم'
    },
    {
      title: 'الدفاع المدني',
      number: '113',
      description: 'للحوادث والطوارئ'
    },
    {
      title: 'دعم سوق سوريا',
      number: '+963 11 123 4567',
      description: 'للإبلاغ عن مشاكل الموقع'
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* شريط التنقل العلوي */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              <span className="font-medium">العودة للرئيسية</span>
            </Link>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse bg-red-50 px-3 py-1 rounded-full">
                <Shield className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">قواعد الأمان</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* القسم الرئيسي */}
      <div className="bg-gradient-to-br from-red-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">قواعد الأمان</h1>
          <p className="text-xl text-red-100">
            دليلك الشامل للتعامل الآمن في سوق سوريا
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* تبويبات النصائح */}
        <div className="mb-12">
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
              <div className="flex space-x-1 space-x-reverse">
                {[
                  { key: 'buying', label: 'نصائح للمشترين', icon: Car },
                  { key: 'selling', label: 'نصائح للبائعين', icon: Home },
                  { key: 'general', label: 'نصائح عامة', icon: Shield },
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-lg transition-colors ${
                        activeTab === tab.key
                          ? 'bg-red-600 text-white'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* محتوى التبويبات */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {safetyTips[activeTab].map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                      <p className="text-gray-600 text-sm">{tip.description}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {tip.tips.map((tipItem, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-2 space-x-reverse">
                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{tipItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* العلامات التحذيرية */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            علامات تحذيرية - احذر منها!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {redFlags.map((flag, index) => {
              const Icon = flag.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-red-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3 space-x-reverse mb-3">
                    <Icon className="w-8 h-8 text-red-600" />
                    <h3 className="font-semibold text-gray-900">{flag.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{flag.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* الممارسات الجيدة */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            علامات الثقة - ابحث عنها!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goodPractices.map((practice, index) => {
              const Icon = practice.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-green-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3 space-x-reverse mb-3">
                    <Icon className="w-8 h-8 text-green-600" />
                    <h3 className="font-semibold text-gray-900">{practice.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{practice.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* أرقام الطوارئ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            أرقام مهمة للطوارئ
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center"
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {contact.title}
                </h3>
                <p className="text-2xl font-bold text-red-600 mb-2">
                  {contact.number}
                </p>
                <p className="text-gray-600 text-sm">
                  {contact.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* نصائح إضافية */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              نصائح إضافية للأمان
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">للسيارات</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2 space-x-reverse">
                  <Car className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>تحقق من أوراق السيارة والترخيص</span>
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <Car className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>اطلب فحص فني من مختص</span>
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <Car className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>تأكد من عدم وجود رهن أو حجز</span>
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <Car className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>اختبر السيارة في ظروف مختلفة</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">للعقارات</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2 space-x-reverse">
                  <Home className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>تحقق من سند الملكية</span>
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <Home className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>زر العقار في أوقات مختلفة</span>
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <Home className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>تأكد من الخدمات المتوفرة</span>
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <Home className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>استشر خبير عقاري</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* دعوة للعمل */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ساعدنا في الحفاظ على أمان المجتمع
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            إذا واجهت أي مشكلة أو لاحظت نشاطاً مشبوهاً، لا تتردد في الإبلاغ عنه. 
            معاً نستطيع جعل سوق سوريا مكاناً آمناً للجميع.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
            <Link
              to="/contact"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              الإبلاغ عن مشكلة
            </Link>
            <Link
              to="/help"
              className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              مركز المساعدة
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyPage;