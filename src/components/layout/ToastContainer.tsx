import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = Info;
        let borderColor = 'border-trust-blue';
        let bgGlow = 'bg-carbon-900/95';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          borderColor = 'border-trust-emerald';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          borderColor = 'border-brand-amber';
        } else if (toast.type === 'error') {
          Icon = XCircle;
          borderColor = 'border-red-500';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border ${borderColor} ${bgGlow} shadow-2xl backdrop-blur-md flex items-start gap-3 transition-all duration-300 transform translate-y-0 animate-float-slow`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
              toast.type === 'success' ? 'text-trust-emerald' :
              toast.type === 'warning' ? 'text-brand-amber' :
              toast.type === 'error' ? 'text-red-400' : 'text-trust-blue'
            }`} />
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-paper-50">{toast.title}</h4>
              <p className="text-xs text-paper-400 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-paper-400 hover:text-paper-100 transition-colors p-1"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
