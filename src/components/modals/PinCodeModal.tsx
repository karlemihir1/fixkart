import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, CheckCircle2, AlertTriangle, X, Search, Sparkles } from 'lucide-react';
import { PIN_CODES_DATABASE } from '../../data/mockData';

export const PinCodeModal: React.FC = () => {
  const { isPinModalOpen, setIsPinModalOpen, pinCode, setPinCode, pinData, addToast } = useApp();
  const [inputPin, setInputPin] = useState(pinCode);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [isWaitlistSubmitted, setIsWaitlistSubmitted] = useState(false);

  if (!isPinModalOpen) return null;

  const handleApplyPin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputPin.trim().length !== 6 || isNaN(Number(inputPin))) {
      addToast('error', 'Invalid PIN Code', 'Please enter a valid 6-digit Indian PIN code.');
      return;
    }
    const serviceable = setPinCode(inputPin.trim());
    if (serviceable) {
      setIsPinModalOpen(false);
    }
  };

  const handleQuickPinSelect = (pin: string) => {
    setInputPin(pin);
    setPinCode(pin);
    setIsPinModalOpen(false);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail || !waitlistEmail.includes('@')) {
      addToast('error', 'Invalid Email', 'Please enter a valid email to receive launch notifications.');
      return;
    }
    setIsWaitlistSubmitted(true);
    addToast('success', 'Waitlist Joined!', `We will notify you at ${waitlistEmail} as soon as FixKart launches in PIN ${inputPin}.`);
    setTimeout(() => {
      setIsWaitlistSubmitted(false);
      setIsPinModalOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-carbon-900 border border-carbon-700 w-full max-w-md rounded-3xl p-6 shadow-2xl relative text-paper-100">
        <button
          onClick={() => setIsPinModalOpen(false)}
          className="absolute top-5 right-5 text-paper-400 hover:text-paper-100 p-1.5 rounded-full hover:bg-carbon-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-paper-50">Where are we fixing it?</h3>
            <p className="text-xs text-paper-400">Enter your 6-digit Indian PIN code for live parts & technician ETA</p>
          </div>
        </div>

        {/* PIN Input form */}
        <form onSubmit={handleApplyPin} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              maxLength={6}
              value={inputPin}
              onChange={(e) => setInputPin(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 560034"
              className="w-full bg-carbon-950 border border-carbon-700 rounded-2xl px-4 py-3.5 pl-11 text-lg font-mono tracking-widest text-paper-50 placeholder-paper-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
            />
            <Search className="w-5 h-5 text-paper-400 absolute left-3.5 top-4" />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-4 bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1"
            >
              <span>CHECK</span>
            </button>
          </div>
        </form>

        {/* Serviceability card */}
        {pinData && (
          <div className={`mt-4 p-4 rounded-2xl border ${pinData.isServiceable ? 'bg-carbon-850 border-trust-emerald/30' : 'bg-red-950/20 border-red-800/40'}`}>
            {pinData.isServiceable ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-trust-emerald">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Active FixKart Service Hub</span>
                  </span>
                  <span className="font-mono text-xs text-paper-300 font-bold">{pinData.city}, {pinData.state}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-carbon-700/50">
                  <div>
                    <span className="text-[10px] text-paper-400 block">Parts Delivery</span>
                    <span className="font-semibold text-paper-100">{pinData.partsDeliveryTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-paper-400 block">Express Tech ETA</span>
                    <span className="font-semibold text-brand-orange">{pinData.expressTechnicianETA}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-brand-amber font-bold text-xs mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>FixKart hasn't reached {pinData.city || inputPin} yet.</span>
                </div>
                <p className="text-xs text-paper-400 leading-relaxed mb-3">
                  We are expanding our verified supplier and technician network rapidly across India. Join the priority launch waitlist.
                </p>

                {!isWaitlistSubmitted ? (
                  <form onSubmit={handleWaitlistSubmit} className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      className="flex-1 bg-carbon-950 border border-carbon-700 rounded-xl px-3 py-2 text-xs text-paper-50 focus:outline-none focus:border-brand-orange"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold text-xs rounded-xl transition-colors whitespace-nowrap"
                    >
                      NOTIFY ME
                    </button>
                  </form>
                ) : (
                  <div className="p-2 rounded-xl bg-trust-emerald/10 text-trust-emerald text-xs text-center font-semibold">
                    ✓ You're on the priority notification list!
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Quick Popular Hubs */}
        <div className="mt-5 pt-4 border-t border-carbon-800">
          <p className="text-[11px] text-paper-400 font-semibold mb-2 uppercase tracking-wider">
            Quick Select Major Tech Hubs
          </p>
          <div className="flex flex-wrap gap-1.5">
            {Object.keys(PIN_CODES_DATABASE).map((pin) => {
              const data = PIN_CODES_DATABASE[pin];
              return (
                <button
                  key={pin}
                  onClick={() => handleQuickPinSelect(pin)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1 ${
                    pinCode === pin
                      ? 'bg-brand-orange text-carbon-950 font-bold'
                      : 'bg-carbon-800 text-paper-300 hover:bg-carbon-750 hover:text-paper-100'
                  }`}
                >
                  <span>{pin}</span>
                  <span className="text-[10px] opacity-70">({data.city.split(' ')[0]})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
