import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wind, 
  Tv, 
  Laptop, 
  Smartphone, 
  Bike, 
  Layers, 
  Microwave, 
  Camera, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  Wrench, 
  Search,
  Scan,
  RefreshCw,
  PhoneCall
} from 'lucide-react';
import { WashingMachineIcon } from '../icons/CustomIcons';
import { 
  CATEGORIES, 
  SYMPTOMS_BY_DEVICE, 
  BRAND_MODELS, 
  SAMPLE_SCAN_IMAGES, 
  SAMPLE_SPARE_PARTS, 
  VERIFIED_TECHNICIANS 
} from '../../data/mockData';
import { SparePart, Technician } from '../../types';

export const DiagnosisFlow: React.FC = () => {
  const { 
    diagnosis, 
    setDiagnosis, 
    runPhotoScan, 
    resetDiagnosis, 
    addToCart, 
    setSelectedProduct, 
    setCurrentView,
    setIsDirectMechanicModalOpen,
    setIsExpertModalOpen,
    setIsBlurryGuideOpen,
    addToast
  } = useApp();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTierPart, setSelectedTierPart] = useState<SparePart | null>(null);
  const [includeInstallation, setIncludeInstallation] = useState(true);
  const [selectedTech, setSelectedTech] = useState<Technician>(VERIFIED_TECHNICIANS[0]);

  const deviceIcons: Record<string, any> = {
    wm: WashingMachineIcon,
    ac: Wind,
    ref: Layers,
    mw: Microwave,
    tv: Tv,
    laptop: Laptop,
    phone: Smartphone,
    scooter: Bike
  };

  // Step 1: Category & Device List
  const allDevices = CATEGORIES.flatMap(c => c.devices);
  const currentDevice = allDevices.find(d => d.id === diagnosis.deviceTypeId) || allDevices[0];

  // Step 2: Available Symptoms
  const availableSymptoms = SYMPTOMS_BY_DEVICE[diagnosis.deviceTypeId || 'wm'] || SYMPTOMS_BY_DEVICE['wm'];

  // Step 3: Brand & Models
  const brandList = BRAND_MODELS[diagnosis.deviceTypeId || 'wm'] || BRAND_MODELS['wm'];
  const currentBrandModels = brandList.find(b => b.brand.toLowerCase() === (diagnosis.brand || '').toLowerCase()) || brandList[0];

  const handleDeviceSelect = (deviceId: string) => {
    const dev = allDevices.find(d => d.id === deviceId);
    setDiagnosis(prev => ({
      ...prev,
      deviceTypeId: deviceId,
      categoryId: dev?.categoryId || 'home',
      symptomId: null,
      brand: null,
      modelId: null
    }));
    setActiveStep(2);
  };

  const handleSymptomSelect = (symptomId: string) => {
    const symptom = availableSymptoms.find(s => s.id === symptomId);
    setDiagnosis(prev => ({
      ...prev,
      symptomId,
      detectedProblem: symptom?.title || '',
      detectedRootCause: symptom?.likelyRootCause || ''
    }));
    setActiveStep(3);
  };

  const handleBrandSelect = (brandName: string) => {
    setDiagnosis(prev => ({
      ...prev,
      brand: brandName
    }));
  };

  const handleModelSelect = (modelId: string, modelNumber: string) => {
    setDiagnosis(prev => ({
      ...prev,
      modelId,
      customModelNumber: modelNumber
    }));
    setActiveStep(4);
  };

  const handleFinishWithoutPhoto = () => {
    // Generate matches based on device and symptom
    const deviceId = diagnosis.deviceTypeId || 'wm';
    const filteredParts = SAMPLE_SPARE_PARTS.filter(p => p.deviceTypeId === deviceId);
    const partsToUse = filteredParts.length > 0 ? filteredParts : SAMPLE_SPARE_PARTS.slice(0, 3);
    const symptom = availableSymptoms.find(s => s.id === diagnosis.symptomId) || availableSymptoms[0];

    setDiagnosis(prev => ({
      ...prev,
      confidenceScore: 92,
      detectedProblem: symptom.title,
      detectedRootCause: symptom.likelyRootCause,
      recommendedParts: partsToUse,
      scanStep: 'COMPLETED'
    }));
    setSelectedTierPart(partsToUse[0]);
    setActiveStep(5);
  };

  const handleProceedToCart = (part: SparePart) => {
    addToCart({
      part,
      technician: includeInstallation ? selectedTech : undefined,
      itemType: includeInstallation ? 'PART_AND_INSTALLATION' : 'PART_ONLY',
      deviceModelName: `${diagnosis.brand || 'Appliance'} (${diagnosis.customModelNumber || 'Model Verified'})`,
      problemSummary: diagnosis.detectedProblem || 'Component Replacement',
      appointmentSlot: 'Today, 2:00 PM - 3:30 PM',
      quantity: 1,
      partPrice: part.price,
      installationPrice: includeInstallation ? part.installationFee : 0
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-carbon-950 text-paper-100">
      <div className="max-w-5xl mx-auto">
        
        {/* Progress & Stepper Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-brand-orange uppercase font-bold tracking-wider">
                Interactive Diagnostic Engine
              </span>
              <span className="text-paper-500">•</span>
              <span className="font-mono text-xs text-paper-400">Step 0{activeStep} of 05</span>
            </div>

            {activeStep > 1 && (
              <button
                onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                className="flex items-center gap-1 text-xs text-paper-400 hover:text-paper-100 font-mono transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}
          </div>

          {/* Stepper Dots */}
          <div className="grid grid-cols-5 gap-2">
            {['Product', 'Problem', 'Brand & Model', 'Optical Scan', 'Solution & Match'].map((stepName, idx) => (
              <div key={idx} className="space-y-1">
                <div className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeStep > idx + 1
                    ? 'bg-trust-emerald'
                    : activeStep === idx + 1
                    ? 'bg-brand-orange'
                    : 'bg-carbon-800'
                }`} />
                <span className="text-[10px] font-mono text-paper-400 hidden sm:block truncate">
                  {stepName}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1: SELECT PRODUCT */}
        {activeStep === 1 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-2">
              <h2 className="font-display font-black text-3xl sm:text-5xl text-paper-50 tracking-tight uppercase">
                WHAT'S <br />
                <span className="text-brand-orange">BROKEN TODAY?</span>
              </h2>
              <p className="text-paper-400 text-sm">
                Select your device category to load the dedicated diagnostic decision tree.
              </p>

              {/* Direct Mechanic Quick Dispatch Banner */}
              <div className="p-4 rounded-2xl bg-paper-50 text-carbon-950 border-2 border-brand-orange shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/20 flex items-center justify-center text-brand-orange flex-shrink-0">
                    <PhoneCall className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-carbon-950">Can't diagnose or don't know what's broken?</h4>
                    <p className="text-xs text-carbon-600">Dispatch a master mechanic directly for doorstep checking & complete on-site fix (₹199 visit fee).</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDirectMechanicModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-display font-black text-xs whitespace-nowrap shadow-sm transition-all"
                >
                  CALL / BOOK MECHANIC DIRECTLY →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {allDevices.map((device) => {
                const IconComponent = deviceIcons[device.id] || Wrench;
                const isSelected = diagnosis.deviceTypeId === device.id;
                return (
                  <button
                    key={device.id}
                    onClick={() => handleDeviceSelect(device.id)}
                    className={`p-5 rounded-2xl border text-left transition-all duration-200 group flex flex-col justify-between h-40 ${
                      isSelected
                        ? 'bg-carbon-900 border-brand-orange shadow-glow-orange'
                        : 'bg-carbon-900/60 border-carbon-800 hover:border-carbon-700 hover:bg-carbon-900'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-carbon-950 border border-carbon-800 flex items-center justify-center text-paper-200 group-hover:text-brand-orange group-hover:border-brand-orange/40 transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-base text-paper-50 group-hover:text-brand-orange transition-colors">
                        {device.name}
                      </h4>
                      <p className="text-[11px] text-paper-400 mt-0.5">
                        Avg Fix: {device.avgRepairTime}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Unknown Problem Escalation CTA */}
            <div className="p-4 rounded-2xl bg-carbon-900 border border-carbon-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-trust-blue/10 border border-trust-blue/30 flex items-center justify-center text-trust-blue flex-shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-paper-50">Don't see your product or symptom?</h5>
                  <p className="text-[11px] text-paper-400">Request a senior diagnostic technician visit directly.</p>
                </div>
              </div>
              <button
                onClick={() => setIsExpertModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-carbon-800 hover:bg-carbon-750 text-paper-100 text-xs font-semibold border border-carbon-700 whitespace-nowrap"
              >
                Request Expert Diagnosis →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DYNAMIC SYMPTOM */}
        {activeStep === 2 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-brand-orange/20 text-brand-orange">
                  {currentDevice.name}
                </span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-paper-50 tracking-tight">
                WHAT SYMPTOM <br />
                <span className="text-brand-orange">ARE YOU SEEING?</span>
              </h2>
              <p className="text-paper-400 text-sm">
                Our diagnostic engine maps this behavior directly to failure-prone components.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableSymptoms.map((symptom) => {
                const isSelected = diagnosis.symptomId === symptom.id;
                return (
                  <button
                    key={symptom.id}
                    onClick={() => handleSymptomSelect(symptom.id)}
                    className={`p-5 rounded-2xl border text-left transition-all duration-200 group relative ${
                      isSelected
                        ? 'bg-carbon-900 border-brand-orange shadow-glow-orange'
                        : 'bg-carbon-900/60 border-carbon-800 hover:border-carbon-700 hover:bg-carbon-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="font-display font-bold text-base text-paper-50 group-hover:text-brand-orange transition-colors">
                        {symptom.title}
                      </h4>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold flex-shrink-0 ${
                        symptom.severity === 'high' ? 'bg-red-950/60 text-red-400 border border-red-800/40' : 'bg-brand-amber/20 text-brand-amber'
                      }`}>
                        {symptom.severity} urgency
                      </span>
                    </div>

                    <p className="text-xs text-paper-400 leading-relaxed mb-3">
                      {symptom.description}
                    </p>

                    <div className="pt-3 border-t border-carbon-800/80 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-paper-300">Est. Part Range:</span>
                      <span className="text-trust-emerald font-bold">{symptom.estimatedPartCost}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: BRAND & MODEL SELECTION */}
        {activeStep === 3 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-2">
              <h2 className="font-display font-black text-3xl sm:text-5xl text-paper-50 tracking-tight">
                SPECIFY BRAND <br />
                <span className="text-brand-orange">& MODEL NUMBER</span>
              </h2>
              <p className="text-paper-400 text-sm">
                Ensures exact OEM tolerance matching down to factory connectors and mounting brackets.
              </p>
            </div>

            {/* Popular Brand Pills */}
            <div className="space-y-3">
              <label className="block text-xs font-mono text-paper-400 uppercase font-semibold">
                Select Brand:
              </label>
              <div className="flex flex-wrap gap-2">
                {brandList.map((b) => (
                  <button
                    key={b.brand}
                    onClick={() => handleBrandSelect(b.brand)}
                    className={`px-4 py-2.5 rounded-xl font-display font-bold text-sm transition-all border ${
                      (diagnosis.brand || brandList[0].brand).toLowerCase() === b.brand.toLowerCase()
                        ? 'bg-brand-orange text-carbon-950 border-brand-orange shadow-glow-orange'
                        : 'bg-carbon-900 border-carbon-800 text-paper-200 hover:bg-carbon-850 hover:border-carbon-700'
                    }`}
                  >
                    {b.brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Model Selector Cards */}
            <div className="space-y-3 pt-4 border-t border-carbon-850">
              <label className="block text-xs font-mono text-paper-400 uppercase font-semibold">
                Select or Search Verified Model:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentBrandModels.models.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleModelSelect(m.id, m.modelNumber)}
                    className="p-4 rounded-xl bg-carbon-900 border border-carbon-800 hover:border-brand-orange/60 text-left transition-all group hover:bg-carbon-850"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-brand-orange group-hover:underline">
                        {m.modelNumber}
                      </span>
                      <span className="font-mono text-[10px] text-paper-400 bg-carbon-950 px-1.5 py-0.5 rounded">
                        {m.year}
                      </span>
                    </div>
                    <p className="text-xs text-paper-200 font-medium">
                      {m.commercialName}
                    </p>
                    <p className="font-mono text-[10px] text-trust-emerald mt-2">
                      ✓ Schematic ID: {m.schematicId}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Entry Fallback */}
            <div className="p-4 rounded-2xl bg-carbon-900 border border-carbon-800 space-y-3">
              <label className="block text-xs font-semibold text-paper-200">
                Can't find exact model? Enter model number from rear sticker:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. WW80J4243MW or 185V-ADS"
                  value={diagnosis.customModelNumber}
                  onChange={(e) => setDiagnosis(prev => ({ ...prev, customModelNumber: e.target.value }))}
                  className="flex-1 bg-carbon-950 border border-carbon-700 rounded-xl px-3.5 py-2.5 text-xs text-paper-50 font-mono focus:outline-none focus:border-brand-orange"
                />
                <button
                  onClick={() => {
                    if (!diagnosis.customModelNumber) {
                      addToast('warning', 'Model Required', 'Please enter a model number or select from the list.');
                      return;
                    }
                    setActiveStep(4);
                  }}
                  className="px-5 py-2.5 bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold text-xs rounded-xl transition-all"
                >
                  CONTINUE
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: OPTICAL SCAN / PHOTO DIAGNOSIS */}
        {activeStep === 4 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-trust-blue/20 text-trust-blue">
                  Computer Vision Diagnostics
                </span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-paper-50 tracking-tight">
                PHOTO SCAN <br />
                <span className="text-brand-orange">& SCHEMATIC MATCH</span>
              </h2>
              <p className="text-paper-400 text-sm">
                Upload a photo of the broken part or machine model sticker for laser-precise verification.
              </p>
            </div>

            {/* Scanning Laser Simulator Viewport */}
            <div className="rounded-3xl bg-carbon-900 border border-carbon-750 p-6 sm:p-8 relative overflow-hidden">
              {diagnosis.isScanning ? (
                /* Active Scanning State */
                <div className="py-12 text-center space-y-6">
                  <div className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden border-2 border-brand-orange bg-carbon-950 flex items-center justify-center">
                    {diagnosis.uploadedPhotoUrl && (
                      <img
                        src={diagnosis.uploadedPhotoUrl}
                        alt="Scanning Part"
                        className="w-full h-full object-cover opacity-60"
                      />
                    )}
                    {/* Laser Sweep Line */}
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent animate-scan-laser shadow-glow-orange"></div>
                    
                    {/* Corner Crosshairs */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-brand-orange"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-brand-orange"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-brand-orange"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-brand-orange"></div>
                  </div>

                  <div className="space-y-2">
                    <span className="font-mono text-xs text-brand-orange font-bold uppercase tracking-widest animate-pulse">
                      {diagnosis.scanStep === 'SCANNING' && '⚡ Scanning Optical Geometry...'}
                      {diagnosis.scanStep === 'IDENTIFYING' && '🔬 Identifying Part SKU & Connectors...'}
                      {diagnosis.scanStep === 'CHECKING_COMPATIBILITY' && '🛡️ Verifying 42,000+ Factory Schematics...'}
                    </span>
                    <h4 className="font-display font-bold text-lg text-paper-50">
                      Cross-Referencing Neural Compatibility Model
                    </h4>
                  </div>
                </div>
              ) : (
                /* Upload or Select Sample State */
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-carbon-700 hover:border-brand-orange/60 rounded-2xl p-8 text-center bg-carbon-950/60 transition-colors">
                    <Camera className="w-10 h-10 text-brand-orange mx-auto mb-3" />
                    <h4 className="font-display font-bold text-base text-paper-50 mb-1">
                      Snap or Upload Photo of Broken Part
                    </h4>
                    <p className="text-xs text-paper-400 max-w-sm mx-auto mb-4">
                      Include any labels, wires, or cracked housing for instant AI classification.
                    </p>

                    <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-carbon-800 hover:bg-carbon-750 text-paper-100 text-xs font-semibold border border-carbon-700 cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Choose File from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = URL.createObjectURL(e.target.files[0]);
                            runPhotoScan(url, true);
                          }
                        }}
                      />
                    </label>
                  </div>

                  {/* Sample Test Photos for Easy Evaluation */}
                  <div className="space-y-3">
                    <p className="text-xs font-mono text-paper-400 uppercase font-semibold">
                      Or Test with Sample Diagnostic Photos:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {SAMPLE_SCAN_IMAGES.map((sample) => (
                        <button
                          key={sample.id}
                          onClick={() => runPhotoScan(sample.imageUrl)}
                          className="p-2.5 rounded-xl bg-carbon-950 hover:bg-carbon-850 border border-carbon-800 hover:border-brand-orange/60 text-left transition-all group flex items-center gap-3"
                        >
                          <img
                            src={sample.imageUrl}
                            alt={sample.title}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-paper-100 truncate group-hover:text-brand-orange">
                              {sample.title}
                            </p>
                            <span className="font-mono text-[10px] text-trust-emerald">
                              {sample.confidence}% accuracy
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Skip to results button */}
                  <div className="pt-4 border-t border-carbon-800 flex items-center justify-between">
                    <span className="text-xs text-paper-400">
                      No photo right now? You can still proceed with guided symptom match.
                    </span>
                    <button
                      onClick={handleFinishWithoutPhoto}
                      className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-bold text-xs transition-all"
                    >
                      VIEW MATCHED PARTS →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 5: DIAGNOSIS RESULT & TRIPLE-TIER MATCH */}
        {activeStep === 5 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Root Cause Capsule */}
            <div className="rounded-3xl bg-gradient-to-r from-carbon-900 via-carbon-850 to-carbon-900 border border-brand-orange/60 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/20 border border-brand-orange flex items-center justify-center text-brand-orange">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-brand-orange uppercase font-bold tracking-wider">
                        AI DIAGNOSIS RESULT
                      </span>
                      <span className="px-2 py-0.5 rounded bg-trust-emerald/20 text-trust-emerald font-mono font-bold text-[11px] border border-trust-emerald/30">
                        {diagnosis.confidenceScore || 92}% CONFIDENCE
                      </span>
                    </div>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-paper-50 tracking-tight mt-0.5">
                      {diagnosis.detectedRootCause || 'Drain Pump Impeller Seizure'}
                    </h3>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="font-mono text-xs text-paper-400 block">Verified For:</span>
                  <span className="font-mono font-bold text-sm text-paper-100">
                    {diagnosis.brand || 'Samsung'} {diagnosis.customModelNumber || 'WW80J'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-paper-300 leading-relaxed max-w-2xl">
                The mechanical motor winding or impeller seal has seized, causing the drain cycle to fail and trigger error codes. Replacing this sub-assembly restores full operation without needing a new appliance.
              </p>
            </div>

            {/* Triple Tier Selection Matrix: OEM vs Certified vs Economy */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-black text-2xl text-paper-50">
                    CHOOSE YOUR VERIFIED PART TIER
                  </h4>
                  <p className="text-xs text-paper-400">
                    All tiers include batch serialization, genuine seal, and FixKart compatibility protection.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(diagnosis.recommendedParts.length > 0 ? diagnosis.recommendedParts : SAMPLE_SPARE_PARTS.slice(0, 3)).map((part) => {
                  const isSelected = selectedTierPart?.id === part.id || (!selectedTierPart && part.tier === 'OEM');
                  return (
                    <div
                      key={part.id}
                      onClick={() => setSelectedTierPart(part)}
                      className={`rounded-3xl p-6 border transition-all duration-300 cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-carbon-900 border-brand-orange shadow-glow-orange ring-1 ring-brand-orange'
                          : 'bg-carbon-900/60 border-carbon-800 hover:border-carbon-700 hover:bg-carbon-900'
                      }`}
                    >
                      {/* Top Tier Ribbon */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full font-mono text-xs font-black uppercase ${
                          part.tier === 'OEM' ? 'bg-brand-orange text-carbon-950 shadow-glow-orange' :
                          part.tier === 'CERTIFIED' ? 'bg-trust-blue text-white' : 'bg-carbon-800 text-paper-300'
                        }`}>
                          {part.tier === 'OEM' ? '★ OEM GENUINE' : part.tier === 'CERTIFIED' ? '✓ CERTIFIED PRO' : 'VALUE ECONOMY'}
                        </span>
                        <span className="font-mono text-xs font-bold text-trust-emerald">
                          {part.compatibilityScore}% Match
                        </span>
                      </div>

                      {/* Part Image & Spec Overview */}
                      <div className="space-y-3 mb-6">
                        <div className="h-32 rounded-2xl overflow-hidden bg-carbon-950 border border-carbon-800 relative">
                          <img
                            src={part.image}
                            alt={part.name}
                            className="w-full h-full object-cover opacity-85"
                          />
                          <span className="absolute bottom-2 left-2 font-mono text-[9px] bg-carbon-950/90 px-2 py-0.5 rounded text-paper-300">
                            {part.batchNumber.split('-')[0]}-{part.batchNumber.split('-')[1]}
                          </span>
                        </div>

                        <h5 className="font-display font-bold text-sm text-paper-50 leading-snug line-clamp-2">
                          {part.name}
                        </h5>

                        <div className="flex items-baseline gap-2">
                          <span className="font-mono font-black text-2xl text-paper-50">
                            ₹{part.price}
                          </span>
                          <span className="font-mono text-xs text-paper-500 line-through">
                            ₹{part.originalPrice}
                          </span>
                        </div>

                        <div className="space-y-1.5 text-xs text-paper-300 pt-2 border-t border-carbon-800">
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-trust-emerald" />
                            <span>{part.warrantyDays}-Day Direct Warranty</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-trust-blue" />
                            <span className="truncate">{part.supplier.name.split('(')[0]}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tier Select Action */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTierPart(part);
                          handleProceedToCart(part);
                        }}
                        className={`w-full py-3 rounded-xl font-display font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-brand-orange hover:bg-brand-amber text-carbon-950 shadow-glow-orange'
                            : 'bg-carbon-800 hover:bg-carbon-750 text-paper-200'
                        }`}
                      >
                        <span>SELECT {part.tier} PART</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Technician Installation Add-on Bundle Bar */}
            <div className="p-6 rounded-3xl bg-carbon-900 border border-carbon-750 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedTech.photo}
                    alt={selectedTech.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-trust-emerald"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-base text-paper-50">{selectedTech.name}</span>
                      <span className="px-2 py-0.5 rounded-full bg-trust-emerald/20 text-trust-emerald font-mono font-bold text-xs">
                        {selectedTech.rating}★ ({selectedTech.repairsCompleted}+ repairs)
                      </span>
                    </div>
                    <p className="text-xs text-paper-400">
                      {selectedTech.distanceKm} km away • First-Time-Fix: <strong className="text-trust-emerald">{selectedTech.firstTimeFixRate}%</strong>
                    </p>
                  </div>
                </div>

                {/* Installation Toggle checkbox */}
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-2xl bg-carbon-950 border border-carbon-800 hover:border-brand-orange/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={includeInstallation}
                    onChange={(e) => setIncludeInstallation(e.target.checked)}
                    className="w-5 h-5 accent-brand-orange rounded cursor-pointer"
                  />
                  <div className="text-right">
                    <span className="text-xs font-bold text-paper-100 block">Include Doorstep Installation</span>
                    <span className="font-mono text-xs text-brand-orange font-bold">+₹349 Labor</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Final Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-carbon-850">
              <button
                onClick={() => {
                  const part = selectedTierPart || (diagnosis.recommendedParts[0] || SAMPLE_SPARE_PARTS[0]);
                  handleProceedToCart(part);
                }}
                className="flex-1 py-4 px-6 rounded-2xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-display font-black text-base transition-all shadow-glow-orange flex items-center justify-center gap-2"
              >
                <span>ADD TO CART & SCHEDULE FIX →</span>
              </button>

              <button
                onClick={resetDiagnosis}
                className="px-6 py-4 rounded-2xl bg-carbon-850 hover:bg-carbon-800 text-paper-300 font-semibold text-xs transition-colors border border-carbon-700"
              >
                Start New Diagnosis
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
