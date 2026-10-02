import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { CustomerLayout } from './components/layout/CustomerLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { PortfolioPage } from './pages/public/PortfolioPage';
import { PortfolioDetailPage } from './pages/public/PortfolioDetailPage';
import { StylesPage } from './pages/public/StylesPage';
import { PackagesPage } from './pages/public/PackagesPage';
import { PlanEventPage } from './pages/public/PlanEventPage';
import { RequestQuotePage } from './pages/public/RequestQuotePage';
import { TestimonialsPage } from './pages/public/TestimonialsPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';

// Customer Pages
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { MyEventsPage } from './pages/customer/MyEventsPage';
import { MyEnquiriesPage } from './pages/customer/MyEnquiriesPage';
import { MyQuotesPage } from './pages/customer/MyQuotesPage';
import { SavedDesignsPage } from './pages/customer/SavedDesignsPage';
import { ProfilePage } from './pages/customer/ProfilePage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPortfolioPage } from './pages/admin/AdminPortfolioPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminBeforeAfterPage } from './pages/admin/AdminBeforeAfterPage';
import { AdminEventsPage } from './pages/admin/AdminEventsPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminQuotesPage } from './pages/admin/AdminQuotesPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminStylesPage } from './pages/admin/AdminStylesPage';
import { AdminPackagesPage } from './pages/admin/AdminPackagesPage';
import { AdminTestimonialsPage } from './pages/admin/AdminTestimonialsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StoreProvider>
          <Routes>
            {/* PUBLIC WEBSITE ROUTES */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:id" element={<PortfolioDetailPage />} />
              <Route path="/styles" element={<StylesPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/plan-event" element={<PlanEventPage />} />
              <Route path="/request-quote" element={<RequestQuotePage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Route>

            {/* CUSTOMER DASHBOARD ROUTES */}
            <Route path="/dashboard" element={<CustomerLayout />}>
              <Route index element={<CustomerDashboard />} />
              <Route path="events" element={<MyEventsPage />} />
              <Route path="enquiries" element={<MyEnquiriesPage />} />
              <Route path="quotes" element={<MyQuotesPage />} />
              <Route path="saved-designs" element={<SavedDesignsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* ADMIN PORTAL ROUTES */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="portfolio" element={<AdminPortfolioPage />} />
              <Route path="gallery" element={<AdminGalleryPage />} />
              <Route path="before-after" element={<AdminBeforeAfterPage />} />
              <Route path="enquiries" element={<AdminEnquiriesPage />} />
              <Route path="quotes" element={<AdminQuotesPage />} />
              <Route path="events" element={<AdminEventsPage />} />
              <Route path="services" element={<AdminServicesPage />} />
              <Route path="styles" element={<AdminStylesPage />} />
              <Route path="packages" element={<AdminPackagesPage />} />
              <Route path="testimonials" element={<AdminTestimonialsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* 404 CATCH ALL */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </StoreProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
