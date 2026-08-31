import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, ShieldCheck, Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { SparePart } from '../../types';

export const ProductComparison: React.FC = () => {
  const { 
    isComparisonOpen, 
    setIsComparisonOpen, 
    comparisonParts, 
    clearComparison, 
    addToCart, 
    setSelectedProduct 
  } = useApp();

  if (!isComparisonOpen || comparisonParts.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-carbon-900 border border-carbon-700 w-full max-w-5xl rounded-3xl p-6 sm:p-8 shadow-2xl relative text-paper-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-carbon-800">
          <div>
            <span className="font-mono text-xs text-brand-orange uppercase font-bold tracking-wider">
              Part Tier Matrix
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-paper-50 tracking-tight">
              OEM vs Certified vs Economy Comparison
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearComparison}
              className="px-3 py-1.5 rounded-xl bg-carbon-800 hover:bg-carbon-750 text-xs text-paper-400 hover:text-paper-100 font-mono transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsComparisonOpen(false)}
              className="p-2 text-paper-400 hover:text-paper-100 rounded-full hover:bg-carbon-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Comparison Grid Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-carbon-800">
                <th className="py-4 px-4 text-xs font-mono text-paper-400 uppercase w-1/4">Criteria</th>
                {comparisonParts.map((part) => (
                  <th key={part.id} className="py-4 px-4 text-left w-1/4">
                    <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-black uppercase ${
                      part.tier === 'OEM' ? 'bg-brand-orange text-carbon-950' :
                      part.tier === 'CERTIFIED' ? 'bg-trust-blue text-white' : 'bg-carbon-800 text-paper-300'
                    }`}>
                      {part.tier}
                    </span>
                    <h4 className="font-display font-bold text-sm text-paper-50 mt-1 line-clamp-1">
                      {part.name}
                    </h4>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-carbon-800/60 text-xs">
              {/* Price & Savings */}
              <tr>
                <td className="py-3 px-4 font-mono text-paper-400">Price (INR)</td>
                {comparisonParts.map((p) => (
                  <td key={p.id} className="py-3 px-4 font-mono font-black text-base text-paper-50">
                    ₹{p.price}{' '}
                    <span className="text-xs text-paper-500 line-through font-normal">₹{p.originalPrice}</span>
                  </td>
                ))}
              </tr>

              {/* Compatibility Match % */}
              <tr>
                <td className="py-3 px-4 font-mono text-paper-400">Compatibility Score</td>
                {comparisonParts.map((p) => (
                  <td key={p.id} className="py-3 px-4 font-mono font-bold text-trust-emerald">
                    {p.compatibilityScore}% Exact Match
                  </td>
                ))}
              </tr>

              {/* Warranty Duration */}
              <tr>
                <td className="py-3 px-4 font-mono text-paper-400">FixKart Warranty</td>
                {comparisonParts.map((p) => (
                  <td key={p.id} className="py-3 px-4 font-semibold text-paper-100">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-trust-emerald" />
                      <span>{p.warrantyDays} Days Direct Replacement</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Supplier Verification */}
              <tr>
                <td className="py-3 px-4 font-mono text-paper-400">Supplier Tier</td>
                {comparisonParts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-paper-200">
                    <span className="block font-semibold">{p.supplier.name.split('(')[0]}</span>
                    <span className="text-[10px] text-paper-400">{p.supplier.rating}★ ({p.supplier.fulfillmentRate}% on-time)</span>
                  </td>
                ))}
              </tr>

              {/* Batch Hash */}
              <tr>
                <td className="py-3 px-4 font-mono text-paper-400">Authenticity Trace</td>
                {comparisonParts.map((p) => (
                  <td key={p.id} className="py-3 px-4 font-mono text-[10px] text-paper-400 truncate max-w-[180px]">
                    {p.batchNumber}
                  </td>
                ))}
              </tr>

              {/* Recommended For */}
              <tr>
                <td className="py-3 px-4 font-mono text-paper-400">Best Suited For</td>
                {comparisonParts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-paper-300 text-[11px] leading-relaxed">
                    {p.tier === 'OEM' ? 'Long-term primary family appliance (5+ years longevity).' :
                     p.tier === 'CERTIFIED' ? 'Optimal balance of factory durability and 40% cost savings.' :
                     'Rental homes, budget quick fixes, or older legacy appliances.'}
                  </td>
                ))}
              </tr>

              {/* Add to Cart Actions */}
              <tr>
                <td className="py-4 px-4 font-mono text-paper-400">Action</td>
                {comparisonParts.map((p) => (
                  <td key={p.id} className="py-4 px-4">
                    <button
                      onClick={() => {
                        addToCart({
                          part: p,
                          itemType: 'PART_AND_INSTALLATION',
                          deviceModelName: p.brand,
                          problemSummary: 'Component Upgrade',
                          appointmentSlot: 'Today, 2:00 PM',
                          quantity: 1,
                          partPrice: p.price,
                          installationPrice: p.installationFee
                        });
                        setIsComparisonOpen(false);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Select Tier</span>
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
