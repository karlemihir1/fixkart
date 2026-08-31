import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldAlert, CheckCircle2, ArrowRight, Camera, AlertCircle } from 'lucide-react';
import { RepairPassport } from '../../types';

interface Props {
  passport: RepairPassport;
  onClose: () => void;
}

export const WarrantyClaimModal: React.FC<Props> = ({ passport, onClose }) => {
  const { submitWarrantyClaim, addToast } = useApp();
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      addToast('warning', 'Description Required', 'Please explain what issue has recurred.');
      return;
    }

    submitWarrantyClaim({
      passportId: passport.id,
      orderId: passport.orderId,
      productName: passport.productName,
      problemDescription: description,
      photoUrl: passport.afterPhoto
    });

    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-carbon-900 border border-brand-orange/40 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative text-paper-100 my-8">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-paper-400 hover:text-paper-100 p-2 rounded-full hover:bg-carbon-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-orange/20 border border-brand-orange flex items-center justify-center text-brand-orange">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono text-[10px] text-brand-orange uppercase font-bold tracking-wider">
              90-Day Guarantee Redressal
            </span>
            <h3 className="font-display font-bold text-xl text-paper-50">
              Claim Free Warranty Service
            </h3>
          </div>
        </div>

        <p className="text-xs text-paper-300 leading-relaxed mb-4">
          Every repair completed through FixKart is covered by our unconditional 90-day re-fix guarantee. If the same issue recurs or the replacement part malfunctions, our master technician will visit and resolve it at <strong>₹0 zero cost</strong>.
        </p>

        {/* Passport summary chip */}
        <div className="p-3.5 rounded-xl bg-carbon-950 border border-carbon-800 space-y-1 mb-4 text-xs font-mono">
          <div className="flex justify-between">
            <span className="text-paper-400">Passport:</span>
            <span className="text-paper-100 font-bold">{passport.passportNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-paper-400">Appliance:</span>
            <span className="text-paper-100">{passport.productName}</span>
          </div>
          <div className="flex justify-between text-trust-emerald">
            <span>Guarantee Active:</span>
            <span>{passport.daysRemaining} days left</span>
          </div>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-paper-200 mb-1">
                What issue are you experiencing again?
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. The washing machine drained well for 2 weeks, but today started humming again during drain cycle..."
                className="w-full bg-carbon-950 border border-carbon-700 rounded-xl p-3 text-xs text-paper-50 placeholder-paper-500 focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div className="p-3 rounded-xl bg-trust-emerald/10 border border-trust-emerald/30 flex items-center justify-between text-xs font-mono text-trust-emerald">
              <span>Warranty Diagnostic & Labor Fee:</span>
              <span className="font-bold">₹0 FREE</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-glow-orange font-display"
            >
              <span>SUBMIT PRIORITY GUARANTEE DISPATCH</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="p-6 rounded-2xl bg-trust-emerald/10 border border-trust-emerald/30 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-trust-emerald mx-auto" />
            <h4 className="font-bold text-paper-50 text-sm">Warranty Service Dispatched</h4>
            <p className="text-xs text-paper-300">
              Assigned to Master Tech Raj Kumar under priority warranty protocol.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
