import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { 
  Wrench, 
  MapPin, 
  ShoppingCart, 
  ShieldCheck, 
  UserCheck, 
  ChevronDown, 
  Sparkles, 
  PackageCheck,
  Search
} from 'lucide-react';
import { UserRole } from '../../types';
import { FixKartLogo } from './FixKartLogo';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    role, 
    setRole, 
    pinCode, 
    pinData, 
    setIsPinModalOpen, 
    setIsCartOpen,
    cartTotal,
    startDiagnosis,
    orders
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const rolesConfig: { role: UserRole; title: string; subtitle: string; icon: string; color: string }[] = [
    { role: 'customer', title: 'Customer Experience', subtitle: 'Diagnose, Buy & Book Fixes', icon: '👤', color: 'text-brand-orange' },
    { role: 'technician', title: 'Technician Portal', subtitle: 'Raj Kumar (4.9★ Master Tech)', icon: '🔧', color: 'text-trust-blue' },
    { role: 'supplier', title: 'Supplier Hub', subtitle: 'Apex Spares & Components Ltd', icon: '📦', color: 'text-brand-yellow' },
    { role: 'admin', title: 'FixKart Control Center', subtitle: 'Ops Command & Live Dispatch', icon: '⚡', color: 'text-trust-emerald' }
  ];

  const activeRoleConfig = rolesConfig.find(r => r.role === role) || rolesConfig[0];

  const handleNavClick = (view: AppView) => {
    if (view === 'fix') {
      startDiagnosis();
    } else {
      setCurrentView(view);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-carbon-950/85 backdrop-blur-xl border-b border-carbon-800/80 transition-all duration-300">
      {/* Top micro-bar for Indian Serviceability & Guarantee */}
      <div className="bg-carbon-900 border-b border-carbon-800/50 py-1 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-paper-400">
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-brand-orange/20 text-brand-orange font-mono text-[10px] font-bold">
              INDIA'S 1ST
            </span>
            <span className="hidden sm:inline">Decentralized Repair-Commerce Platform</span>
            <span className="text-paper-500">•</span>
            <span className="text-trust-emerald flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> 90-Day Digital Guarantee on All Fixes
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* PIN Code quick toggle */}
            <button
              onClick={() => setIsPinModalOpen(true)}
              className="flex items-center gap-1.5 text-paper-300 hover:text-brand-orange transition-colors font-mono"
            >
              <MapPin className="w-3 h-3 text-brand-orange animate-pulse" />
              <span>{pinData ? `${pinData.city} (${pinCode})` : `PIN: ${pinCode}`}</span>
              <span className="text-trust-emerald text-[10px] hidden md:inline">({pinData?.expressTechnicianETA || '35m'} Fix Available)</span>
            </button>

            {/* Quick link to active order tracking if any */}
            {orders.length > 0 && (
              <button
                onClick={() => setCurrentView('account')}
                className="hidden lg:flex items-center gap-1 text-[11px] text-trust-blue hover:underline"
              >
                <PackageCheck className="w-3 h-3" />
                <span>Track Live Repair ({orders[0].trackingNumber})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavClick('home')}
            className="focus:outline-none"
          >
            <FixKartLogo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 ml-4">
            <button
              onClick={() => handleNavClick('fix')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                currentView === 'fix'
                  ? 'bg-brand-orange text-carbon-950 shadow-glow-orange font-bold'
                  : 'text-paper-300 hover:text-paper-50 hover:bg-carbon-850'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>FIX MY PROBLEM</span>
            </button>

            <button
              onClick={() => handleNavClick('marketplace')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                currentView === 'marketplace'
                  ? 'bg-carbon-800 text-brand-orange font-semibold'
                  : 'text-paper-300 hover:text-paper-50 hover:bg-carbon-850'
              }`}
            >
              Parts Marketplace
            </button>

            <button
              onClick={() => handleNavClick('technicians')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                currentView === 'technicians'
                  ? 'bg-carbon-800 text-brand-orange font-semibold'
                  : 'text-paper-300 hover:text-paper-50 hover:bg-carbon-850'
              }`}
            >
              Find Technicians
            </button>

            <button
              onClick={() => handleNavClick('account')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                currentView === 'account'
                  ? 'bg-carbon-800 text-brand-orange font-semibold'
                  : 'text-paper-300 hover:text-paper-50 hover:bg-carbon-850'
              }`}
            >
              Repair Passports & Orders
            </button>
          </nav>
        </div>

        {/* Right: Role Switcher & Cart */}
        <div className="flex items-center gap-3">
          {/* Role Switcher Pill & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-carbon-850 border border-carbon-700/70 hover:border-brand-orange/50 transition-all text-xs font-medium"
              title="Switch user viewpoint between Customer, Technician, Supplier, and Admin"
            >
              <span className="text-sm">{activeRoleConfig.icon}</span>
              <div className="text-left hidden sm:block">
                <span className="text-[10px] text-paper-400 block -mb-0.5">Role Mode</span>
                <span className={`font-semibold ${activeRoleConfig.color}`}>
                  {role === 'customer' ? 'Customer' : role === 'technician' ? 'Technician' : role === 'supplier' ? 'Supplier' : 'Admin'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-paper-400 ml-0.5" />
            </button>

            {/* Dropdown Menu */}
            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-carbon-900 border border-carbon-700 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-carbon-800 mb-1">
                  <p className="text-xs font-bold text-paper-100 uppercase tracking-wider">Switch Persona</p>
                  <p className="text-[11px] text-paper-400">Experience the 4 connected ecosystem roles</p>
                </div>

                <div className="space-y-1">
                  {rolesConfig.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => {
                        setRole(r.role);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all ${
                        role === r.role
                          ? 'bg-carbon-800 border border-carbon-700 text-paper-50'
                          : 'hover:bg-carbon-850 text-paper-300'
                      }`}
                    >
                      <span className="text-lg p-1.5 rounded-lg bg-carbon-950">{r.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold ${r.color}`}>{r.title}</span>
                          {role === r.role && (
                            <span className="w-2 h-2 rounded-full bg-trust-emerald"></span>
                          )}
                        </div>
                        <p className="text-[11px] text-paper-400 truncate mt-0.5">{r.subtitle}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-orange text-carbon-950 font-bold text-xs hover:bg-brand-amber transition-all shadow-glow-orange hover:scale-105 active:scale-95"
            aria-label="Open repair cart"
          >
            <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Cart</span>
            {cartTotal.itemCount > 0 ? (
              <span className="flex items-center justify-center px-1.5 py-0.5 rounded-full bg-carbon-950 text-paper-50 font-mono text-[10px] font-black">
                {cartTotal.itemCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
};
