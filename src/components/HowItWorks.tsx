import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: 'Step 01',
      icon: 'hub',
      iconBg: 'bg-[#dce9ff]',
      iconColor: 'text-[#2563eb]',
      title: 'Capture Omnichannel Enquiries',
      description:
        'Connect contact forms, website live widgets, Google Business profiles, and direct inbound WhatsApp chats into one unified stream.',
      metricLabel: 'Intake latency',
      metricVal: 'Sub-second',
      metricValClass: 'text-[#0b1c30] font-semibold',
    },
    {
      step: 'Step 02',
      icon: 'neurology',
      iconBg: 'bg-[#dae2fd]',
      iconColor: 'text-[#004ac6]',
      title: 'Instant AI Agent Qualification',
      description:
        'The NLP agent immediately parses customer message history, identifies requested service, validates geographic fit, and measures buying readiness.',
      metricLabel: 'Accuracy metric',
      metricVal: '98.4% Precision',
      metricValClass: 'text-[#007d55] font-semibold',
    },
    {
      step: 'Step 03',
      icon: 'send',
      iconBg: 'bg-[#e5eeff]',
      iconColor: 'text-[#007d55]',
      title: 'Multi-Channel Instant Response',
      description:
        'Dispatches tailored WhatsApp messages, SMS notifications, and emails with one-click direct appointment reservation slots within 30 seconds.',
      metricLabel: 'WhatsApp speed',
      metricVal: '< 15 seconds',
      metricValClass: 'text-[#007d55] font-semibold',
    },
    {
      step: 'Step 04',
      icon: 'sync_alt',
      iconBg: 'bg-[#dce9ff]',
      iconColor: 'text-[#0b1c30]',
      title: 'CRM Sync & Smart Nudge Cadence',
      description:
        "Automatically logs to your CRM, notifies staff, and initiates polite follow-up reminder cadences if the user doesn't book immediately.",
      metricLabel: 'Follow-up recovery',
      metricVal: '+34% conversion',
      metricValClass: 'text-[#2563eb] font-semibold',
    },
  ];

  return (
    <section className="w-full py-20 bg-[#eff4ff]/60 border-y border-gray-100" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase font-bold tracking-wider text-[#004ac6] px-3.5 py-1 rounded-full bg-[#dae2fd]/70 inline-block">
            Seamless Automation
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1c30] tracking-tight mt-3 mb-4">
            From First Click to Booked Appointment in 4 Steps
          </h2>
          <p className="text-sm sm:text-base text-[#434655]">
            LeadFlow.ai replaces clunky delayed manual callbacks with high-speed autonomous agent intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center ${item.iconColor} mb-6 transition-transform group-hover:scale-105`}
                >
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <div className="text-xs text-[#004ac6] font-semibold tracking-wide uppercase mb-1">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-[#0b1c30] mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#434655] leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="bg-[#eff4ff] p-3 rounded-lg flex items-center justify-between text-[#434655] text-xs">
                <span>{item.metricLabel}</span>
                <span className={item.metricValClass}>{item.metricVal}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
