import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HelpCircle, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Wrench, 
  CheckCircle2,
  Lock
} from 'lucide-react';

export const StorySection: React.FC = () => {
  const { startDiagnosis, setCurrentView } = useApp();
  const [activeQuestion, setActiveQuestion] = useState<number>(0);

  const problemQuestions = [
    {
      q: "What part is actually broken?",
      sub: "Customers waste days guessing between pump, motor, or PCB boards.",
      answer: "FixKart's AI & Symptom Tree isolates the exact root cause with 90%+ confidence."
    },
    {
      q: "Will this part fit my exact model?",
      sub: "Minor sub-model revisions often result in non-fitting plugs, brackets, or voltages.",
      answer: "Our neural compatibility engine cross-references 42,000+ OEM factory schematics."
    },
    {
      q: "Is the replacement part genuine?",
      sub: "Unregulated local markets are flooded with counterfeit, refurbished, or short-lived copies.",
      answer: "Every batch is verified directly from authorized tier-1 distributors with QR trace."
    },
    {
      q: "Who will come and install it properly?",
      sub: "Finding reliable, verified local technicians without hidden surprise charges is exhausting.",
      answer: "FixKart connects you with top 1% background-verified master technicians with upfront pricing."
    },
    {
      q: "What if it breaks down again in 3 weeks?",
      sub: "Most local mechanics offer zero written warranty after stepping out the door.",
      answer: "Every single repair automatically generates an active 90-Day Digital Repair Passport."
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-carbon-950 relative overflow-hidden border-t border-carbon-850">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* SECTION 01 — THE PROBLEM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-xs text-brand-orange uppercase font-bold tracking-widest block">
              SECTION 01 — THE REPAIR DILEMMA
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-paper-50 tracking-tight leading-[0.95]">
              IT BROKE. <br />
              <span className="text-stroke-white">NOW WHAT?</span>
            </h2>
            <p className="text-paper-300 text-sm leading-relaxed max-w-md pt-2">
              The traditional repair journey in India is fragmented, untrusted, and full of friction. FixKart consolidates 5 chaotic steps into one effortless guarantee.
            </p>
          </div>

          {/* Interactive Question-To-Solution Accordion Cards */}
          <div className="lg:col-span-7 space-y-3">
            {problemQuestions.map((item, idx) => {
              const isSelected = activeQuestion === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveQuestion(idx)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-carbon-900 border-brand-orange/80 shadow-glow-orange'
                      : 'bg-carbon-900/50 border-carbon-800 hover:border-carbon-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-brand-orange text-carbon-950' : 'bg-carbon-800 text-paper-400'
                      }`}>
                        0{idx + 1}
                      </span>
                      <h4 className="font-display font-bold text-base sm:text-lg text-paper-50">
                        {item.q}
                      </h4>
                    </div>
                    <span className="text-brand-orange text-sm font-bold">
                      {isSelected ? '−' : '+'}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="mt-4 pt-3 border-t border-carbon-800 space-y-2 animate-in fade-in duration-200">
                      <p className="text-xs text-paper-400 leading-relaxed italic">
                        "{item.sub}"
                      </p>
                      <div className="p-3 rounded-xl bg-carbon-950 border border-carbon-800/80 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-trust-emerald flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-paper-200 font-medium">
                          <strong className="text-brand-orange">FixKart Solution:</strong> {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 02 — THE SOLUTION (ONE PLACE) */}
        <div className="rounded-3xl bg-gradient-to-br from-carbon-900 via-carbon-850 to-carbon-900 border border-carbon-750 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs text-trust-emerald uppercase font-bold tracking-widest block mb-2">
              SECTION 02 — THE UNIFIED PROTOCOL
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl text-paper-50 tracking-tight leading-none mb-4">
              ONE PLACE. <br />
              <span className="text-stroke-orange text-brand-orange">FOUR SEAMLESS STEPS.</span>
            </h3>
            <p className="text-paper-300 text-sm leading-relaxed max-w-xl">
              From the moment a strange noise starts to the verified 90-day digital guarantee passport in your account.
            </p>
          </div>

          {/* 4 Connected Architectural Step Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-carbon-950 border border-carbon-800 relative group hover:border-brand-orange/50 transition-all">
              <span className="font-mono text-3xl font-black text-carbon-800 group-hover:text-brand-orange transition-colors">
                01
              </span>
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange my-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-display font-black text-xl text-paper-50 mb-2">IDENTIFY</h4>
              <p className="text-xs text-paper-400 leading-relaxed">
                Optical camera scan or guided symptom diagnosis pinpoints the exact failed sub-component in seconds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-carbon-950 border border-carbon-800 relative group hover:border-trust-blue/50 transition-all">
              <span className="font-mono text-3xl font-black text-carbon-800 group-hover:text-trust-blue transition-colors">
                02
              </span>
              <div className="w-10 h-10 rounded-xl bg-trust-blue/10 border border-trust-blue/20 flex items-center justify-center text-trust-blue my-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-display font-black text-xl text-paper-50 mb-2">MATCH</h4>
              <p className="text-xs text-paper-400 leading-relaxed">
                Choose transparently between OEM Genuine, Certified Pro, or Economy tiers with guaranteed model tolerance.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-carbon-950 border border-carbon-800 relative group hover:border-brand-yellow/50 transition-all">
              <span className="font-mono text-3xl font-black text-carbon-800 group-hover:text-brand-yellow transition-colors">
                03
              </span>
              <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow my-4">
                <Wrench className="w-5 h-5" />
              </div>
              <h4 className="font-display font-black text-xl text-paper-50 mb-2">INSTALL</h4>
              <p className="text-xs text-paper-400 leading-relaxed">
                Verified background-checked technicians arrive in 35 mins with required specialized tools and genuine part.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-carbon-950 border border-carbon-800 relative group hover:border-trust-emerald/50 transition-all">
              <span className="font-mono text-3xl font-black text-carbon-800 group-hover:text-trust-emerald transition-colors">
                04
              </span>
              <div className="w-10 h-10 rounded-xl bg-trust-emerald/10 border border-trust-emerald/20 flex items-center justify-center text-trust-emerald my-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-display font-black text-xl text-paper-50 mb-2">GUARANTEE</h4>
              <p className="text-xs text-paper-400 leading-relaxed">
                Minted Digital Repair Passport with before/after photos and automated 90-day free re-fix protection.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-carbon-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-trust-emerald animate-ping"></span>
              <span className="text-xs text-paper-300 font-medium">
                No hidden charges • Real-time live status • 100% money-back compatibility promise
              </span>
            </div>

            <button
              onClick={() => startDiagnosis()}
              className="px-6 py-3 rounded-xl bg-brand-orange text-carbon-950 font-bold text-xs hover:bg-brand-amber transition-all shadow-glow-orange flex items-center gap-2"
            >
              <span>EXPERIENCE THE PROTOCOL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
