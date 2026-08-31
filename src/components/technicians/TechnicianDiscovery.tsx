import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wrench, 
  Star, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Award, 
  Zap,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { Technician } from '../../types';
import { VERIFIED_TECHNICIANS } from '../../data/mockData';

export const TechnicianDiscovery: React.FC = () => {
  const { 
    technicians, 
    selectedTechnician, 
    setSelectedTechnician, 
    addToCart, 
    pinCode, 
    pinData, 
    setIsPinModalOpen, 
    addToast 
  } = useApp();

  const [sortBy, setSortBy] = useState<'recommended' | 'distance' | 'rating' | 'eta'>('recommended');
  const [selectedSlot, setSelectedSlot] = useState<string>('Express (Within 45 mins)');

  const timeSlots = [
    'Express (Within 45 mins)',
    'Today, 2:00 PM - 3:30 PM',
    'Today, 5:00 PM - 6:30 PM',
    'Tomorrow, 10:00 AM - 11:30 AM'
  ];

  const sortedTechs = [...technicians].sort((a, b) => {
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'eta') return a.estimatedArrivalMin - b.estimatedArrivalMin;
    return b.firstTimeFixRate - a.firstTimeFixRate;
  });

  const handleBookTech = (tech: Technician) => {
    setSelectedTechnician(tech);
    addToCart({
      technician: tech,
      itemType: 'INSTALLATION_ONLY',
      deviceModelName: 'Doorstep Master Diagnostic Visit',
      problemSummary: 'Full Diagnostic & Installation Inspection',
      appointmentSlot: selectedSlot,
      quantity: 1,
      partPrice: 0,
      installationPrice: tech.baseLaborFee
    });
    addToast('success', 'Technician Selected', `${tech.name} scheduled for ${selectedSlot}.`);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-carbon-950 text-paper-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-r from-carbon-900 via-carbon-850 to-carbon-900 border border-carbon-750 p-8 sm:p-10 relative overflow-hidden">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs text-brand-orange uppercase font-bold tracking-widest block">
              VERIFIED FIELD SPECIALISTS
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-paper-50 tracking-tight leading-tight">
              MASTER TECHNICIANS <br />
              <span className="text-stroke-white">READY IN YOUR NEIGHBORHOOD</span>
            </h1>
            <p className="text-paper-400 text-sm leading-relaxed">
              Top 1% vetted technicians with specialized manufacturer certifications, equipped with genuine parts and calibrated diagnostic toolsets.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setIsPinModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-carbon-800 hover:bg-carbon-750 border border-carbon-700 text-paper-200 text-xs font-mono flex items-center gap-2 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-orange" />
              <span>Location: {pinData?.city || 'Bengaluru'} ({pinCode}) • Change PIN</span>
            </button>
          </div>
        </div>

        {/* Toolbar: Slots & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-carbon-900 border border-carbon-800">
          {/* Time slot picker */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <Calendar className="w-4 h-4 text-brand-orange flex-shrink-0" />
            <span className="text-xs font-mono text-paper-400 font-semibold uppercase mr-1">Slot:</span>
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedSlot === slot
                    ? 'bg-brand-orange text-carbon-950 font-bold shadow-glow-orange'
                    : 'bg-carbon-950 text-paper-300 hover:bg-carbon-800'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs font-mono text-paper-400 font-semibold uppercase">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-carbon-950 border border-carbon-700 rounded-xl px-3 py-1.5 text-xs text-paper-200 focus:outline-none focus:border-brand-orange font-mono"
            >
              <option value="recommended">Best First-Time-Fix Rate</option>
              <option value="eta">Fastest Arrival ETA</option>
              <option value="distance">Closest Distance</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Technician Cards Anti-Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedTechs.map((tech) => (
            <div
              key={tech.id}
              className="rounded-3xl bg-carbon-900 border border-carbon-800 hover:border-brand-orange/60 p-6 sm:p-8 transition-all duration-300 group hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Top Profile Header */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={tech.photo}
                        alt={tech.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-trust-emerald"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-trust-emerald border-2 border-carbon-900 rounded-full" title="Available Today"></span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-xl text-paper-50 group-hover:text-brand-orange transition-colors">
                          {tech.name}
                        </h3>
                        <CheckCircle2 className="w-4 h-4 text-trust-blue" />
                      </div>

                      <div className="flex items-center gap-2 text-xs mt-0.5">
                        <span className="flex items-center text-brand-yellow font-bold">
                          <Star className="w-3.5 h-3.5 fill-brand-yellow mr-1" />
                          {tech.rating}
                        </span>
                        <span className="text-paper-500">•</span>
                        <span className="text-paper-400">{tech.repairsCompleted}+ repairs completed</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs text-paper-400 block">Inspection Fee</span>
                    <span className="font-mono font-black text-xl text-paper-50">₹{tech.baseLaborFee}</span>
                  </div>
                </div>

                {/* Key Performance Metrics Bar */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-carbon-950 border border-carbon-800/80 mb-4 text-center">
                  <div>
                    <span className="text-[10px] font-mono text-paper-400 block">First-Time-Fix</span>
                    <span className="font-mono font-black text-sm text-trust-emerald">{tech.firstTimeFixRate}%</span>
                  </div>
                  <div className="border-x border-carbon-800">
                    <span className="text-[10px] font-mono text-paper-400 block">Proximity</span>
                    <span className="font-mono font-bold text-sm text-paper-100">{tech.distanceKm} km</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-paper-400 block">Estimated Arrival</span>
                    <span className="font-mono font-black text-sm text-brand-orange">{tech.estimatedArrivalMin} mins</span>
                  </div>
                </div>

                {/* Skills & Badges */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-mono text-paper-400 uppercase font-semibold block">
                    Certified Skills & Hardware:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {tech.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-carbon-800 border border-carbon-700 font-mono text-[11px] text-paper-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-carbon-800 flex items-center justify-between gap-4">
                <span className="text-xs font-mono text-trust-emerald font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>90-Day Guarantee Backed</span>
                </span>

                <button
                  onClick={() => handleBookTech(tech)}
                  className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-amber text-carbon-950 font-display font-bold text-xs transition-all shadow-glow-orange flex items-center gap-2"
                >
                  <span>BOOK {tech.name.split(' ')[0].toUpperCase()} →</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
