// src/pages/ListingDetailPage.tsx

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
} from 'lucide-react';
import { useListingDetail } from '../hooks/useListingDetail';
import { useAuth } from '../hooks/useAuth';
import { listingService } from '../services/listingService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DeleteConfirmModal from '../components/listings/DeleteConfirmModal';

const ListingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch listing detail
  const { data: listing, isLoading, error } = useListingDetail(Number(id));

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => listingService.deleteListing(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      navigate('/');
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error || !listing) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Listing not found or error loading listing.</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to listings
        </Link>
      </div>
    );
  }

  // Build location text
  const locationText = listing.location
    ? [
        listing.location.area?.name,
        listing.location.governorate?.name,
        listing.location.city,
      ]
        .filter(Boolean)
        .join(', ')
    : '';

  // Images array or placeholder
  const images = listing.images ?? [];
  const hasImages = images.length > 0;
  const placeholder = 'https://via.placeholder.com/800x450?text=No+Image';
  const currentImage = hasImages
    ? `https://imagedelivery.net/YOUR_ACCOUNT_HASH/${images[currentImageIndex].cf_image_id}/public`
    : placeholder;

  const nextImage = () => {
    if (hasImages) {
      setCurrentImageIndex(i =>
        i === images.length - 1 ? 0 : i + 1
      );
    }
  };
  const prevImage = () => {
    if (hasImages) {
      setCurrentImageIndex(i =>
        i === 0 ? images.length - 1 : i - 1
      );
    }
  };
  const handleDelete = () => {
    deleteMutation.mutate();
    setShowDeleteModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <Link to="/" className="text-blue-600 hover:underline flex items-center mb-4">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to listings
      </Link>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Carousel */}
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
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          <div className="absolute top-3 left-3 flex space-x-2">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{listing.type}</span>
            {listing.featured && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded flex items-center">
                <Star className="w-4 h-4 mr-1" /> Featured
              </span>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
              <div className="text-3xl font-bold text-blue-600">
                {listing.currency} {Number(listing.price).toLocaleString()}
              </div>
            </div>
            {isAuthenticated && (
              <div className="flex space-x-2">
                <Link
                  to={`/edit/${listing.id}`}
                  className="px-3 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 flex items-center"
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-3 py-2 bg-white border border-red-300 rounded text-sm text-red-700 hover:bg-red-50 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
            )}
          </div>

          {/* Description & Info */}
          <div className="space-y-4 mb-6">
            <p className="text-gray-700 whitespace-pre-wrap">{listing.description}</p>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-2" /> {locationText}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Calendar className="w-4 h-4 mr-2" /> Listed on{' '}
              {new Date(listing.publish_at).toLocaleDateString()}
            </div>
          </div>

          {/* Type-specific Details */}
          {listing.type === 'car' && listing.car_detail && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Car Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div><strong>Brand:</strong> {listing.car_detail.brand}</div>
                <div><strong>Series:</strong> {listing.car_detail.series}</div>
                <div><strong>Year:</strong> {listing.car_detail.year}</div>
                <div><strong>Mileage:</strong> {listing.car_detail.mileage_km.toLocaleString()} km</div>
                <div><strong>Fuel:</strong> {listing.car_detail.fuel_type}</div>
                <div><strong>Gearbox:</strong> {listing.car_detail.gearbox}</div>
                <div><strong>Color:</strong> {listing.car_detail.color}</div>
                <div><strong>Condition:</strong> {listing.car_detail.condition}</div>
              </div>
            </div>
          )}

          {listing.type === 'real_estate' && listing.estate_detail && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Property Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div><strong>Type:</strong> {listing.estate_detail.property_type}</div>
                <div><strong>Operation:</strong> {listing.estate_detail.operation_type}</div>
                <div><strong>Area:</strong> {listing.estate_detail.area_sqm} m²</div>
                <div><strong>Bedrooms:</strong> {listing.estate_detail.bedrooms}</div>
                <div><strong>Bathrooms:</strong> {listing.estate_detail.bathrooms}</div>
                <div><strong>Floor:</strong> {listing.estate_detail.floor}</div>
                <div><strong>Furnished:</strong> {listing.estate_detail.furnished ? 'Yes' : 'No'}</div>
                <div><strong>Built Year:</strong> {listing.estate_detail.built_year}</div>
              </div>
            </div>
          )}

          {/* Advertiser Info */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
            <div className="bg-gray-50 p-4 rounded text-sm text-gray-700 space-y-2">
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-gray-600" />
                <span>{listing.advertiser.user.username}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-600" />
                <a href={`mailto:${listing.advertiser.contact_email}`} className="text-blue-600 hover:underline">
                  {listing.advertiser.contact_email || '—'}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-600" />
                <a href={`tel:${listing.advertiser.contact_phone}`} className="text-blue-600 hover:underline">
                  {listing.advertiser.contact_phone || '—'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title={listing.title}
        isLoading={deleteMutation.isLoading}
      />
    </div>
  );
};

export default ListingDetailPage;
