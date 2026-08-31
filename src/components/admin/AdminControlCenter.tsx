import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Activity, 
  ShieldCheck, 
  Users, 
  Wrench, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  Search,
  DollarSign,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const AdminControlCenter: React.FC = () => {
  const { orders, warrantyClaims, technicians, parts, advanceOrderStage } = useApp();
  const [activeAdminTab, setActiveAdminTab] = useState<'dispatch' | 'warranties' | 'disputes'>('dispatch');

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-carbon-950 text-paper-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="rounded-3xl bg-gradient-to-r from-carbon-900 via-carbon-850 to-carbon-900 border border-carbon-750 p-6 sm:p-8 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-trust-emerald font-bold uppercase tracking-wider">
                  ● FIXKART CENTRAL OPERATIONS COMMAND
                </span>
                <span className="px-2 py-0.5 rounded bg-carbon-800 text-paper-300 font-mono text-[10px]">
                  BENGALURU • MUMBAI • DELHI • HYDERABAD
                </span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-4xl text-paper-50 tracking-tight">
                FixKart Control Center
              </h1>
              <p className="text-xs text-paper-400 font-mono">
                Real-Time Dispatch Engine, Neural Compatibility Calibration & Dispute Oversight
              </p>
            </div>
          </div>

          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-carbon-800">
            <div className="p-4 rounded-2xl bg-carbon-950 border border-carbon-800 text-center">
              <span className="text-[10px] font-mono text-paper-400 block">Total Repairs Saved</span>
              <span className="font-mono font-black text-2xl text-paper-50">14,890</span>
            </div>
            <div className="p-4 rounded-2xl bg-carbon-950 border border-carbon-800 text-center">
              <span className="text-[10px] font-mono text-paper-400 block">First-Time-Fix %</span>
              <span className="font-mono font-black text-2xl text-trust-emerald">98.4%</span>
            </div>
            <div className="p-4 rounded-2xl bg-carbon-950 border border-carbon-800 text-center">
              <span className="text-[10px] font-mono text-paper-400 block">Compatibility Accuracy</span>
              <span className="font-mono font-black text-2xl text-brand-orange">99.1%</span>
            </div>
            <div className="p-4 rounded-2xl bg-carbon-950 border border-carbon-800 text-center">
              <span className="text-[10px] font-mono text-paper-400 block">Active Open Dispatches</span>
              <span className="font-mono font-black text-2xl text-trust-blue">{orders.length} Live</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 border-b border-carbon-800 pb-2">
          <button
            onClick={() => setActiveAdminTab('dispatch')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeAdminTab === 'dispatch'
                ? 'bg-brand-orange text-carbon-950 shadow-glow-orange'
                : 'text-paper-400 hover:text-paper-100'
            }`}
          >
            Live Dispatch Board ({orders.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('warranties')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeAdminTab === 'warranties'
                ? 'bg-brand-orange text-carbon-950 shadow-glow-orange'
                : 'text-paper-400 hover:text-paper-100'
            }`}
          >
            Warranty Claims Desk ({warrantyClaims.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('disputes')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeAdminTab === 'disputes'
                ? 'bg-brand-orange text-carbon-950 shadow-glow-orange'
                : 'text-paper-400 hover:text-paper-100'
            }`}
          >
            Dispute & Fraud Filter (0 Active)
          </button>
        </div>

        {/* Tab 1: Live Dispatch Board */}
        {activeAdminTab === 'dispatch' && (
          <div className="p-6 rounded-3xl bg-carbon-900 border border-carbon-750 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-paper-50">Real-Time Field Dispatch Queue</h3>
              <span className="font-mono text-xs text-trust-emerald">● Auto-Routing Active</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[750px]">
                <thead>
                  <tr className="border-b border-carbon-800 text-xs font-mono text-paper-400 uppercase">
                    <th className="py-3 px-3">Order / PIN</th>
                    <th className="py-3 px-3">Customer & Appliance</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Technician</th>
                    <th className="py-3 px-3">Total (INR)</th>
                    <th className="py-3 px-3">Ops Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-carbon-800/60 text-xs">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-carbon-850/50 transition-colors">
                      <td className="py-3 px-3 font-mono">
                        <span className="font-bold text-paper-100 block">#{ord.trackingNumber}</span>
                        <span className="text-[10px] text-paper-400">PIN: {ord.pinCode}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-paper-100 block">{ord.customerName}</span>
                        <span className="text-paper-400 text-[11px] truncate max-w-xs block">{ord.productName}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-brand-orange/20 text-brand-orange border border-brand-orange/30">
                          {ord.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-paper-200">
                        {ord.technician?.name || 'Unassigned'}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-paper-50">
                        ₹{ord.totalAmount}
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => advanceOrderStage(ord.id)}
                          className="px-3 py-1.5 rounded-lg bg-carbon-800 hover:bg-brand-orange hover:text-carbon-950 font-bold text-[11px] font-mono transition-colors"
                        >
                          Advance Stage →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Warranty Claims Desk */}
        {activeAdminTab === 'warranties' && (
          <div className="p-6 rounded-3xl bg-carbon-900 border border-carbon-750 space-y-4">
            <h3 className="font-display font-bold text-lg text-paper-50">90-Day Guarantee Claims Triage</h3>
            {warrantyClaims.length > 0 ? (
              <div className="space-y-3">
                {warrantyClaims.map((claim) => (
                  <div key={claim.id} className="p-4 rounded-2xl bg-carbon-950 border border-carbon-800 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-brand-orange">Claim #{claim.id}</span>
                      <span className="px-2 py-0.5 rounded bg-trust-emerald/20 text-trust-emerald font-mono font-bold">
                        {claim.status}
                      </span>
                    </div>
                    <p className="text-paper-100 font-semibold">{claim.productName}</p>
                    <p className="text-paper-400 italic">"{claim.problemDescription}"</p>
                    <p className="font-mono text-[10px] text-trust-blue">
                      Assigned: {claim.assignedTechName}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-paper-400 text-xs">
                No open warranty claims currently awaiting review.
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Disputes Desk */}
        {activeAdminTab === 'disputes' && (
          <div className="p-8 rounded-3xl bg-carbon-900 border border-carbon-750 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-trust-emerald mx-auto" />
            <h4 className="font-display font-bold text-base text-paper-50">Zero Active Disputes</h4>
            <p className="text-xs text-paper-400 max-w-sm mx-auto">
              FixKart’s transparent upfront labor pricing and verified batch serialization have eliminated customer-technician billing conflicts.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
