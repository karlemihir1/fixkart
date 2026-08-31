import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Wrench, 
  Package, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  AlertCircle,
  FileText,
  Activity
} from 'lucide-react';
import { OrderTrackingModal } from '../tracking/OrderTrackingModal';
import { RepairPassportModal } from './RepairPassportModal';
import { WarrantyClaimModal } from '../warranty/WarrantyClaimModal';
import { RepairOrder, RepairPassport } from '../../types';

export const CustomerDashboard: React.FC = () => {
  const { 
    orders, 
    passports, 
    selectedPassport, 
    setSelectedPassport, 
    startDiagnosis, 
    setCurrentView 
  } = useApp();

  const [activeTrackingModalOrder, setActiveTrackingModalOrder] = useState<RepairOrder | null>(null);
  const [activeWarrantyClaimPassport, setActiveWarrantyClaimPassport] = useState<RepairPassport | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'passports' | 'devices'>('active');

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-carbon-950 text-paper-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Customer Header Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-carbon-900 via-carbon-850 to-carbon-900 border border-carbon-750 p-8 sm:p-10 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-brand-orange uppercase font-bold tracking-widest block">
                CUSTOMER REPAIR HUB
              </span>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-paper-50 tracking-tight">
                My Repairs & Digital Passports
              </h1>
              <p className="text-paper-400 text-xs sm:text-sm">
                Track live orders, inspect verified repair history, and manage active 90-day warranties.
              </p>
            </div>

            <button
              onClick={() => startDiagnosis()}
              className="px-6 py-3.5 rounded-2xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-display font-black text-xs transition-all shadow-glow-orange flex items-center justify-center gap-2 flex-shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>FIX A NEW PROBLEM →</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 flex gap-2 border-t border-carbon-800 pt-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeTab === 'active'
                  ? 'bg-brand-orange text-carbon-950 shadow-glow-orange'
                  : 'bg-carbon-950 text-paper-300 hover:bg-carbon-800'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Active Repairs ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('passports')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeTab === 'passports'
                  ? 'bg-brand-orange text-carbon-950 shadow-glow-orange'
                  : 'bg-carbon-950 text-paper-300 hover:bg-carbon-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Digital Passports & Warranties ({passports.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('devices')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeTab === 'devices'
                  ? 'bg-brand-orange text-carbon-950 shadow-glow-orange'
                  : 'bg-carbon-950 text-paper-300 hover:bg-carbon-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Registered Household Devices</span>
            </button>
          </div>
        </div>

        {/* TAB 1: ACTIVE REPAIRS */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-paper-50">Active Orders in Pipeline</h3>
              <span className="text-xs text-paper-400 font-mono">Live updates every 30s</span>
            </div>

            {orders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-3xl bg-carbon-900 border border-carbon-800 hover:border-brand-orange/60 p-6 space-y-4 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-brand-orange">
                        #{order.trackingNumber}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-trust-emerald/20 text-trust-emerald font-mono text-[10px] font-bold border border-trust-emerald/30">
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-base text-paper-50">
                        {order.productName}
                      </h4>
                      <p className="text-xs text-paper-400 mt-0.5">
                        Issue: {order.problemDiagnosed}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-carbon-950 border border-carbon-850 grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>
                        <span className="text-paper-500 text-[10px] block">Technician:</span>
                        <span className="text-paper-100 font-semibold">{order.technician?.name || 'Assigned Soon'}</span>
                      </div>
                      <div>
                        <span className="text-paper-500 text-[10px] block">Arrival Window:</span>
                        <span className="text-brand-orange font-semibold">{order.scheduledTime}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="text-xs font-mono">
                        <span className="text-paper-400">Total: </span>
                        <span className="text-paper-50 font-bold">₹{order.totalAmount}</span>
                      </div>

                      <button
                        onClick={() => setActiveTrackingModalOrder(order)}
                        className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold text-xs transition-colors flex items-center gap-1.5"
                      >
                        <Activity className="w-3.5 h-3.5" />
                        <span>Track Live Status →</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 rounded-3xl bg-carbon-900 border border-carbon-800 text-center space-y-3">
                <Package className="w-12 h-12 text-carbon-700 mx-auto" />
                <h4 className="font-display font-bold text-base text-paper-100">No active repair orders</h4>
                <p className="text-xs text-paper-400 max-w-sm mx-auto">
                  When you book a fix, you can monitor the technician’s live travel, diagnostic photos, and handoff OTP here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DIGITAL REPAIR PASSPORTS & WARRANTIES */}
        {activeTab === 'passports' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-paper-50">Verified Digital Repair Passports</h3>
                <p className="text-xs text-paper-400">Tamper-proof repair records with active 90-day coverage</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {passports.map((passport) => (
                <div
                  key={passport.id}
                  className="rounded-3xl bg-carbon-900 border border-carbon-800 hover:border-trust-emerald/60 p-6 space-y-4 transition-all group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-trust-emerald">
                      {passport.passportNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-trust-emerald/20 text-trust-emerald font-mono text-[10px] font-bold">
                      {passport.daysRemaining} Days Guarantee Left
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-base text-paper-50">
                      {passport.productName}
                    </h4>
                    <p className="font-mono text-xs text-paper-400">
                      Model: {passport.modelNumber} • Fixed on {passport.repairDate}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-carbon-950 border border-carbon-850 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-paper-400">Part Installed:</span>
                      <span className="text-paper-100 font-semibold">{passport.partInstalledName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-paper-400">Master Tech:</span>
                      <span className="text-trust-blue font-semibold">{passport.technicianName}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedPassport(passport)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-carbon-800 hover:bg-carbon-750 text-paper-100 font-semibold text-xs border border-carbon-700 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Passport Certificate</span>
                    </button>

                    <button
                      onClick={() => setActiveWarrantyClaimPassport(passport)}
                      className="py-2.5 px-3 rounded-xl bg-brand-orange/20 hover:bg-brand-orange text-brand-orange hover:text-carbon-950 font-bold text-xs border border-brand-orange/40 transition-colors"
                    >
                      Claim Warranty
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REGISTERED HOUSEHOLD DEVICES */}
        {activeTab === 'devices' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-carbon-900 border border-carbon-800 space-y-3">
                <span className="font-mono text-xs text-brand-orange font-bold uppercase">Washing Machine</span>
                <h4 className="font-display font-bold text-base text-paper-50">Samsung EcoBubble 8kg</h4>
                <p className="text-xs text-paper-400">Model: WW80J4243MW • Fixed 31 Aug 2026</p>
                <button
                  onClick={() => startDiagnosis('home', 'wm')}
                  className="w-full py-2 bg-carbon-800 hover:bg-brand-orange hover:text-carbon-950 text-paper-100 font-bold text-xs rounded-xl transition-colors"
                >
                  Quick Diagnostic Check
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-carbon-900 border border-carbon-800 space-y-3">
                <span className="font-mono text-xs text-trust-blue font-bold uppercase">Split AC</span>
                <h4 className="font-display font-bold text-base text-paper-50">LG 1.5T Dual Inverter</h4>
                <p className="text-xs text-paper-400">Model: MS-Q18ENZA • Fixed 18 Aug 2026</p>
                <button
                  onClick={() => startDiagnosis('home', 'ac')}
                  className="w-full py-2 bg-carbon-800 hover:bg-trust-blue hover:text-white text-paper-100 font-bold text-xs rounded-xl transition-colors"
                >
                  Quick Diagnostic Check
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-carbon-900 border border-carbon-800 space-y-3">
                <span className="font-mono text-xs text-trust-emerald font-bold uppercase">Two-Wheeler</span>
                <h4 className="font-display font-bold text-base text-paper-50">Honda Activa 6G</h4>
                <p className="text-xs text-paper-400">Model: ACTIVA-6G-BS6 • Fixed 04 Jul 2026</p>
                <button
                  onClick={() => startDiagnosis('ride', 'scooter')}
                  className="w-full py-2 bg-carbon-800 hover:bg-trust-emerald hover:text-carbon-950 text-paper-100 font-bold text-xs rounded-xl transition-colors"
                >
                  Quick Diagnostic Check
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Modals */}
      {activeTrackingModalOrder && (
        <OrderTrackingModal
          order={activeTrackingModalOrder}
          onClose={() => setActiveTrackingModalOrder(null)}
          onOpenPassport={(passId) => {
            const pass = passports.find(p => p.id === passId) || passports[0];
            setSelectedPassport(pass);
          }}
        />
      )}

      {selectedPassport && (
        <RepairPassportModal
          passport={selectedPassport}
          onClose={() => setSelectedPassport(null)}
          onClaimWarranty={(pass) => {
            setSelectedPassport(null);
            setActiveWarrantyClaimPassport(pass);
          }}
        />
      )}

      {activeWarrantyClaimPassport && (
        <WarrantyClaimModal
          passport={activeWarrantyClaimPassport}
          onClose={() => setActiveWarrantyClaimPassport(null)}
        />
      )}
    </div>
  );
};
