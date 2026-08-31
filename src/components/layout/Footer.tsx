import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wrench, ShieldCheck, RefreshCw, Cpu, Award, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, startDiagnosis, setRole } = useApp();

  return (
    <footer className="bg-carbon-950 border-t border-carbon-850 pt-16 pb-28 md:pb-16 text-paper-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Kinetic Manifesto Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-carbon-900 via-carbon-850 to-carbon-900 border border-carbon-700/60 p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-circuit-grid opacity-30 pointer-events-none"></div>
          
          <div className="max-w-3xl relative z-10">
            <span className="font-mono text-xs text-brand-orange uppercase tracking-widest block mb-3 font-semibold">
              The Repair Manifesto
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-paper-50 tracking-tight leading-tight">
              Planned obsolescence ends here. <br />
              <span className="text-stroke-white">Every machine deserves</span> a second life.
            </h3>
            <p className="text-paper-400 text-sm mt-4 leading-relaxed max-w-xl">
              FixKart eliminates the friction of broken appliances, electronics, and vehicles by uniting AI diagnostics, verified OEM supply chains, and master technicians under a single 90-day digital guarantee.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => startDiagnosis()}
                className="px-6 py-3 rounded-xl bg-brand-orange text-carbon-950 font-display font-bold text-sm hover:bg-brand-amber transition-all shadow-glow-orange flex items-center gap-2"
              >
                <span>FIX MY PROBLEM NOW</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentView('marketplace')}
                className="px-6 py-3 rounded-xl bg-carbon-800 hover:bg-carbon-700 border border-carbon-700 text-paper-100 font-medium text-sm transition-all"
              >
                Explore 50,000+ Parts
              </button>
            </div>
          </div>
        </div>

        {/* 4 Value Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-carbon-850">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange flex-shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-paper-50">AI Optical Diagnostics</h4>
              <p className="text-xs text-paper-400 mt-1 leading-relaxed">
                Scan broken parts with laser-precise schematic matching down to factory SKU.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-trust-blue/10 border border-trust-blue/20 flex items-center justify-center text-trust-blue flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-paper-50">100% Genuine Batch Tested</h4>
              <p className="text-xs text-paper-400 mt-1 leading-relaxed">
                OEM, Certified, and Economy tiers authenticated with batch serialization.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-trust-emerald/10 border border-trust-emerald/20 flex items-center justify-center text-trust-emerald flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-paper-50">90-Day Digital Guarantee</h4>
              <p className="text-xs text-paper-400 mt-1 leading-relaxed">
                Every repair mints a verifiable Digital Repair Passport with free re-fix cover.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow flex-shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-paper-50">Zero-Waste Circularity</h4>
              <p className="text-xs text-paper-400 mt-1 leading-relaxed">
                Over 14,890 kg of e-waste and appliance metal diverted from landfills in 2026.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 text-xs">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-brand-orange flex items-center justify-center">
                <Wrench className="w-4 h-4 text-carbon-950 font-bold" />
              </div>
              <span className="font-display font-black text-lg text-paper-50 tracking-tight">FIXKART</span>
            </div>
            <p className="text-paper-400 leading-relaxed max-w-sm mb-4">
              FixKart Technologies India Pvt Ltd. Pioneering full-stack repair-commerce across Bengaluru, Mumbai, Delhi NCR, Hyderabad, and Chennai.
            </p>
            <p className="font-mono text-[11px] text-paper-500">
              ISO 9001:2015 Certified Repair Quality & Electronics Verification Network.
            </p>
          </div>

          <div>
            <p className="font-bold text-paper-100 uppercase tracking-wider mb-3">Customer Journeys</p>
            <ul className="space-y-2 text-paper-400">
              <li><button onClick={() => startDiagnosis('home', 'wm')} className="hover:text-brand-orange">Washing Machine Repair</button></li>
              <li><button onClick={() => startDiagnosis('home', 'ac')} className="hover:text-brand-orange">Inverter AC Diagnostics</button></li>
              <li><button onClick={() => startDiagnosis('ride', 'scooter')} className="hover:text-brand-orange">Two-Wheeler Disc Brakes</button></li>
              <li><button onClick={() => startDiagnosis('tech', 'tv')} className="hover:text-brand-orange">Smart TV Screen & Board</button></li>
              <li><button onClick={() => setCurrentView('account')} className="hover:text-brand-orange">Digital Repair Passports</button></li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-paper-100 uppercase tracking-wider mb-3">Marketplace Tiers</p>
            <ul className="space-y-2 text-paper-400">
              <li><button onClick={() => setCurrentView('marketplace')} className="hover:text-brand-orange">OEM Genuine Spares</button></li>
              <li><button onClick={() => setCurrentView('marketplace')} className="hover:text-brand-orange">FixKart Certified Pro</button></li>
              <li><button onClick={() => setCurrentView('marketplace')} className="hover:text-brand-orange">ValueLine Economy</button></li>
              <li><button onClick={() => setCurrentView('technicians')} className="hover:text-brand-orange">Master Field Technicians</button></li>
              <li><button onClick={() => setCurrentView('marketplace')} className="hover:text-brand-orange">Batch Authenticity Index</button></li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-paper-100 uppercase tracking-wider mb-3">Ecosystem Portals</p>
            <ul className="space-y-2 text-paper-400">
              <li><button onClick={() => setRole('technician')} className="hover:text-trust-blue text-left flex items-center gap-1">🔧 Technician Portal (Raj Kumar)</button></li>
              <li><button onClick={() => setRole('supplier')} className="hover:text-brand-yellow text-left flex items-center gap-1">📦 Supplier Hub (Apex Spares)</button></li>
              <li><button onClick={() => setRole('admin')} className="hover:text-trust-emerald text-left flex items-center gap-1">⚡ FixKart Ops Command</button></li>
              <li><button onClick={() => setRole('customer')} className="hover:text-brand-orange text-left flex items-center gap-1">👤 Customer Experience</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-carbon-900 flex flex-col sm:flex-row items-center justify-between text-xs text-paper-500 gap-4">
          <p>© 2026 FixKart Technologies India Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>Privacy Policy</span>
            <span>Terms of Repair</span>
            <span>Warranty Terms</span>
            <span>E-Waste EPR Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
