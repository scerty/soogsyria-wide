// src/pages/TermsPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Scale,
} from 'lucide-react';

const TermsPage: React.FC = () => {
  const lastUpdated = '15 يناير 2024';

  const sections = [
    {
      id: 'acceptance',
      title: '1. قبول الشروط',
      icon: CheckCircle,
      content: `
        باستخدامك لموقع "سوق سوريا" والخدمات المقدمة من خلاله، فإنك توافق على الالتزام بهذه الشروط والأحكام. 
        إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع.
        
        هذه الشروط تشكل اتفاقية قانونية ملزمة بينك وبين شركة سوق سوريا للتجارة الإلكترونية.
      `
    },
    {
      id: 'definitions',
      title: '2. التعريفات',
      icon: FileText,
      content: `
        • "الموقع": يقصد به موقع سوق سوريا الإلكتروني وجميع صفحاته وخدماته
        • "المستخدم": أي شخص يستخدم الموقع أو يتصفحه
        • "البائع": المستخدم الذي ينشر إعلانات لبيع السلع أو الخدمات
        • "المشتري": المستخدم الذي يبحث عن السلع أو الخدمات للشراء
        • "الإعلان": أي محتوى ينشره البائع لعرض سلعة أو خدمة
        • "الشركة": شركة سوق سوريا للتجارة الإلكترونية
      `
    },
    {
      id: 'registration',
      title: '3. التسجيل والحساب',
      icon: Shield,
      content: `
        • يجب أن تكون 18 سنة أو أكثر لإنشاء حساب
        • يجب تقديم معلومات صحيحة ودقيقة عند التسجيل
        • أنت مسؤول عن الحفاظ على سرية كلمة المرور
        • يجب إخطارنا فوراً بأي استخدام غير مصرح به لحسابك
        • لا يُسمح بإنشاء أكثر من حساب واحد لكل شخص
        • نحتفظ بالحق في تعليق أو إلغاء الحسابات المخالفة
      `
    },
    {
      id: 'posting-rules',
      title: '4. قواعد نشر الإعلانات',
      icon: AlertTriangle,
      content: `
        يُمنع نشر الإعلانات التالية:
        • السلع المحظورة قانونياً أو المخالفة للآداب العامة
        • الأسلحة والمتفجرات والمواد الخطرة
        • المخدرات والمواد المخدرة
        • المنتجات المقلدة أو المزيفة
        • الخدمات الجنسية أو المحتوى الإباحي
        • الحيوانات المهددة بالانقراض
        • الوثائق الرسمية أو الهويات
        
        شروط الإعلانات الصحيحة:
        • يجب أن تكون المعلومات دقيقة وصادقة
        • الصور يجب أن تكون للسلعة الفعلية
        • السعر يجب أن يكون واضح ومحدد
        • معلومات الاتصال يجب أن تكون صحيحة
      `
    },
    {
      id: 'user-conduct',
      title: '5. سلوك المستخدمين',
      icon: Scale,
      content: `
        يتعهد المستخدم بما يلي:
        • عدم استخدام الموقع لأغراض غير قانونية
        • عدم انتهاك حقوق الآخرين أو التحرش بهم
        • عدم نشر محتوى مسيء أو مضلل
        • عدم محاولة اختراق الموقع أو إلحاق الضرر به
        • احترام حقوق الملكية الفكرية
        • عدم إرسال رسائل غير مرغوب فيها (سبام)
        • التعامل بصدق وأمانة مع المستخدمين الآخرين
      `
    },
    {
      id: 'transactions',
      title: '6. المعاملات والمدفوعات',
      icon: Clock,
      content: `
        • الموقع يوفر منصة للتواصل بين البائعين والمشترين فقط
        • نحن لسنا طرفاً في المعاملات بين المستخدمين
        • المستخدمون مسؤولون عن التحقق من صحة السلع والخدمات
        • الدفع والتسليم يتم بين البائع والمشتري مباشرة
        • ننصح بالتعامل الحذر واتباع إرشادات الأمان
        • لا نتحمل مسؤولية النزاعات بين المستخدمين
      `
    },
    {
      id: 'intellectual-property',
      title: '7. الملكية الفكرية',
      icon: Shield,
      content: `
        • جميع حقوق الموقع محفوظة لشركة سوق سوريا
        • لا يحق للمستخدمين نسخ أو توزيع محتوى الموقع
        • المستخدمون يحتفظون بحقوق المحتوى الذي ينشرونه
        • بنشر المحتوى، تمنح الشركة ترخيصاً لاستخدامه
        • يجب احترام حقوق الملكية الفكرية للآخرين
        • سيتم اتخاذ إجراءات قانونية ضد المخالفين
      `
    },
    {
      id: 'privacy',
      title: '8. الخصوصية وحماية البيانات',
      icon: Shield,
      content: `
        • نحن ملتزمون بحماية خصوصية المستخدمين
        • يتم جمع البيانات وفقاً لسياسة الخصوصية
        • لا نشارك البيانات الشخصية مع أطراف ثالثة دون موافقة
        • نستخدم تقنيات أمان متقدمة لحماية البيانات
        • يحق للمستخدمين طلب حذف بياناتهم
        • نحتفظ بالبيانات للمدة اللازمة لتقديم الخدمة
      `
    },
    {
      id: 'liability',
      title: '9. إخلاء المسؤولية',
      icon: AlertTriangle,
      content: `
        • الموقع يُقدم "كما هو" دون ضمانات
        • لا نضمن دقة أو اكتمال المعلومات المنشورة
        • لا نتحمل مسؤولية الأضرار الناتجة عن استخدام الموقع
        • المستخدمون مسؤولون عن قراراتهم وتصرفاتهم
        • لا نتحمل مسؤولية المحتوى المنشور من قبل المستخدمين
        • استخدام الموقع على مسؤولية المستخدم الشخصية
      `
    },
    {
      id: 'termination',
      title: '10. إنهاء الخدمة',
      icon: AlertTriangle,
      content: `
        • يمكن للمستخدم إلغاء حسابه في أي وقت
        • نحتفظ بالحق في تعليق أو إلغاء الحسابات المخالفة
        • عند إنهاء الحساب، قد نحتفظ ببعض البيانات لأغراض قانونية
        • الإعلانات المنشورة قد تبقى متاحة لفترة محددة
        • بعض الالتزامات تستمر حتى بعد إنهاء الحساب
      `
    },
    {
      id: 'changes',
      title: '11. تعديل الشروط',
      icon: FileText,
      content: `
        • نحتفظ بالحق في تعديل هذه الشروط في أي وقت
        • سيتم إشعار المستخدمين بالتغييرات المهمة
        • استمرار استخدام الموقع يعني قبول التعديلات
        • ننصح بمراجعة الشروط بانتظام
        • التعديلات تصبح سارية فور نشرها على الموقع
      `
    },
    {
      id: 'contact',
      title: '12. التواصل والشكاوى',
      icon: FileText,
      content: `
        للاستفسارات أو الشكاوى المتعلقة بهذه الشروط:
        
        • البريد الإلكتروني: legal@sooqsyria.com
        • الهاتف: +963 11 123 4567
        • العنوان: دمشق، المزة، شارع الجلاء، مبنى رقم 123
        • ساعات العمل: من 9 صباحاً إلى 6 مساءً (الأحد - الخميس)
        
        سنرد على جميع الاستفسارات خلال 48 ساعة عمل.
      `
    }
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
              <div className="flex items-center space-x-2 space-x-reverse bg-blue-50 px-3 py-1 rounded-full">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">شروط الاستخدام</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* القسم الرئيسي */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">شروط الاستخدام</h1>
          <p className="text-xl text-blue-100 mb-4">
            يرجى قراءة هذه الشروط بعناية قبل استخدام الموقع
          </p>
          <div className="flex items-center justify-center space-x-2 space-x-reverse text-blue-100">
            <Clock className="w-5 h-5" />
            <span>آخر تحديث: {lastUpdated}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* مقدمة */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-3 space-x-reverse mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">مقدمة</h2>
              <p className="text-gray-600">شروط وأحكام استخدام موقع سوق سوريا</p>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              مرحباً بك في موقع "سوق سوريا"، المنصة الرائدة لبيع وشراء السيارات والعقارات في سوريا. 
              هذه الوثيقة تحدد الشروط والأحكام التي تحكم استخدامك لموقعنا وخدماتنا.
            </p>
            <p className="mb-4">
              نحن ملتزمون بتوفير بيئة آمنة وموثوقة لجميع المستخدمين، ولذلك نطلب منك قراءة هذه الشروط 
              بعناية والالتزام بها عند استخدام الموقع.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">تنبيه مهم:</span>
              </div>
              <p className="text-yellow-700 mt-2">
                باستخدامك لهذا الموقع، فإنك توافق تلقائياً على جميع الشروط والأحكام المذكورة أدناه. 
                إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع.
              </p>
            </div>
          </div>
        </div>

        {/* الأقسام */}
        <div className="space-y-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
              >
                <div className="flex items-center space-x-3 space-x-reverse mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                </div>
                
                <div className="prose max-w-none text-gray-700">
                  {section.content.split('\n').map((paragraph, index) => {
                    if (paragraph.trim() === '') return null;
                    
                    if (paragraph.trim().startsWith('•')) {
                      return (
                        <div key={index} className="flex items-start space-x-2 space-x-reverse mb-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">{paragraph.trim().substring(1).trim()}</p>
                        </div>
                      );
                    }
                    
                    return (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph.trim()}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* خاتمة */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 mt-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              شكراً لاختيارك سوق سوريا
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              نحن ملتزمون بتوفير أفضل تجربة لك. إذا كان لديك أي استفسارات حول هذه الشروط، 
              لا تتردد في التواصل معنا.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
              <Link
                to="/contact"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                اتصل بنا
              </Link>
              <Link
                to="/privacy"
                className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                سياسة الخصوصية
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;