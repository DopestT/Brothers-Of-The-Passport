import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './sections/Footer';

// Landing pages
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import WhatMembersGet from './sections/WhatMembersGet';
import SocialProof from './sections/SocialProof';
import MembershipTiers from './sections/MembershipTiers';

// Legal pages
import PrivacyPolicy from './pages/privacy';
import TermsOfService from './pages/terms';
import RefundPolicy from './pages/refunds';
import Disclaimer from './pages/disclaimer';
import Contact from './pages/contact';

// Auth & Member pages
import Join from './pages/join';
import Apply from './pages/apply';
import Login from './pages/login';
import Dashboard from './pages/dashboard';

// Travel & Tools
import BookTravel from './pages/book-travel';
import ToolsPerks from './pages/tools-perks';

// Elite
import EliteConcierge from './pages/elite/concierge';

// Partners
import Partners from './pages/partners';

// Content
import Guides from './pages/guides';
import CityGuidePage from './pages/city-guides';

// Community
import Community from './pages/community';
import Events from './pages/events';

// Admin
import AdminDashboard from './pages/admin';
import AdminRevenue from './pages/admin/revenue';
import AdminMetrics from './pages/admin/metrics';

import './App.css';

// Analytics component
const Analytics = () => {
  const location = useLocation();
  
  useEffect(() => {
    const analyticsId = import.meta.env.VITE_PUBLIC_ANALYTICS_ID;
    if (analyticsId && typeof window !== 'undefined') {
      if (import.meta.env.VITE_ANALYTICS_PROVIDER === 'plausible') {
        // @ts-ignore
        if (window.plausible) {
          // @ts-ignore
          window.plausible('pageview');
        }
      }
      if (import.meta.env.VITE_ANALYTICS_PROVIDER === 'ga' && (window as any).gtag) {
        (window as any).gtag('config', analyticsId, {
          page_path: location.pathname,
        });
      }
    }
  }, [location]);
  
  return null;
};

// Landing page component
const LandingPage = () => (
  <>
    <Hero />
    <HowItWorks />
    <WhatMembersGet />
    <SocialProof />
    <MembershipTiers />
  </>
);

// Page wrapper with navigation and footer
const PageWrapper = ({ children, showNav = true, showFooter = true }: { 
  children: React.ReactNode; 
  showNav?: boolean;
  showFooter?: boolean;
}) => (
  <div className="min-h-screen bg-charcoal text-ivory" style={{ paddingTop: '30px' }}>
    {showNav && <Navigation />}
    <main>{children}</main>
    {showFooter && <Footer />}
  </div>
);

function App() {
  return (
    <Router>
      <Analytics />
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={
          <PageWrapper>
            <LandingPage />
          </PageWrapper>
        } />
        
        {/* Legal Pages */}
        <Route path="/privacy" element={
          <PageWrapper>
            <PrivacyPolicy />
          </PageWrapper>
        } />
        <Route path="/terms" element={
          <PageWrapper>
            <TermsOfService />
          </PageWrapper>
        } />
        <Route path="/refunds" element={
          <PageWrapper>
            <RefundPolicy />
          </PageWrapper>
        } />
        <Route path="/disclaimer" element={
          <PageWrapper>
            <Disclaimer />
          </PageWrapper>
        } />
        <Route path="/contact" element={
          <PageWrapper>
            <Contact />
          </PageWrapper>
        } />
        
        {/* Auth & Member Pages */}
        <Route path="/join" element={
          <PageWrapper>
            <Join />
          </PageWrapper>
        } />
        <Route path="/apply" element={
          <PageWrapper>
            <Apply />
          </PageWrapper>
        } />
        <Route path="/login" element={
          <PageWrapper showFooter={false}>
            <Login />
          </PageWrapper>
        } />
        <Route path="/dashboard" element={
          <PageWrapper>
            <Dashboard />
          </PageWrapper>
        } />
        
        {/* Travel & Tools */}
        <Route path="/book-travel" element={
          <PageWrapper>
            <BookTravel />
          </PageWrapper>
        } />
        <Route path="/tools-perks" element={
          <PageWrapper>
            <ToolsPerks />
          </PageWrapper>
        } />
        
        {/* Elite */}
        <Route path="/elite/concierge" element={
          <PageWrapper>
            <EliteConcierge />
          </PageWrapper>
        } />
        
        {/* Partners */}
        <Route path="/partners" element={
          <PageWrapper>
            <Partners />
          </PageWrapper>
        } />
        
        {/* Content */}
        <Route path="/guides" element={
          <PageWrapper>
            <Guides />
          </PageWrapper>
        } />
        <Route path="/city-guides" element={
          <PageWrapper>
            <CityGuidePage />
          </PageWrapper>
        } />
        <Route path="/city-guides/:country" element={
          <PageWrapper>
            <CityGuidePage />
          </PageWrapper>
        } />
        <Route path="/city-guides/:country/:city" element={
          <PageWrapper>
            <CityGuidePage />
          </PageWrapper>
        } />
        
        {/* Community */}
        <Route path="/community" element={
          <PageWrapper>
            <Community />
          </PageWrapper>
        } />
        <Route path="/events" element={
          <PageWrapper>
            <Events />
          </PageWrapper>
        } />
        
        {/* Admin */}
        <Route path="/admin" element={
          <PageWrapper>
            <AdminDashboard />
          </PageWrapper>
        } />
        <Route path="/admin/revenue" element={
          <PageWrapper>
            <AdminRevenue />
          </PageWrapper>
        } />
        <Route path="/admin/metrics" element={
          <PageWrapper>
            <AdminMetrics />
          </PageWrapper>
        } />
        
        {/* 404 */}
        <Route path="*" element={
          <PageWrapper>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="font-serif text-6xl text-gold mb-4">404</h1>
                <p className="text-ivory/70 mb-8">Page not found</p>
                <a href="/" className="btn-gold">Go Home</a>
              </div>
            </div>
          </PageWrapper>
        } />
      </Routes>
    </Router>
  );
}

export default App;
