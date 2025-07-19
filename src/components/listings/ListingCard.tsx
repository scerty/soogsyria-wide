// src/components/listings/ListingCard.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Listing, LocationDetail } from '../../types/listing';
import { useAuth } from '../../hooks/useAuth';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const images = listing.images ?? [];
  const primary = images.find(img => img.is_primary) ?? images[0];
  
  // معالجة الموقع - قد يكون نص أو كائن
  const getLocationText = (location: string | LocationDetail): string => {
    if (typeof location === 'string') {
      return location;
    }
    
    if (typeof location === 'object' && location !== null) {
      const parts = [];
      if (location.area) parts.push(location.area);
      if (location.city) parts.push(location.city);
      if (location.governorate) parts.push(location.governorate);
      return parts.join(', ') || 'غير محدد';
    }
    
    return 'غير محدد';
  };
  
  const locationText = getLocationText(listing.location);
  const placeholderUrl = `https://picsum.photos/seed/listing-${listing.id}/400/225`;
  const formattedPrice = `${Number(listing.price).toLocaleString()} ${listing.currency}`;

  const [showLoginModal, setShowLoginModal] = useState(false);

  // تحديد الرابط حسب نوع الإعلان
  const getListingUrl = () => {
  //  console.log('🔍 Listing type:', listing.type, 'ID:', listing.id); // للتشخيص
    
    // دعم جميع الصيغ المحتملة للسيارات
    if (listing.type === 'Car' || listing.type === 'car' || listing.type === 'سيارة') {
     // console.log('🚗 Redirecting to car details page');
      return `/cars/details/${listing.id}`;
    } 
    // دعم جميع الصيغ المحتملة للعقارات
    else if (listing.type === 'Real Estate' || listing.type === 'real_estate' || listing.type === 'عقار') {
  //    console.log('🏠 Redirecting to property details page');
      return `/properties/details/${listing.id}`;
    }
    // دعم جميع الصيغ المحتملة للوظائف
    else if (listing.type === 'Job' || listing.type === 'job' || listing.type === 'وظيفة') {
     // console.log('💼 Redirecting to job details page');
      return `/jobs/details/${listing.id}`;
    }
    // دعم جميع الصيغ المحتملة للأثاث والإلكترونيات
    else if (listing.type === 'Furniture' || listing.type === 'furniture' || listing.type === 'أثاث') {
     // console.log('🪑 Redirecting to furniture details page');
      return `/furniture/details/${listing.id}`;
    }
    
    console.log('⚠️ Unknown type, using fallback route');
    // fallback للإعلانات العامة
    return `/listings/${listing.id}`;
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      // وظيفة الإضافة للمفضلة
      console.log('Added to favorites:', listing.id);
    }
  };

  const listingUrl = getListingUrl();
 // console.log('Generated URL:', listingUrl); // للتشخيص

  return (
    <>
      <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <Link to={listingUrl}>
          <div className="relative w-full h-48 bg-gray-100">
            {primary ? (
              <img
                src={`https://imagedelivery.net/YOUR_ACCOUNT_HASH/${primary.cf_image_id}/public`}
                alt={listing.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // في حالة فشل تحميل الصورة، استخدم placeholder
                  (e.target as HTMLImageElement).src = placeholderUrl;
                }}
              />
            ) : (
              <img
                src={placeholderUrl}
                alt="Placeholder"
                className="w-full h-full object-cover"
              />
            )}

            {/* زر المفضلة */}
            <button
              onClick={handleFavoriteClick}
              className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow 
                         transform transition duration-200 hover:scale-110 hover:bg-green-50"
            >
              <Heart className="w-6 h-6 text-gray-600 hover:text-green-600 transition-colors" />
            </button>

            {/* شارة نوع الإعلان */}
            <div className="absolute top-2 left-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                (listing.type === 'Car' || listing.type === 'car' || listing.type === 'سيارة')
                  ? 'bg-blue-100 text-blue-800' 
                  : (listing.type === 'Real Estate' || listing.type === 'real_estate' || listing.type === 'عقار')
                    ? 'bg-green-100 text-green-800'
                    : (listing.type === 'Job' || listing.type === 'job' || listing.type === 'وظيفة')
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-amber-100 text-amber-800'
              }`}>
                {(listing.type === 'Car' || listing.type === 'car' || listing.type === 'سيارة') 
                  ? 'سيارة' 
                  : (listing.type === 'Real Estate' || listing.type === 'real_estate' || listing.type === 'عقار')
                    ? 'عقار'
                    : (listing.type === 'Job' || listing.type === 'job' || listing.type === 'وظيفة')
                      ? 'وظيفة'
                      : 'أثاث'
                }
              </span>
            </div>

            <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-sm font-semibold px-2 py-1 rounded">
              {formattedPrice}
            </div>
          </div>

          <div className="p-4">
            {locationText && (
              <p className="text-xs text-gray-500 mb-1">{locationText}</p>
            )}
            <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate">
              {listing.title}
            </h3>
            <p className="text-xs text-gray-500">
              السعر الإجمالي: {formattedPrice}
            </p>
          </div>
        </Link>
      </article>

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6" dir="rtl">
            <h2 className="text-lg font-semibold mb-2">تسجيل الدخول</h2>
            <p className="text-gray-700 mb-6">
              لتتمكن من إضافة الإعلان إلى قائمتك المفضلة، الرجاء تسجيل الدخول أولاً.
            </p>
            <div className="flex justify-end space-x-2 space-x-reverse">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                لاحقاً
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                تسجيل الدخول
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListingCard;