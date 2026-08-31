import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  PhoneCall, 
  Wrench, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  X, 
  Calendar, 
  Phone, 
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';
import { VERIFIED_TECHNICIANS } from '../../data/mockData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultDeviceName?: string;
}

export const DirectMechanicModal: React.FC<Props> = ({ isOpen, onClose, defaultDeviceName = 'Home Appliance' }) => {
  const { 
    placeOrder, 
    pinCode, 
    pinData, 
    setCurrentView, 
    addToast 
  } = useApp();

  const [customerName, setCustomerName] = useState('Aarav Deshmukh');
  const [customerPhone, setCustomerPhone] = useState('+91 98450 12890');
  const [customerAddress, setCustomerAddress] = useState('Flat 402, Oakwood Enclave, 17th Main, Koramangala 4th Block');
  const [selectedSlot, setSelectedSlot] = useState('Express (Within 35 mins)');
  const [applianceType, setApplianceType] = useState(defaultDeviceName);
  const [issueSummary, setIssueSummary] = useState('Unsure of exact problem (Strange sound / not functioning properly)');
  const [selectedTech] = useState(VERIFIED_TECHNICIANS[0]);
  const [isBooking, setIsBooking] = useState(false);

  if (!isOpen) return null;

  const handleBookMechanic = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);

    setTimeout(() => {
      setIsBooking(false);
      const newOrder = placeOrder({
        customerName,
        customerPhone,
        customerAddress,
        pinCode,
        productName: `${applianceType} (Full Diagnostic Visit)`,
        brand: 'Diagnostic Inspection',
        modelNumber: 'On-Site Identification',
        problemDiagnosed: issueSummary,
        scheduledTime: selectedSlot,
        technician: selectedTech,
        totalAmount: 199,
        paymentMethod: 'PAY_AFTER_FIX'
      });

      addToast('success', 'Master Mechanic Dispatched!', `${selectedTech.name} is on the way to ${customerAddress.split(',')[0]} (ETA: 35 mins).`);
      onClose();
      setCurrentView('account');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-paper-50 text-carbon-950 border-2 border-brand-orange w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-carbon-500 hover:text-carbon-950 p-2 rounded-full hover:bg-paper-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange uppercase tracking-wider">
              ● CAN'T DIAGNOSE? ZERO WORRIES
            </span>
            <span className="font-mono text-xs text-trust-emerald font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 90-Day Guarantee
            </span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl text-carbon-950 tracking-tight leading-tight">
            Call a Master Mechanic Directly
          </h2>
          <p className="text-xs sm:text-sm text-carbon-600 leading-relaxed">
            Skip the manual diagnosis. Our verified master technician will visit your doorstep in 35 mins, inspect with specialized tools, source genuine parts, and fix everything on-site.
          </p>
        </div>

        {/* Technician Profile Card */}
        <div className="p-4 rounded-2xl bg-paper-100 border border-paper-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3.5">
            <img
              src={selectedTech.photo}
              alt={selectedTech.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-trust-emerald shadow-md"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-bold text-base text-carbon-950">{selectedTech.name}</h3>
                <span className="px-2 py-0.5 rounded-full bg-trust-emerald/20 text-trust-emerald font-mono font-bold text-[10px]">
                  {selectedTech.rating}★ Verified Master
                </span>
              </div>
              <p className="text-xs text-carbon-600 mt-0.5">
                {selectedTech.distanceKm} km away • <strong className="text-brand-orange font-mono font-bold">Arrives in 35 mins</strong>
              </p>
              <p className="text-[11px] font-mono text-trust-emerald font-semibold">
                {selectedTech.firstTimeFixRate}% First-Time-Fix Score ({selectedTech.repairsCompleted}+ repairs)
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-paper-200">
            <span className="text-[11px] font-mono text-carbon-500">Doorstep Inspection:</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono font-black text-xl text-carbon-950">₹199</span>
              <span className="text-[10px] text-trust-emerald font-semibold">(Adjustable)</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleBookMechanic} className="space-y-4 text-xs">
          
          {/* Appliance & Problem */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-carbon-700 font-semibold mb-1">Select Appliance / Vehicle</label>
              <select
                value={applianceType}
                onChange={(e) => setApplianceType(e.target.value)}
                className="w-full bg-paper-50 border border-paper-300 rounded-xl p-2.5 text-xs text-carbon-950 focus:outline-none focus:border-brand-orange font-medium"
              >
                <option value="Washing Machine">Washing Machine</option>
                <option value="Inverter Split AC">Inverter Split AC</option>
                <option value="Refrigerator">Refrigerator</option>
                <option value="Smart 4K TV">Smart 4K TV</option>
                <option value="Two-Wheeler / Scooter">Two-Wheeler / Scooter</option>
                <option value="Microwave / Kitchen Appliance">Microwave / Kitchen Appliance</option>
                <option value="Laptop / MacBook">Laptop / MacBook</option>
              </select>
            </div>

            <div>
              <label className="block text-carbon-700 font-semibold mb-1">What's happening? (Brief description)</label>
              <input
                type="text"
                value={issueSummary}
                onChange={(e) => setIssueSummary(e.target.value)}
                placeholder="e.g. Making weird vibration, won't start..."
                className="w-full bg-paper-50 border border-paper-300 rounded-xl p-2.5 text-xs text-carbon-950 focus:outline-none focus:border-brand-orange"
              />
            </div>
          </div>

          {/* Customer Address & WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-carbon-700 font-semibold mb-1">Your Name</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-paper-50 border border-paper-300 rounded-xl p-2.5 text-xs text-carbon-950 focus:outline-none focus:border-brand-orange"
              />
            </div>
            <div>
              <label className="block text-carbon-700 font-semibold mb-1">WhatsApp / Phone Number</label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-paper-50 border border-paper-300 rounded-xl p-2.5 text-xs text-carbon-950 font-mono focus:outline-none focus:border-brand-orange"
              />
            </div>
          </div>

          <div>
            <label className="block text-carbon-700 font-semibold mb-1">Doorstep Address</label>
            <input
              type="text"
              required
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="w-full bg-paper-50 border border-paper-300 rounded-xl p-2.5 text-xs text-carbon-950 focus:outline-none focus:border-brand-orange"
            />
          </div>

          {/* Slot Selection */}
          <div className="space-y-1.5">
            <label className="block text-carbon-700 font-semibold">Technician Arrival Slot</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                'Express (Within 35 mins)',
                'Today, 2:00 PM - 3:30 PM',
                'Today, 5:00 PM - 6:30 PM',
                'Tomorrow Morning'
              ].map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2 rounded-xl text-[11px] font-medium border text-center transition-all ${
                    selectedSlot === slot
                      ? 'bg-brand-orange text-carbon-950 font-bold border-brand-orange shadow-sm'
                      : 'bg-paper-100 border-paper-300 text-carbon-700 hover:bg-paper-200'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* How It Works Mini Steps */}
          <div className="p-3.5 rounded-2xl bg-paper-100 border border-paper-300 text-[11px] space-y-1 text-carbon-700">
            <span className="font-bold text-carbon-950 block">🛠️ What Happens After You Book:</span>
            <p>1. <strong>Raj Kumar</strong> arrives at your door with multimeter & testing tools.</p>
            <p>2. Complete physical teardown & exact root cause diagnosis.</p>
            <p>3. Transparent upfront quote before opening any spare part.</p>
            <p>4. Pay after complete fix verification. ₹199 inspection fee is adjusted against repair!</p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+919845012890"
              className="px-5 py-3.5 rounded-2xl bg-paper-200 hover:bg-paper-300 text-carbon-950 font-display font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-paper-300"
            >
              <PhoneCall className="w-4 h-4 text-brand-orange" />
              <span>Instant Call Support</span>
            </a>

            <button
              type="submit"
              disabled={isBooking}
              className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-amber hover:from-brand-amber hover:to-brand-orange text-carbon-950 font-display font-black text-sm transition-all shadow-glow-orange flex items-center justify-center gap-2"
            >
              <span>{isBooking ? 'DISPATCHING TECHNICIAN...' : 'DISPATCH MECHANIC NOW (PAY AFTER FIX) →'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
