import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode, 
  Printer, 
  Share2, 
  Wrench, 
  Award,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { RepairPassport } from '../../types';

interface Props {
  passport: RepairPassport;
  onClose: () => void;
  onClaimWarranty: (passport: RepairPassport) => void;
}

export const RepairPassportModal: React.FC<Props> = ({ passport, onClose, onClaimWarranty }) => {
  const { addToast } = useApp();

  const handleShare = () => {
    navigator.clipboard.writeText(passport.qrPayload);
    addToast('success', 'Passport Link Copied', 'Public digital verification link copied to clipboard.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-carbon-900 border border-carbon-700 w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl relative text-paper-100 my-8 print:bg-white print:text-black">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-carbon-800 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-trust-emerald/20 text-trust-emerald font-bold border border-trust-emerald/30">
              OFFICIAL VERIFIED RECORD
            </span>
            <span className="font-mono text-xs text-paper-400">ID: {passport.passportNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-paper-400 hover:text-paper-100 rounded-full hover:bg-carbon-800 transition-colors"
              title="Share digital passport"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 text-paper-400 hover:text-paper-100 rounded-full hover:bg-carbon-800 transition-colors"
              title="Print certificate"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-paper-400 hover:text-paper-100 rounded-full hover:bg-carbon-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Passport Certificate Body */}
        <div className="py-6 space-y-6">
          
          {/* Certificate Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-carbon-950 via-carbon-900 to-carbon-950 border border-carbon-750">
            <div>
              <span className="font-mono text-[10px] text-brand-orange uppercase font-bold tracking-widest block">
                DIGITAL REPAIR PASSPORT™
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-paper-50 tracking-tight">
                {passport.productName}
              </h2>
              <p className="font-mono text-xs text-paper-400 mt-1">
                Model: <strong className="text-paper-100">{passport.modelNumber}</strong> • Serial: {passport.serialNumber}
              </p>
            </div>

            {/* QR Verification Box */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-carbon-900 border border-carbon-800 flex-shrink-0">
              <div className="w-12 h-12 bg-white p-1 rounded-lg flex items-center justify-center">
                <QrCode className="w-10 h-10 text-carbon-950" />
              </div>
              <div className="text-[10px] font-mono">
                <span className="text-trust-emerald font-bold block">✓ VERIFIED AUTHENTIC</span>
                <span className="text-paper-400">Scan to verify hash</span>
              </div>
            </div>
          </div>

          {/* Guarantee Status Hero */}
          <div className="p-6 rounded-2xl bg-carbon-950 border border-trust-emerald/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-trust-emerald font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>90-Day FixKart Guarantee Active</span>
              </div>
              <span className="font-mono text-xs font-bold text-trust-emerald bg-trust-emerald/10 px-2.5 py-1 rounded-full">
                {passport.daysRemaining} Days Remaining
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-2 border-t border-carbon-850">
              <div>
                <span className="text-paper-500 text-[10px] block">Repair Date:</span>
                <span className="text-paper-100">{passport.repairDate}</span>
              </div>
              <div>
                <span className="text-paper-500 text-[10px] block">Expires On:</span>
                <span className="text-paper-100">{passport.warrantyExpiryDate}</span>
              </div>
              <div>
                <span className="text-paper-500 text-[10px] block">Total Invoiced:</span>
                <span className="text-paper-100 font-bold">₹{passport.totalCost}</span>
              </div>
              <div>
                <span className="text-paper-500 text-[10px] block">Status:</span>
                <span className="text-trust-emerald font-bold">COVERED</span>
              </div>
            </div>
          </div>

          {/* Part & Technician Verification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Part Details */}
            <div className="p-4 rounded-2xl bg-carbon-950 border border-carbon-800 space-y-2">
              <span className="font-mono text-[10px] text-paper-400 uppercase font-bold block">
                Installed Replacement Part:
              </span>
              <h4 className="font-display font-bold text-sm text-paper-50">
                {passport.partInstalledName}
              </h4>
              <p className="font-mono text-xs text-brand-orange">
                Tier: {passport.partTier} Genuine • Batch: {passport.partBatchNumber}
              </p>
            </div>

            {/* Technician Details */}
            <div className="p-4 rounded-2xl bg-carbon-950 border border-carbon-800 space-y-2">
              <span className="font-mono text-[10px] text-paper-400 uppercase font-bold block">
                Certified Master Technician:
              </span>
              <h4 className="font-display font-bold text-sm text-paper-50">
                {passport.technicianName}
              </h4>
              <p className="font-mono text-xs text-trust-blue">
                License ID: {passport.technicianCertId}
              </p>
            </div>
          </div>

          {/* Before & After Inspection Evidence */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-paper-400 uppercase font-bold block">
              Inspection Photo Telemetry:
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="h-36 rounded-xl overflow-hidden bg-carbon-950 border border-carbon-800">
                  <img
                    src={passport.beforePhoto}
                    alt="Before Repair"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-mono text-[10px] text-paper-400 block text-center">
                  Before: Failed Component Disassembly
                </span>
              </div>

              <div className="space-y-1">
                <div className="h-36 rounded-xl overflow-hidden bg-carbon-950 border border-trust-emerald/40">
                  <img
                    src={passport.afterPhoto}
                    alt="After Repair"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-mono text-[10px] text-trust-emerald block text-center font-bold">
                  After: OEM Installed & Pressure Tested
                </span>
              </div>
            </div>
          </div>

          {/* Digital Signature Hash */}
          <div className="p-3 rounded-xl bg-carbon-950 border border-carbon-800 font-mono text-[10px] text-paper-400 space-y-1">
            <div className="flex justify-between">
              <span>Digital Certificate Hash:</span>
              <span className="text-trust-emerald">✓ Cryptographically Signed</span>
            </div>
            <p className="truncate text-paper-300 font-mono">{passport.digitalCertificateHash}</p>
          </div>

          {/* Warranty Claim Action */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 print:hidden">
            <button
              onClick={() => onClaimWarranty(passport)}
              className="flex-1 py-3 px-4 rounded-xl bg-carbon-800 hover:bg-carbon-750 text-paper-100 font-bold text-xs transition-colors border border-carbon-700 flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-brand-amber" />
              <span>CLAIM 90-DAY WARRANTY (FREE RE-FIX)</span>
            </button>

            <button
              onClick={onClose}
              className="py-3 px-6 rounded-xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold text-xs transition-all shadow-glow-orange"
            >
              DONE
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
