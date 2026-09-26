import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, X, Headphones } from 'lucide-react';

export function QuickContactWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Official United Mediclinic contact numbers
  const primaryNumber = "9539900049";
  const secondaryNumber = "9539900014";
  const whatsappMessage = encodeURIComponent("Hello, I would like to book a lab test / health package with United Mediclinic.");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-4 flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-2xl border border-slate-200/80 w-60"
          >
            <div className="px-3 pt-2 pb-1 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Fast Booking</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/91${primaryNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-medium text-white shadow-md hover:bg-emerald-600 transition-colors"
            >
              <MessageCircle className="h-5 w-5 fill-white text-emerald-500 flex-shrink-0" />
              <div className="flex flex-col text-left">
                <span>Chat on WhatsApp</span>
                <span className="text-[10px] text-emerald-100">+{primaryNumber}</span>
              </div>
            </a>

            {/* Primary Call Button */}
            <a
              href={`tel:+91${primaryNumber}`}
              className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-md hover:bg-slate-800 transition-colors"
            >
              <Phone className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <div className="flex flex-col text-left">
                <span>Call Clinic 1</span>
                <span className="text-[10px] text-slate-400">+{primaryNumber}</span>
              </div>
            </a>

            {/* Secondary Call Button */}
            <a
              href={`tel:+91${secondaryNumber}`}
              className="flex items-center gap-3 rounded-xl bg-slate-800 px-4 py-3 text-sm font-medium text-white shadow-md hover:bg-slate-700 transition-colors"
            >
              <Phone className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <div className="flex flex-col text-left">
                <span>Call Clinic 2</span>
                <span className="text-[10px] text-slate-400">+{secondaryNumber}</span>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-2xl hover:bg-slate-800 border-2 border-amber-500/50 transition-all focus:outline-none"
        aria-label="Quick Booking Contact"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Headphones className="h-6 w-6 text-amber-400" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </div>
        )}
      </motion.button>
    </div>
  );
}