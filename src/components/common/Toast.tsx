import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Sparkles, CheckCircle2, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="pointer-events-auto relative p-4 rounded-xl glass-panel border border-gold-500/30 shadow-gold-md bg-charcoal-900/95 overflow-hidden group"
          >
            {/* Gold Edge Accent */}
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700" />

            <div className="flex items-start gap-3 pl-2">
              <div className="mt-0.5 shrink-0">
                {toast.type === 'gold' ? (
                  <Sparkles className="w-5 h-5 text-gold-400 animate-pulse" />
                ) : toast.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Info className="w-5 h-5 text-stone-400" />
                )}
              </div>

              <div className="flex-1 pr-2">
                <h4 className="text-sm font-serif font-medium tracking-wide text-gold-200">
                  {toast.title}
                </h4>
                <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 text-stone-500 hover:text-stone-300 transition-colors p-1"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
