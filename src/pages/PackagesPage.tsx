import { useState, useEffect } from 'react';
import { PackageCard } from '@/components/PackageCard';
import type { Package } from '@/types';
import { Loader2 } from 'lucide-react';

export function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fully compliant with the database Package type interface
    const staticPackages: Package[] = [
      {
        id: 'test-1',
        name: 'Test 1 - Basic Blood Check',
        slug: 'test-1-basic-blood-check',
        category: 'promotional',
        gender: 'any',
        description: 'Essential hematology screening including Complete Blood Count and ESR.',
        short_description: 'Basic blood check with CBC and ESR.',
        original_price: 200,
        offer_price: 99,
        currency: '₹',
        is_featured: false,
        is_active: true,
        display_order: 1,
        image_url: null,
        preparation_instructions: null,
        turnaround_time: '24 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 't1-1', package_id: 'test-1', test_name: 'Complete Blood Count (CBC) full parameters', test_group: 'Hematology', display_order: 1, created_at: new Date().toISOString() },
          { id: 't1-2', package_id: 'test-1', test_name: 'ESR', test_group: 'Hematology', display_order: 2, created_at: new Date().toISOString() }
        ]
      },
      {
        id: 'test-2',
        name: 'Test 2 - Renal & Sugar Screen',
        slug: 'test-2-renal-sugar-screen',
        category: 'promotional',
        gender: 'any',
        description: 'Focused screening for blood glucose, renal function parameters, and electrolytes.',
        short_description: 'Renal & sugar screening profile.',
        original_price: 600,
        offer_price: 299,
        currency: '₹',
        is_featured: false,
        is_active: true,
        display_order: 2,
        image_url: null,
        preparation_instructions: null,
        turnaround_time: '24 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 't2-1', package_id: 'test-2', test_name: 'FBS', test_group: 'Biochemistry', display_order: 1, created_at: new Date().toISOString() },
          { id: 't2-2', package_id: 'test-2', test_name: 'EGFR', test_group: 'Renal', display_order: 2, created_at: new Date().toISOString() },
          { id: 't2-3', package_id: 'test-2', test_name: 'RFT (FULL PARAMETERS)', test_group: 'Renal', display_order: 3, created_at: new Date().toISOString() },
          { id: 't2-4', package_id: 'test-2', test_name: 'UR/E (FULL PARAMETERS)', test_group: 'Renal', display_order: 4, created_at: new Date().toISOString() }
        ]
      },
      {
        id: 'test-3',
        name: 'Test 3 - Iron Deficiency Profile',
        slug: 'test-3-iron-deficiency-profile',
        category: 'promotional',
        gender: 'any',
        description: 'Complete iron profile analysis combined with hematology parameters.',
        short_description: 'Iron deficiency and hematology panel.',
        original_price: 1200,
        offer_price: 599,
        currency: '₹',
        is_featured: false,
        is_active: true,
        display_order: 3,
        image_url: null,
        preparation_instructions: null,
        turnaround_time: '24 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 't3-1', package_id: 'test-3', test_name: 'IRON', test_group: 'Biochemistry', display_order: 1, created_at: new Date().toISOString() },
          { id: 't3-2', package_id: 'test-3', test_name: 'TIBC', test_group: 'Biochemistry', display_order: 2, created_at: new Date().toISOString() },
          { id: 't3-3', package_id: 'test-3', test_name: 'FERRITIN', test_group: 'Biochemistry', display_order: 3, created_at: new Date().toISOString() },
          { id: 't3-4', package_id: 'test-3', test_name: 'CBC (Full parameters)', test_group: 'Hematology', display_order: 4, created_at: new Date().toISOString() },
          { id: 't3-5', package_id: 'test-3', test_name: 'ESR', test_group: 'Hematology', display_order: 5, created_at: new Date().toISOString() }
        ]
      },
      {
        id: 'test-4',
        name: 'Test 4 - Diabetic & Lipid Panel',
        slug: 'test-4-diabetic-lipid-panel',
        category: 'promotional',
        gender: 'any',
        description: 'Advanced screening covering diabetes monitoring, lipid profile, and renal markers.',
        short_description: 'Diabetic and lipid panel screening.',
        original_price: 1599,
        offer_price: 799,
        currency: '₹',
        is_featured: false,
        is_active: true,
        display_order: 4,
        image_url: null,
        preparation_instructions: null,
        turnaround_time: '24 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 't4-1', package_id: 'test-4', test_name: 'FBS', test_group: 'Diabetes', display_order: 1, created_at: new Date().toISOString() },
          { id: 't4-2', package_id: 'test-4', test_name: 'HBA1C', test_group: 'Diabetes', display_order: 2, created_at: new Date().toISOString() },
          { id: 't4-3', package_id: 'test-4', test_name: 'CBC (Full parameters)', test_group: 'Hematology', display_order: 3, created_at: new Date().toISOString() },
          { id: 't4-4', package_id: 'test-4', test_name: 'ESR', test_group: 'Hematology', display_order: 4, created_at: new Date().toISOString() },
          { id: 't4-5', package_id: 'test-4', test_name: 'RFT (Full parameters)', test_group: 'Renal', display_order: 5, created_at: new Date().toISOString() },
          { id: 't4-6', package_id: 'test-4', test_name: 'UR/E (Full parameters)', test_group: 'Renal', display_order: 6, created_at: new Date().toISOString() },
          { id: 't4-7', package_id: 'test-4', test_name: 'Lipid (Full parameters)', test_group: 'Lipid', display_order: 7, created_at: new Date().toISOString() }
        ]
      },
      {
        id: 'test-5',
        name: 'Test 5 - Advanced Metabolic Screen',
        slug: 'test-5-advanced-metabolic-screen',
        category: 'promotional',
        gender: 'any',
        description: 'Detailed analysis focusing on blood sugar, microalbumin, kidney function, and lipids.',
        short_description: 'Advanced metabolic screen.',
        original_price: 1799,
        offer_price: 899,
        currency: '₹',
        is_featured: false,
        is_active: true,
        display_order: 5,
        image_url: null,
        preparation_instructions: null,
        turnaround_time: '24 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 't5-1', package_id: 'test-5', test_name: 'FBS', test_group: 'Diabetes', display_order: 1, created_at: new Date().toISOString() },
          { id: 't5-2', package_id: 'test-5', test_name: 'EGFR', test_group: 'Renal', display_order: 2, created_at: new Date().toISOString() },
          { id: 't5-3', package_id: 'test-5', test_name: 'HBA1C', test_group: 'Diabetes', display_order: 3, created_at: new Date().toISOString() },
          { id: 't5-4', package_id: 'test-5', test_name: 'MICROALBUMIN', test_group: 'Renal', display_order: 4, created_at: new Date().toISOString() },
          { id: 't5-5', package_id: 'test-5', test_name: 'CREATININE', test_group: 'Renal', display_order: 5, created_at: new Date().toISOString() },
          { id: 't5-6', package_id: 'test-5', test_name: 'CBC (Full parameters)', test_group: 'Hematology', display_order: 6, created_at: new Date().toISOString() },
          { id: 't5-7', package_id: 'test-5', test_name: 'lipid (Full parameters)', test_group: 'Lipid', display_order: 7, created_at: new Date().toISOString() }
        ]
      },
      {
        id: 'test-6',
        name: 'Test 6 - Cardiac & Pancreatic Enzymes',
        slug: 'test-6-cardiac-pancreatic-enzymes',
        category: 'promotional',
        gender: 'any',
        description: 'Specialized cardiac, inflammatory, and pancreatic enzyme evaluations.',
        short_description: 'Cardiac and pancreatic enzyme panel.',
        original_price: 2999,
        offer_price: 1499,
        currency: '₹',
        is_featured: false,
        is_active: true,
        display_order: 6,
        image_url: null,
        preparation_instructions: null,
        turnaround_time: '24 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 't6-1', package_id: 'test-6', test_name: 'HSCRP', test_group: 'Cardiac', display_order: 1, created_at: new Date().toISOString() },
          { id: 't6-2', package_id: 'test-6', test_name: 'LIPASE', test_group: 'Pancreatic', display_order: 2, created_at: new Date().toISOString() },
          { id: 't6-3', package_id: 'test-6', test_name: 'AMYLASE', test_group: 'Pancreatic', display_order: 3, created_at: new Date().toISOString() },
          { id: 't6-4', package_id: 'test-6', test_name: 'LDH', test_group: 'Biochemistry', display_order: 4, created_at: new Date().toISOString() },
          { id: 't6-5', package_id: 'test-6', test_name: 'CBC (Full parameters)', test_group: 'Hematology', display_order: 5, created_at: new Date().toISOString() },
          { id: 't6-6', package_id: 'test-6', test_name: 'ESR', test_group: 'Hematology', display_order: 6, created_at: new Date().toISOString() }
        ]
      },
      {
        id: 'test-7',
        name: 'Test 7 - Comprehensive Organ Panel',
        slug: 'test-7-comprehensive-organ-panel',
        category: 'promotional',
        gender: 'any',
        description: 'In-depth diagnostic check covering liver, kidney, inflammatory markers, and lipid profiles.',
        short_description: 'Comprehensive organ panel.',
        original_price: 3999,
        offer_price: 1999,
        currency: '₹',
        is_featured: false,
        is_active: true,
        display_order: 7,
        image_url: null,
        preparation_instructions: null,
        turnaround_time: '24 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 't7-1', package_id: 'test-7', test_name: 'CRP', test_group: 'Inflammatory', display_order: 1, created_at: new Date().toISOString() },
          { id: 't7-2', package_id: 'test-7', test_name: 'ASO', test_group: 'Inflammatory', display_order: 2, created_at: new Date().toISOString() },
          { id: 't7-3', package_id: 'test-7', test_name: 'RA', test_group: 'Inflammatory', display_order: 3, created_at: new Date().toISOString() },
          { id: 't7-4', package_id: 'test-7', test_name: 'CALCIUM', test_group: 'Biochemistry', display_order: 4, created_at: new Date().toISOString() },
          { id: 't7-5', package_id: 'test-7', test_name: 'CBC (Full parameters)', test_group: 'Hematology', display_order: 5, created_at: new Date().toISOString() },
          { id: 't7-6', package_id: 'test-7', test_name: 'RFT (Full parameters)', test_group: 'Renal', display_order: 6, created_at: new Date().toISOString() },
          { id: 't7-7', package_id: 'test-7', test_name: 'UR/E (Full parameters)', test_group: 'Renal', display_order: 7, created_at: new Date().toISOString() },
          { id: 't7-8', package_id: 'test-7', test_name: 'LIPID (Full parameters)', test_group: 'Lipid', display_order: 8, created_at: new Date().toISOString() },
          { id: 't7-9', package_id: 'test-7', test_name: 'LFT (Full parameters)', test_group: 'Liver', display_order: 9, created_at: new Date().toISOString() }
        ]
      },
      {
        id: 'test-8',
        name: 'Test 8 - Comprehensive Panel',
        slug: 'test-8-comprehensive-panel',
        category: 'promotional',
        gender: 'any',
        description: 'Extensive multi-system check including thyroid, diabetic, renal, and full lipid assessments.',
        short_description: 'Extensive multi-system diagnostic check.',
        original_price: 4999,
        offer_price: 2499,
        currency: '₹',
        is_featured: true,
        is_active: true,
        display_order: 8,
        image_url: null,
        preparation_instructions: null,
        turnaround_time: '24 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 't8-1', package_id: 'test-8', test_name: 'FBS', test_group: 'Diabetes', display_order: 1, created_at: new Date().toISOString() },
          { id: 't8-2', package_id: 'test-8', test_name: 'HBA1C', test_group: 'Diabetes', display_order: 2, created_at: new Date().toISOString() },
          { id: 't8-3', package_id: 'test-8', test_name: 'MICROALBUMIN', test_group: 'Renal', display_order: 3, created_at: new Date().toISOString() },
          { id: 't8-4', package_id: 'test-8', test_name: 'TSH', test_group: 'Thyroid', display_order: 4, created_at: new Date().toISOString() },
          { id: 't8-5', package_id: 'test-8', test_name: 'ANTI TPO', test_group: 'Thyroid', display_order: 5, created_at: new Date().toISOString() },
          { id: 't8-6', package_id: 'test-8', test_name: 'CALCIUM', test_group: 'Biochemistry', display_order: 6, created_at: new Date().toISOString() },
          { id: 't8-7', package_id: 'test-8', test_name: 'ELECTROLYTES', test_group: 'Biochemistry', display_order: 7, created_at: new Date().toISOString() },
          { id: 't8-8', package_id: 'test-8', test_name: 'CBC (Full parameters)', test_group: 'Hematology', display_order: 8, created_at: new Date().toISOString() },
          { id: 't8-9', package_id: 'test-8', test_name: 'RFT (Full parameters)', test_group: 'Renal', display_order: 9, created_at: new Date().toISOString() },
          { id: 't8-10', package_id: 'test-8', test_name: 'LIPID PROFILE (Full parameters)', test_group: 'Lipid', display_order: 10, created_at: new Date().toISOString() }
        ]
      },
      {
        id: 'test-9',
        name: 'Test 9 - Advanced Health Screening',
        slug: 'test-9-advanced-health-screening',
        category: 'promotional',
        gender: 'any',
        description: 'High-end specialized panel covering comprehensive biochemistry, thyroid, and cardiac parameters.',
        short_description: 'Advanced specialized screening.',
        original_price: 5999,
        offer_price: 2999,
        currency: '₹',
        is_featured: true,
        is_active: true,
        display_order: 9,
        image_url: null,
        preparation_instructions: null,
        turnaround_time: '24 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 't9-1', package_id: 'test-9', test_name: 'EGFR', test_group: 'Renal', display_order: 1, created_at: new Date().toISOString() },
          { id: 't9-2', package_id: 'test-9', test_name: 'HBA1C', test_group: 'Diabetes', display_order: 2, created_at: new Date().toISOString() },
          { id: 't9-3', package_id: 'test-9', test_name: 'GGT', test_group: 'Liver', display_order: 3, created_at: new Date().toISOString() },
          { id: 't9-4', package_id: 'test-9', test_name: 'TSH', test_group: 'Thyroid', display_order: 4, created_at: new Date().toISOString() },
          { id: 't9-5', package_id: 'test-9', test_name: 'T3', test_group: 'Thyroid', display_order: 5, created_at: new Date().toISOString() },
          { id: 't9-6', package_id: 'test-9', test_name: 'T4', test_group: 'Thyroid', display_order: 6, created_at: new Date().toISOString() }
        ]
      },
      {
        id: 'complete-body-checkup',
        name: 'Complete Body Check-Up',
        slug: 'complete-body-check-up',
        category: 'complete_body',
        gender: 'any',
        description: 'Our most popular comprehensive package including 75+ parameters covering blood sugar, lipids, LFT, KFT, urine analysis, vitamins, and complete blood count.',
        short_description: '75+ Parameters complete health evaluation.',
        original_price: 4999,
        offer_price: 999,
        currency: '₹',
        is_featured: true,
        is_active: true,
        display_order: 10,
        image_url: null,
        preparation_instructions: '10-12 hours fasting required.',
        turnaround_time: '24-48 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 'cb-1', package_id: 'complete-body-checkup', test_name: 'FASTING BLOOD SUGAR (FBS)', test_group: 'Diabetes', display_order: 1, created_at: new Date().toISOString() },
          { id: 'cb-2', package_id: 'complete-body-checkup', test_name: 'LIPID PROFILE', test_group: 'Lipid', display_order: 2, created_at: new Date().toISOString() },
          { id: 'cb-3', package_id: 'complete-body-checkup', test_name: 'LIVER FUNCTION TEST', test_group: 'Liver', display_order: 3, created_at: new Date().toISOString() },
          { id: 'cb-4', package_id: 'complete-body-checkup', test_name: 'KIDNEY FUNCTION TESTS', test_group: 'Renal', display_order: 4, created_at: new Date().toISOString() },
          { id: 'cb-5', package_id: 'complete-body-checkup', test_name: 'URINE COMPLETE ANALYSIS', test_group: 'Urine', display_order: 5, created_at: new Date().toISOString() },
          { id: 'cb-6', package_id: 'complete-body-checkup', test_name: 'IRON & VITAMIN B12', test_group: 'Vitamins', display_order: 6, created_at: new Date().toISOString() },
          { id: 'cb-7', package_id: 'complete-body-checkup', test_name: 'THYROID PROFILE (Free T3, Free T4, TSH)', test_group: 'Thyroid', display_order: 7, created_at: new Date().toISOString() }
        ]
      },
      {
        id: 'basic-health-package',
        name: 'Basic Health Package',
        slug: 'basic-health-package',
        category: 'basic',
        gender: 'any',
        description: 'Essential wellness screening package for routine health monitoring.',
        short_description: 'Essential routine health package.',
        original_price: 1150,
        offer_price: 599,
        currency: '₹',
        is_featured: false,
        is_active: true,
        display_order: 11,
        image_url: null,
        preparation_instructions: null,
        turnaround_time: '24 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 'bh-1', package_id: 'basic-health-package', test_name: 'FBS', test_group: 'Diabetes', display_order: 1, created_at: new Date().toISOString() },
          { id: 'bh-2', package_id: 'basic-health-package', test_name: 'LIPID', test_group: 'Lipid', display_order: 2, created_at: new Date().toISOString() },
          { id: 'bh-3', package_id: 'basic-health-package', test_name: 'LFT', test_group: 'Liver', display_order: 3, created_at: new Date().toISOString() },
          { id: 'bh-4', package_id: 'basic-health-package', test_name: 'CBC', test_group: 'Hematology', display_order: 4, created_at: new Date().toISOString() },
          { id: 'bh-5', package_id: 'basic-health-package', test_name: 'URINE ROUTINE', test_group: 'Urine', display_order: 5, created_at: new Date().toISOString() }
        ]
      },
      {
        id: 'primary-male-40',
        name: 'Primary Health Package (Above 40 Years - Male)',
        slug: 'primary-health-package-above-40-male',
        category: 'primary',
        gender: 'male',
        description: 'Tailored health checkup for men above 40 years focusing on prostate, cardiac, and metabolic health.',
        short_description: 'Health screening for men above 40.',
        original_price: 2530,
        offer_price: 799,
        currency: '₹',
        is_featured: false,
        is_active: true,
        display_order: 12,
        image_url: null,
        preparation_instructions: null,
        turnaround_time: '24 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 'pm40-1', package_id: 'primary-male-40', test_name: 'PSA', test_group: 'Tumor Marker', display_order: 1, created_at: new Date().toISOString() },
          { id: 'pm40-2', package_id: 'primary-male-40', test_name: 'LIPID PROFILE', test_group: 'Lipid', display_order: 2, created_at: new Date().toISOString() }
        ]
      },
      {
        id: 'primary-female-40',
        name: 'Primary Health Package (Above 40 Years - Female)',
        slug: 'primary-health-package-above-40-female',
        category: 'primary',
        gender: 'female',
        description: 'Targeted screening package for women above 40 years including thyroid and metabolic parameters.',
        short_description: 'Health screening for women above 40.',
        original_price: 2550,
        offer_price: 799,
        currency: '₹',
        is_featured: false,
        is_active: true,
        display_order: 13,
        image_url: null,
        preparation_instructions: null,
        turnaround_time: '24 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 'pf40-1', package_id: 'primary-female-40', test_name: 'TFT', test_group: 'Thyroid', display_order: 1, created_at: new Date().toISOString() },
          { id: 'pf40-2', package_id: 'primary-female-40', test_name: 'CBC', test_group: 'Hematology', display_order: 2, created_at: new Date().toISOString() }
        ]
      },
      {
        id: 'master-male',
        name: 'Master Health Package (Male)',
        slug: 'master-health-package-male',
        category: 'master',
        gender: 'male',
        description: 'Comprehensive preventive health checkup package for males including vitamins and tumor markers.',
        short_description: 'Master health package for men.',
        original_price: 4330,
        offer_price: 1499,
        currency: '₹',
        is_featured: true,
        is_active: true,
        display_order: 14,
        image_url: null,
        preparation_instructions: null,
        turnaround_time: '24-48 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 'mm-1', package_id: 'master-male', test_name: 'PSA', test_group: 'Tumor Marker', display_order: 1, created_at: new Date().toISOString() },
          { id: 'mm-2', package_id: 'master-male', test_name: 'VITAMIN D', test_group: 'Vitamins', display_order: 2, created_at: new Date().toISOString() }
        ]
      },
      {
        id: 'master-female',
        name: 'Master Health Package (Female)',
        slug: 'master-health-package-female',
        category: 'master',
        gender: 'female',
        description: 'Comprehensive preventive health checkup package for females including thyroid and vitamin evaluations.',
        short_description: 'Master health package for women.',
        original_price: 4330,
        offer_price: 1499,
        currency: '₹',
        is_featured: true,
        is_active: true,
        display_order: 15,
        image_url: null,
        preparation_instructions: null,
        turnaround_time: '24-48 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 'mf-1', package_id: 'master-female', test_name: 'TFT', test_group: 'Thyroid', display_order: 1, created_at: new Date().toISOString() },
          { id: 'mf-2', package_id: 'master-female', test_name: 'VITAMIN D', test_group: 'Vitamins', display_order: 2, created_at: new Date().toISOString() }
        ]
      },
      {
        id: 'pcod-profile',
        name: 'PCOD Profile Test',
        slug: 'pcod-profile-test',
        category: 'pcod',
        gender: 'female',
        description: 'Specialized hormonal and metabolic profile panel for PCOD/PCOS evaluation.',
        short_description: 'Hormonal panel for PCOD evaluation.',
        original_price: 3000,
        offer_price: 1999,
        currency: '₹',
        is_featured: false,
        is_active: true,
        display_order: 16,
        image_url: null,
        preparation_instructions: null,
        turnaround_time: '24 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 'pcod-1', package_id: 'pcod-profile', test_name: 'INSULIN FASTING', test_group: 'Hormone', display_order: 1, created_at: new Date().toISOString() },
          { id: 'pcod-2', package_id: 'pcod-profile', test_name: 'TESTOSTERONE', test_group: 'Hormone', display_order: 2, created_at: new Date().toISOString() }
        ]
      },
      {
        id: 'executive-male',
        name: 'Executive Health Package (Male)',
        slug: 'executive-health-package-male',
        category: 'executive',
        gender: 'male',
        description: 'The ultimate executive-tier screening covering full clinical panels, cardiac markers, infection screenings, and vitamins.',
        short_description: 'Ultimate executive screening for men.',
        original_price: 11000,
        offer_price: 5999,
        currency: '₹',
        is_featured: true,
        is_active: true,
        display_order: 17,
        image_url: null,
        preparation_instructions: '10-12 hours fasting required.',
        turnaround_time: '24-48 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 'em-1', package_id: 'executive-male', test_name: 'PSA', test_group: 'Tumor Marker', display_order: 1, created_at: new Date().toISOString() },
          { id: 'em-2', package_id: 'executive-male', test_name: 'VITAMIN-D', test_group: 'Vitamins', display_order: 2, created_at: new Date().toISOString() }
        ]
      },
      {
        id: 'executive-female',
        name: 'Executive Health Package (Female)',
        slug: 'executive-health-package-female',
        category: 'executive',
        gender: 'female',
        description: 'Comprehensive executive-tier diagnostic package covering full organ systems, thyroid profile, vitamins, and cardiac markers.',
        short_description: 'Ultimate executive screening for women.',
        original_price: 11000,
        offer_price: 5999,
        currency: '₹',
        is_featured: true,
        is_active: true,
        display_order: 18,
        image_url: null,
        preparation_instructions: '10-12 hours fasting required.',
        turnaround_time: '24-48 Hours',
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        package_tests: [
          { id: 'ef-1', package_id: 'executive-female', test_name: 'THYROID PROFILE TEST (T3, T4, TSH)', test_group: 'Thyroid', display_order: 1, created_at: new Date().toISOString() },
          { id: 'ef-2', package_id: 'executive-female', test_name: 'VITAMIN-D', test_group: 'Vitamins', display_order: 2, created_at: new Date().toISOString() }
        ]
      }
    ];

    setPackages(staticPackages);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#FBFBFA]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 md:py-28 text-white relative overflow-hidden border-b border-amber-500/20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block rounded-md bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-400 uppercase tracking-widest border border-amber-500/20 mb-4">
            Wellness Screenings
          </span>
          <h1 className="text-balance text-4xl font-serif font-bold md:text-5xl lg:text-6xl tracking-tight">
            Health Checkup Packages
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-slate-300 text-base md:text-lg leading-relaxed font-normal">
            Choose from our comprehensive, value-driven diagnostic packages tailored for your well-being.
          </p>
        </div>
      </section>

      {/* Package Cards Grid Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {packages.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <PackageCard 
                  key={pkg.id} 
                  pkg={pkg} 
                  featured={pkg.is_featured} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-3xl border border-slate-200/80 bg-white shadow-sm max-w-xl mx-auto">
              <h3 className="text-xl font-serif font-bold text-slate-900">No Packages Available</h3>
              <p className="mt-2 text-sm text-slate-600">Please check back later for updated health checkup offers.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}