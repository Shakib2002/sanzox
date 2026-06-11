import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from './PageTransition';

// Layouts (Static)
import { AdminLayout } from '@/components/admin/AdminLayout';

// Pages (Lazy)
const Index = lazy(() => import('@/pages/Index'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Services = lazy(() => import('@/pages/Services'));
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'));
const Works = lazy(() => import('@/pages/Works'));
const WorkDetail = lazy(() => import('@/pages/WorkDetail'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogDetail = lazy(() => import('@/pages/BlogDetail'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const ProductPage = lazy(() => import('@/pages/ProductPage'));

// Admin (Lazy)
const AdminLogin = lazy(() => import('@/pages/admin/Login'));
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminServices = lazy(() => import('@/pages/admin/Services'));
const AdminWorks = lazy(() => import('@/pages/admin/Works'));
const AdminTestimonials = lazy(() => import('@/pages/admin/Testimonials'));
const AdminBlog = lazy(() => import('@/pages/admin/Blog'));
const AdminLeads = lazy(() => import('@/pages/admin/Leads'));
const AdminSettings = lazy(() => import('@/pages/admin/Settings'));
const AdminTeam = lazy(() => import('@/pages/admin/Team'));

// App Pages (Lazy)
const PrivacyPolicy = lazy(() => import('./appPages/MaxDrive/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./appPages/MaxDrive/terms'));
const DeepFocusPrivacyPolicy = lazy(() => import('./appPages/DeepFocus/privacyPolicy'));
const DeepFocusTerms = lazy(() => import('./appPages/DeepFocus/termsConditions'));
const DeleteAccount = lazy(() => import('./appPages/DeleteAcc'));
const MaxDrive = lazy(() => import('./appPages/MaxDrive/maxdrive'));

const PageLoader = () => (
  <div className="min-h-[60vh] w-full flex items-center justify-center bg-background/50 backdrop-blur-sm">
    <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
  </div>
);


export function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/services/:slug" element={<PageTransition><ServiceDetail /></PageTransition>} />
          <Route path="/works" element={<PageTransition><Works /></PageTransition>} />
          <Route path="/works/:slug" element={<PageTransition><WorkDetail /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/blog/:slug" element={<PageTransition><BlogDetail /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/products" element={<PageTransition><ProductPage /></PageTransition>} />
          <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
          <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="works" element={<AdminWorks />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* app routes */}
          {/* max drive */}
          <Route path="/maxdrive/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/maxdrive/terms-and-conditions" element={<TermsAndConditions />} />
          {/* deep focus */}
          <Route path="/deep-focus/privacy-policy" element={<DeepFocusPrivacyPolicy />} />
          <Route path="/deep-focus/terms-and-conditions" element={<DeepFocusTerms />} />

          {/* delete */}
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/maxdrive" element={<MaxDrive />} />

          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}