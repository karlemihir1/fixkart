import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Wrench, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  ArrowRight,
  Package,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { RepairOrder, RepairOrderStatus } from '../../types';

interface Props {
  order: RepairOrder;
  onClose: () => void;
  onOpenPassport?: (passportId: string) => void;
}

export const OrderTrackingModal: React.FC<Props> = ({ order, onClose, onOpenPassport }) => {
  const { advanceOrderStage, requestAdditionalPart, setSelectedPassport, passports } = useApp();

  const stages: { status: RepairOrderStatus; label: string; desc: string }[] = [
    { status: 'ORDER_PLACED', label: 'Order Confirmed', desc: 'AI Diagnosis verified, order queued.' },
    { status: 'PART_VERIFIED', label: 'Part Verified', desc: 'OEM Batch scan & genuine barcode check.' },
    { status: 'PART_DISPATCHED', label: 'Dispatched from Hub', desc: 'En route from Peenya Industrial Hub.' },
    { status: 'TECHNICIAN_ASSIGNED', label: 'Technician Assigned', desc: 'Raj Kumar verified toolset & accepted.' },
    { status: 'TECHNICIAN_ON_THE_WAY', label: 'Technician En Route', desc: 'Traveling to customer doorstep (1.8 km).' },
    { status: 'REPAIR_IN_PROGRESS', label: 'Repair in Progress', desc: 'On-site diagnostics & part replacement.' },
    { status: 'REPAIR_COMPLETED', label: '3-Step Pressure Test Passed', desc: 'Inspection complete, customer verification.' },
    { status: 'GUARANTEE_ACTIVE', label: '90-Day Guarantee Active', desc: 'Digital Repair Passport officially minted.' }
  ];

  const currentStageIndex = stages.findIndex(s => s.status === order.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-carbon-900 border border-carbon-700 w-full max-w-4xl rounded-3xl p-6 sm:p-8 shadow-2xl relative text-paper-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-carbon-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-brand-orange uppercase font-bold tracking-wider">
                LIVE REPAIR TELEMETRY
              </span>
              <span className="w-2 h-2 rounded-full bg-trust-emerald animate-ping"></span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-paper-50 tracking-tight">
              Tracking #{order.trackingNumber}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-paper-400 hover:text-paper-100 rounded-full hover:bg-carbon-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Live Simulation Control Toolbar (Allows live progression of repair journey!) */}
        <div className="my-6 p-4 rounded-2xl bg-carbon-950 border border-brand-orange/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono">
            <Activity className="w-4 h-4 text-brand-orange animate-spin-slow" />
            <span className="text-paper-300">Live Journey Simulator:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {order.status !== 'GUARANTEE_ACTIVE' ? (
              <button
                onClick={() => advanceOrderStage(order.id)}
                className="px-3.5 py-1.5 rounded-xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold text-xs transition-all shadow-glow-orange flex items-center gap-1.5"
              >
                <span>Simulate Next Stage →</span>
              </button>
            ) : (
              <span className="px-3 py-1.5 rounded-xl bg-trust-emerald/20 text-trust-emerald font-mono font-bold text-xs">
                ✓ Repair Journey Completed
              </span>
            )}

            {order.status === 'REPAIR_IN_PROGRESS' && !order.additionalPartRequest && (
              <button
                onClick={() => {
                  requestAdditionalPart(order.id, {
                    partName: 'Rear Sealed Drum Bearing Kit & Shaft Seal',
                    sku: 'FK-BRG-SAM-88',
                    price: 450,
                    reason: 'Bearing play detected during pump housing disassembly. Replacing now prevents future drum seizure.'
                  });
                }}
                className="px-3.5 py-1.5 rounded-xl bg-carbon-800 hover:bg-carbon-750 text-brand-amber font-mono font-bold text-xs border border-carbon-700 transition-colors"
              >
                Simulate: Tech Discovers Extra Part
              </button>
            )}
          </div>
        </div>

        {/* Main Grid: Telemetry & Status Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Timeline Steps (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-carbon-800">
              {stages.map((stage, idx) => {
                const isCompleted = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div key={stage.status} className="relative group">
                    {/* Dot */}
                    <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      isCompleted ? 'bg-trust-emerald text-carbon-950' :
                      isCurrent ? 'bg-brand-orange ring-4 ring-brand-orange/30 text-carbon-950 animate-pulse' :
                      'bg-carbon-800 text-carbon-600'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" /> : <span className="w-1.5 h-1.5 rounded-full bg-paper-500"></span>}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`font-display font-bold text-sm ${
                          isCurrent ? 'text-brand-orange text-base' :
                          isCompleted ? 'text-paper-100' : 'text-paper-500'
                        }`}>
                          {stage.label}
                        </h4>
                        {isCurrent && (
                          <span className="font-mono text-[10px] bg-brand-orange/20 text-brand-orange px-2 py-0.5 rounded font-bold">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-paper-400 mt-0.5">{stage.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Technician, OTP & Passport Box (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Handoff OTP Box */}
            <div className="p-4 rounded-2xl bg-carbon-950 border border-carbon-800 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-paper-400 uppercase font-bold block">
                  Technician Handoff OTP:
                </span>
                <span className="font-mono font-black text-2xl text-brand-orange tracking-widest">
                  {order.otpCode}
                </span>
              </div>
              <p className="text-[11px] text-paper-400 text-right max-w-[140px]">
                Share with technician upon arrival to verify genuine booking.
              </p>
            </div>

            {/* Technician Card */}
            {order.technician && (
              <div className="p-5 rounded-2xl bg-carbon-950 border border-carbon-800 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={order.technician.photo}
                    alt={order.technician.name}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-trust-emerald"
                  />
                  <div>
                    <h4 className="font-display font-bold text-sm text-paper-50">{order.technician.name}</h4>
                    <p className="text-xs text-trust-emerald font-mono font-semibold">
                      {order.technician.rating}★ Master Tech ({order.technician.firstTimeFixRate}% FTF)
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-carbon-850 flex items-center justify-between text-xs text-paper-300">
                  <span className="text-paper-400">Scheduled Time:</span>
                  <span className="font-mono font-semibold text-paper-100">{order.scheduledTime}</span>
                </div>
              </div>
            )}

            {/* Part Installed Summary */}
            {order.part && (
              <div className="p-4 rounded-2xl bg-carbon-950 border border-carbon-800 space-y-2 text-xs">
                <span className="font-mono text-[10px] text-paper-400 uppercase font-bold block">
                  Verified Replacement Part:
                </span>
                <h5 className="font-display font-bold text-paper-50">{order.part.name}</h5>
                <div className="flex items-center justify-between font-mono text-paper-300 pt-1">
                  <span>Tier: {order.part.tier}</span>
                  <span className="text-brand-orange font-bold">₹{order.part.price}</span>
                </div>
              </div>
            )}

            {/* Completed Passport Button */}
            {order.status === 'GUARANTEE_ACTIVE' && (
              <button
                onClick={() => {
                  const pass = passports.find(p => p.orderId === order.id) || passports[0];
                  setSelectedPassport(pass);
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-trust-emerald hover:bg-emerald-600 text-carbon-950 font-display font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-glow-emerald"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>VIEW DIGITAL REPAIR PASSPORT & GUARANTEE →</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
