import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function PackageCard({ pkg, featured }: { pkg: any; featured?: boolean }) {
  const originalPrice = pkg?.original_price ?? pkg?.mrp;
  const offerPrice = pkg?.offer_price ?? pkg?.price;
  
  const discountPercent = originalPrice && offerPrice 
    ? Math.round(((originalPrice - offerPrice) / originalPrice) * 100) 
    : 0;

  const testsList = pkg?.package_tests ?? pkg?.tests ?? [];
  const testCount = Array.isArray(testsList) ? testsList.length : 0;

  // Function to trigger WhatsApp chat with pre-filled package details
  const handleWhatsAppBooking = () => {
    // Replace with your lab's WhatsApp phone number (include country code, e.g., 91 for India, without '+' or spaces)
    const phoneNumber = "919876543210"; 
    
    const message = encodeURIComponent(
      `Hi, I would like to book the "${pkg?.name}" package (Price: ₹${offerPrice}). Please guide me with the next steps.`
    );
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`relative flex flex-col justify-between rounded-3xl bg-white p-6 shadow-soft ring-1 transition-shadow duration-300 hover:shadow-xl ${
        featured ? 'ring-2 ring-teal-500/80 bg-gradient-to-b from-teal-50/30 to-white' : 'ring-slate-200/70'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 right-6 rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
          Most Popular 🔥
        </span>
      )}

      <div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold text-slate-900">{pkg?.name}</h3>
          {discountPercent > 0 && (
            <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-slate-600 line-clamp-2">{pkg?.short_description}</p>

        {/* Pricing Block */}
        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-slate-900">
            {offerPrice != null ? `₹${offerPrice}` : 'Price on request'}
          </span>
          {originalPrice != null && (
            <span className="text-sm font-medium text-slate-400 line-through">
              ₹{originalPrice}
            </span>
          )}
        </div>

        {/* Test Summary Pill list */}
        <div className="mt-6 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Includes Tests ({testCount}):
          </p>
          <ul className="mt-3 space-y-2">
            {Array.isArray(testsList) && testsList.slice(0, 4).map((item: any, index: number) => {
              const testName = typeof item === 'string' ? item : (item?.test_name || item?.name || '');
              return (
                <li key={index} className="flex items-center text-xs text-slate-700">
                  <CheckCircle2 className="mr-2 h-4 w-4 shrink-0 text-teal-600" />
                  <span className="truncate">{testName}</span>
                </li>
              );
            })}
            {testCount > 4 && (
              <li className="text-xs font-medium text-teal-600 pl-6">
                + {testCount - 4} more parameters...
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-100">
        <button 
          onClick={handleWhatsAppBooking}
          className="group flex w-full items-center justify-center rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-600 shadow-sm cursor-pointer"
        >
          Book via WhatsApp 💬
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}