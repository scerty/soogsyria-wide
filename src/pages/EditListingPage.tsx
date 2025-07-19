import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useListingDetail } from '../hooks/useListingDetail';
import ListingForm from '../components/listings/ListingForm';
import LoadingSpinner from '../components/common/LoadingSpinner';

const EditListingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { data: listing, isLoading } = useListingDetail(Number(id));

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please login to edit this listing.</p>
      </div>
    );
  }

  if (isLoading) return <LoadingSpinner />;

  if (!listing) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Listing not found.</p>
      </div>
    );
  }

  const handleSuccess = () => {
    navigate(`/listings/${id}`);
  };

  const initialData = {
    type: listing.type,
    title: listing.title,
    description: listing.description,
    price: listing.price,
    currency: listing.currency,
    location: listing.location,
    category: listing.category,
    featured: listing.featured,
    images: listing.images.map(img => img.cf_image_id),
    car_detail: listing.car_detail,
    real_estate_detail: listing.real_estate_detail,
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Listing</h1>
        <p className="text-gray-600">Update your listing details</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <ListingForm
          initialData={initialData}
          onSuccess={handleSuccess}
          isEdit={true}
          listingId={listing.id}
        />
      </div>
    </div>
  );
};

export default EditListingPage;