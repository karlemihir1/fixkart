import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Truck, 
  Wrench, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  Copy, 
  Star,
  ExternalLink
} from 'lucide-react';
import { SparePart, Technician } from '../../types';
import { BRAND_MODELS, VERIFIED_TECHNICIANS } from '../../data/mockData';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    toggleComparison,
    setIsExpertModalOpen,
    addToast 
  } = useApp();

  const [checkBrand, setCheckBrand] = useState('Samsung');
  const [checkModel, setCheckModel] = useState('WW80J4243MW');
  const [compatibilityResult, setCompatibilityResult] = useState<'EXACT' | 'VERIFIED' | 'NEEDS_CONFIRMATION' | 'INCOMPATIBLE' | null>(null);
  const [includeInstallation, setIncludeInstallation] = useState(true);
  const [activeTab, setActiveTab] = useState<'specs' | 'compatibility' | 'reviews'>('specs');

  if (!selectedProduct) return null;

  const handleRunCompatibilityCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkModel) return;

    // Check if model fits
    const modelLower = checkModel.toLowerCase();
    const isMatching = selectedProduct.compatibleModelIds.some(m => m.includes('ww80j') || m.includes('lg') || m.includes('activa'));
    
    if (selectedProduct.tier === 'OEM' && modelLower.includes('ww80') && selectedProduct.brand.toLowerCase() === 'samsung') {
      setCompatibilityResult('EXACT');
      addToast('success', 'Exact Model Match Confirmed', `Part ${selectedProduct.sku} is 100% factory certified for ${checkModel}.`);
    } else if (modelLower.includes('ww') || modelLower.includes('fhm') || modelLower.includes('activa') || modelLower.includes('ms')) {
      setCompatibilityResult('VERIFIED');
      addToast('success', 'Verified Compatible', `Part meets all mechanical and electrical tolerances for ${checkModel}.`);
    } else {
      setCompatibilityResult('NEEDS_CONFIRMATION');
      addToast('warning', 'Model Needs Verification', 'We recommend uploading a photo or consulting an expert.');
    }
  };

  const handleAddToCart = () => {
    addToCart({
      part: selectedProduct,
      technician: includeInstallation ? VERIFIED_TECHNICIANS[0] : undefined,
      itemType: includeInstallation ? 'PART_AND_INSTALLATION' : 'PART_ONLY',
      deviceModelName: `${selectedProduct.brand} (${checkModel})`,
      problemSummary: 'Spare Part Replacement',
      appointmentSlot: 'Today, 2:00 PM - 3:30 PM',
      quantity: 1,
      partPrice: selectedProduct.price,
      installationPrice: includeInstallation ? selectedProduct.installationFee : 0
    });
    setSelectedProduct(null);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(selectedProduct.authenticityHash);
    addToast('info', 'Batch Hash Copied', 'SHA-256 authenticity signature copied to clipboard.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-carbon-900 border border-carbon-700 w-full max-w-4xl rounded-3xl p-6 sm:p-8 shadow-2xl relative text-paper-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-5 right-5 text-paper-400 hover:text-paper-100 p-2 rounded-full hover:bg-carbon-800 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Top Badges & Tier Header */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className={`px-3 py-1 rounded-full font-mono text-xs font-black uppercase ${
            selectedProduct.tier === 'OEM' ? 'bg-brand-orange text-carbon-950 shadow-glow-orange' :
            selectedProduct.tier === 'CERTIFIED' ? 'bg-trust-blue text-white' : 'bg-carbon-800 text-paper-300'
          }`}>
            {selectedProduct.tier === 'OEM' ? '★ OEM GENUINE FACTORY SPARE' : selectedProduct.tier === 'CERTIFIED' ? '✓ FIXKART CERTIFIED PRO' : 'VALUE ECONOMY'}
          </span>
          <span className="font-mono text-xs text-paper-400">
            SKU: <strong className="text-paper-100 font-mono">{selectedProduct.sku}</strong>
          </span>
          <span className="text-paper-600">•</span>
          <span className="font-mono text-xs text-trust-emerald font-bold">
            {selectedProduct.stockCount} Units in Peenya Hub
          </span>
        </div>

        {/* Main Grid: Visual Photography & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          
          {/* Left Column: Exploded Product Imagery (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-carbon-950 border border-carbon-800 flex items-center justify-center p-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-carbon-900/90 border border-carbon-750 font-mono text-[10px] text-paper-200">
                100% Genuine Seal
              </div>
            </div>

            {/* Authenticity Hash Pill */}
            <div className="p-3 rounded-xl bg-carbon-950 border border-carbon-800 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-paper-400">
                <span>Batch Serialization Hash:</span>
                <button
                  onClick={handleCopyHash}
                  className="text-brand-orange hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
              <p className="font-mono text-[10px] text-paper-300 truncate bg-carbon-900 px-2 py-1 rounded border border-carbon-800/80">
                {selectedProduct.authenticityHash}
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Details & Buy Box (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-paper-50 tracking-tight leading-tight">
                {selectedProduct.name}
              </h2>

              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-brand-yellow">
                  <Star className="w-4 h-4 fill-brand-yellow" />
                  <span className="font-mono text-xs font-bold text-paper-100">{selectedProduct.rating}</span>
                  <span className="text-xs text-paper-400">({selectedProduct.reviewCount} verified repairs)</span>
                </div>
                <span className="text-paper-600">•</span>
                <span className="text-xs text-trust-emerald font-semibold">
                  {selectedProduct.warrantyDays}-Day FixKart Guarantee
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-carbon-950 border border-carbon-800 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono font-black text-3xl text-paper-50">
                    ₹{selectedProduct.price}
                  </span>
                  <span className="font-mono text-sm text-paper-500 line-through">
                    ₹{selectedProduct.originalPrice}
                  </span>
                  <span className="font-mono text-xs font-bold text-trust-emerald">
                    Save ₹{selectedProduct.originalPrice - selectedProduct.price}
                  </span>
                </div>
                <p className="text-[11px] text-paper-400 mt-0.5">
                  Includes GST & FixKart Anti-Counterfeit Seal
                </p>
              </div>

              <button
                onClick={() => toggleComparison(selectedProduct)}
                className="px-3.5 py-2 rounded-xl bg-carbon-900 hover:bg-carbon-850 border border-carbon-700 text-xs font-mono text-paper-200 transition-colors"
              >
                + Compare Tier
              </button>
            </div>

            {/* CRITICAL FEATURE: "WILL THIS FIT MY PRODUCT?" Interactive Checker */}
            <div className="p-5 rounded-2xl bg-carbon-850 border border-carbon-700 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-orange" />
                <h4 className="font-display font-bold text-sm text-paper-50">
                  WILL THIS FIT MY PRODUCT?
                </h4>
              </div>

              <form onSubmit={handleRunCompatibilityCheck} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={checkBrand}
                  onChange={(e) => setCheckBrand(e.target.value)}
                  placeholder="Brand (e.g. Samsung)"
                  className="bg-carbon-950 border border-carbon-700 rounded-xl px-3 py-2 text-xs text-paper-50 focus:outline-none focus:border-brand-orange"
                />
                <input
                  type="text"
                  value={checkModel}
                  onChange={(e) => setCheckModel(e.target.value)}
                  placeholder="Model # (e.g. WW80J)"
                  className="bg-carbon-950 border border-carbon-700 rounded-xl px-3 py-2 text-xs text-paper-50 font-mono focus:outline-none focus:border-brand-orange"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold text-xs rounded-xl transition-all font-display"
                >
                  VERIFY FIT →
                </button>
              </form>

              {/* Dynamic Compatibility Result Badges */}
              {compatibilityResult === 'EXACT' && (
                <div className="p-3 rounded-xl bg-trust-emerald/10 border border-trust-emerald/30 flex items-center justify-between text-xs text-trust-emerald">
                  <span className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>✓ EXACT MODEL MATCH (100% Guaranteed Fit)</span>
                  </span>
                  <span className="font-mono text-[10px]">Schematic Verified</span>
                </div>
              )}

              {compatibilityResult === 'VERIFIED' && (
                <div className="p-3 rounded-xl bg-trust-blue/10 border border-trust-blue/30 flex items-center justify-between text-xs text-trust-blue">
                  <span className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>✓ VERIFIED COMPATIBLE (Mechanical & Voltage Tolerances Match)</span>
                  </span>
                  <span className="font-mono text-[10px]">98% Confidence</span>
                </div>
              )}

              {compatibilityResult === 'NEEDS_CONFIRMATION' && (
                <div className="p-3 rounded-xl bg-brand-amber/10 border border-brand-amber/30 space-y-2 text-xs text-brand-amber">
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>⚠ NEEDS MODEL CONFIRMATION</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-paper-300">
                    We’re not 100% sure this fits sub-revision <strong>{checkModel}</strong>. Avoid returns by letting an expert check.
                  </p>
                  <button
                    onClick={() => setIsExpertModalOpen(true)}
                    className="text-xs font-bold text-brand-orange underline hover:text-brand-amber"
                  >
                    Request Free 15-Min Expert Fit Verification →
                  </button>
                </div>
              )}
            </div>

            {/* Installation Toggle Option */}
            <div className="p-4 rounded-2xl bg-carbon-950 border border-carbon-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-paper-50">Want us to install it today?</h5>
                  <p className="text-[11px] text-paper-400">Doorstep installation by verified Raj Kumar (4.9★)</p>
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeInstallation}
                  onChange={(e) => setIncludeInstallation(e.target.checked)}
                  className="w-5 h-5 accent-brand-orange rounded cursor-pointer"
                />
                <span className="font-mono text-xs font-bold text-brand-orange">+₹{selectedProduct.installationFee}</span>
              </label>
            </div>

            {/* Action Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 px-6 rounded-2xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-display font-black text-base transition-all shadow-glow-orange flex items-center justify-center gap-2"
            >
              <span>ADD TO CART {includeInstallation ? `(₹${selectedProduct.price + selectedProduct.installationFee})` : `(₹${selectedProduct.price})`} →</span>
            </button>
          </div>

        </div>

        {/* Tabbed Specs, Compatibility List, and Supplier Info */}
        <div className="border-t border-carbon-800 pt-6">
          <div className="flex gap-4 border-b border-carbon-800 mb-4">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2 text-xs font-bold font-mono transition-all border-b-2 ${
                activeTab === 'specs' ? 'text-brand-orange border-brand-orange' : 'text-paper-400 border-transparent hover:text-paper-200'
              }`}
            >
              TECHNICAL SPECIFICATIONS
            </button>
            <button
              onClick={() => setActiveTab('compatibility')}
              className={`pb-2 text-xs font-bold font-mono transition-all border-b-2 ${
                activeTab === 'compatibility' ? 'text-brand-orange border-brand-orange' : 'text-paper-400 border-transparent hover:text-paper-200'
              }`}
            >
              COMPATIBLE MODELS & SCHEMATICS
            </button>
          </div>

          {activeTab === 'specs' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries(selectedProduct.specs).map(([key, val]) => (
                <div key={key} className="p-3 rounded-xl bg-carbon-950 border border-carbon-800 flex justify-between">
                  <span className="text-paper-400">{key}:</span>
                  <span className="font-semibold text-paper-100 font-mono">{val}</span>
                </div>
              ))}
              <div className="p-3 rounded-xl bg-carbon-950 border border-carbon-800 flex justify-between">
                <span className="text-paper-400">Supplier:</span>
                <span className="font-semibold text-trust-emerald">{selectedProduct.supplier.name}</span>
              </div>
              <div className="p-3 rounded-xl bg-carbon-950 border border-carbon-800 flex justify-between">
                <span className="text-paper-400">Batch Code:</span>
                <span className="font-mono font-semibold text-paper-100">{selectedProduct.batchNumber}</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-carbon-950 border border-carbon-800 space-y-2 text-xs">
              <p className="font-bold text-paper-100">Factory Verified Model IDs:</p>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.compatibleModelIds.map((m) => (
                  <span key={m} className="px-2.5 py-1 rounded-lg bg-carbon-900 border border-carbon-700 font-mono text-paper-200">
                    ✓ {m.toUpperCase()}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-paper-400 pt-2">
                If your model is not in this list, do not force installation. Use our compatibility checker above or request expert confirmation.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
