import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Sparkles, ShoppingBag, ShieldCheck, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentView, setCurrentView, startDiagnosis, cartTotal } = useApp();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-carbon-950/95 backdrop-blur-2xl border-t border-carbon-800/80 px-2 py-2 safe-area-pb">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
            currentView === 'home' ? 'text-brand-orange font-bold' : 'text-paper-400 hover:text-paper-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1">Home</span>
        </button>

        {/* Parts Marketplace */}
        <button
          onClick={() => setCurrentView('marketplace')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
            currentView === 'marketplace' ? 'text-brand-orange font-bold' : 'text-paper-400 hover:text-paper-200'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] mt-1">Parts</span>
        </button>

        {/* Elevated Kinetic Fix Button */}
        <button
          onClick={() => startDiagnosis()}
          className="relative -top-5 flex flex-col items-center group"
          aria-label="Fix My Problem"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-orange to-brand-amber text-carbon-950 flex items-center justify-center shadow-glow-orange group-active:scale-95 transition-all duration-200 border-2 border-carbon-950">
            <Sparkles className="w-7 h-7 stroke-[2.5] animate-spin-slow" />
          </div>
          <span className="text-[11px] font-black text-brand-orange mt-1 tracking-wider uppercase">
            FIX
          </span>
        </button>

        {/* Repairs & Passports */}
        <button
          onClick={() => setCurrentView('account')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
            currentView === 'account' ? 'text-brand-orange font-bold' : 'text-paper-400 hover:text-paper-200'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] mt-1">Repairs</span>
        </button>

        {/* Technicians */}
        <button
          onClick={() => setCurrentView('technicians')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
            currentView === 'technicians' ? 'text-brand-orange font-bold' : 'text-paper-400 hover:text-paper-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-1">Techs</span>
        </button>
      </div>
    </div>
  );
};
