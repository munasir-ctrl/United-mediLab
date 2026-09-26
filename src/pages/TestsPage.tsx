import React, { useState, useMemo } from 'react';

interface DiagnosticItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  type: 'Package';
  category: string;
  description: string;
  parameters: string[];
}

const allCatalogItems: DiagnosticItem[] = [
  // --- HEALTH PACKAGES ONLY ---
  {
    id: 'complete-body-checkup',
    name: 'Complete Body Check-Up',
    price: 999,
    originalPrice: 4999,
    type: 'Package',
    category: 'Featured Package',
    description: 'Full body health evaluation covering vital metabolic, lipid, liver, kidney, and thyroid markers.',
    parameters: [
      'Fastings Blood Sugar (FBS)',
      'Lipid Profile (Total Cholesterol, Triglycerides, HDL, LDL, VLDL, Ratios)',
      'Liver Function Test (Bilirubin Total/Direct/Indirect, SGOT, SGPT, Alkaline Phosphatase, Total Protein, Albumin, Globulin, A/G Ratio, GGT)',
      'Kidney Function Tests (Blood Urea, Serum Creatinine, Uric Acid, BUN)',
      'Urine Complete Analysis (Colour, Appearance, Volume, Specific Gravity, pH, Nitrate, Ketone, Urobilinogen, Albumin, Sugar, Pus Cells, RBC, Casts, Bacteria)',
      'Iron & Vitamins (Iron, Vitamin B12, Free T3, Free T4, TSH)',
      'Complete Blood Count (CBC + ESR - 22 Parameters)'
    ]
  },
  {
    id: 'basic-health-package',
    name: 'Basic Health Package',
    price: 599,
    originalPrice: 1150,
    type: 'Package',
    category: 'Wellness Package',
    description: 'Essential wellness screening for routine health monitoring.',
    parameters: ['FBS', 'Lipid Profile', 'LFT', 'CBC', 'Urine Routine']
  },
  {
    id: 'primary-male-40',
    name: 'Primary Health Package (Above 40 Years - Male)',
    price: 799,
    originalPrice: 2530,
    type: 'Package',
    category: 'Age-Specific Package',
    description: 'Tailored health screening for men above 40 focusing on cardiac, liver, kidney, and prostate health.',
    parameters: ['FBS', 'PPBS', 'Lipid Profile', 'LFT', 'RFT', 'Calcium', 'PSA', 'HbA1c', 'Urine Routine']
  },
  {
    id: 'primary-female-40',
    name: 'Primary Health Package (Above 40 Years - Female)',
    price: 799,
    originalPrice: 2550,
    type: 'Package',
    category: 'Age-Specific Package',
    description: 'Tailored health screening for women above 40 including thyroid and metabolic evaluations.',
    parameters: ['FBS', 'PPBS', 'Lipid Profile', 'LFT', 'RFT', 'Calcium', 'CBC', 'Urine Routine', 'TFT', 'HbA1c']
  },
  {
    id: 'master-health-male',
    name: 'Master Health Package (Male)',
    price: 1499,
    originalPrice: 4330,
    type: 'Package',
    category: 'Master Package',
    description: 'Extensive health package covering diabetes, cardiac risks, bone health, and PSA screening for men.',
    parameters: ['FBS', 'PPBS', 'Lipid Profile', 'LFT', 'RFT', 'CBC', 'Urine Routine', 'PSA', 'Calcium', 'Sodium', 'Potassium', 'Urine Microalbumin', 'Vitamin D', 'HbA1c']
  },
  {
    id: 'master-health-female',
    name: 'Master Health Package (Female)',
    price: 1499,
    originalPrice: 4330,
    type: 'Package',
    category: 'Master Package',
    description: 'Extensive health package covering thyroid status, bone health, diabetes, and vital organ functions for women.',
    parameters: ['FBS', 'PPBS', 'Lipid Profile', 'LFT', 'RFT', 'CBC', 'Urine Routine', 'TFT', 'Calcium', 'Sodium', 'Potassium', 'Urine Microalbumin', 'Vitamin D', 'HbA1c']
  },
  {
    id: 'executive-health-male',
    name: 'Executive Health Package (Male)',
    price: 5999,
    originalPrice: 11000,
    type: 'Package',
    category: 'Executive Package',
    description: 'Comprehensive elite wellness checkup covering all major biochemical, infection, cardiac, and vitamin markers.',
    parameters: [
      'Diabetes (FBS, PPBS, HbA1c)',
      'Lipid Profile (Full breakdown)',
      'Liver Function Test (Full parameters)',
      'Pancreas Profile (Amylase, Lipase)',
      'Bone Profile (Calcium, Magnesium)',
      'Infection Profile (HBsAg, HIV, HCV Screening)',
      'Cardiac Markers (CPK, CKMB)',
      'Electrolytes (Sodium, Potassium, Chloride)',
      'Renal Function & eGFR, BUN',
      'Iron Deficiency Profile & Ferritin, TIBC, CBC',
      'Vitamins (Vitamin D, Vitamin B12, Folic Acid)',
      'PSA'
    ]
  },
  {
    id: 'executive-health-female',
    name: 'Executive Health Package (Female)',
    price: 5999,
    originalPrice: 11000,
    type: 'Package',
    category: 'Executive Package',
    description: 'Comprehensive elite wellness checkup tailored for women including complete thyroid profiling.',
    parameters: [
      'Diabetes (FBS, PPBS, HbA1c)',
      'Lipid Profile & LFT (Full parameters)',
      'Pancreas & Bone Profile',
      'Infection Profile (HBsAg, HIV, HCV)',
      'Cardiac Markers (CPK, CKMB)',
      'Electrolytes & Renal Function Test',
      'Iron Deficiency & Vitamin Profile (D, B12, Folic Acid)',
      'Thyroid Profile Test (T3, T4, TSH)'
    ]
  },
  {
    id: 'pcod-profile',
    name: 'PCOD Profile Test',
    price: 1999,
    originalPrice: 3000,
    type: 'Package',
    category: 'Specialized Profile',
    description: 'Hormonal and metabolic assessment designed for PCOD/PCOS evaluation.',
    parameters: ['CBC', 'Insulin Fasting', 'LH', 'FSH', 'Testosterone', 'Prolactin', 'TSH']
  }
];

export function TestsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Direct WhatsApp booking handler
  const handleWhatsAppBooking = (packageName: string, price: number) => {
    const phoneNumber = "919876543210"; // Replace with your lab's WhatsApp phone number
    const message = encodeURIComponent(
      `Hi, I would like to book the "${packageName}" package (Price: ₹${price}). Please guide me with the next steps.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const filteredItems = useMemo(() => {
    return allCatalogItems.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.parameters.some(param => param.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-[#005288] via-[#0072bc] to-[#00a88f] pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-teal-500/20 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-4 rounded-full bg-white/10 text-white font-semibold text-xs tracking-wider uppercase mb-4 border border-white/20 shadow-inner">
            United Medilabs Packages
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Exclusive <span className="text-teal-200">Health Checkup Packages</span>
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-base sm:text-lg mb-8">
            Choose from our comprehensive, heavily discounted full body and specialized health checkup packages and book instantly via WhatsApp.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative shadow-2xl">
              <span className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-teal-300 text-lg">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search package name, parameters (e.g., Complete Body Check-Up, Lipid, CBC)..."
                className="w-full pl-12 pr-6 py-4 bg-slate-900/90 backdrop-blur-md border border-teal-500/30 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all text-sm sm:text-base shadow-inner"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-slate-800/60 backdrop-blur-sm rounded-3xl border border-slate-700/80 p-6 flex flex-col justify-between hover:border-[#00a88f] hover:shadow-2xl hover:shadow-[#00a88f]/10 transition-all duration-300 group"
              >
                <div>
                  <div className="flex justify-between items-start gap-3 mb-4">
                    <span className="px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider bg-[#00a88f]/20 text-teal-300 border border-[#00a88f]/40">
                      {item.category}
                    </span>
                    <div className="text-right">
                      <div className="text-2xl font-black text-white group-hover:text-teal-300 transition-colors">
                        ₹{item.price}<span className="text-xs font-normal text-slate-400">/-</span>
                      </div>
                      {item.originalPrice && (
                        <span className="text-xs text-rose-400 font-semibold line-through">
                          ₹{item.originalPrice}/-
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-200 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="border-t border-slate-700/60 pt-4 mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00a88f]"></span> Included Parameters:
                    </span>
                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1 custom-scrollbar">
                      {item.parameters.map((param, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-1 bg-slate-900/80 text-slate-300 text-xs rounded-lg border border-slate-700/50"
                        >
                          {param}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => handleWhatsAppBooking(item.name, item.price)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-2xl transition-all duration-200 text-sm shadow-lg shadow-emerald-600/30 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Book via WhatsApp 💬
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-800/40 rounded-3xl border border-slate-800 max-w-lg mx-auto">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No matching packages found</h3>
            <p className="text-slate-400 text-sm px-6">Try refining your search keyword.</p>
          </div>
        )}
      </div>
    </div>
  );
}