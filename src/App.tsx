import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/layout/ToastContainer';

// Homepage Components
import { Hero } from './components/home/Hero';
import { StorySection } from './components/home/StorySection';
import { CategoryShowcase } from './components/home/CategoryShowcase';
import { SustainabilityFlywheel } from './components/home/SustainabilityFlywheel';

// Core Experience Flows
import { DiagnosisFlow } from './components/diagnosis/DiagnosisFlow';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { TechnicianDiscovery } from './components/technicians/TechnicianDiscovery';
import { CustomerDashboard } from './components/account/CustomerDashboard';

// Role Dashboards
import { TechnicianPortal } from './components/technician-app/TechnicianPortal';
import { SupplierPortal } from './components/supplier-portal/SupplierPortal';
import { AdminControlCenter } from './components/admin/AdminControlCenter';

// Modals & Drawers
import { CartDrawer } from './components/checkout/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { ProductDetailModal } from './components/marketplace/ProductDetailModal';
import { ProductComparison } from './components/marketplace/ProductComparison';
import { PinCodeModal } from './components/modals/PinCodeModal';
import { EdgeCaseModals } from './components/modals/EdgeCaseModals';
import { DirectMechanicModal } from './components/modals/DirectMechanicModal';

export const App: React.FC = () => {
  const { currentView, isDirectMechanicModalOpen, setIsDirectMechanicModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-carbon-950 text-paper-100 flex flex-col font-body selection:bg-brand-orange selection:text-carbon-950">
      {/* Global Minimal Kinetic Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <StorySection />
            <CategoryShowcase />
            <SustainabilityFlywheel />
          </>
        )}

        {currentView === 'fix' && <DiagnosisFlow />}
        {currentView === 'marketplace' && <MarketplaceView />}
        {currentView === 'technicians' && <TechnicianDiscovery />}
        {currentView === 'account' && <CustomerDashboard />}
        {currentView === 'technician-portal' && <TechnicianPortal />}
        {currentView === 'supplier-portal' && <SupplierPortal />}
        {currentView === 'admin-portal' && <AdminControlCenter />}
      </main>

      {/* Modals & Overlay Portals */}
      <CartDrawer />
      <CheckoutModal />
      <ProductDetailModal />
      <ProductComparison />
      <PinCodeModal />
      <EdgeCaseModals />
      <DirectMechanicModal 
        isOpen={isDirectMechanicModalOpen} 
        onClose={() => setIsDirectMechanicModalOpen(false)} 
      />
      <ToastContainer />

      {/* Footer */}
      <Footer />

      {/* Mobile-First Bottom Nav Bar */}
      <MobileNav />
    </div>
  );
};
