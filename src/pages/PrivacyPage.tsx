// src/pages/PrivacyPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Eye,
  Lock,
  Database,
  Share2,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  UserCheck,
} from 'lucide-react';

const PrivacyPage: React.FC = () => {
  const lastUpdated = '15 يناير 2024';

  const sections = [
    {
      id: 'introduction',
      title: '1. مقدمة',
      icon: Shield,
      content: `
        نحن في "سوق سوريا" نقدر خصوصيتك ونلتزم بحماية معلوماتك الشخصية. هذه السياسة توضح كيفية جمعنا، 
        استخدامنا، وحمايتنا لبياناتك الشخصية عند استخدام موقعنا وخدماتنا.
        
        هذه السياسة تنطبق على جميع المستخدمين لموقع سوق سوريا، سواء كانوا مسجلين أم لا.
      `
    },
    {
      id: 'data-collection',
      title: '2. البيانات التي نجمعها',
      icon: Database,
      content: `
        نجمع الأنواع التالية من البيانات:
        
        البيانات الشخصية:
        • الاسم الكامل
        • عنوان البريد الإلكتروني
        • رقم الهاتف
        • العنوان (اختياري)
        • تاريخ الميلاد (للتحقق من العمر)
        
        بيانات الاستخدام:
        • عنوان IP
        • نوع المتصفح ونظام التشغيل
        • صفحات الموقع التي تزورها
        • وقت ومدة الزيارة
        • مصدر الزيارة (كيف وصلت للموقع)
        
        بيانات الإعلانات:
        • تفاصيل السلع أو الخدمات المعروضة
        • الصور المرفوعة
        • معلومات الاتصال في الإعلان
        • موقع السلعة الجغرافي
      `
    },
    {
      id: 'data-usage',
      title: '3. كيف نستخدم بياناتك',
      icon: Eye,
      content: `
        نستخدم بياناتك للأغراض التالية:
        
        تقديم الخدمة:
        • إنشاء وإدارة حسابك
        • نشر وإدارة إعلاناتك
        • تسهيل التواصل بين المستخدمين
        • تقديم الدعم الفني
        
        تحسين الخدمة:
        • تحليل استخدام الموقع
        • تطوير ميزات جديدة
        • إصلاح المشاكل التقنية
        • تخصيص تجربة المستخدم
        
        التواصل:
        • إرسال إشعارات مهمة
        • الرد على استفساراتك
        • إرسال تحديثات الخدمة
        • التسويق (بموافقتك فقط)
        
        الأمان والحماية:
        • منع الاحتيال والأنشطة المشبوهة
        • حماية المستخدمين من المحتوى الضار
        • الامتثال للقوانين واللوائح
      `
    },
    {
      id: 'data-sharing',
      title: '4. مشاركة البيانات',
      icon: Share2,
      content: `
        نحن لا نبيع أو نؤجر بياناتك الشخصية لأطراف ثالثة. قد نشارك بياناتك في الحالات التالية:
        
        مع موافقتك:
        • عندما تطلب منا مشاركة معلومات محددة
        • عند الاشتراك في خدمات إضافية
        
        مقدمو الخدمات:
        • شركات الاستضافة والخوادم
        • خدمات الدفع الإلكتروني
        • خدمات التحليلات والإحصائيات
        • خدمات الدعم الفني
        
        المتطلبات القانونية:
        • عند طلب السلطات المختصة
        • للامتثال للقوانين واللوائح
        • لحماية حقوقنا أو حقوق الآخرين
        • في حالات الطوارئ لحماية السلامة العامة
        
        معلومات الإعلانات العامة:
        • تفاصيل الإعلانات متاحة لجميع المستخدمين
        • معلومات الاتصال التي تختار نشرها
        • الصور والأوصاف التي ترفعها
      `
    },
    {
      id: 'data-security',
      title: '5. أمان البيانات',
      icon: Lock,
      content: `
        نتخذ إجراءات أمنية متقدمة لحماية بياناتك:
        
        الحماية التقنية:
        • تشفير البيانات أثناء النقل والتخزين
        • جدران حماية متقدمة
        • مراقبة الأنظمة على مدار الساعة
        • نسخ احتياطية منتظمة
        • اختبارات أمنية دورية
        
        الحماية الإدارية:
        • تدريب الموظفين على أمان البيانات
        • سياسات صارمة للوصول للبيانات
        • مراجعة دورية للإجراءات الأمنية
        • اتفاقيات سرية مع جميع الموظفين
        
        الحماية الفيزيائية:
        • خوادم محمية في مراكز بيانات آمنة
        • أنظمة مراقبة وتحكم في الوصول
        • حماية من الكوارث الطبيعية
        
        رغم هذه الإجراءات، لا يمكن ضمان الأمان المطلق على الإنترنت. نحن نبذل قصارى جهدنا لحماية بياناتك.
      `
    },
    {
      id: 'user-rights',
      title: '6. حقوقك',
      icon: UserCheck,
      content: `
        لديك الحقوق التالية فيما يتعلق ببياناتك:
        
        الوصول والاطلاع:
        • طلب نسخة من بياناتك الشخصية
        • معرفة كيف نستخدم بياناتك
        • الاطلاع على سجل أنشطة حسابك
        
        التصحيح والتحديث:
        • تصحيح البيانات غير الصحيحة
        • تحديث معلوماتك الشخصية
        • إضافة معلومات ناقصة
        
        الحذف:
        • طلب حذف حسابك وبياناتك
        • حذف إعلانات أو محتوى محدد
        • الحق في النسيان (وفقاً للقوانين المعمول بها)
        
        التحكم في الاستخدام:
        • إيقاف الرسائل التسويقية
        • تحديد إعدادات الخصوصية
        • التحكم في ظهور معلوماتك للآخرين
        
        نقل البيانات:
        • الحصول على بياناتك بصيغة قابلة للقراءة
        • نقل بياناتك لخدمة أخرى (حيثما أمكن)
        
        للاستفادة من هذه الحقوق، تواصل معنا عبر privacy@sooqsyria.com
      `
    },
    {
      id: 'cookies',
      title: '7. ملفات تعريف الارتباط (Cookies)',
      icon: Globe,
      content: `
        نستخدم ملفات تعريف الارتباط لتحسين تجربتك:
        
        الكوكيز الأساسية:
        • ضرورية لعمل الموقع بشكل صحيح
        • تذكر تسجيل دخولك
        • حفظ إعدادات اللغة والمنطقة
        • لا يمكن إيقافها دون تعطيل وظائف الموقع
        
        كوكيز الأداء:
        • تساعد في فهم كيفية استخدام الموقع
        • تجمع معلومات مجهولة الهوية
        • تساعد في تحسين الموقع
        • يمكن إيقافها من إعدادات المتصفح
        
        كوكيز التسويق:
        • تُستخدم لعرض إعلانات مناسبة
        • تتبع زياراتك عبر مواقع مختلفة
        • تتطلب موافقتك الصريحة
        • يمكن إدارتها من إعدادات الموقع
        
        يمكنك التحكم في الكوكيز من خلال إعدادات متصفحك أو إعدادات الموقع.
      `
    },
    {
      id: 'children',
      title: '8. خصوصية الأطفال',
      icon: Shield,
      content: `
        حماية خصوصية الأطفال أولوية قصوى بالنسبة لنا:
        
        • موقعنا مخصص للأشخاص 18 سنة فما فوق
        • لا نجمع عمداً معلومات من الأطفال دون 18 سنة
        • إذا علمنا بوجود بيانات طفل، سنحذفها فوراً
        • نطلب من الآباء مراقبة استخدام أطفالهم للإنترنت
        • إذا كنت والداً وتعتقد أن طفلك قدم معلومات، تواصل معنا
        
        إذا اكتشفنا أن طفلاً دون 18 سنة قدم معلومات شخصية، سنتخذ خطوات لحذف هذه المعلومات من خوادمنا.
      `
    },
    {
      id: 'international',
      title: '9. النقل الدولي للبيانات',
      icon: Globe,
      content: `
        قد يتم نقل بياناتك خارج سوريا في الحالات التالية:
        
        • استخدام خدمات الحوسبة السحابية الدولية
        • خدمات الدعم الفني من شركات عالمية
        • خدمات التحليلات والإحصائيات
        • خدمات الدفع الإلكتروني الدولية
        
        عند النقل الدولي، نضمن:
        • مستوى حماية مماثل لما نوفره محلياً
        • اتفاقيات حماية البيانات مع الشركاء
        • الامتثال للقوانين الدولية لحماية البيانات
        • إمكانية استرداد البيانات عند الطلب
        
        سنخطرك بأي تغييرات جوهرية في ممارسات النقل الدولي.
      `
    },
    {
      id: 'retention',
      title: '10. الاحتفاظ بالبيانات',
      icon: Clock,
      content: `
        نحتفظ بالبيانات للمدد التالية:
        
        بيانات الحساب:
        • طالما كان حسابك نشطاً
        • 3 سنوات بعد آخر نشاط (للحسابات غير النشطة)
        • فوراً عند طلب الحذف (مع استثناءات قانونية)
        
        بيانات الإعلانات:
        • طالما كان الإعلان منشوراً
        • 1 سنة بعد حذف الإعلان (للأرشيف)
        • قد نحتفظ ببعض البيانات لأغراض قانونية
        
        بيانات الاستخدام:
        • 2 سنة للتحليلات والإحصائيات
        • 5 سنوات للسجلات الأمنية
        • بيانات مجهولة الهوية قد تُحفظ إلى أجل غير مسمى
        
        السجلات القانونية:
        • حسب متطلبات القانون السوري
        • عادة 7 سنوات للسجلات المالية
        • قد تختلف حسب نوع البيانات
        
        يمكنك طلب حذف بياناتك في أي وقت، مع مراعاة الالتزامات القانونية.
      `
    },
    {
      id: 'changes',
      title: '11. تعديل السياسة',
      icon: Settings,
      content: `
        قد نحدث هذه السياسة من وقت لآخر:
        
        • سنخطرك بالتغييرات المهمة عبر البريد الإلكتروني
        • التغييرات الطفيفة ستُنشر على الموقع فقط
        • لديك 30 يوماً للاعتراض على التغييرات الجوهرية
        • استمرار استخدام الموقع يعني قبول التغييرات
        • يمكنك حذف حسابك إذا لم توافق على التغييرات
        
        ننصحك بمراجعة هذه السياسة بانتظام للبقاء على اطلاع بممارساتنا.
      `
    },
    {
      id: 'contact',
      title: '12. التواصل معنا',
      icon: Settings,
      content: `
        لأي استفسارات حول الخصوصية أو هذه السياسة:
        
        مسؤول حماية البيانات:
        • البريد الإلكتروني: privacy@sooqsyria.com
        • الهاتف: +963 11 123 4567 (تحويلة 3)
        • العنوان: دمشق، المزة، شارع الجلاء، مبنى رقم 123
        
        فريق الدعم العام:
        • البريد الإلكتروني: support@sooqsyria.com
        • الدردشة المباشرة على الموقع
        • نموذج التواصل على الموقع
        
        أوقات الاستجابة:
        • استفسارات الخصوصية: خلال 48 ساعة
        • طلبات الوصول للبيانات: خلال 30 يوماً
        • طلبات الحذف: خلال 7 أيام عمل
        • الاستفسارات العامة: خلال 24 ساعة
        
        نحن ملتزمون بالرد على جميع استفساراتك بشأن الخصوصية بسرعة ووضوح.
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
              <div className="flex items-center space-x-2 space-x-reverse bg-green-50 px-3 py-1 rounded-full">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">سياسة الخصوصية</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* القسم الرئيسي */}
      <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">سياسة الخصوصية</h1>
          <p className="text-xl text-green-100 mb-4">
            نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية
          </p>
          <div className="flex items-center justify-center space-x-2 space-x-reverse text-green-100">
            <Clock className="w-5 h-5" />
            <span>آخر تحديث: {lastUpdated}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ملخص سريع */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-3 space-x-reverse mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">ملخص سريع</h2>
              <p className="text-gray-600">النقاط الأساسية لسياسة الخصوصية</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3 space-x-reverse">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Database className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">ما نجمعه</h4>
                <p className="text-sm text-gray-600">معلومات الحساب، بيانات الاستخدام، ومحتوى الإعلانات</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 space-x-reverse">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Eye className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">كيف نستخدمها</h4>
                <p className="text-sm text-gray-600">لتقديم الخدمة، التحسين، والتواصل معك</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 space-x-reverse">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">كيف نحميها</h4>
                <p className="text-sm text-gray-600">تشفير متقدم، أمان فيزيائي، ومراقبة مستمرة</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 space-x-reverse">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <UserCheck className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">حقوقك</h4>
                <p className="text-sm text-gray-600">الوصول، التصحيح، الحذف، والتحكم في بياناتك</p>
              </div>
            </div>
          </div>
        </div>

        {/* الأقسام التفصيلية */}
        <div className="space-y-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
              >
                <div className="flex items-center space-x-3 space-x-reverse mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                </div>
                
                <div className="prose max-w-none text-gray-700">
                  {section.content.split('\n').map((paragraph, index) => {
                    if (paragraph.trim() === '') return null;
                    
                    if (paragraph.trim().startsWith('•')) {
                      return (
                        <div key={index} className="flex items-start space-x-2 space-x-reverse mb-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">{paragraph.trim().substring(1).trim()}</p>
                        </div>
                      );
                    }
                    
                    if (paragraph.trim().endsWith(':')) {
                      return (
                        <h4 key={index} className="font-semibold text-gray-900 mt-4 mb-2">
                          {paragraph.trim()}
                        </h4>
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
              خصوصيتك أولويتنا
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              نحن ملتزمون بحماية خصوصيتك وشفافية ممارساتنا. إذا كان لديك أي استفسارات، 
              لا تتردد في التواصل معنا.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
              <a
                href="mailto:privacy@sooqsyria.com"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                تواصل مع مسؤول الخصوصية
              </a>
              <Link
                to="/terms"
                className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                شروط الاستخدام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;