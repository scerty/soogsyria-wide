// src/pages/RealEstateDetailPage.tsx

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
  Home,
  Bed,
  Bath,
  Square,
  Car as CarIcon,
  Wifi,
  Shield,
  ArrowRight,
  Heart,
  Share2,
  Flag,
  Eye,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  TreePine,
  Zap,
  Droplets,
} from 'lucide-react';
import { useListingDetail } from '../hooks/useListingDetail';
import { useAuth } from '../hooks/useAuth';
import { listingService } from '../services/listingService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DeleteConfirmModal from '../components/listings/DeleteConfirmModal';

const RealEstateDetailPage: React.FC = () => {
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
      navigate('/properties');
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error || !listing || listing.type !== 'real_estate') {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg mb-4">لم يتم العثور على العقار أو حدث خطأ في التحميل</p>
          <Link to="/properties" className="text-blue-600 hover:underline">
            العودة لصفحة العقارات
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
  const placeholder = `https://picsum.photos/seed/property-${listing.id}/800/450`;
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

  const estateDetail = listing.real_estate_detail;

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* شريط التنقل */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/properties')}
              className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              <span className="font-medium">العودة للعقارات</span>
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
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                    عقار
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

            {/* معلومات العقار */}
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
                  <div className="text-4xl font-bold text-green-600">
                    {Number(listing.price).toLocaleString()} {listing.currency}
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

              {/* المعلومات السريعة */}
              {estateDetail && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                      <Bed className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{estateDetail.bedrooms || 0}</div>
                    <div className="text-sm text-gray-600">غرفة نوم</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                      <Bath className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{estateDetail.bathrooms || 0}</div>
                    <div className="text-sm text-gray-600">حمام</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                      <Square className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{estateDetail.size || 0}</div>
                    <div className="text-sm text-gray-600">م²</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
                      <CarIcon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{estateDetail.parking_spaces || 0}</div>
                    <div className="text-sm text-gray-600">موقف</div>
                  </div>
                </div>
              )}

              {/* الوصف */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">الوصف</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {listing.description}
                </p>
              </div>

              {/* تفاصيل العقار */}
              {estateDetail && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">تفاصيل العقار</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* المعلومات الأساسية */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Home className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">نوع العقار</div>
                          <div className="font-semibold">{estateDetail.property_type}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Square className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">المساحة الإجمالية</div>
                          <div className="font-semibold">{estateDetail.size} م²</div>
                        </div>
                      </div>

                      {estateDetail.land_size && (
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <TreePine className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">مساحة الأرض</div>
                            <div className="font-semibold">{estateDetail.land_size} م²</div>
                          </div>
                        </div>
                      )}

                      {estateDetail.year_built && (
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">سنة البناء</div>
                            <div className="font-semibold">{estateDetail.year_built}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* المعلومات الإضافية */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Building className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">الطابق</div>
                          <div className="font-semibold">{estateDetail.floor || 'الأرضي'}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Bed className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">غرف النوم</div>
                          <div className="font-semibold">{estateDetail.bedrooms} غرفة</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Droplets className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">الحمامات</div>
                          <div className="font-semibold">{estateDetail.bathrooms} حمام</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <CarIcon className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">مواقف السيارات</div>
                          <div className="font-semibold">{estateDetail.parking_spaces || 0} موقف</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* حالة الأثاث */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {estateDetail.furnished ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-green-700 font-medium">العقار مفروش</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                          <span className="text-orange-700 font-medium">العقار غير مفروش</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* العمود الجانبي */}
          <div className="space-y-6">
            {/* معلومات البائع */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات البائع</h3>
              
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${listing.advertiser.name}&background=10b981&color=fff&size=50`}
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
                  <span>{listing.advertiser.company || 'بائع فردي'}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{locationText}</span>
                </div>
              </div>

              {!showContactInfo ? (
                <button
                  onClick={() => setShowContactInfo(true)}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  عرض معلومات الاتصال
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 space-x-reverse p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <a 
                      href={`tel:${listing.advertiser.phone}`} 
                      className="text-green-600 hover:underline font-medium"
                    >
                      {listing.advertiser.phone || 'غير متوفر'}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <a 
                      href={`mailto:${listing.advertiser.email}`} 
                      className="text-green-600 hover:underline font-medium"
                    >
                      {listing.advertiser.email}
                    </a>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2 space-x-reverse">
                    <MessageSquare className="w-4 h-4" />
                    <span>إرسال رسالة</span>
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
                  <span className="font-semibold">2,456</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <Heart className="w-4 h-4" />
                    <span>المفضلة</span>
                  </div>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <MessageSquare className="w-4 h-4" />
                    <span>الرسائل</span>
                  </div>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>آخر تحديث</span>
                  </div>
                  <span className="font-semibold text-sm">منذ يوم</span>
                </div>
              </div>
            </div>

            {/* نصائح الأمان */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center space-x-2 space-x-reverse mb-3">
                <Shield className="w-5 h-5 text-yellow-600" />
                <h3 className="font-semibold text-yellow-800">نصائح للأمان</h3>
              </div>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• تأكد من معاينة العقار شخصياً</li>
                <li>• تحقق من الأوراق القانونية</li>
                <li>• التقي بالبائع في مكان عام</li>
                <li>• لا تدفع مقدماً قبل التأكد</li>
              </ul>
              <Link 
                to="/safety" 
                className="text-yellow-600 hover:underline text-sm font-medium mt-2 inline-block"
              >
                اقرأ المزيد من نصائح الأمان
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

export default RealEstateDetailPage;