# Django Listings Frontend

A modern React frontend application for managing listings with seamless Django backend integration. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 🚀 **Modern Stack**: React 18, TypeScript, Vite, Tailwind CSS
- 🔄 **Smart Caching**: TanStack Query with stale-while-revalidate caching
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🖼️ **Lazy Loading**: Code splitting and image lazy loading
- 🔐 **Authentication**: JWT token-based authentication
- 📊 **Pagination**: Efficient limit/offset pagination
- 🌅 **Image Management**: Cloudflare Images integration
- 🎨 **Modern UI**: Clean, professional design with smooth animations

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Yup validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Image CDN**: Cloudflare Images

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Django backend API running (see backend setup)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd django-listings-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Update the `.env` file with your configuration:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_CLOUDFLARE_IMAGES_URL=https://imagedelivery.net
VITE_CLOUDFLARE_ACCOUNT_ID=your_account_id_here
VITE_CLOUDFLARE_API_TOKEN=your_api_token_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Layout.tsx          # Main layout component
│   │   ├── LoadingSpinner.tsx  # Loading indicator
│   │   └── LazyImage.tsx       # Lazy loading image component
│   └── listings/
│       ├── ListingCard.tsx     # Individual listing card
│       ├── ListingGrid.tsx     # Grid of listing cards
│       ├── ListingForm.tsx     # Create/edit listing form
│       ├── Pagination.tsx      # Pagination controls
│       └── DeleteConfirmModal.tsx # Delete confirmation modal
├── hooks/
│   ├── useListings.ts          # Listings data fetching
│   ├── useListingDetail.ts     # Single listing data fetching
│   └── useAuth.ts              # Authentication state
├── pages/
│   ├── HomePage.tsx            # Home page with listings grid
│   ├── ListingDetailPage.tsx   # Individual listing detail page
│   ├── CreateListingPage.tsx   # Create new listing page
│   └── EditListingPage.tsx     # Edit existing listing page
├── services/
│   ├── api.ts                  # Axios configuration
│   └── listingService.ts       # Listings API service
├── types/
│   ├── listing.ts              # Listing-related types
│   └── auth.ts                 # Authentication types
├── utils/
│   └── constants.ts            # App constants and options
├── App.tsx                     # Main app component
└── main.tsx                    # Application entry point
```

## Features in Detail

### Caching Strategy

The application implements a sophisticated caching strategy using TanStack Query:

- **Stale-while-revalidate**: Data is served from cache immediately while being revalidated in the background
- **Intelligent invalidation**: Cache is invalidated when data changes (create, update, delete)
- **Pagination cache**: Each page of results is cached separately for instant navigation

### Lazy Loading

1. **Code Splitting**: The listing detail page is lazy-loaded using React.lazy() and Suspense
2. **Image Lazy Loading**: Images are only loaded when they enter the viewport using Intersection Observer API

### Authentication

- JWT tokens are stored in localStorage
- Automatic token refresh when expired
- Protected routes for authenticated users only
- Authorization headers automatically added to API requests

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Responsive grid layouts that adapt to screen size
- Touch-friendly interface on mobile devices
- Optimized typography and spacing across devices

## API Integration

The frontend expects the Django backend to provide these endpoints:

- `GET /api/listings/` - List listings with pagination
- `GET /api/listings/{id}/` - Get single listing
- `POST /api/listings/` - Create new listing
- `PUT /api/listings/{id}/` - Update listing
- `DELETE /api/listings/{id}/` - Delete listing

### Expected API Response Format

```json
{
  "count": 42,
  "next": "http://localhost:8000/api/listings/?limit=12&offset=12",
  "previous": null,
  "results": [
    {
      "id": 1,
      "type": "Car",
      "title": "2023 Toyota Camry",
      "description": "Excellent condition...",
      "price": 25000,
      "currency": "USD",
      "location": "new-york",
      "category": "sedan",
      "featured": true,
      "publish_date": "2023-12-01T10:00:00Z",
      "images": [
        {
          "id": 1,
          "cf_image_id": "abc123",
          "is_primary": true,
          "order": 1
        }
      ],
      "advertiser": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1-555-0123",
        "company": "Auto Sales Inc"
      },
      "car_detail": {
        "brand": "Toyota",
        "series": "Camry",
        "year": 2023,
        "mileage": 15000,
        "fuel": "gasoline",
        "gearbox": "automatic",
        "color": "Silver",
        "body_type": "sedan",
        "condition": "used",
        "registered": true
      }
    }
  ]
}
```

## Environment Variables

- `VITE_API_BASE_URL`: Your Django backend URL
- `VITE_CLOUDFLARE_IMAGES_URL`: Cloudflare Images delivery URL
- `VITE_CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
- `VITE_CLOUDFLARE_API_TOKEN`: Your Cloudflare API token

## Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Deploy to Vercel

1. Connect your repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Add environment variables in Vercel dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.