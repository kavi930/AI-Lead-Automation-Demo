import React, { useState } from 'react';

interface HeroProps {
  onTryLiveDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTryLiveDemo }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const workflowSteps = [
    {
      num: '01',
      title: 'Website Enquiry',
      desc: 'Omnichannel intake',
      stat: 'Captured Instantly',
      statColor: 'text-[#004ac6]',
      dotColor: 'bg-[#2563eb]',
      icon: 'language',
      iconColor: 'text-[#2563eb]',
      detail: 'Instantly captures leads from website webforms, WhatsApp click-to-chat widgets, and Google Business profiles with zero dropped packets.',
    },
    {
      num: '02',
      title: 'AI Qualification',
      desc: 'Intent & urgency scoring',
      stat: 'Intent: 98% Acc',
      statColor: 'text-[#007d55]',
      dotColor: 'bg-[#007d55]',
      icon: 'auto_awesome',
      iconColor: 'text-[#007d55]',
      detail: 'Proprietary NLP engine extracts service needs, urgency signals, and buying readiness to score lead viability within 800ms.',
    },
    {
      num: '03',
      title: 'WhatsApp + Email',
      desc: 'Instant booking link',
      stat: 'Response < 15s',
      statColor: 'text-[#004ac6]',
      dotColor: 'bg-[#2563eb]',
      icon: 'chat',
      iconColor: 'text-[#2563eb]',
      detail: 'Dispatches personalized interactive WhatsApp messaging with auto-filled calendar booking reservation links straight to their phone.',
    },
    {
      num: '04',
      title: 'Lead Management',
      desc: 'CRM sync & priority tags',
      stat: 'Live Pipeline',
      statColor: 'text-[#565e74]',
      dotColor: 'bg-[#565e74]',
      icon: 'view_kanban',
      iconColor: 'text-[#565e74]',
      detail: 'Bi-directionally synchronizes with Salesforce, HubSpot, Dentrix, Mindbody, or custom webhook endpoints like Make.com.',
    },
    {
      num: '05',
      title: 'Auto Follow-up',
      desc: 'Smart multi-touch nudges',
      stat: 'Zero Drop-off',
      statColor: 'text-[#007d55]',
      dotColor: 'bg-[#007d55]',
      icon: 'event_available',
      iconColor: 'text-[#007d55]',
      detail: 'Autonomous multi-touch cadence delivers polite, contextual follow-ups after 15 mins, 2 hours, and 24 hours to prevent lead drop-off.',
    },
  ];

  return (
    <section className="relative w-full pt-8 pb-16 md:py-20 overflow-hidden bg-[#f8f9ff]">
      {/* Ambient blurred background blobs */}
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-[#2563eb]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-24 w-[28rem] h-[28rem] bg-[#dae2fd]/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Centered Hero Copy */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Trust rating badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-xs border border-gray-100 mb-6">
            <div className="flex text-amber-500 text-xs">
              <span className="material-symbols-outlined text-sm leading-none fill-1">star</span>
              <span className="material-symbols-outlined text-sm leading-none fill-1">star</span>
              <span className="material-symbols-outlined text-sm leading-none fill-1">star</span>
              <span className="material-symbols-outlined text-sm leading-none fill-1">star</span>
              <span className="material-symbols-outlined text-sm leading-none fill-1">star</span>
            </div>
            <span className="text-xs sm:text-[13px] text-[#0b1c30] font-semibold">
              Rated 4.9/5 by 600+ Local Businesses & Clinics
            </span>
            <span className="material-symbols-outlined text-[#007d55] text-base leading-none fill-1">
              verified
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0b1c30] leading-[1.12] mb-6">
            Turn Every Enquiry Into a Qualified Lead —{' '}
            <span className="text-[#2563eb] inline-block">Automatically</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[#434655] max-w-2xl mb-8 leading-relaxed font-normal">
            Capture enquiries, qualify leads with AI, respond instantly, and automate WhatsApp and
            email follow-ups before competitors even check their inbox.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-14">
            <button
              onClick={onTryLiveDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-[#2563eb] text-white text-[14px] font-semibold shadow-md hover:bg-[#1d4ed8] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">play_arrow</span>
              <span>Try Live Demo</span>
            </button>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-white border border-gray-200 text-[#0b1c30] text-[14px] font-medium shadow-xs hover:bg-gray-50 transition-all"
            >
              <span className="material-symbols-outlined text-lg text-[#565e74]">smart_display</span>
              <span>See How It Works</span>
            </a>
          </div>

          {/* Social Proof Trust Bar */}
          <div className="w-full pt-2">
            <p className="text-[11px] uppercase tracking-wider text-[#737686] font-semibold mb-6">
              Trusted by fast-growing clinics, gyms & academies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[#434655] font-semibold text-sm sm:text-base opacity-85">
              <div className="flex items-center gap-1.5 tracking-tight text-[#0b1c30] hover:text-[#2563eb] transition-colors">
                <span className="material-symbols-outlined text-[#2563eb]">dentistry</span> Apex Dental
              </div>
              <div className="flex items-center gap-1.5 tracking-tight text-[#0b1c30] hover:text-[#007d55] transition-colors">
                <span className="material-symbols-outlined text-[#007d55]">fitness_center</span> Pulse Fitness
              </div>
              <div className="flex items-center gap-1.5 tracking-tight text-[#0b1c30] hover:text-[#004ac6] transition-colors">
                <span className="material-symbols-outlined text-[#004ac6]">school</span> Elevate Tutoring
              </div>
              <div className="flex items-center gap-1.5 tracking-tight text-[#0b1c30] hover:text-[#ba1a1a] transition-colors">
                <span className="material-symbols-outlined text-[#ba1a1a]">local_hospital</span> CarePlus Clinic
              </div>
              <div className="flex items-center gap-1.5 tracking-tight text-[#0b1c30] hover:text-[#565e74] transition-colors">
                <span className="material-symbols-outlined text-[#565e74]">psychology</span> Summit Academy
              </div>
              <div className="flex items-center gap-1.5 tracking-tight text-[#0b1c30] hover:text-[#006242] transition-colors">
                <span className="material-symbols-outlined text-[#006242]">cleaning_services</span> ProClean Solutions
              </div>
            </div>
          </div>
        </div>

        {/* VISUAL FLOW INTERACTIVE PIPELINE BAR */}
        <div className="mt-14 w-full bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-3">
            <div className="flex items-center gap-2.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#007d55] animate-pulse"></span>
              <span className="text-sm font-semibold text-[#0b1c30]">
                Automated Engine Workflow
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#434655] bg-[#e5eeff] px-3 py-1 rounded-full font-medium">
                End-to-End Pipeline &lt; 30 Seconds
              </span>
              <span className="text-[11px] text-[#737686] hidden sm:inline">
                Click any step to inspect
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 relative">
            {workflowSteps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(isSelected ? null : idx)}
                  className={`cursor-pointer group p-4 rounded-xl transition-all border ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20 shadow-sm'
                      : 'bg-[#eff4ff] border-transparent hover:-translate-y-0.5 hover:shadow-xs'
                  } flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-xs">
                        <span className={`material-symbols-outlined text-lg ${step.iconColor}`}>
                          {step.icon}
                        </span>
                      </div>
                      <span className="text-xs text-[#737686] font-semibold">{step.num}</span>
                    </div>
                    <div>
                      <div className="text-[15px] font-semibold text-[#0b1c30] mb-0.5">
                        {step.title}
                      </div>
                      <p className="text-xs text-[#434655]">{step.desc}</p>
                    </div>
                  </div>

                  <div className={`mt-4 pt-2 flex items-center gap-1.5 text-xs font-semibold ${step.statColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${step.dotColor}`}></span>
                    <span>{step.stat}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Step Explainer Drawer */}
          {activeStep !== null && (
            <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-100 text-xs sm:text-sm text-[#0b1c30] flex items-start justify-between gap-3 animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#2563eb] text-xl shrink-0 mt-0.5">
                  info
                </span>
                <div>
                  <strong className="font-semibold text-blue-900 block mb-0.5">
                    Step {workflowSteps[activeStep].num}: {workflowSteps[activeStep].title} Details
                  </strong>
                  <p className="text-blue-800 leading-relaxed">
                    {workflowSteps[activeStep].detail}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveStep(null)}
                className="text-blue-500 hover:text-blue-700 text-xs font-semibold px-2 py-1"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
