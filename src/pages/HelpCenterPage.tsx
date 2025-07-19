// src/pages/HelpCenterPage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  Shield,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  Book,
  Users,
  Settings,
  CreditCard,
  Car,
  Home,
  Star,
  Clock,
  Plus,
} from 'lucide-react';

// فئات المساعدة
const helpCategories = [
  {
    id: 'getting-started',
    title: 'البدء مع الموقع',
    icon: Book,
    color: 'bg-blue-500',
    articles: [
      { title: 'كيفية إنشاء حساب جديد', views: 1250 },
      { title: 'دليل المستخدم الجديد', views: 980 },
      { title: 'كيفية تصفح الإعلانات', views: 756 },
      { title: 'إعداد الملف الشخصي', views: 634 },
    ]
  },
  {
    id: 'posting-ads',
    title: 'نشر الإعلانات',
    icon: Plus,
    color: 'bg-green-500',
    articles: [
      { title: 'كيفية إنشاء إعلان جديد', views: 2100 },
      { title: 'نصائح لإعلان ناجح', views: 1890 },
      { title: 'رفع الصور وتحسينها', views: 1456 },
      { title: 'تحديد السعر المناسب', views: 1234 },
    ]
  },
  {
    id: 'account-settings',
    title: 'إعدادات الحساب',
    icon: Settings,
    color: 'bg-purple-500',
    articles: [
      { title: 'تغيير كلمة المرور', views: 890 },
      { title: 'إعدادات الخصوصية', views: 756 },
      { title: 'إدارة التنبيهات', views: 645 },
      { title: 'حذف الحساب', views: 423 },
    ]
  },
  {
    id: 'payments',
    title: 'المدفوعات والفواتير',
    icon: CreditCard,
    color: 'bg-orange-500',
    articles: [
      { title: 'طرق الدفع المتاحة', views: 1123 },
      { title: 'الإعلانات المميزة', views: 967 },
      { title: 'استرداد المدفوعات', views: 534 },
      { title: 'الفواتير والإيصالات', views: 445 },
    ]
  },
  {
    id: 'safety',
    title: 'الأمان والحماية',
    icon: Shield,
    color: 'bg-red-500',
    articles: [
      { title: 'نصائح الأمان عند الشراء', views: 1567 },
      { title: 'كيفية تجنب الاحتيال', views: 1345 },
      { title: 'الإبلاغ عن إعلان مشبوه', views: 876 },
      { title: 'حماية المعلومات الشخصية', views: 654 },
    ]
  },
  {
    id: 'technical',
    title: 'المشاكل التقنية',
    icon: AlertTriangle,
    color: 'bg-yellow-500',
    articles: [
      { title: 'مشاكل تسجيل الدخول', views: 789 },
      { title: 'مشاكل رفع الصور', views: 567 },
      { title: 'بطء الموقع', views: 456 },
      { title: 'مشاكل التطبيق المحمول', views: 345 },
    ]
  },
];

// الأسئلة الشائعة
const faqData = [
  {
    question: 'كيف يمكنني إنشاء إعلان جديد؟',
    answer: 'يمكنك إنشاء إعلان جديد من خلال النقر على زر "إضافة إعلان" في الشريط العلوي، ثم ملء النموذج بالمعلومات المطلوبة وإضافة الصور.'
  },
  {
    question: 'هل الموقع مجاني الاستخدام؟',
    answer: 'نعم، التسجيل وتصفح الإعلانات مجاني تماماً. هناك رسوم اختيارية للإعلانات المميزة والخدمات الإضافية.'
  },
  {
    question: 'كيف يمكنني التواصل مع البائع؟',
    answer: 'يمكنك التواصل مع البائع من خلال نظام الرسائل الداخلي في الموقع، أو من خلال معلومات الاتصال المتوفرة في الإعلان.'
  },
  {
    question: 'ماذا أفعل إذا واجهت إعلان مشبوه؟',
    answer: 'يمكنك الإبلاغ عن الإعلان المشبوه من خلال النقر على زر "الإبلاغ" في صفحة الإعلان، وسيقوم فريقنا بمراجعته.'
  },
  {
    question: 'كيف يمكنني حذف إعلاني؟',
    answer: 'يمكنك حذف إعلانك من خلال الذهاب إلى صفحة الإعلان والنقر على زر "حذف" أو من خلال لوحة التحكم الخاصة بك.'
  },
];

const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
              <div className="flex items-center space-x-2 space-x-reverse bg-blue-50 px-3 py-1 rounded-full">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">مركز المساعدة</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* القسم الرئيسي */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">مركز المساعدة</h1>
          <p className="text-xl text-blue-100 mb-8">
            كيف يمكننا مساعدتك اليوم؟
          </p>
          
          {/* شريط البحث */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في مقالات المساعدة..."
              className="w-full pr-12 pl-4 py-4 text-gray-900 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* فئات المساعدة */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            فئات المساعدة
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map(category => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {category.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    {category.articles.slice(0, 3).map((article, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 hover:text-blue-600 cursor-pointer">
                          {article.title}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {article.views} مشاهدة
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-blue-600 text-sm font-medium flex items-center">
                      عرض جميع المقالات
                      <ChevronRight className="w-4 h-4 mr-1" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* الأسئلة الشائعة */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            الأسئلة الشائعة
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronRight 
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedFaq === index ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 pb-4 text-gray-600 border-t border-gray-100">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* طرق التواصل */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            لم تجد ما تبحث عنه؟
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                الدردشة المباشرة
              </h3>
              <p className="text-gray-600 mb-4">
                تحدث مع فريق الدعم مباشرة
              </p>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                بدء المحادثة
              </button>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                البريد الإلكتروني
              </h3>
              <p className="text-gray-600 mb-4">
                أرسل لنا رسالة وسنرد خلال 24 ساعة
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                إرسال رسالة
              </button>
            </div>

            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                الهاتف
              </h3>
              <p className="text-gray-600 mb-4">
                اتصل بنا من 9 صباحاً إلى 6 مساءً
              </p>
              <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                +963 11 123 4567
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;