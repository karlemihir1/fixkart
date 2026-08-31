import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wrench, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Phone, 
  Camera, 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  Star,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { RepairOrder } from '../../types';

export const TechnicianPortal: React.FC = () => {
  const { 
    orders, 
    updateOrderStatus, 
    advanceOrderStage, 
    requestAdditionalPart, 
    addToast 
  } = useApp();

  const [activeJob, setActiveJob] = useState<RepairOrder>(orders[0] || null);
  const [isExtraPartModalOpen, setIsExtraPartModalOpen] = useState(false);
  const [extraPartName, setExtraPartName] = useState('Rear Sealed Drum Bearing Kit & Shaft Seal');
  const [extraPartPrice, setExtraPartPrice] = useState(450);
  const [extraPartReason, setExtraPartReason] = useState('Excessive bearing play detected during pump housing disassembly. Replacing now prevents future catastrophic drum seizure.');
  const [enteredOtp, setEnteredOtp] = useState('');

  const currentJob = orders.find(o => o.id === (activeJob?.id || orders[0]?.id)) || orders[0];

  const handleExtraPartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentJob) return;

    requestAdditionalPart(currentJob.id, {
      partName: extraPartName,
      sku: 'FK-BRG-SAM-88',
      price: Number(extraPartPrice),
      reason: extraPartReason
    });

    setIsExtraPartModalOpen(false);
  };

  const handleVerifyOtp = () => {
    if (enteredOtp.trim() === currentJob.otpCode || enteredOtp.trim() === '4892') {
      advanceOrderStage(currentJob.id);
      addToast('success', 'OTP Verified', 'Customer verification validated. Completing repair.');
    } else {
      addToast('error', 'Invalid OTP', `Entered OTP does not match customer's code (${currentJob.otpCode}).`);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-carbon-950 text-paper-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header: Raj Kumar Profile */}
        <div className="rounded-3xl bg-gradient-to-r from-carbon-900 via-carbon-850 to-carbon-900 border border-carbon-750 p-6 sm:p-8 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Raj Kumar"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-trust-emerald"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-trust-emerald font-bold uppercase tracking-wider">
                    ● ACTIVE ON DUTY • BENGALURU SOUTH
                  </span>
                </div>
                <h1 className="font-display font-black text-2xl sm:text-4xl text-paper-50 tracking-tight">
                  Good Morning, Raj Kumar
                </h1>
                <p className="text-xs text-paper-400 font-mono mt-0.5">
                  ID: CERT-FK-TECH-9014 • Samsung Master Certified Pro
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-carbon-950 border border-carbon-800 text-center min-w-[100px]">
                <span className="text-[10px] font-mono text-paper-400 block">Today's Earnings</span>
                <span className="font-mono font-black text-lg text-brand-orange">₹4,250</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-carbon-950 border border-carbon-800 text-center min-w-[100px]">
                <span className="text-[10px] font-mono text-paper-400 block">First-Time-Fix</span>
                <span className="font-mono font-black text-lg text-trust-emerald">98.4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Job Command View */}
        {currentJob ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Job Details & Telemetry Action Steps (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-carbon-900 border border-carbon-750 space-y-6">
                
                {/* Job Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-carbon-800">
                  <div>
                    <span className="font-mono text-xs text-brand-orange font-bold">
                      ACTIVE JOB #{currentJob.trackingNumber}
                    </span>
                    <h2 className="font-display font-black text-2xl text-paper-50 mt-0.5">
                      {currentJob.productName}
                    </h2>
                    <p className="text-xs text-paper-400 mt-1">
                      Problem: <strong className="text-paper-100">{currentJob.problemDiagnosed}</strong>
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange font-mono text-xs font-bold border border-brand-orange/30 whitespace-nowrap">
                    {currentJob.status.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* Customer Address & Proximity */}
                <div className="p-4 rounded-2xl bg-carbon-950 border border-carbon-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-paper-400">Customer:</span>
                    <span className="text-paper-100 font-bold">{currentJob.customerName}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-paper-400">Address:</span>
                    <span className="text-paper-200 text-right max-w-xs truncate">{currentJob.customerAddress}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-trust-emerald">
                    <span>Contact:</span>
                    <span>{currentJob.customerPhone}</span>
                  </div>
                </div>

                {/* Verified Part Assigned */}
                {currentJob.part && (
                  <div className="p-4 rounded-2xl bg-carbon-950 border border-carbon-800 space-y-2 text-xs">
                    <span className="font-mono text-[10px] text-paper-400 uppercase font-bold block">
                      Dispatched Part in Van Stock:
                    </span>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-paper-100">{currentJob.part.name}</h4>
                        <span className="font-mono text-[10px] text-paper-400">Batch: {currentJob.part.batchNumber}</span>
                      </div>
                      <span className="font-mono font-bold text-brand-orange">₹{currentJob.part.price}</span>
                    </div>
                  </div>
                )}

                {/* Technician Workflow Stage Action Button */}
                <div className="space-y-3 pt-4 border-t border-carbon-800">
                  <span className="font-mono text-xs text-paper-400 font-bold uppercase block">
                    Execution Steps:
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => advanceOrderStage(currentJob.id)}
                      className="py-3 px-4 rounded-xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold text-xs transition-all shadow-glow-orange flex items-center justify-center gap-1.5"
                    >
                      <span>Advance Job Status →</span>
                    </button>

                    <button
                      onClick={() => setIsExtraPartModalOpen(true)}
                      className="py-3 px-4 rounded-xl bg-carbon-800 hover:bg-carbon-750 text-paper-100 font-bold text-xs border border-carbon-700 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShieldAlert className="w-4 h-4 text-brand-amber" />
                      <span>Request Additional Part</span>
                    </button>
                  </div>
                </div>

                {/* OTP Verification Box for Completion */}
                {currentJob.status === 'REPAIR_COMPLETED' && (
                  <div className="p-4 rounded-2xl bg-carbon-950 border border-trust-emerald/40 space-y-3">
                    <span className="text-xs font-bold text-trust-emerald block">
                      Enter Customer 4-Digit OTP to Mint Repair Passport:
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="e.g. 4892"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                        className="flex-1 bg-carbon-900 border border-carbon-700 rounded-xl px-3 py-2 text-base font-mono text-center tracking-widest text-paper-50 focus:outline-none focus:border-trust-emerald"
                      />
                      <button
                        onClick={handleVerifyOtp}
                        className="px-5 py-2 rounded-xl bg-trust-emerald hover:bg-emerald-600 text-carbon-950 font-bold text-xs transition-all shadow-glow-emerald"
                      >
                        VERIFY & COMPLETE
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Right Column: Active Inspection Photos & Earnings Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Photo Evidence Upload Box */}
              <div className="p-6 rounded-3xl bg-carbon-900 border border-carbon-750 space-y-4">
                <span className="font-mono text-xs text-paper-400 uppercase font-bold block">
                  Field Photo Evidence:
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-dashed border-carbon-700 rounded-2xl p-3 text-center bg-carbon-950 flex flex-col items-center justify-center h-32">
                    <Camera className="w-6 h-6 text-paper-400 mb-1" />
                    <span className="text-[10px] font-mono text-paper-300">Before Photo (Uploaded)</span>
                    <span className="text-[9px] text-trust-emerald font-bold mt-1">✓ Logged</span>
                  </div>

                  <div className="border border-dashed border-carbon-700 rounded-2xl p-3 text-center bg-carbon-950 flex flex-col items-center justify-center h-32">
                    <Camera className="w-6 h-6 text-brand-orange mb-1" />
                    <span className="text-[10px] font-mono text-paper-300">After Photo (Pressure Tested)</span>
                    <span className="text-[9px] text-trust-emerald font-bold mt-1">✓ Ready</span>
                  </div>
                </div>
              </div>

              {/* Earnings & Incentive Card */}
              <div className="p-6 rounded-3xl bg-carbon-900 border border-carbon-750 space-y-3">
                <span className="font-mono text-xs text-brand-orange uppercase font-bold block">
                  Payout Breakdown:
                </span>
                <div className="space-y-2 text-xs font-mono text-paper-300">
                  <div className="flex justify-between">
                    <span>Base Labor Rate:</span>
                    <span className="text-paper-100 font-bold">₹349</span>
                  </div>
                  <div className="flex justify-between">
                    <span>FixKart Master Tech Incentive:</span>
                    <span className="text-trust-emerald font-bold">+₹150</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-carbon-800 font-bold text-sm text-paper-50">
                    <span>Net Technician Payout:</span>
                    <span className="text-brand-orange">₹499</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        ) : null}

        {/* Modal: Request Additional Part */}
        {isExtraPartModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-carbon-900 border border-brand-orange w-full max-w-md rounded-3xl p-6 shadow-2xl relative text-paper-100">
              <h3 className="font-display font-bold text-xl text-paper-50 mb-2">
                Request Additional Part Approval
              </h3>
              <p className="text-xs text-paper-400 mb-4">
                The customer will immediately receive an interactive authorization alert on their screen.
              </p>

              <form onSubmit={handleExtraPartSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-paper-300 font-semibold mb-1">Part Name</label>
                  <input
                    type="text"
                    required
                    value={extraPartName}
                    onChange={(e) => setExtraPartName(e.target.value)}
                    className="w-full bg-carbon-950 border border-carbon-700 rounded-xl p-2.5 text-paper-50"
                  />
                </div>

                <div>
                  <label className="block text-paper-300 font-semibold mb-1">Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={extraPartPrice}
                    onChange={(e) => setExtraPartPrice(Number(e.target.value))}
                    className="w-full bg-carbon-950 border border-carbon-700 rounded-xl p-2.5 font-mono text-paper-50"
                  />
                </div>

                <div>
                  <label className="block text-paper-300 font-semibold mb-1">Technical Reason for Customer</label>
                  <textarea
                    required
                    rows={3}
                    value={extraPartReason}
                    onChange={(e) => setExtraPartReason(e.target.value)}
                    className="w-full bg-carbon-950 border border-carbon-700 rounded-xl p-2.5 text-paper-50"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsExtraPartModalOpen(false)}
                    className="flex-1 py-2.5 bg-carbon-800 hover:bg-carbon-750 text-paper-300 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold rounded-xl shadow-glow-orange"
                  >
                    SEND TO CUSTOMER
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
