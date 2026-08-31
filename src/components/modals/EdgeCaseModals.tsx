import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AlertTriangle, 
  Camera, 
  HelpCircle, 
  CheckCircle2, 
  X, 
  ShieldAlert, 
  Sparkles, 
  PhoneCall, 
  ArrowRight,
  Upload,
  UserCheck
} from 'lucide-react';

export const EdgeCaseModals: React.FC = () => {
  const { 
    isBlurryGuideOpen, 
    setIsBlurryGuideOpen, 
    isExpertModalOpen, 
    setIsExpertModalOpen,
    activeTrackingOrder,
    handleAdditionalPartResponse,
    addToast,
    startDiagnosis
  } = useApp();

  // Expert diagnosis state
  const [deviceDesc, setDeviceDesc] = useState('');
  const [contactNumber, setContactNumber] = useState('+91 98450 ');
  const [isExpertSubmitted, setIsExpertSubmitted] = useState(false);

  const handleExpertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsExpertSubmitted(true);
    addToast('success', 'Expert Triage Ticket Created', 'FixKart Senior Diagnostic Specialist assigned. You will receive a breakdown within 15 mins.');
    setTimeout(() => {
      setIsExpertSubmitted(false);
      setIsExpertModalOpen(false);
    }, 2500);
  };

  return (
    <>
      {/* 1. Blurry / Low-Confidence Photo Diagnostic Modal */}
      {isBlurryGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-carbon-900 border border-brand-amber/40 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative text-paper-100">
            <button
              onClick={() => setIsBlurryGuideOpen(false)}
              className="absolute top-5 right-5 text-paper-400 hover:text-paper-100 p-1.5 rounded-full hover:bg-carbon-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-brand-amber/10 border border-brand-amber/30 flex items-center justify-center text-brand-amber">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-brand-amber uppercase font-bold tracking-wider">
                  Optical Confidence: 34% (Low)
                </span>
                <h3 className="font-display font-bold text-xl text-paper-50">
                  We need a clearer shot to verify exact fit.
                </h3>
              </div>
            </div>

            <p className="text-xs text-paper-300 leading-relaxed mb-5">
              FixKart’s neural compatibility engine couldn’t read the model serial number plate or component markings with 100% certainty. We never guess parts to avoid dispatching the wrong fit.
            </p>

            <div className="bg-carbon-950 rounded-2xl p-4 border border-carbon-800 space-y-2.5 mb-5 text-xs text-paper-300">
              <p className="font-bold text-paper-100 uppercase text-[11px] tracking-wider">Pro Tips for Accurate Scan:</p>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-trust-emerald flex-shrink-0" />
                <span>Turn on phone flashlight to illuminate dark machine cavities or model labels.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-trust-emerald flex-shrink-0" />
                <span>Capture the silver/white metallic rating sticker (usually behind the door or rear casing).</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-trust-emerald flex-shrink-0" />
                <span>Hold phone steady 15-20 cm from the broken part.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setIsBlurryGuideOpen(false);
                  startDiagnosis('home', 'wm');
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-glow-orange"
              >
                <Camera className="w-4 h-4" />
                <span>RE-TAKE SCAN PHOTO</span>
              </button>

              <button
                onClick={() => {
                  setIsBlurryGuideOpen(false);
                  setIsExpertModalOpen(true);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-carbon-800 hover:bg-carbon-700 text-paper-100 font-semibold text-xs flex items-center justify-center gap-2 transition-all border border-carbon-700"
              >
                <HelpCircle className="w-4 h-4 text-trust-blue" />
                <span>REQUEST HUMAN EXPERT</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Request Expert Human Diagnosis Modal (Zero Dead-Ends) */}
      {isExpertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-carbon-900 border border-trust-blue/40 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative text-paper-100">
            <button
              onClick={() => setIsExpertModalOpen(false)}
              className="absolute top-5 right-5 text-paper-400 hover:text-paper-100 p-1.5 rounded-full hover:bg-carbon-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-trust-blue/10 border border-trust-blue/30 flex items-center justify-center text-trust-blue">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-trust-blue uppercase font-bold tracking-wider">
                  Senior Master Tech Triage
                </span>
                <h3 className="font-display font-bold text-xl text-paper-50">
                  Request Free Expert Diagnosis
                </h3>
              </div>
            </div>

            <p className="text-xs text-paper-300 leading-relaxed mb-4">
              Can’t find your model or unsure what’s broken? Our lead master technicians will review your photos and recommend the exact verified OEM SKU within 15 minutes.
            </p>

            {!isExpertSubmitted ? (
              <form onSubmit={handleExpertSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-paper-200 mb-1">
                    Describe what is happening with the device:
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={deviceDesc}
                    onChange={(e) => setDeviceDesc(e.target.value)}
                    placeholder="e.g. Samsung 8kg front load makes clicking noise during rinse cycle and water stays locked inside..."
                    className="w-full bg-carbon-950 border border-carbon-700 rounded-xl p-3 text-xs text-paper-50 placeholder-paper-500 focus:outline-none focus:border-trust-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-paper-200 mb-1">
                    Your WhatsApp / Contact Number:
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full bg-carbon-950 border border-carbon-700 rounded-xl px-3 py-2.5 text-xs text-paper-50 font-mono focus:outline-none focus:border-trust-blue"
                  />
                </div>

                <div className="p-3 rounded-xl bg-carbon-850 border border-carbon-700/60 flex items-center justify-between text-xs text-paper-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-4 h-4 text-brand-orange" />
                    <span>Free FixKart Diagnostic Guarantee</span>
                  </span>
                  <span className="font-mono text-trust-emerald font-bold">₹0 Free</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-trust-blue hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-glow-blue"
                >
                  <span>SUBMIT FOR 15-MIN EXPERT REVIEW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-6 rounded-2xl bg-trust-emerald/10 border border-trust-emerald/30 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-trust-emerald mx-auto" />
                <h4 className="font-bold text-paper-50 text-sm">Diagnostic Ticket Created</h4>
                <p className="text-xs text-paper-300">
                  Assigned to Master Tech Vikram Singh. A tailored diagnosis with verified parts list will be sent to your phone.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Live Additional Part Discovery Customer Approval Modal */}
      {activeTrackingOrder?.status === 'ADDITIONAL_PART_REQUESTED' && activeTrackingOrder.additionalPartRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-carbon-900 border-2 border-brand-orange w-full max-w-lg rounded-3xl p-6 shadow-2xl relative text-paper-100 animate-float-slow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-brand-orange/20 border border-brand-orange flex items-center justify-center text-brand-orange animate-pulse">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-brand-orange uppercase font-bold tracking-wider">
                  Field Discovery Alert
                </span>
                <h3 className="font-display font-bold text-xl text-paper-50">
                  Additional Part Required
                </h3>
              </div>
            </div>

            <p className="text-xs text-paper-300 leading-relaxed mb-4">
              Technician <strong className="text-paper-100">{activeTrackingOrder.technician?.name || 'Raj Kumar'}</strong> inspected your <strong className="text-paper-100">{activeTrackingOrder.productName}</strong> and identified an additional worn component during disassembly.
            </p>

            <div className="bg-carbon-950 rounded-2xl p-4 border border-carbon-800 space-y-3 mb-5">
              <div className="flex items-center justify-between border-b border-carbon-800 pb-2">
                <div>
                  <span className="text-xs font-bold text-paper-50 block">
                    {activeTrackingOrder.additionalPartRequest.partName}
                  </span>
                  <span className="font-mono text-[10px] text-paper-400">
                    SKU: {activeTrackingOrder.additionalPartRequest.sku}
                  </span>
                </div>
                <span className="font-mono text-base font-black text-brand-orange">
                  +₹{activeTrackingOrder.additionalPartRequest.price}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-paper-400 block mb-1">Technician Reason:</span>
                <p className="text-xs text-paper-200 bg-carbon-900 p-2.5 rounded-xl border border-carbon-800/80 leading-relaxed">
                  "{activeTrackingOrder.additionalPartRequest.reason}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs border-t border-carbon-800">
                <span className="text-paper-400">Current Total:</span>
                <span className="font-mono font-bold text-paper-200">₹{activeTrackingOrder.totalAmount}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-paper-50">
                <span>Revised Total if Approved:</span>
                <span className="font-mono text-sm text-trust-emerald">
                  ₹{activeTrackingOrder.totalAmount + activeTrackingOrder.additionalPartRequest.price}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleAdditionalPartResponse(activeTrackingOrder.id, false)}
                className="py-3 px-4 rounded-xl bg-carbon-800 hover:bg-carbon-750 text-paper-300 font-semibold text-xs transition-colors border border-carbon-700"
              >
                Decline & Fix Original Only
              </button>

              <button
                onClick={() => handleAdditionalPartResponse(activeTrackingOrder.id, true)}
                className="py-3 px-4 rounded-xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold text-xs transition-all shadow-glow-orange flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                <span>Approve (+₹{activeTrackingOrder.additionalPartRequest.price})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
