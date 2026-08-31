import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Camera, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Wrench, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Layers, 
  Award,
  Zap,
  PhoneCall,
  Activity,
  Cpu
} from 'lucide-react';
import { WashingMachineIcon } from '../icons/CustomIcons';
import { SAMPLE_SCAN_IMAGES, VERIFIED_TECHNICIANS } from '../../data/mockData';

export const Hero: React.FC = () => {
  const { 
    startDiagnosis, 
    setCurrentView, 
    runPhotoScan, 
    pinCode, 
    pinData, 
    setIsPinModalOpen,
    setIsDirectMechanicModalOpen 
  } = useApp();

  const [headlineStage, setHeadlineStage] = useState(0);

  // Kinetic typography sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineStage((prev) => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 bg-paper-100 text-carbon-950 overflow-hidden">
      {/* Background ambient lighting accents */}
      <div className="absolute top-12 right-12 w-[550px] h-[550px] bg-brand-orange/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-trust-emerald/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Floating Background Subtle Tech Tools (Anti-Grid Visual Flair) */}
      <div className="absolute top-28 left-6 w-20 h-20 opacity-15 rotate-12 pointer-events-none hidden xl:block">
        <img
          src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=300&q=80"
          alt="Tool"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="absolute bottom-20 right-8 w-24 h-24 opacity-15 -rotate-12 pointer-events-none hidden xl:block">
        <img
          src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=300&q=80"
          alt="Component"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Notification Strip: India's 1st 30-Min Network */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-50 border border-paper-300 shadow-sm">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-trust-emerald opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-trust-emerald"></span>
            </span>
            <span className="font-mono font-semibold text-carbon-900">
              Active Network: <strong className="text-trust-emerald font-black">14,890+</strong> Devices Repaired & Saved
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPinModalOpen(true)}
              className="flex items-center gap-1.5 font-mono text-xs text-carbon-700 hover:text-brand-orange transition-colors px-3.5 py-1.5 rounded-xl bg-paper-50 border border-paper-300 shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-orange animate-bounce" />
              <span>{pinData ? `${pinData.city} (${pinCode})` : pinCode} • <span className="text-trust-emerald font-bold">{pinData?.expressTechnicianETA || '35m'} Tech ETA</span></span>
            </button>

            <button
              onClick={() => setIsDirectMechanicModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-brand-orange hover:text-brand-amber font-bold px-3.5 py-1.5 rounded-xl bg-brand-orange/10 border border-brand-orange/30 shadow-sm transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Direct Mechanic Call (₹199)</span>
            </button>
          </div>
        </div>

        {/* CONCEPT A: THE KINETIC ANTI-GRID STAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Hero Stage Card with Overlapping Appliance (8 cols) */}
          <div className="lg:col-span-8 rounded-3xl bg-gradient-to-br from-carbon-950 via-carbon-900 to-carbon-950 text-paper-50 p-8 sm:p-12 relative overflow-visible shadow-2xl border border-carbon-800 flex flex-col justify-between min-h-[580px]">
            
            {/* Top Kinetic Headline */}
            <div className="relative z-10 max-w-xl space-y-2">
              <span className="font-mono text-xs text-brand-orange font-bold uppercase tracking-widest block">
                THE REPAIR-COMMERCE PLATFORM
              </span>
              <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase leading-[0.88] text-paper-50">
                SOMETHING BROKEN? <br />
                <span className="text-stroke-orange text-brand-orange">FIX IT.</span>
              </h1>
              <p className="text-paper-300 text-sm sm:text-base max-w-md pt-2 leading-relaxed font-normal">
                Don't replace it. Connect your broken machine to verified OEM parts and master local technicians with our <strong className="text-paper-50 font-bold">90-Day Digital Guarantee</strong>.
              </p>
            </div>

            {/* Overlapping Hyper-Realistic Washing Machine Illustration & Anti-Grid Floating Pills */}
            <div className="relative my-8 lg:my-0 lg:absolute lg:right-4 lg:bottom-4 lg:w-[440px] pointer-events-auto">
              
              {/* Main Machine Image */}
              <div className="relative z-10 group">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                  alt="Washing Machine Repair"
                  className="w-72 sm:w-80 lg:w-full h-auto rounded-3xl object-cover shadow-2xl border-2 border-carbon-700/70 group-hover:scale-102 transition-transform duration-500 mx-auto"
                />

                {/* Floating Glowing Match Pill: ✨ 92% MATCH • ₹899 */}
                <div className="absolute -top-5 -left-4 z-20 px-4 py-2 rounded-2xl bg-carbon-950/95 border border-brand-orange/60 shadow-glow-orange flex items-center gap-2 backdrop-blur-md animate-float-slow">
                  <Sparkles className="w-4 h-4 text-brand-yellow animate-spin-slow" />
                  <span className="font-mono font-black text-xs text-paper-50">
                    92% MATCH • <span className="text-brand-orange">₹899</span>
                  </span>
                </div>

                {/* Floating Component Callout Pill */}
                <div className="absolute top-1/2 -right-3 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-carbon-900/90 border border-carbon-700 font-mono text-[10px] text-trust-blue shadow-lg backdrop-blur-md">
                  <span>⚙️ OEM Synchronous Pump</span>
                </div>

                {/* Floating Verified Technician Badge: Raj Kumar */}
                <div className="absolute -bottom-5 right-2 z-20 p-3 rounded-2xl bg-paper-50 text-carbon-950 border border-paper-300 shadow-2xl flex items-center gap-3 backdrop-blur-md animate-float-slow">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                    alt="Raj Kumar"
                    className="w-9 h-9 rounded-xl object-cover border-2 border-trust-emerald"
                  />
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-trust-emerald" />
                      <span className="text-xs font-bold text-carbon-950">Verified Master Tech</span>
                    </div>
                    <span className="text-[10px] font-mono text-carbon-600 block -mt-0.5">
                      Raj Kumar • 4.9★ (35m ETA)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions: 1-Tap Photo Scan + Direct Mechanic Call */}
            <div className="relative z-10 pt-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => startDiagnosis()}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-amber hover:from-brand-amber hover:to-brand-orange text-carbon-950 font-display font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-3 transition-all duration-300 shadow-glow-orange hover:scale-105 active:scale-95 group"
                >
                  <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>SNAP PHOTO TO FIX 📸</span>
                </button>

                {/* NEW CRITICAL FEATURE: DIRECT MECHANIC DISPATCH */}
                <button
                  onClick={() => setIsDirectMechanicModalOpen(true)}
                  className="px-6 py-4 rounded-2xl bg-paper-50 hover:bg-paper-200 text-carbon-950 font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md border border-paper-300 hover:scale-102"
                >
                  <PhoneCall className="w-4 h-4 text-brand-orange animate-pulse" />
                  <span>CAN'T DIAGNOSE? CALL MECHANIC →</span>
                </button>
              </div>

              {/* Guarantees Strip */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-paper-300 pt-1">
                <span className="flex items-center gap-1 text-trust-emerald font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>90-Day Digital Guarantee</span>
                </span>
                <span className="text-paper-600">•</span>
                <span>₹0 Pay After Inspection</span>
                <span className="text-paper-600">•</span>
                <span>100% Genuine Stamped Parts</span>
              </div>
            </div>

          </div>

          {/* Right Column: Customer Happiness & Fast Direct Booking (4 cols) */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
            
            {/* Top Module: Customer Proof & Rapid ETA */}
            <div className="rounded-3xl bg-paper-50 border border-paper-300 p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-brand-orange font-bold uppercase">
                  VERIFIED LOCAL NETWORK
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-trust-emerald/20 text-trust-emerald font-mono text-[10px] font-bold">
                  ● ACTIVE NOW
                </span>
              </div>

              <h3 className="font-display font-black text-2xl text-carbon-950 tracking-tight leading-tight">
                90-Day Happy Guarantee
              </h3>
              <p className="text-xs text-carbon-600 leading-relaxed">
                Over 14,890+ households fixed with zero repeated breakdowns.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-center font-mono">
                <div className="p-3 rounded-2xl bg-paper-100 border border-paper-300">
                  <span className="font-black text-lg text-carbon-950 block">4.94★</span>
                  <span className="text-[10px] text-carbon-500">Customer Rating</span>
                </div>
                <div className="p-3 rounded-2xl bg-paper-100 border border-paper-300">
                  <span className="font-black text-lg text-brand-orange block">35 mins</span>
                  <span className="text-[10px] text-carbon-500">Average Tech ETA</span>
                </div>
              </div>

              <button
                onClick={() => setIsDirectMechanicModalOpen(true)}
                className="w-full py-3 bg-carbon-950 hover:bg-brand-orange hover:text-carbon-950 text-paper-50 font-display font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Book ₹199 Doorstep Diagnostic Visit</span>
              </button>
            </div>

            {/* Bottom Module: 1-Click Essential Service Selector */}
            <div className="rounded-3xl bg-gradient-to-br from-carbon-900 to-carbon-950 text-paper-50 p-6 shadow-xl border border-carbon-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-paper-400 uppercase font-semibold block">
                  Quick 1-Tap Category Fix:
                </span>
                <span className="text-[10px] font-mono text-trust-emerald font-bold">2-Hr Spares Hub</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => startDiagnosis('home', 'wm')}
                  className="p-3 rounded-2xl bg-carbon-850 hover:bg-brand-orange hover:text-carbon-950 text-paper-200 border border-carbon-700 text-left transition-all font-semibold group flex items-center gap-2"
                >
                  <span className="text-base group-hover:scale-110 transition-transform">🧺</span>
                  <div className="min-w-0">
                    <span className="block truncate">Washing Machine</span>
                    <span className="font-mono text-[9px] text-paper-400">from ₹299</span>
                  </div>
                </button>

                <button
                  onClick={() => startDiagnosis('home', 'ac')}
                  className="p-3 rounded-2xl bg-carbon-850 hover:bg-brand-orange hover:text-carbon-950 text-paper-200 border border-carbon-700 text-left transition-all font-semibold group flex items-center gap-2"
                >
                  <span className="text-base group-hover:scale-110 transition-transform">❄️</span>
                  <div className="min-w-0">
                    <span className="block truncate">Inverter AC</span>
                    <span className="font-mono text-[9px] text-paper-400">from ₹349</span>
                  </div>
                </button>

                <button
                  onClick={() => startDiagnosis('tech', 'tv')}
                  className="p-3 rounded-2xl bg-carbon-850 hover:bg-brand-orange hover:text-carbon-950 text-paper-200 border border-carbon-700 text-left transition-all font-semibold group flex items-center gap-2"
                >
                  <span className="text-base group-hover:scale-110 transition-transform">📺</span>
                  <div className="min-w-0">
                    <span className="block truncate">Smart TV</span>
                    <span className="font-mono text-[9px] text-paper-400">from ₹299</span>
                  </div>
                </button>

                <button
                  onClick={() => startDiagnosis('ride', 'scooter')}
                  className="p-3 rounded-2xl bg-carbon-850 hover:bg-brand-orange hover:text-carbon-950 text-paper-200 border border-carbon-700 text-left transition-all font-semibold group flex items-center gap-2"
                >
                  <span className="text-base group-hover:scale-110 transition-transform">🛵</span>
                  <div className="min-w-0">
                    <span className="block truncate">Two-Wheeler</span>
                    <span className="font-mono text-[9px] text-paper-400">from ₹199</span>
                  </div>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
