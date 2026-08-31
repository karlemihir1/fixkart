import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  RefreshCw, 
  Leaf, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Users, 
  Truck, 
  Database,
  ArrowRight
} from 'lucide-react';

export const SustainabilityFlywheel: React.FC = () => {
  const { startDiagnosis } = useApp();
  const [activeTab, setActiveTab] = useState<'flywheel' | 'impact'>('flywheel');

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-carbon-950 relative border-t border-carbon-850">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-xs text-trust-emerald uppercase font-bold tracking-widest inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-trust-emerald/10 border border-trust-emerald/30">
            <Leaf className="w-3.5 h-3.5" />
            <span>CIRCULAR REPAIR ECONOMY</span>
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-paper-50 tracking-tight leading-[0.95]">
            DON'T REPLACE. <br />
            <span className="text-stroke-white">REPAIR AND RENEW.</span>
          </h2>
          <p className="text-paper-400 text-sm leading-relaxed max-w-xl mx-auto">
            FixKart decouples product utility from linear landfill dumping. Every resolved diagnosis prevents electronic scrap and powers local skilled technicians.
          </p>

          {/* Toggle Tab */}
          <div className="inline-flex p-1.5 rounded-2xl bg-carbon-900 border border-carbon-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('flywheel')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'flywheel'
                  ? 'bg-brand-orange text-carbon-950 font-bold shadow-glow-orange'
                  : 'text-paper-400 hover:text-paper-100'
              }`}
            >
              The Network Flywheel
            </button>
            <button
              onClick={() => setActiveTab('impact')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'impact'
                  ? 'bg-brand-orange text-carbon-950 font-bold shadow-glow-orange'
                  : 'text-paper-400 hover:text-paper-100'
              }`}
            >
              Quantified Impact Stats
            </button>
          </div>
        </div>

        {/* Content based on Active Tab */}
        {activeTab === 'flywheel' ? (
          <div className="rounded-3xl bg-gradient-to-b from-carbon-900 to-carbon-950 border border-carbon-750 p-8 sm:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left: Interactive Flywheel Steps */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-brand-orange font-bold uppercase tracking-wider">
                    Self-Reinforcing Engine
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-4xl text-paper-50 tracking-tight">
                    How FixKart Gets Smarter with Every Repair
                  </h3>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-carbon-850 border border-carbon-750 flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-brand-orange/20 text-brand-orange flex items-center justify-center font-bold">1</span>
                    <p className="text-paper-200"><strong className="text-paper-50">Customer Diagnoses Problem:</strong> Neural model captures failure symptoms & model sub-codes.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-carbon-850 border border-carbon-750 flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-trust-blue/20 text-trust-blue flex items-center justify-center font-bold">2</span>
                    <p className="text-paper-200"><strong className="text-paper-50">Verified Supplier Dispatches Part:</strong> Batch authenticity & QR serialization logged.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-carbon-850 border border-carbon-750 flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-brand-yellow/20 text-brand-yellow flex items-center justify-center font-bold">3</span>
                    <p className="text-paper-200"><strong className="text-paper-50">Technician Executes & Tests:</strong> Live telemetry records repair duration & first-time-fix success.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-carbon-850 border border-carbon-750 flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-trust-emerald/20 text-trust-emerald flex items-center justify-center font-bold">4</span>
                    <p className="text-paper-200"><strong className="text-paper-50">Compatibility Engine Calibrates:</strong> Accuracy climbs from 90% to 99.4%, lowering repair cost for next customer.</p>
                  </div>
                </div>

                <button
                  onClick={() => startDiagnosis()}
                  className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold text-xs transition-all shadow-glow-orange flex items-center gap-2"
                >
                  <span>JOIN THE REPAIR REVOLUTION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right: Graphic Schematic Representation of Flywheel */}
              <div className="relative flex items-center justify-center p-8 bg-carbon-950 rounded-2xl border border-carbon-800">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-dashed border-carbon-700 flex items-center justify-center animate-spin-slow">
                  {/* Flywheel Orbit Nodes */}
                  <div className="absolute -top-4 px-3 py-1 bg-brand-orange text-carbon-950 font-mono font-black text-[11px] rounded-lg shadow-glow-orange">
                    MORE REPAIRS
                  </div>
                  <div className="absolute -right-4 px-3 py-1 bg-trust-blue text-white font-mono font-bold text-[11px] rounded-lg shadow-glow-blue">
                    MORE DATA
                  </div>
                  <div className="absolute -bottom-4 px-3 py-1 bg-trust-emerald text-carbon-950 font-mono font-black text-[11px] rounded-lg shadow-glow-emerald">
                    99.4% FIT ACCURACY
                  </div>
                  <div className="absolute -left-4 px-3 py-1 bg-brand-yellow text-carbon-950 font-mono font-bold text-[11px] rounded-lg">
                    LOWER COST
                  </div>
                </div>

                {/* Center Core */}
                <div className="absolute text-center p-4 bg-carbon-900 border border-carbon-700 rounded-3xl shadow-2xl">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange text-carbon-950 flex items-center justify-center font-display font-black text-lg mx-auto mb-1">
                    FK
                  </div>
                  <span className="font-display font-black text-sm text-paper-50 block">FIXKART®</span>
                  <span className="font-mono text-[9px] text-trust-emerald font-bold">CIRCULAR ENGINE</span>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* Impact Stats Grid */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-8 rounded-3xl bg-carbon-900 border border-carbon-800 text-center space-y-2">
              <span className="font-mono text-3xl sm:text-4xl font-black text-brand-orange block">
                14,890+
              </span>
              <h4 className="font-display font-bold text-base text-paper-50">Appliances Repaired</h4>
              <p className="text-xs text-paper-400">Prevented premature replacement across 6 Indian metro cities.</p>
            </div>

            <div className="p-8 rounded-3xl bg-carbon-900 border border-carbon-800 text-center space-y-2">
              <span className="font-mono text-3xl sm:text-4xl font-black text-trust-emerald block">
                48.2 Tons
              </span>
              <h4 className="font-display font-bold text-base text-paper-50">E-Waste Diverted</h4>
              <p className="text-xs text-paper-400">Copper windings, aluminum chassis, and circuit boards recycled.</p>
            </div>

            <div className="p-8 rounded-3xl bg-carbon-900 border border-carbon-800 text-center space-y-2">
              <span className="font-mono text-3xl sm:text-4xl font-black text-trust-blue block">
                ₹4.82 Cr
              </span>
              <h4 className="font-display font-bold text-base text-paper-50">Consumer Funds Saved</h4>
              <p className="text-xs text-paper-400">Average customer saves 78% compared to buying a replacement unit.</p>
            </div>

            <div className="p-8 rounded-3xl bg-carbon-900 border border-carbon-800 text-center space-y-2">
              <span className="font-mono text-3xl sm:text-4xl font-black text-brand-yellow block">
                1,240+
              </span>
              <h4 className="font-display font-bold text-base text-paper-50">Local Technicians Powered</h4>
              <p className="text-xs text-paper-400">Master field engineers earning fair transparent labor wages.</p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
