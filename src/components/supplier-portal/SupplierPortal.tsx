import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Package, 
  Plus, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  Search,
  Hash,
  ArrowRight,
  Upload,
  X
} from 'lucide-react';
import { SparePart, PartTier, CategoryId } from '../../types';

export const SupplierPortal: React.FC = () => {
  const { parts, addSupplierPart, addToast } = useApp();
  const [isAddSkuModalOpen, setIsAddSkuModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Form state
  const [sku, setSku] = useState('FK-SAM-BLW-2210');
  const [name, setName] = useState('Samsung Inverter AC Cross Flow Blower Wheel (Anti-Mold Coating)');
  const [category, setCategory] = useState<CategoryId>('home');
  const [deviceTypeId, setDeviceTypeId] = useState('ac');
  const [brand, setBrand] = useState('Samsung');
  const [tier, setTier] = useState<PartTier>('OEM');
  const [price, setPrice] = useState(1150);
  const [stockCount, setStockCount] = useState(48);
  const [batchNumber, setBatchNumber] = useState('BATCH-2026-SEP-SAM-4402');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80');

  const handleCreateSku = (e: React.FormEvent) => {
    e.preventDefault();
    const newPart: SparePart = {
      id: `part-supp-${Math.random().toString(36).substr(2, 6)}`,
      sku,
      name,
      category,
      deviceTypeId,
      brand,
      tier,
      price: Number(price),
      originalPrice: Math.round(Number(price) * 1.25),
      compatibilityScore: tier === 'OEM' ? 100 : 96,
      compatibilityType: tier === 'OEM' ? 'EXACT_MATCH' : 'VERIFIED_COMPATIBLE',
      compatibleModelIds: ['sam-ac-15', 'sam-ac-18', 'sam-ww80j'],
      supplier: {
        id: 'supp-apex',
        name: 'Apex Spares & Components Ltd',
        location: 'Peenya Industrial Area, Bengaluru',
        verified: true,
        rating: 4.9,
        ratingCount: 3820,
        fulfillmentRate: 99.4
      },
      warrantyDays: tier === 'OEM' ? 180 : 90,
      stockCount: Number(stockCount),
      batchNumber,
      authenticityHash: `SHA256:${Math.random().toString(36).substr(2)}${Math.random().toString(36).substr(2)}`,
      deliveryDays: 'Delivery in 2 hours with Express Dispatch',
      installationFee: 349,
      rating: 4.9,
      reviewCount: 1,
      image,
      specs: {
        'Material': 'Aviation-Grade ABS Polymer',
        'Dynamic Balance': 'Precision Laser Calibrated (<0.2g)'
      },
      keyFeatures: [
        '100% Genuine Stamped Part',
        'Anti-mold acoustic dynamic blades'
      ],
      inStock: true
    };

    addSupplierPart(newPart);
    setIsAddSkuModalOpen(false);
  };

  const supplierParts = parts.filter(p => p.supplier.id === 'supp-apex' || p.brand.toLowerCase().includes(searchFilter.toLowerCase()) || p.name.toLowerCase().includes(searchFilter.toLowerCase()));

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-carbon-950 text-paper-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Supplier Header */}
        <div className="rounded-3xl bg-gradient-to-r from-carbon-900 via-carbon-850 to-carbon-900 border border-carbon-750 p-6 sm:p-8 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-brand-yellow font-bold uppercase tracking-wider">
                  ● AUTHORIZED TIER-1 DISTRIBUTOR
                </span>
                <span className="px-2 py-0.5 rounded-full bg-trust-emerald/20 text-trust-emerald font-mono text-[10px] font-bold">
                  ✓ Verified Supplier
                </span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-4xl text-paper-50 tracking-tight">
                Apex Spares & Components Hub
              </h1>
              <p className="text-xs text-paper-400 font-mono">
                Peenya Hub #4 • 99.4% On-Time Fulfillment • ISO 9001:2015
              </p>
            </div>

            <button
              onClick={() => setIsAddSkuModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-display font-black text-xs transition-all shadow-glow-orange flex items-center justify-center gap-2 flex-shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>LIST NEW SPARE SKU →</span>
            </button>
          </div>

          {/* Metrics bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-carbon-800">
            <div className="p-3.5 rounded-2xl bg-carbon-950 border border-carbon-800 text-center">
              <span className="text-[10px] font-mono text-paper-400 block">Active SKUs</span>
              <span className="font-mono font-black text-lg text-paper-50">{parts.length} Listed</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-carbon-950 border border-carbon-800 text-center">
              <span className="text-[10px] font-mono text-paper-400 block">Month Dispatches</span>
              <span className="font-mono font-black text-lg text-trust-emerald">2,410 Units</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-carbon-950 border border-carbon-800 text-center">
              <span className="text-[10px] font-mono text-paper-400 block">Counterfeit Rejections</span>
              <span className="font-mono font-black text-lg text-brand-orange">0.0% (Zero)</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-carbon-950 border border-carbon-800 text-center">
              <span className="text-[10px] font-mono text-paper-400 block">Gross Revenue (Aug)</span>
              <span className="font-mono font-black text-lg text-brand-yellow">₹28.4 Lakh</span>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="p-6 rounded-3xl bg-carbon-900 border border-carbon-750 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-lg text-paper-50">Warehouse Inventory & Batch Tracking</h3>
              <p className="text-xs text-paper-400 font-mono">Live synchronization with FixKart Dispatch Engine</p>
            </div>

            <div className="relative max-w-xs w-full">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter by SKU or part name..."
                className="w-full bg-carbon-950 border border-carbon-700 rounded-xl px-3 py-2 pl-9 text-xs text-paper-50 focus:outline-none focus:border-brand-orange"
              />
              <Search className="w-3.5 h-3.5 text-paper-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-carbon-800 text-xs font-mono text-paper-400 uppercase">
                  <th className="py-3 px-3">SKU & Batch</th>
                  <th className="py-3 px-3">Product Name</th>
                  <th className="py-3 px-3">Tier</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-3">Stock</th>
                  <th className="py-3 px-3">Authenticity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-carbon-800/60 text-xs">
                {supplierParts.map((part) => (
                  <tr key={part.id} className="hover:bg-carbon-850/50 transition-colors">
                    <td className="py-3 px-3 font-mono">
                      <span className="font-bold text-paper-100 block">{part.sku}</span>
                      <span className="text-[10px] text-paper-400">{part.batchNumber}</span>
                    </td>
                    <td className="py-3 px-3 font-display font-medium text-paper-100 max-w-xs truncate">
                      {part.name}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                        part.tier === 'OEM' ? 'bg-brand-orange/20 text-brand-orange' :
                        part.tier === 'CERTIFIED' ? 'bg-trust-blue/20 text-trust-blue' : 'bg-carbon-800 text-paper-300'
                      }`}>
                        {part.tier}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-paper-50">
                      ₹{part.price}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-trust-emerald">
                      {part.stockCount} units
                    </td>
                    <td className="py-3 px-3 font-mono text-[10px] text-trust-emerald">
                      ✓ QR Verified
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Add New SKU */}
        {isAddSkuModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-carbon-900 border border-carbon-700 w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative text-paper-100 my-8">
              <button
                onClick={() => setIsAddSkuModalOpen(false)}
                className="absolute top-5 right-5 text-paper-400 hover:text-paper-100 p-2 rounded-full hover:bg-carbon-800"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-display font-bold text-xl text-paper-50 mb-1">
                List New Spare Part SKU
              </h3>
              <p className="text-xs text-paper-400 mb-4">
                Register batch serialization, model tolerance index, and warehouse stock.
              </p>

              <form onSubmit={handleCreateSku} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-paper-300 font-semibold mb-1">SKU Code</label>
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full bg-carbon-950 border border-carbon-700 rounded-xl p-2.5 font-mono text-paper-50"
                    />
                  </div>
                  <div>
                    <label className="block text-paper-300 font-semibold mb-1">Brand</label>
                    <input
                      type="text"
                      required
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full bg-carbon-950 border border-carbon-700 rounded-xl p-2.5 text-paper-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-paper-300 font-semibold mb-1">Part Commercial Title</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-carbon-950 border border-carbon-700 rounded-xl p-2.5 text-paper-50"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-paper-300 font-semibold mb-1">Tier</label>
                    <select
                      value={tier}
                      onChange={(e) => setTier(e.target.value as any)}
                      className="w-full bg-carbon-950 border border-carbon-700 rounded-xl p-2.5 font-mono text-paper-50"
                    >
                      <option value="OEM">OEM Genuine</option>
                      <option value="CERTIFIED">Certified Pro</option>
                      <option value="ECONOMY">Economy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-paper-300 font-semibold mb-1">Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-carbon-950 border border-carbon-700 rounded-xl p-2.5 font-mono text-paper-50"
                    />
                  </div>
                  <div>
                    <label className="block text-paper-300 font-semibold mb-1">Initial Stock</label>
                    <input
                      type="number"
                      required
                      value={stockCount}
                      onChange={(e) => setStockCount(Number(e.target.value))}
                      className="w-full bg-carbon-950 border border-carbon-700 rounded-xl p-2.5 font-mono text-paper-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-paper-300 font-semibold mb-1">Batch Serialization Code</label>
                  <input
                    type="text"
                    required
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value)}
                    className="w-full bg-carbon-950 border border-carbon-700 rounded-xl p-2.5 font-mono text-paper-50"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddSkuModalOpen(false)}
                    className="flex-1 py-3 bg-carbon-800 hover:bg-carbon-750 text-paper-300 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold rounded-xl shadow-glow-orange font-display"
                  >
                    PUBLISH SKU TO PLATFORM
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
