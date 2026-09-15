import React, { useState, useMemo } from 'react';

interface DiagnosticTest {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'Tests' | 'Packages' | 'Check-Up';
  description: string;
  parameters: string[];
}

const diagnosticTests: DiagnosticTest[] = [
  // --- TEST BUNDLES (Test 1 - Test 9) ---
  {
    id: 'test-1',
    name: 'Test 1',
    price: 99,
    category: 'Tests',
    description: 'Essential blood screening focusing on complete blood count and inflammation markers.',
    parameters: ['Complete Blood Count (CBC) full parameters', 'ESR']
  },
  {
    id: 'test-2',
    name: 'Test 2',
    price: 299,
    category: 'Tests',
    description: 'Kidney function and sugar screening profile.',
    parameters: ['FBS', 'EGFR', 'RFT (Full Parameters)', 'UR/E (Full Parameters)']
  },
  {
    id: 'test-3',
    name: 'Test 3',
    price: 599,
    category: 'Tests',
    description: 'Comprehensive iron deficiency and blood profile.',
    parameters: ['Iron', 'TIBC', 'Ferritin', 'CBC (Full parameters)', 'ESR']
  },
  {
    id: 'test-4',
    name: 'Test 4',
    price: 799,
    category: 'Tests',
    description: 'Advanced diabetic, renal, and lipid assessment.',
    parameters: ['FBS', 'HbA1c', 'CBC (Full parameters)', 'ESR', 'RFT (Full parameters)', 'UR/E (Full parameters)', 'Lipid (Full parameters)']
  },
  {
    id: 'test-5',
    name: 'Test 5',
    price: 899,
    category: 'Tests',
    description: 'Targeted microalbumin, diabetes, and lipid profile.',
    parameters: ['FBS', 'EGFR', 'HbA1c', 'Microalbumin', 'Creatinine', 'CBC (Full parameters)', 'Lipid (Full parameters)']
  },
  {
    id: 'test-6',
    name: 'Test 6',
    price: 1499,
    category: 'Tests',
    description: 'Cardiac, pancreatic, and inflammatory enzyme markers.',
    parameters: ['HSCRP', 'Lipase', 'Amylase', 'LDH', 'CBC (Full parameters)', 'ESR']
  },
  {
    id: 'test-7',
    name: 'Test 7',
    price: 1999,
    category: 'Tests',
    description: 'Multi-organ comprehensive diagnostic panel.',
    parameters: ['CRP', 'ASO', 'RA', 'Calcium', 'CBC (Full parameters)', 'RFT (Full parameters)', 'UR/E (Full parameters)', 'Lipid (Full parameters)', 'LFT (Full parameters)']
  },
  {
    id: 'test-8',
    name: 'Test 8',
    price: 2499,
    category: 'Tests',
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
    category: 'Tests',
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
    category: 'Check-Up',
    description: 'Full body health evaluation covering vital metabolic, lipid, liver, kidney, and thyroid markers.',
    parameters: [
      'Fastings Blood Sugar (FBS)',
      'Lipid Profile (Total Cholesterol, Triglycerides, HDL, LDL, VLDL, Ratios)',
      'Liver Function Test (Bilirubin Total/Direct/Indirect, SGOT, SGPT, Alkaline Phosphatase, Total Protein, Albumin, Globulin, A/G Ratio, GGT)',
      'Kidney Function Tests (Blood Urea, Serum Creatinine, Uric Acid, BUN)',
      'Urine Complete Analysis (Colour, Appearance, Volume, Specific Gravity, pH, Nitrate, Ketone, Urobilinogen, Albumin, Sugar, Pus Cells, RBC, Casts, Bacteria)',
      'Iron & Vitamins (Iron, Vitamin B12, Free T3, Free T4, TSH)',
      'Complete Blood Count (CBC + ESR - 22 Parameters including Haemoglobin, Total/Differential Counts, Platelets, RBC, PCV, MCV, MCH, MCHC, MPV, RDW)'
    ]
  },
  {
    id: 'basic-health-package',
    name: 'Basic Health Package',
    price: 599,
    originalPrice: 1150,
    category: 'Packages',
    description: 'Essential wellness screening for routine health monitoring.',
    parameters: ['FBS', 'Lipid Profile', 'LFT', 'CBC', 'Urine Routine']
  },
  {
    id: 'primary-male-40',
    name: 'Primary Health Package (Above 40 Years - Male)',
    price: 799,
    originalPrice: 2530,
    category: 'Packages',
    description: 'Tailored health screening for men above 40 focusing on cardiac, liver, kidney, and prostate health.',
    parameters: ['FBS', 'PPBS', 'Lipid Profile', 'LFT', 'RFT', 'Calcium', 'PSA', 'HbA1c', 'Urine Routine']
  },
  {
    id: 'primary-female-40',
    name: 'Primary Health Package (Above 40 Years - Female)',
    price: 799,
    originalPrice: 2550,
    category: 'Packages',
    description: 'Tailored health screening for women above 40 including thyroid and metabolic evaluations.',
    parameters: ['FBS', 'PPBS', 'Lipid Profile', 'LFT', 'RFT', 'Calcium', 'CBC', 'Urine Routine', 'TFT', 'HbA1c']
  },
  {
    id: 'master-health-male',
    name: 'Master Health Package (Male)',
    price: 1499,
    originalPrice: 4330,
    category: 'Packages',
    description: 'Extensive health package covering diabetes, cardiac risks, bone health, and PSA screening for men.',
    parameters: ['FBS', 'PPBS', 'Lipid Profile', 'LFT', 'RFT', 'CBC', 'Urine Routine', 'PSA', 'Calcium', 'Sodium', 'Potassium', 'Urine Microalbumin', 'Vitamin D', 'HbA1c']
  },
  {
    id: 'master-health-female',
    name: 'Master Health Package (Female)',
    price: 1499,
    originalPrice: 4330,
    category: 'Packages',
    description: 'Extensive health package covering thyroid status, bone health, diabetes, and vital organ functions for women.',
    parameters: ['FBS', 'PPBS', 'Lipid Profile', 'LFT', 'RFT', 'CBC', 'Urine Routine', 'TFT', 'Calcium', 'Sodium', 'Potassium', 'Urine Microalbumin', 'Vitamin D', 'HbA1c']
  },
  {
    id: 'executive-health-male',
    name: 'Executive Health Package (Male)',
    price: 5999,
    originalPrice: 11000,
    category: 'Packages',
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
    category: 'Packages',
    description: 'Comprehensive elite wellness checkup tailored for women including complete thyroid profiling and multi-system diagnostics.',
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
    category: 'Packages',
    description: 'Hormonal and metabolic assessment designed for PCOD/PCOS evaluation.',
    parameters: ['CBC', 'Insulin Fasting', 'LH', 'FSH', 'Testosterone', 'Prolactin', 'TSH']
  }
];

export default function TestsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredTests = useMemo(() => {
    return diagnosticTests.filter((test) => {
      const matchesSearch = 
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.parameters.some(param => param.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            Tests & Diagnostics
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Search and browse our complete catalog of diagnostic tests and health packages. Contact us for preparation instructions and turnaround times.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tests, packages, or parameters (e.g. CBC, Lipid, Diabetes)..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['All', 'Tests', 'Packages', 'Check-Up'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <div 
                key={test.id} 
                className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 flex flex-col justify-between hover:shadow-float transition-shadow"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                      {test.category}
                    </span>
                    <div className="text-right">
                      <span className="text-xl font-bold text-slate-900">₹{test.price}</span>
                      {test.originalPrice && (
                        <span className="block text-xs text-slate-400 line-through">₹{test.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{test.name}</h3>
                  <p className="text-slate-600 text-sm mb-4">{test.description}</p>

                  <div className="border-t border-slate-100 pt-3 mb-4">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                      Includes Parameters:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {test.parameters.map((param, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-md"
                        >
                          {param}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => alert(`Booking inquiry for: ${test.name}`)}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors text-sm shadow-sm"
                >
                  Book Test
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">📭</div>
            <h3 className="text-lg font-semibold text-slate-800">No tests found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your search query or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}