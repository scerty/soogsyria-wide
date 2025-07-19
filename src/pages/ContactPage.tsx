// src/pages/ContactPage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  User,
  Building,
} from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  category: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
}

const ContactPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      // محاكاة إرسال النموذج
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Contact form data:', data);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'الهاتف',
      description: 'اتصل بنا مباشرة',
      value: '+963 11 123 4567',
      action: 'tel:+963111234567',
      color: 'bg-green-500',
      available: 'من 9 صباحاً إلى 6 مساءً',
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      description: 'أرسل لنا رسالة',
      value: 'support@sooqsyria.com',
      action: 'mailto:support@sooqsyria.com',
      color: 'bg-blue-500',
      available: 'نرد خلال 24 ساعة',
    },
    {
      icon: MessageSquare,
      title: 'الدردشة المباشرة',
      description: 'تحدث معنا مباشرة',
      value: 'متاح الآن',
      action: '#',
      color: 'bg-purple-500',
      available: 'من 9 صباحاً إلى 10 مساءً',
    },
    {
      icon: MapPin,
      title: 'الموقع',
      description: 'زرنا في مكتبنا',
      value: 'دمشق، المزة، شارع الجلاء',
      action: '#',
      color: 'bg-orange-500',
      available: 'من الأحد إلى الخميس',
    },
  ];

  const categories = [
    { value: 'general', label: 'استفسار عام' },
    { value: 'technical', label: 'مشكلة تقنية' },
    { value: 'account', label: 'مشكلة في الحساب' },
    { value: 'payment', label: 'مشكلة في الدفع' },
    { value: 'report', label: 'الإبلاغ عن مشكلة' },
    { value: 'suggestion', label: 'اقتراح أو تحسين' },
  ];

  if (isSubmitted) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            تم إرسال رسالتك بنجاح!
          </h2>
          <p className="text-gray-600 mb-6">
            شكراً لتواصلك معنا. سنقوم بالرد على رسالتك في أقرب وقت ممكن.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              إرسال رسالة أخرى
            </button>
            <Link
              to="/"
              className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              العودة للرئيسية
            </Link>
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
            <Link
              to="/"
              className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              <span className="font-medium">العودة للرئيسية</span>
            </Link>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse bg-blue-50 px-3 py-1 rounded-full">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">اتصل بنا</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* القسم الرئيسي */}
      <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">اتصل بنا</h1>
          <p className="text-xl text-blue-100">
            نحن هنا لمساعدتك. تواصل معنا بأي طريقة تناسبك
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* طرق التواصل */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            طرق التواصل
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {method.description}
                  </p>
                  <p className="font-medium text-gray-900 mb-2">
                    {method.value}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    {method.available}
                  </p>
                  <a
                    href={method.action}
                    className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    تواصل الآن
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* نموذج التواصل */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* النموذج */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              أرسل لنا رسالة
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم الكامل *
                  </label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('name', { required: 'الاسم مطلوب' })}
                      type="text"
                      className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني *
                  </label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('email', { 
                        required: 'البريد الإلكتروني مطلوب',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'البريد الإلكتروني غير صحيح'
                        }
                      })}
                      type="email"
                      className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف
                  </label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="رقم الهاتف (اختياري)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    فئة الاستفسار *
                  </label>
                  <select
                    {...register('category', { required: 'فئة الاستفسار مطلوبة' })}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">اختر فئة الاستفسار</option>
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  موضوع الرسالة *
                </label>
                <input
                  {...register('subject', { required: 'موضوع الرسالة مطلوب' })}
                  type="text"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="اكتب موضوع رسالتك"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  أولوية الرسالة
                </label>
                <div className="flex space-x-4 space-x-reverse">
                  {[
                    { value: 'low', label: 'منخفضة', color: 'text-green-600' },
                    { value: 'medium', label: 'متوسطة', color: 'text-yellow-600' },
                    { value: 'high', label: 'عالية', color: 'text-red-600' },
                  ].map(priority => (
                    <label key={priority.value} className="flex items-center">
                      <input
                        {...register('priority')}
                        type="radio"
                        value={priority.value}
                        className="ml-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`text-sm ${priority.color}`}>
                        {priority.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نص الرسالة *
                </label>
                <textarea
                  {...register('message', { required: 'نص الرسالة مطلوب' })}
                  rows={6}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="اكتب رسالتك هنا..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 space-x-reverse"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>جاري الإرسال...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>إرسال الرسالة</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* معلومات إضافية */}
          <div className="space-y-8">
            {/* ساعات العمل */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">ساعات العمل</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">الأحد - الخميس</span>
                  <span className="font-medium">9:00 ص - 6:00 م</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الجمعة</span>
                  <span className="font-medium">10:00 ص - 4:00 م</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">السبت</span>
                  <span className="font-medium text-red-600">مغلق</span>
                </div>
              </div>
            </div>

            {/* معلومات الشركة */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <Building className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">معلومات الشركة</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">اسم الشركة:</span>
                  <span className="font-medium mr-2">سوق سوريا للتجارة الإلكترونية</span>
                </div>
                <div>
                  <span className="text-gray-600">العنوان:</span>
                  <span className="font-medium mr-2">دمشق، المزة، شارع الجلاء، مبنى رقم 123</span>
                </div>
                <div>
                  <span className="text-gray-600">الرمز البريدي:</span>
                  <span className="font-medium mr-2">12345</span>
                </div>
              </div>
            </div>

            {/* نصائح للتواصل */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <AlertCircle className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">نصائح للحصول على رد سريع</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• اختر فئة الاستفسار المناسبة</li>
                <li>• اكتب موضوعاً واضحاً ومحدداً</li>
                <li>• قدم تفاصيل كافية عن مشكلتك</li>
                <li>• أرفق لقطات شاشة إذا كانت مفيدة</li>
                <li>• تأكد من صحة بريدك الإلكتروني</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;