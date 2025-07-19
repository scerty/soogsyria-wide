// src/pages/JobDetailPage.tsx

import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  MapPin,
  Calendar,
  Star,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Building,
  Briefcase,
  Clock,
  DollarSign,
  Users,
  GraduationCap,
  Award,
  ArrowRight,
  Heart,
  Share2,
  Flag,
  Eye,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Send,
} from 'lucide-react';
import { useListingDetail } from '../hooks/useListingDetail';
import { useAuth } from '../hooks/useAuth';
import { listingService } from '../services/listingService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DeleteConfirmModal from '../components/listings/DeleteConfirmModal';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  // Fetch listing detail
  const { data: listing, isLoading, error } = useListingDetail(Number(id));

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => listingService.deleteListing(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      navigate('/jobs');
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error || !listing || listing.type !== 'job') {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg mb-4">لم يتم العثور على الوظيفة أو حدث خطأ في التحميل</p>
          <Link to="/jobs" className="text-blue-600 hover:underline">
            العودة لصفحة الوظائف
          </Link>
        </div>
      </div>
    );
  }

  // Build location text
  const getLocationText = (location: string | LocationDetail): string => {
    if (typeof location === 'string') {
      return location;
    }
    
    if (typeof location === 'object' && location !== null) {
      const parts: string[] = [];
      
      // إضافة المنطقة الفرعية إذا كانت متوفرة
      if (location.sub_area?.name_ar) {
        parts.push(location.sub_area.name_ar);
      }
      
      // إضافة المنطقة إذا كانت متوفرة ومختلفة عن المنطقة الفرعية
      if (location.area?.name_en && location.area.name_en !== location.sub_area?.name_en) {
        parts.push(location.area.name_en);
      }
      
      // إضافة المحافظة
      if (location.governorate?.name_en) {
        parts.push(location.governorate.name_en);
      }
      
      // إضافة المدينة إذا كانت مختلفة
      if (location.city && !parts.includes(location.city)) {
        parts.push(location.city);
      }
      
      return parts.length > 0 ? parts.join(', ') : 'غير محدد';
    }
    
    return 'غير محدد';
  };
  
  const locationText = getLocationText(listing.location);

  // Images array or placeholder
  const images = listing.images ?? [];
  const hasImages = images.length > 0;
  const placeholder = `https://picsum.photos/seed/job-${listing.id}/800/450`;
  const currentImage = hasImages
    ? `https://imagedelivery.net/YOUR_ACCOUNT_HASH/${images[currentImageIndex].cf_image_id}/public`
    : placeholder;

  const nextImage = () => {
    if (hasImages) {
      setCurrentImageIndex(i => i === images.length - 1 ? 0 : i + 1);
    }
  };

  const prevImage = () => {
    if (hasImages) {
      setCurrentImageIndex(i => i === 0 ? images.length - 1 : i - 1);
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate();
    setShowDeleteModal(false);
  };

  const jobDetail = listing.job_detail;

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* شريط التنقل */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/jobs')}
              className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              <span className="font-medium">العودة للوظائف</span>
            </button>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                <Flag className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* العمود الرئيسي */}
          <div className="lg:col-span-2 space-y-6">
            {/* معرض الصور */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative bg-gray-200 h-96">
                <img
                  src={currentImage}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {hasImages && images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                
                {/* شارات الحالة */}
                <div className="absolute top-4 left-4 flex space-x-2 space-x-reverse">
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                    وظيفة
                  </span>
                  {listing.featured && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center font-medium">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      مميز
                    </span>
                  )}
                </div>

                {/* مؤشر الصور */}
                {hasImages && images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 space-x-reverse">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* معلومات الوظيفة */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                  <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <MapPin className="w-4 h-4" />
                      <span>{locationText}</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Calendar className="w-4 h-4" />
                      <span>نُشر في {new Date(listing.publish_date).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-purple-600">
                    {Number(listing.price).toLocaleString()} {listing.currency}
                    <span className="text-lg text-gray-600 font-normal"> / شهرياً</span>
                  </div>
                </div>
                
                {isAuthenticated && (
                  <div className="flex space-x-2 space-x-reverse">
                    <Link
                      to={`/edit/${listing.id}`}
                      className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center space-x-1 space-x-reverse transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>تعديل</span>
                    </Link>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="px-3 py-2 bg-white border border-red-300 rounded-lg text-sm text-red-700 hover:bg-red-50 flex items-center space-x-1 space-x-reverse transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>حذف</span>
                    </button>
                  </div>
                )}
              </div>

              {/* الوصف */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">وصف الوظيفة</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {listing.description}
                </p>
              </div>

              {/* تفاصيل الوظيفة */}
              {jobDetail && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">تفاصيل الوظيفة</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* المعلومات الأساسية */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">نوع الوظيفة</div>
                          <div className="font-semibold">{jobDetail.job_type}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">مستوى الخبرة</div>
                          <div className="font-semibold">{jobDetail.experience_level}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">الراتب</div>
                          <div className="font-semibold">
                            {jobDetail.salary_from?.toLocaleString()} - {jobDetail.salary_to?.toLocaleString()} ل.س
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Building className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">الشركة</div>
                          <div className="font-semibold">{jobDetail.company}</div>
                        </div>
                      </div>
                    </div>

                    {/* المعلومات الإضافية */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">الصناعة</div>
                          <div className="font-semibold">{jobDetail.industry}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <GraduationCap className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">المؤهل المطلوب</div>
                          <div className="font-semibold">{jobDetail.education_level}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Award className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">ترتيب العمل</div>
                          <div className="font-semibold">{jobDetail.work_arrangement}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">نوع العقد</div>
                          <div className="font-semibold">{jobDetail.contract_type}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* المهارات المطلوبة */}
                  {jobDetail.required_skills && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">المهارات المطلوبة</h3>
                      <div className="flex flex-wrap gap-2">
                        {jobDetail.required_skills.split(',').map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* المزايا */}
                  {jobDetail.benefits && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">المزايا</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {jobDetail.benefits.split(',').map((benefit, index) => (
                          <div key={index} className="flex items-center space-x-2 space-x-reverse">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-gray-700">{benefit.trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* العمود الجانبي */}
          <div className="space-y-6">
            {/* معلومات صاحب العمل */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات صاحب العمل</h3>
              
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${listing.advertiser.name}&background=8b5cf6&color=fff&size=50`}
                  alt={listing.advertiser.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{listing.advertiser.name}</h4>
                  <p className="text-sm text-gray-600">عضو منذ 2023</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                  <Building className="w-4 h-4" />
                  <span>{listing.advertiser.company || 'صاحب عمل فردي'}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{locationText}</span>
                </div>
              </div>

              {!showContactInfo ? (
                <button
                  onClick={() => setShowContactInfo(true)}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  عرض معلومات الاتصال
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 space-x-reverse p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <a 
                      href={`tel:${listing.advertiser.phone}`} 
                      className="text-purple-600 hover:underline font-medium"
                    >
                      {listing.advertiser.phone || 'غير متوفر'}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <a 
                      href={`mailto:${listing.advertiser.email}`} 
                      className="text-purple-600 hover:underline font-medium"
                    >
                      {listing.advertiser.email}
                    </a>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2 space-x-reverse">
                    <Send className="w-4 h-4" />
                    <span>تقديم طلب</span>
                  </button>
                </div>
              )}
            </div>

            {/* إحصائيات الإعلان */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">إحصائيات الإعلان</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <Eye className="w-4 h-4" />
                    <span>المشاهدات</span>
                  </div>
                  <span className="font-semibold">3,456</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <Heart className="w-4 h-4" />
                    <span>المفضلة</span>
                  </div>
                  <span className="font-semibold">123</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <Send className="w-4 h-4" />
                    <span>الطلبات</span>
                  </div>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>آخر تحديث</span>
                  </div>
                  <span className="font-semibold text-sm">منذ 2 أيام</span>
                </div>
              </div>
            </div>

            {/* نصائح للباحثين عن عمل */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center space-x-2 space-x-reverse mb-3">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800">نصائح للباحثين عن عمل</h3>
              </div>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• اقرأ وصف الوظيفة بعناية</li>
                <li>• تأكد من مطابقة مؤهلاتك للمتطلبات</li>
                <li>• حضر سيرتك الذاتية بشكل احترافي</li>
                <li>• كن صادقاً في معلوماتك</li>
              </ul>
              <Link 
                to="/safety" 
                className="text-blue-600 hover:underline text-sm font-medium mt-2 inline-block"
              >
                اقرأ المزيد من النصائح
              </Link>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title={listing.title}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default JobDetailPage;