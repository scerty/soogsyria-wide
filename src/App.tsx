// src/App.tsx
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';
import HomePage from './pages/HomePage';
import RealEstatePage from './pages/RealEstatePage';
import RealEstateFilterPage from './pages/RealEstateFilterPage';
import RealEstateDetailPage from './pages/RealEstateDetailPage';
import CarsPage from './pages/CarsPage';
import CarsFilterPage from './pages/CarsFilterPage';
import CarDetailPage from './pages/CarDetailPage';
import JobsPage from './pages/JobsPage';
import JobsFilterPage from './pages/JobsFilterPage';
import JobDetailPage from './pages/JobDetailPage';
import FurniturePage from './pages/FurniturePage';
import FurnitureFilterPage from './pages/FurnitureFilterPage';
import LoginPage from './pages/LoginPage';
import MessagesPage from './pages/MessagesPage';
import AlertsPage from './pages/AlertsPage';
import CreateListingPage from './pages/CreateListingPage';
import EditListingPage from './pages/EditListingPage';
import ProfilePage from './pages/ProfilePage';
import HelpCenterPage from './pages/HelpCenterPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import SafetyPage from './pages/SafetyPage';
import ReportPage from './pages/ReportPage';

const ListingDetailPage = React.lazy(() => import('./pages/ListingDetailPage'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<RealEstatePage />} />
          <Route path="/properties/:category/:subcategory" element={<RealEstateFilterPage />} />
          <Route path="/properties/details/:id" element={<RealEstateDetailPage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/:category/:subcategory" element={<CarsFilterPage />} />
          <Route path="/cars/details/:id" element={<CarDetailPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:category/:subcategory" element={<JobsFilterPage />} />
          <Route path="/jobs/details/:id" element={<JobDetailPage />} />
          <Route path="/furniture" element={<FurniturePage />} />
          <Route path="/furniture/:category/:subcategory" element={<FurnitureFilterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/listings/:id" element={<ListingDetailPage />} />
          <Route path="/create" element={<CreateListingPage />} />
          <Route path="/edit/:id" element={<EditListingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
