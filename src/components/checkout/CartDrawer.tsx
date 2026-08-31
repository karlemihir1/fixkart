import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Trash2, 
  ShieldCheck, 
  Wrench, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  Minus,
  CheckCircle2
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    clearCart, 
    cartTotal,
    setIsCheckoutOpen,
    setCurrentView 
  } = useApp();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-carbon-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-carbon-900 border-l border-carbon-750 p-6 flex flex-col justify-between shadow-2xl text-paper-100 relative">
          
          {/* Header */}
          <div className="pb-4 border-b border-carbon-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl text-paper-50">REPAIR CART</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-brand-orange text-carbon-950 font-bold">
                {cartTotal.itemCount} items
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-paper-400 hover:text-paper-100 rounded-full hover:bg-carbon-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-carbon-950 border border-carbon-800/80 space-y-3 relative group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        item.itemType === 'PART_AND_INSTALLATION' ? 'bg-brand-orange/20 text-brand-orange border border-brand-orange/40' :
                        item.itemType === 'INSTALLATION_ONLY' ? 'bg-trust-blue/20 text-trust-blue' : 'bg-carbon-800 text-paper-300'
                      }`}>
                        {item.itemType.replace(/_/g, ' ')}
                      </span>
                      <h4 className="font-display font-bold text-sm text-paper-50 mt-1">
                        {item.part?.name || item.deviceModelName || 'Repair Service'}
                      </h4>
                      {item.technician && (
                        <p className="text-[11px] text-trust-emerald font-medium mt-0.5 flex items-center gap-1">
                          <Wrench className="w-3 h-3" />
                          <span>Installed by {item.technician.name} ({item.technician.rating}★)</span>
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-paper-500 hover:text-red-400 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Price breakdown inside card */}
                  <div className="pt-2 border-t border-carbon-850 flex items-center justify-between text-xs font-mono">
                    <div className="text-paper-400 space-x-2">
                      {item.partPrice > 0 && <span>Part: ₹{item.partPrice}</span>}
                      {item.installationPrice > 0 && <span>Labor: ₹{item.installationPrice}</span>}
                    </div>
                    <span className="font-black text-sm text-paper-50">
                      ₹{item.totalPrice}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center space-y-3 text-paper-400">
                <Wrench className="w-12 h-12 text-carbon-700 mx-auto" />
                <h4 className="font-display font-bold text-base text-paper-200">Your repair cart is empty</h4>
                <p className="text-xs max-w-xs mx-auto">
                  Run an optical diagnosis or browse verified spare parts to build your repair package.
                </p>
              </div>
            )}
          </div>

          {/* Bottom Total & Checkout Summary */}
          {cart.length > 0 && (
            <div className="pt-4 border-t border-carbon-800 space-y-3">
              {/* Cost calculations */}
              <div className="space-y-1.5 text-xs font-mono text-paper-300">
                <div className="flex justify-between">
                  <span>Parts Subtotal:</span>
                  <span className="text-paper-100">₹{cartTotal.partsTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Technician Labor:</span>
                  <span className="text-paper-100">₹{cartTotal.laborTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%):</span>
                  <span className="text-paper-100">₹{cartTotal.taxes}</span>
                </div>
                {cartTotal.discount > 0 && (
                  <div className="flex justify-between text-trust-emerald font-bold">
                    <span>Combo Discount:</span>
                    <span>−₹{cartTotal.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-trust-emerald font-bold pt-1 border-t border-carbon-800">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>90-Day FixKart Guarantee:</span>
                  </span>
                  <span>FREE (₹0)</span>
                </div>
                <div className="flex justify-between text-base font-bold text-paper-50 pt-2 border-t border-carbon-750">
                  <span>Grand Total:</span>
                  <span className="font-mono text-xl text-brand-orange">₹{cartTotal.grandTotal}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-4 rounded-2xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-display font-black text-sm transition-all shadow-glow-orange flex items-center justify-center gap-2"
              >
                <span>PROCEED TO SINGLE CHECKOUT →</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
