import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wind, 
  Tv, 
  Laptop, 
  Bike, 
  Zap, 
  ArrowUpRight, 
  ShieldAlert, 
  Sparkles,
  Layers,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Wrench
} from 'lucide-react';
import { WashingMachineIcon } from '../icons/CustomIcons';
import { CATEGORIES } from '../../data/mockData';

export const CategoryShowcase: React.FC = () => {
  const { startDiagnosis, setCurrentView, setIsDirectMechanicModalOpen } = useApp();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-paper-100 text-carbon-950 relative border-t border-paper-300">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Editorial Section Header with Concept A typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="font-mono text-xs text-brand-orange uppercase font-bold tracking-widest block">
              SECTION 03 — SPECIALIZED CATEGORIES
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-carbon-950 tracking-tight uppercase leading-[0.95]">
              WHAT CAN <br />
              <span className="text-stroke-orange text-brand-orange">WE FIX FOR YOU?</span>
            </h2>
          </div>
          <div className="space-y-2 max-w-md">
            <p className="text-carbon-600 text-sm leading-relaxed">
              Engineered specifically for Indian households: high-wear components for washing machines, inverter ACs, 4K TVs, and commuter scooters.
            </p>
            <button
              onClick={() => setIsDirectMechanicModalOpen(true)}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-brand-orange hover:text-brand-amber underline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Can't figure out the problem? Call a mechanic directly (₹199) →</span>
            </button>
          </div>
        </div>

        {/* 3 Large Organic Anti-Grid Hero Category Panels */}
        <div className="space-y-12">
          
          {/* CATEGORY 01 — HOME APPLIANCES */}
          <div className="rounded-3xl bg-gradient-to-r from-carbon-950 via-carbon-900 to-carbon-950 text-paper-50 border border-carbon-800 p-8 sm:p-12 relative overflow-visible shadow-2xl group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left editorial description & direct symptoms (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/40">
                    CATEGORY 01
                  </span>
                  <span className="font-mono text-xs text-paper-400">1,420+ Verified SKUs in Hubs</span>
                </div>

                <h3 className="font-display font-black text-3xl sm:text-5xl text-paper-50 tracking-tight uppercase">
                  HOME <br />
                  <span className="text-brand-orange">APPLIANCES</span>
                </h3>

                <p className="text-paper-300 text-sm leading-relaxed max-w-lg">
                  Washing machines, inverter split air conditioners, single & double-door refrigerators, and microwave ovens.
                </p>

                {/* Instant Symptom Jump Buttons */}
                <div className="space-y-2">
                  <span className="font-mono text-[11px] text-paper-400 uppercase tracking-wider block">
                    Popular Everyday Symptoms:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <button
                      onClick={() => startDiagnosis('home', 'wm')}
                      className="px-3.5 py-2 rounded-xl bg-carbon-850 hover:bg-brand-orange hover:text-carbon-950 text-paper-200 border border-carbon-700 transition-all flex items-center gap-1.5"
                    >
                      <span>🧺</span>
                      <span>Washing Machine Won't Drain</span>
                    </button>

                    <button
                      onClick={() => startDiagnosis('home', 'ac')}
                      className="px-3.5 py-2 rounded-xl bg-carbon-850 hover:bg-brand-orange hover:text-carbon-950 text-paper-200 border border-carbon-700 transition-all flex items-center gap-1.5"
                    >
                      <span>❄️</span>
                      <span>AC Not Cooling / Warm Air</span>
                    </button>

                    <button
                      onClick={() => startDiagnosis('home', 'fridge')}
                      className="px-3.5 py-2 rounded-xl bg-carbon-850 hover:bg-brand-orange hover:text-carbon-950 text-paper-200 border border-carbon-700 transition-all flex items-center gap-1.5"
                    >
                      <span>🧊</span>
                      <span>Fridge Bottom Cooling Lost</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => startDiagnosis('home')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-display font-black text-xs transition-all shadow-glow-orange"
                  >
                    <span>START HOME DIAGNOSIS</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsDirectMechanicModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-carbon-800 hover:bg-carbon-750 text-paper-200 font-display font-bold text-xs border border-carbon-700 transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Call Technician Directly (₹199)</span>
                  </button>
                </div>
              </div>

              {/* Right: Exploded Visual schematic mockup (5 cols) */}
              <div className="lg:col-span-5 relative">
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-carbon-950 border border-carbon-800 p-4 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                    alt="Home Appliance Repair"
                    className="w-full h-full object-cover rounded-xl opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/40 to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <div className="bg-carbon-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-carbon-750">
                      <span className="font-mono text-brand-orange font-bold">Drain Pump • Bellow Gasket • Run Cap</span>
                    </div>
                    <span className="font-mono text-[11px] bg-trust-emerald/20 text-trust-emerald px-2 py-1 rounded-lg border border-trust-emerald/40 font-bold">
                      2-Hr Dispatch
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* CATEGORY 02 — CONSUMER TECH */}
          <div className="rounded-3xl bg-gradient-to-r from-carbon-950 via-carbon-900 to-carbon-950 text-paper-50 border border-carbon-800 p-8 sm:p-12 relative overflow-visible shadow-2xl group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Image (5 cols) */}
              <div className="lg:col-span-5 order-2 lg:order-1 relative">
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-carbon-950 border border-carbon-800 p-4 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80"
                    alt="Consumer Tech Diagnostics"
                    className="w-full h-full object-cover rounded-xl opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/40 to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <div className="bg-carbon-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-carbon-750">
                      <span className="font-mono text-trust-blue font-bold">T-Con Logic Board • Backlight Strips</span>
                    </div>
                    <span className="font-mono text-[11px] bg-trust-emerald/20 text-trust-emerald px-2 py-1 rounded-lg border border-trust-emerald/40 font-bold">
                      Anti-Static Certified
                    </span>
                  </div>
                </div>
              </div>

              {/* Right editorial description (7 cols) */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-trust-blue/20 text-trust-blue border border-trust-blue/40">
                    CATEGORY 02
                  </span>
                  <span className="font-mono text-xs text-paper-400">890+ Precision Electronic Components</span>
                </div>

                <h3 className="font-display font-black text-3xl sm:text-5xl text-paper-50 tracking-tight uppercase">
                  CONSUMER <br />
                  <span className="text-trust-blue">ELECTRONICS & TV</span>
                </h3>

                <p className="text-paper-300 text-sm leading-relaxed max-w-lg">
                  Smart LED/OLED displays, laptops, thermal cooling modules, motherboards, and power supplies.
                </p>

                {/* Instant Symptom Jump Buttons */}
                <div className="space-y-2">
                  <span className="font-mono text-[11px] text-paper-400 uppercase tracking-wider block">
                    Popular Everyday Symptoms:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <button
                      onClick={() => startDiagnosis('tech', 'tv')}
                      className="px-3.5 py-2 rounded-xl bg-carbon-850 hover:bg-trust-blue hover:text-white text-paper-200 border border-carbon-700 transition-all flex items-center gap-1.5"
                    >
                      <span>📺</span>
                      <span>TV Sound Works, Screen Black</span>
                    </button>

                    <button
                      onClick={() => startDiagnosis('tech', 'laptop')}
                      className="px-3.5 py-2 rounded-xl bg-carbon-850 hover:bg-trust-blue hover:text-white text-paper-200 border border-carbon-700 transition-all flex items-center gap-1.5"
                    >
                      <span>💻</span>
                      <span>Laptop Overheating / Fan Screech</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => startDiagnosis('tech')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-trust-blue hover:bg-trust-blue/80 text-white font-display font-black text-xs transition-all shadow-lg"
                  >
                    <span>START ELECTRONICS DIAGNOSIS</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsDirectMechanicModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-carbon-800 hover:bg-carbon-750 text-paper-200 font-display font-bold text-xs border border-carbon-700 transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-trust-blue" />
                    <span>Call TV/Tech Expert (₹199)</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* CATEGORY 03 — TWO-WHEELERS & MOBILITY */}
          <div className="rounded-3xl bg-gradient-to-r from-carbon-950 via-carbon-900 to-carbon-950 text-paper-50 border border-carbon-800 p-8 sm:p-12 relative overflow-visible shadow-2xl group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left editorial description (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/40">
                    CATEGORY 03
                  </span>
                  <span className="font-mono text-xs text-paper-400">540+ Commuter Bike & EV Spares</span>
                </div>

                <h3 className="font-display font-black text-3xl sm:text-5xl text-paper-50 tracking-tight uppercase">
                  TWO-WHEELERS <br />
                  <span className="text-brand-yellow">& URBAN EV</span>
                </h3>

                <p className="text-paper-300 text-sm leading-relaxed max-w-lg">
                  Honda Activa, TVS Jupiter, Hero Splendor, Bajaj Pulsar, and electric scooters: brake assemblies, spark systems, and carburetors.
                </p>

                {/* Instant Symptom Jump Buttons */}
                <div className="space-y-2">
                  <span className="font-mono text-[11px] text-paper-400 uppercase tracking-wider block">
                    Popular Everyday Symptoms:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <button
                      onClick={() => startDiagnosis('ride', 'scooter')}
                      className="px-3.5 py-2 rounded-xl bg-carbon-850 hover:bg-brand-yellow hover:text-carbon-950 text-paper-200 border border-carbon-700 transition-all flex items-center gap-1.5"
                    >
                      <span>🛵</span>
                      <span>Scooter Spongy Brake / Squeal</span>
                    </button>

                    <button
                      onClick={() => startDiagnosis('ride', 'scooter')}
                      className="px-3.5 py-2 rounded-xl bg-carbon-850 hover:bg-brand-yellow hover:text-carbon-950 text-paper-200 border border-carbon-700 transition-all flex items-center gap-1.5"
                    >
                      <span>⚡</span>
                      <span>Starting Relay / Self-Start Click</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => startDiagnosis('ride')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-yellow hover:bg-brand-yellow/90 text-carbon-950 font-display font-black text-xs transition-all shadow-lg"
                  >
                    <span>START TWO-WHEELER DIAGNOSIS</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsDirectMechanicModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-carbon-800 hover:bg-carbon-750 text-paper-200 font-display font-bold text-xs border border-carbon-700 transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-brand-yellow" />
                    <span>Call Bike Mechanic (₹199)</span>
                  </button>
                </div>
              </div>

              {/* Right: Exploded Visual schematic mockup (5 cols) */}
              <div className="lg:col-span-5 relative">
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-carbon-950 border border-carbon-800 p-4 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"
                    alt="Two-Wheeler Repair"
                    className="w-full h-full object-cover rounded-xl opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/40 to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <div className="bg-carbon-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-carbon-750">
                      <span className="font-mono text-brand-yellow font-bold">Ceramic Disc Brake • Sintered Clutch</span>
                    </div>
                    <span className="font-mono text-[11px] bg-trust-emerald/20 text-trust-emerald px-2 py-1 rounded-lg border border-trust-emerald/40 font-bold">
                      Doorstep Kit Ready
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
