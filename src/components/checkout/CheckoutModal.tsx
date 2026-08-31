import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  MapPin, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Smartphone, 
  Lock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartTotal, 
    pinCode, 
    pinData, 
    placeOrder, 
    setCurrentView 
  } = useApp();

  const [name, setName] = useState('Aarav Deshmukh');
  const [phone, setPhone] = useState('+91 98450 12890');
  const [address, setAddress] = useState('Flat 402, Oakwood Enclave, 17th Main, Koramangala 4th Block');
  const [selectedSlot, setSelectedSlot] = useState('Today, 2:00 PM - 3:30 PM');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NET_BANKING' | 'PAY_AFTER_FIX'>('UPI');
  const [upiId, setUpiId] = useState('aarav@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newOrder = placeOrder({
        customerName: name,
        customerPhone: phone,
        customerAddress: address,
        pinCode: pinCode,
        scheduledTime: selectedSlot,
        paymentMethod: paymentMethod,
        totalAmount: cartTotal.grandTotal,
        part: cart.find(i => i.part)?.part,
        technician: cart.find(i => i.technician)?.technician
      });

      // Confetti celebratory trigger
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }

      setCurrentView('account');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-carbon-900 border border-carbon-700 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative text-paper-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-5 right-5 text-paper-400 hover:text-paper-100 p-2 rounded-full hover:bg-carbon-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-brand-orange font-bold uppercase tracking-wider">
              Single Frictionless Checkout
            </span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-paper-50 tracking-tight">
            Schedule Your Repair
          </h2>
        </div>

        <form onSubmit={handleCompleteOrder} className="space-y-6">
          
          {/* Section 1: Customer Details */}
          <div className="space-y-3 p-4 rounded-2xl bg-carbon-950 border border-carbon-800">
            <div className="flex items-center gap-2 text-xs font-mono text-paper-400 font-bold uppercase">
              <MapPin className="w-3.5 h-3.5 text-brand-orange" />
              <span>Service Location & Contact</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-paper-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-carbon-900 border border-carbon-700 rounded-xl px-3 py-2 text-xs text-paper-50 focus:outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block text-[11px] text-paper-300 font-semibold mb-1">WhatsApp / Phone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-carbon-900 border border-carbon-700 rounded-xl px-3 py-2 text-xs text-paper-50 font-mono focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-paper-300 font-semibold mb-1">Complete Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-carbon-900 border border-carbon-700 rounded-xl px-3 py-2 text-xs text-paper-50 focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-trust-emerald">
              <span>PIN: {pinCode} ({pinData?.city || 'Bengaluru'})</span>
              <span>✓ 2-Hr Delivery & Express Tech ETA Available</span>
            </div>
          </div>

          {/* Section 2: Preferred Slot */}
          <div className="space-y-3 p-4 rounded-2xl bg-carbon-950 border border-carbon-800">
            <div className="flex items-center gap-2 text-xs font-mono text-paper-400 font-bold uppercase">
              <Clock className="w-3.5 h-3.5 text-trust-blue" />
              <span>Select Technician Arrival Window</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'Express (Within 45 mins)',
                'Today, 2:00 PM - 3:30 PM',
                'Today, 5:00 PM - 6:30 PM',
                'Tomorrow, 10:00 AM - 11:30 AM'
              ].map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                    selectedSlot === slot
                      ? 'bg-carbon-900 border-brand-orange text-brand-orange font-bold'
                      : 'bg-carbon-900/50 border-carbon-800 text-paper-300 hover:bg-carbon-850'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="space-y-3 p-4 rounded-2xl bg-carbon-950 border border-carbon-800">
            <div className="flex items-center gap-2 text-xs font-mono text-paper-400 font-bold uppercase">
              <Lock className="w-3.5 h-3.5 text-trust-emerald" />
              <span>Secure Indian Payment Gateway</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'UPI', label: 'UPI / QR', icon: QrCode },
                { id: 'CARD', label: 'Cards', icon: CreditCard },
                { id: 'NET_BANKING', label: 'NetBanking', icon: Smartphone },
                { id: 'PAY_AFTER_FIX', label: 'Pay After Fix', icon: ShieldCheck }
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setPaymentMethod(p.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === p.id
                        ? 'bg-carbon-900 border-brand-orange text-brand-orange font-bold shadow-glow-orange'
                        : 'bg-carbon-900/50 border-carbon-800 text-paper-300 hover:bg-carbon-850'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{p.label}</span>
                  </button>
                );
              })}
            </div>

            {paymentMethod === 'UPI' && (
              <div className="p-3 rounded-xl bg-carbon-900 border border-carbon-800 space-y-2">
                <label className="block text-[11px] text-paper-300 font-semibold">Enter UPI ID or Scan QR on next screen</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. mobile@upi"
                  className="w-full bg-carbon-950 border border-carbon-700 rounded-xl px-3 py-2 text-xs text-paper-50 font-mono focus:outline-none focus:border-brand-orange"
                />
              </div>
            )}
          </div>

          {/* Guarantee Badge */}
          <div className="p-3 rounded-xl bg-trust-emerald/10 border border-trust-emerald/30 flex items-center justify-between text-xs text-trust-emerald">
            <span className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>90-Day Digital Repair Passport Included (₹0 Free)</span>
            </span>
            <span className="font-mono text-[10px]">Auto-Minted</span>
          </div>

          {/* Grand Total & Submit */}
          <div className="pt-2 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-paper-400 block">Total Payable:</span>
              <span className="font-mono font-black text-2xl text-paper-50">₹{cartTotal.grandTotal}</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="py-4 px-8 rounded-2xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-display font-black text-base transition-all shadow-glow-orange flex items-center gap-2"
            >
              <span>{isProcessing ? 'CONFIRMING ORDER...' : 'CONFIRM & BOOK REPAIR →'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
