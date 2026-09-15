import React, { useState, useMemo } from 'react';

interface DiagnosticItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  type: 'Test' | 'Package';
  category: string;
  description: string;
  parameters: string[];
}

const allCatalogItems: DiagnosticItem[] = [
  // --- INDIVIDUAL TESTS (Test 1 - Test 9) ---
  {
    id: 'test-1',
    name: 'Test 1',
    price: 99,
    type: 'Test',
    category: 'Essential Blood Test',
    description: 'Essential blood screening focusing on complete blood count and inflammation markers.',
    parameters: ['Complete Blood Count (CBC) full parameters', 'ESR']
  },
  {
    id: 'test-2',
    name: 'Test 2',
    price: 299,
    type: 'Test',
    category: 'Kidney & Sugar',
    description: 'Kidney function and sugar screening profile.',
    parameters: ['FBS', 'EGFR', 'RFT (Full Parameters)', 'UR/E (Full Parameters)']
  },
  {
    id: 'test-3',
    name: 'Test 3',
    price: 599,
    type: 'Test',
    category: 'Iron & Anemia Profile',
    description: 'Comprehensive iron deficiency and blood profile.',
    parameters: ['Iron', 'TIBC', 'Ferritin', 'CBC (Full parameters)', 'ESR']
  },
  {
    id: 'test-4',
    name: 'Test 4',
    price: 799,
    type: 'Test',
    category: 'Metabolic & Diabetic Screen',
    description: 'Advanced diabetic, renal, and lipid assessment.',
    parameters: ['FBS', 'HbA1c', 'CBC (Full parameters)', 'ESR', 'RFT (Full parameters)', 'UR/E (Full parameters)', 'Lipid (Full parameters)']
  },
  {
    id: 'test-5',
    name: 'Test 5',
    price: 899,
    type: 'Test',
    category: 'Advanced Renal & Sugar',
    description: 'Targeted microalbumin, diabetes, and lipid profile.',
    parameters: ['FBS', 'EGFR', 'HbA1c', 'Microalbumin', 'Creatinine', 'CBC (Full parameters)', 'Lipid (Full parameters)']
  },
  {
    id: 'test-6',
    name: 'Test 6',
    price: 1499,
    type: 'Test',
    category: 'Cardiac & Pancreatic',
    description: 'Cardiac, pancreatic, and inflammatory enzyme markers.',
    parameters: ['HSCRP', 'Lipase', 'Amylase', 'LDH', 'CBC (Full parameters)', 'ESR']
  },
  {
    id: 'test-7',
    name: 'Test 7',
    price: 1999,
    type: 'Test',
    category: 'Multi-Organ Panel',
    description: 'Multi-organ comprehensive diagnostic panel.',
    parameters: ['CRP', 'ASO', 'RA', 'Calcium', 'CBC (Full parameters)', 'RFT (Full parameters)', 'UR/E (Full parameters)', 'Lipid (Full parameters)', 'LFT (Full parameters)']
  },
  {
    id: 'test-8',
    name: 'Test 8',
    price: 2499,
    type: 'Test',
    category: 'Thyroid & Electrolyte',
    description: 'Advanced thyroid, electrolyte, and metabolic screening.',
    parameters: [
      'FBS', 'HbA1c', 'Microalbumin', 'TSH', 'Anti TPO', 'Calcium', 
      'Electrolytes', 'CBC (Full parameters)', 'RFT (Full parameters)', 
      'UR/E (Full parameters)', 'UR/FE (Full parameters)', 'Lipid Profile (Full parameters)', 'LFT (Full parameters)'
    ]
  },
  {
    id: 'test-9',
    name: 'Test 9',
    price: 2999,
    type: 'Test',
    category: 'Comprehensive Expert Test',
    description: 'Comprehensive multi-system expert health evaluation.',
    parameters: [
      'EGFR', 'HbA1c', 'GGT', 'Anti TPO', 'Testo', 'Amylase', 'Iron', 
      'Lipase', 'T3', 'T4', 'TSH', 'CBC (Full parameters)', 'ESR', 
      'RFT (Full parameters)', 'Lipid (Full parameters)', 'LFT (Full parameters)'
    ]
  },

  // --- HEALTH PACKAGES ---
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
  const [activeTab, setActiveTab] = useState<'All' | 'Test' | 'Package'>('All');

  const filteredItems = useMemo(() => {
    return allCatalogItems.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.parameters.some(param => param.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTab = activeTab === 'All' || item.type === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-4 rounded-full bg-blue-500/10 text-blue-400 font-semibold text-xs tracking-wider uppercase mb-4 border border-blue-500/20 shadow-inner">
            United Medilabs Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Diagnostic Tests & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Health Packages</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg mb-8">
            Browse our complete range of precision diagnostic tests first, followed by our heavily discounted comprehensive health packages.
          </p>

          {/* Search Bar & Filters */}
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="relative shadow-2xl">
              <span className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-blue-400 text-lg">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search test names (e.g., Test 1, CBC, Lipid, Complete Body Check-Up)..."
                className="w-full pl-12 pr-6 py-4 bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base shadow-inner"
              />
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-2 pt-2">
              {[
                { label: 'All Catalog', value: 'All' },
                { label: 'Individual Tests (1-9)', value: 'Test' },
                { label: 'Health Packages', value: 'Package' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value as any)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.value
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400/50'
                      : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
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
                className="bg-slate-800/60 backdrop-blur-sm rounded-3xl border border-slate-700/80 p-6 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group"
              >
                <div>
                  <div className="flex justify-between items-start gap-3 mb-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                      item.type === 'Test' 
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                        : 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                    }`}>
                      {item.category}
                    </span>
                    <div className="text-right">
                      <div className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
                        ₹{item.price}<span className="text-xs font-normal text-slate-400">/-</span>
                      </div>
                      {item.originalPrice && (
                        <span className="text-xs text-rose-400 font-semibold line-through">
                          ₹{item.originalPrice}/-
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="border-t border-slate-700/60 pt-4 mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Included Parameters:
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
                  onClick={() => alert(`Booking appointment inquiry for: ${item.name} (₹${item.price})`)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-2xl transition-all duration-200 text-sm shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                >
                  Book {item.type} Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-800/40 rounded-3xl border border-slate-800 max-w-lg mx-auto">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No matching tests or packages found</h3>
            <p className="text-slate-400 text-sm px-6">Try refining your search keyword or selecting a different catalog tab.</p>
          </div>
        )}
      </div>
    </div>
  );
}