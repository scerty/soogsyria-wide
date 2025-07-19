// src/pages/ReportPage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  ArrowRight,
  Flag,
  AlertTriangle,
  Shield,
  MessageSquare,
  User,
  FileText,
  Send,
  CheckCircle,
  Camera,
  Upload,
  X,
} from 'lucide-react';

interface ReportFormData {
  reportType: string;
  listingId?: string;
  userId?: string;
  category: string;
  subject: string;
  description: string;
  evidence: string[];
  contactInfo: string;
  anonymous: boolean;
}

const ReportPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<ReportFormData>();

  const reportType = watch('reportType');

  const onSubmit = async (data: ReportFormData) => {
    setIsLoading(true);
    try {
      // محاكاة إرسال التقرير
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Report data:', { ...data, evidence: uploadedFiles });
      setIsSubmitted(true);
      reset();
      setUploadedFiles([]);
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // محاكاة رفع الملفات
    const newFiles = Array.from(files).map(file => URL.createObjectURL(file));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const reportCategories = {
    listing: [
      { value: 'fake', label: 'إعلان وهمي أو مضلل' },
      { value: 'inappropriate', label: 'محتوى غير لائق' },
      { value: 'spam', label: 'إعلان مكرر أو سبام' },
      { value: 'prohibited', label: 'سلعة محظورة' },
      { value: 'price', label: 'سعر مضلل' },
      { value: 'copyright', label: 'انتهاك حقوق الطبع' },
    ],
    user: [
      { value: 'harassment', label: 'تحرش أو إساءة' },
      { value: 'fraud', label: 'محاولة احتيال' },
      { value: 'impersonation', label: 'انتحال شخصية' },
      { value: 'spam_messages', label: 'رسائل مزعجة' },
      { value: 'inappropriate_behavior', label: 'سلوك غير لائق' },
    ],
    technical: [
      { value: 'bug', label: 'خطأ في الموقع' },
      { value: 'security', label: 'مشكلة أمنية' },
      { value: 'performance', label: 'بطء أو مشاكل في الأداء' },
      { value: 'feature', label: 'طلب ميزة جديدة' },
    ],
    other: [
      { value: 'suggestion', label: 'اقتراح تحسين' },
      { value: 'complaint', label: 'شكوى عامة' },
      { value: 'legal', label: 'مسألة قانونية' },
      { value: 'other', label: 'أخرى' },
    ]
  };

  if (isSubmitted) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            تم إرسال التقرير بنجاح!
          </h2>
          <p className="text-gray-600 mb-6">
            شكراً لك على مساعدتنا في الحفاظ على أمان المجتمع. سنراجع تقريرك ونتخذ الإجراء المناسب.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              إرسال تقرير آخر
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
              <div className="flex items-center space-x-2 space-x-reverse bg-red-50 px-3 py-1 rounded-full">
                <Flag className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">الإبلاغ عن مشكلة</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* القسم الرئيسي */}
      <div className="bg-gradient-to-br from-red-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">الإبلاغ عن مشكلة</h1>
          <p className="text-xl text-red-100">
            ساعدنا في الحفاظ على أمان وجودة المجتمع
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* معلومات مهمة */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3 space-x-reverse">
            <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                معلومات مهمة قبل الإبلاغ
              </h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• جميع التقارير تُراجع من قبل فريقنا المختص</li>
                <li>• يمكنك الإبلاغ بشكل مجهول إذا رغبت في ذلك</li>
                <li>• قدم أكبر قدر من التفاصيل لمساعدتنا في المراجعة</li>
                <li>• أرفق أدلة (صور، لقطات شاشة) إن أمكن</li>
                <li>• سنتواصل معك إذا احتجنا معلومات إضافية</li>
              </ul>
            </div>
          </div>
        </div>

        {/* نموذج الإبلاغ */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            تفاصيل التقرير
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* نوع التقرير */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                نوع التقرير *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { value: 'listing', label: 'إعلان', icon: FileText, color: 'blue' },
                  { value: 'user', label: 'مستخدم', icon: User, color: 'green' },
                  { value: 'technical', label: 'مشكلة تقنية', icon: AlertTriangle, color: 'orange' },
                  { value: 'other', label: 'أخرى', icon: MessageSquare, color: 'purple' },
                ].map(type => {
                  const Icon = type.icon;
                  return (
                    <label
                      key={type.value}
                      className={`relative flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        reportType === type.value
                          ? `border-${type.color}-500 bg-${type.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        {...register('reportType', { required: 'نوع التقرير مطلوب' })}
                        type="radio"
                        value={type.value}
                        className="sr-only"
                      />
                      <Icon className={`w-8 h-8 mb-2 ${
                        reportType === type.value ? `text-${type.color}-600` : 'text-gray-400'
                      }`} />
                      <span className={`text-sm font-medium ${
                        reportType === type.value ? `text-${type.color}-900` : 'text-gray-700'
                      }`}>
                        {type.label}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.reportType && (
                <p className="mt-1 text-sm text-red-600">{errors.reportType.message}</p>
              )}
            </div>

            {/* معرف الإعلان أو المستخدم */}
            {(reportType === 'listing' || reportType === 'user') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {reportType === 'listing' ? 'رقم الإعلان أو رابطه' : 'اسم المستخدم أو معرفه'}
                </label>
                <input
                  {...register(reportType === 'listing' ? 'listingId' : 'userId')}
                  type="text"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder={reportType === 'listing' ? 'مثال: 12345 أو https://sooqsyria.com/listings/12345' : 'مثال: أحمد_محمد'}
                />
              </div>
            )}

            {/* فئة المشكلة */}
            {reportType && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  فئة المشكلة *
                </label>
                <select
                  {...register('category', { required: 'فئة المشكلة مطلوبة' })}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">اختر فئة المشكلة</option>
                  {reportCategories[reportType as keyof typeof reportCategories]?.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>
            )}

            {/* موضوع التقرير */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                موضوع التقرير *
              </label>
              <input
                {...register('subject', { required: 'موضوع التقرير مطلوب' })}
                type="text"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="اكتب موضوعاً مختصراً وواضحاً"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
              )}
            </div>

            {/* وصف المشكلة */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وصف تفصيلي للمشكلة *
              </label>
              <textarea
                {...register('description', { required: 'وصف المشكلة مطلوب' })}
                rows={6}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="اشرح المشكلة بالتفصيل، متى حدثت، وأي معلومات أخرى مفيدة..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* رفع الأدلة */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                أدلة (صور، لقطات شاشة)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    اسحب الملفات هنا أو انقر للاختيار
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>اختيار ملفات</span>
                  </label>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={file}
                          alt={`دليل ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* معلومات الاتصال */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                معلومات الاتصال (اختياري)
              </label>
              <input
                {...register('contactInfo')}
                type="text"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="بريد إلكتروني أو رقم هاتف للتواصل معك إذا احتجنا توضيحات"
              />
            </div>

            {/* إبلاغ مجهول */}
            <div className="flex items-center">
              <input
                {...register('anonymous')}
                type="checkbox"
                id="anonymous"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="anonymous" className="mr-2 block text-sm text-gray-700">
                أريد الإبلاغ بشكل مجهول (لن نتواصل معك)
              </label>
            </div>

            {/* زر الإرسال */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 space-x-reverse"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>جاري الإرسال...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>إرسال التقرير</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* معلومات إضافية */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            ماذا يحدث بعد الإبلاغ؟
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">1. المراجعة</h4>
              <p className="text-gray-600 text-sm">
                فريقنا يراجع التقرير خلال 24-48 ساعة
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">2. التحقيق</h4>
              <p className="text-gray-600 text-sm">
                نحقق في المشكلة ونجمع المعلومات اللازمة
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">3. الإجراء</h4>
              <p className="text-gray-600 text-sm">
                نتخذ الإجراء المناسب حسب نوع المشكلة
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;