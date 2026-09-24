import React from 'react';

interface FinalCTAProps {
  onStartTrial: () => void;
  onScheduleDemo: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartTrial, onScheduleDemo }) => {
  return (
    <section className="w-full py-20 bg-[#f8f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative w-full rounded-3xl bg-[#213145] text-white px-6 py-14 sm:px-14 sm:py-20 overflow-hidden shadow-xl">
          {/* Subtle lighting effects */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#004ac6]/30 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#007d55]/30 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="inline-block text-[11px] uppercase font-bold tracking-wider text-[#dbe1ff] mb-4 bg-white/10 px-3.5 py-1 rounded-full border border-white/15">
              Autonomous Pipeline Transformation
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
              Ready to Stop Losing 60% of Your Website Leads?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed">
              Deploy your custom AI lead agent in less than 15 minutes. Plug into your current website,
              ads, or forms without writing a line of code.
            </p>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
              <button
                onClick={onStartTrial}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg bg-[#2563eb] text-white text-[14px] font-semibold shadow-md hover:bg-[#1d4ed8] transition-all cursor-pointer"
              >
                <span>Start Your 14-Day Free Trial</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
              <button
                onClick={onScheduleDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg bg-white/10 text-white hover:bg-white/20 text-[14px] font-medium transition-all cursor-pointer border border-white/10"
              >
                <span className="material-symbols-outlined text-lg">calendar_month</span>
                <span>Schedule 1-on-1 Product Demo</span>
              </button>
            </div>

            {/* Reassurance Checklist */}
            <div className="flex flex-wrap items-center justify-center gap-y-2.5 gap-x-6 text-xs sm:text-[13px] text-gray-300">
              <span className="inline-flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#6ffbbe] text-base">check</span>
                <span>No credit card required</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#6ffbbe] text-base">check</span>
                <span>15-minute setup</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#6ffbbe] text-base">check</span>
                <span>WhatsApp Business API ready</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#6ffbbe] text-base">check</span>
                <span>Cancel anytime</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
