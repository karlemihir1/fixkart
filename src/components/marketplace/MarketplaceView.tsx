import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  Wrench, 
  Sparkles,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { SparePart, PartTier, CategoryId } from '../../types';

export const MarketplaceView: React.FC = () => {
  const { 
    parts, 
    setSelectedProduct, 
    addToCart, 
    toggleComparison, 
    comparisonParts,
    setIsComparisonOpen,
    startDiagnosis 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedTier, setSelectedTier] = useState<PartTier | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter and sort parts
  const filteredParts = parts.filter((part) => {
    const matchesSearch = 
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.deviceTypeId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
    const matchesTier = selectedTier === 'ALL' || part.tier === selectedTier;
    const matchesStock = !inStockOnly || part.inStock;

    return matchesSearch && matchesCategory && matchesTier && matchesStock;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.compatibilityScore - a.compatibilityScore;
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-carbon-950 text-paper-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Marketplace Header & Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-carbon-900 via-carbon-850 to-carbon-900 border border-carbon-750 p-8 sm:p-10 relative overflow-hidden">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs text-brand-orange uppercase font-bold tracking-widest block">
              FIXKART DIRECT SPARES CATALOG
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-paper-50 tracking-tight leading-tight">
              GENUINE OEM & CERTIFIED <br />
              <span className="text-stroke-white">REPLACEMENT PARTS</span>
            </h1>
            <p className="text-paper-400 text-sm leading-relaxed">
              Every SKU is batch-verified, schematic-indexed, and covered by our instant 90-day digital guarantee.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => startDiagnosis()}
              className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold text-xs transition-all shadow-glow-orange flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>UNSURE OF PART? RUN AI DIAGNOSIS →</span>
            </button>

            {comparisonParts.length > 0 && (
              <button
                onClick={() => setIsComparisonOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-carbon-800 hover:bg-carbon-750 border border-carbon-700 text-paper-100 text-xs font-mono font-bold transition-all flex items-center gap-2"
              >
                <span>Compare Active ({comparisonParts.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Global Search & Filter Toolbar */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Search Input (6 cols) */}
            <div className="md:col-span-6 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by part name, SKU, device, brand (e.g. Samsung pump, LG AC capacitor)..."
                className="w-full bg-carbon-900 border border-carbon-700 rounded-2xl px-4 py-3.5 pl-11 text-xs text-paper-50 placeholder-paper-500 focus:outline-none focus:border-brand-orange transition-all"
              />
              <Search className="w-4 h-4 text-paper-400 absolute left-4 top-4" />
            </div>

            {/* Category Select (3 cols) */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full bg-carbon-900 border border-carbon-700 rounded-2xl px-4 py-3.5 text-xs text-paper-200 focus:outline-none focus:border-brand-orange font-mono"
              >
                <option value="all">All Categories</option>
                <option value="home">Home Appliances</option>
                <option value="tech">Consumer Tech</option>
                <option value="ride">Two-Wheeler / Ride</option>
              </select>
            </div>

            {/* Sort Select (3 cols) */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-carbon-900 border border-carbon-700 rounded-2xl px-4 py-3.5 text-xs text-paper-200 focus:outline-none focus:border-brand-orange font-mono"
              >
                <option value="recommended">Sort: Highest Match Score</option>
                <option value="price-asc">Sort: Price Low to High</option>
                <option value="price-desc">Sort: Price High to Low</option>
                <option value="rating">Sort: Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Pill Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-paper-400 font-semibold uppercase mr-1">Tier:</span>
              {(['ALL', 'OEM', 'CERTIFIED', 'ECONOMY'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                    selectedTier === tier
                      ? 'bg-brand-orange text-carbon-950 shadow-glow-orange'
                      : 'bg-carbon-900 border border-carbon-800 text-paper-300 hover:bg-carbon-850'
                  }`}
                >
                  {tier === 'ALL' ? 'All Tiers' : tier}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 text-xs text-paper-300 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-brand-orange rounded cursor-pointer"
              />
              <span>In-Stock in Nearby Hub Only</span>
            </label>
          </div>
        </div>

        {/* Anti-Grid Parts Product Feed */}
        {filteredParts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParts.map((part) => (
              <div
                key={part.id}
                className="rounded-3xl bg-carbon-900 border border-carbon-800 hover:border-carbon-700 p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl relative"
              >
                <div>
                  {/* Top Tier Tag & Match Score */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-black uppercase ${
                      part.tier === 'OEM' ? 'bg-brand-orange text-carbon-950 shadow-glow-orange' :
                      part.tier === 'CERTIFIED' ? 'bg-trust-blue text-white' : 'bg-carbon-800 text-paper-300'
                    }`}>
                      {part.tier === 'OEM' ? '★ OEM GENUINE' : part.tier === 'CERTIFIED' ? '✓ CERTIFIED PRO' : 'VALUE ECONOMY'}
                    </span>
                    <span className="font-mono text-xs font-bold text-trust-emerald">
                      {part.compatibilityScore}% Compatibility
                    </span>
                  </div>

                  {/* Image Container with Click-To-Open */}
                  <div
                    onClick={() => setSelectedProduct(part)}
                    className="relative h-48 rounded-2xl overflow-hidden bg-carbon-950 border border-carbon-800 mb-4 cursor-pointer"
                  >
                    <img
                      src={part.image}
                      alt={part.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-carbon-950/90 font-mono text-[9px] text-paper-300 border border-carbon-800">
                      SKU: {part.sku}
                    </div>
                  </div>

                  {/* Title & Brand */}
                  <div className="space-y-1 mb-3">
                    <span className="font-mono text-[10px] text-brand-orange font-bold uppercase">
                      {part.brand} • {part.category.toUpperCase()}
                    </span>
                    <h3
                      onClick={() => setSelectedProduct(part)}
                      className="font-display font-bold text-base text-paper-50 group-hover:text-brand-orange transition-colors cursor-pointer line-clamp-2"
                    >
                      {part.name}
                    </h3>
                  </div>

                  {/* Price & Guarantee Pill */}
                  <div className="flex items-baseline justify-between pt-2 border-t border-carbon-800/80 mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono font-black text-2xl text-paper-50">
                        ₹{part.price}
                      </span>
                      <span className="font-mono text-xs text-paper-500 line-through">
                        ₹{part.originalPrice}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-trust-emerald font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{part.warrantyDays}D Warranty</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => setSelectedProduct(part)}
                    className="py-2.5 px-3 rounded-xl bg-carbon-800 hover:bg-carbon-750 text-paper-200 text-xs font-semibold border border-carbon-700 transition-colors"
                  >
                    Will This Fit?
                  </button>

                  <button
                    onClick={() => {
                      addToCart({
                        part,
                        itemType: 'PART_AND_INSTALLATION',
                        deviceModelName: part.brand,
                        problemSummary: 'Spare Part Replacement',
                        appointmentSlot: 'Today, 2:00 PM',
                        quantity: 1,
                        partPrice: part.price,
                        installationPrice: part.installationFee
                      });
                    }}
                    className="py-2.5 px-3 rounded-xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>+ Add & Fix</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-carbon-900 border border-carbon-800 text-center space-y-4">
            <Layers className="w-12 h-12 text-paper-500 mx-auto" />
            <h4 className="font-display font-bold text-lg text-paper-100">No matching spare parts found</h4>
            <p className="text-xs text-paper-400 max-w-sm mx-auto">
              We couldn't find a catalog match for "{searchQuery}". You can request an expert diagnosis or submit a part request.
            </p>
            <button
              onClick={() => startDiagnosis()}
              className="px-6 py-2.5 rounded-xl bg-brand-orange text-carbon-950 font-bold text-xs"
            >
              Request Sourcing / AI Diagnosis →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
