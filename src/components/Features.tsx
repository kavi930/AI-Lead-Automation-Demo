import React from 'react';

export const Features: React.FC = () => {
  const featureList = [
    {
      icon: 'neurology',
      iconBg: 'bg-[#dae2fd]',
      iconColor: 'text-[#004ac6]',
      tag: 'NLP Driven',
      tagColor: 'text-[#004ac6]',
      title: 'AI Lead Qualification',
      description:
        'Natural language analysis scores urgency, estimated budget, service match, and intent readiness within milliseconds of submission.',
      bullet: 'Zero manual data filtering needed',
    },
    {
      icon: 'mark_chat_unread',
      iconBg: 'bg-[#e5eeff]',
      iconColor: 'text-[#007d55]',
      tag: '< 15 Seconds',
      tagColor: 'text-[#007d55]',
      title: 'Instant WhatsApp Response',
      description:
        'Engage high-intent prospects immediately on their preferred messaging application while their purchase interest is at its absolute peak.',
      bullet: 'Official WhatsApp Business API',
    },
    {
      icon: 'forward_to_inbox',
      iconBg: 'bg-[#dce9ff]',
      iconColor: 'text-[#2563eb]',
      tag: 'Drip Engine',
      tagColor: 'text-[#2563eb]',
      title: 'Automated Email Follow-up',
      description:
        'Intelligent multi-touch email drip sequences that trigger based on customer actions, opens, and specific service categories.',
      bullet: 'Custom templates & merge tags',
    },
    {
      icon: 'route',
      iconBg: 'bg-[#e5eeff]',
      iconColor: 'text-[#565e74]',
      tag: 'Full Journey',
      tagColor: 'text-[#565e74]',
      title: 'Lead Tracking & Attribution',
      description:
        'Real-time attribution tracking source, UTM campaigns, organic referrers, and lifecycle stages without complex tag managers.',
      bullet: 'End-to-end ROI transparency',
    },
    {
      icon: 'event_available',
      iconBg: 'bg-[#dae2fd]',
      iconColor: 'text-[#007d55]',
      tag: '2-Way Sync',
      tagColor: 'text-[#007d55]',
      title: 'Appointment Automation',
      description:
        'Direct real-time two-way synchronization with Google Calendar, Outlook 365, Calendly, and specialized clinic software.',
      bullet: 'Zero double-booking conflicts',
    },
    {
      icon: 'nightlight',
      iconBg: 'bg-[#dce9ff]',
      iconColor: 'text-[#0b1c30]',
      tag: 'Always Active',
      tagColor: 'text-[#004ac6]',
      title: '24/7 Enquiry Handling',
      description:
        'Never drop a late-night or weekend lead again. The autonomous agent works around the clock to capture and qualify prospective clients.',
      bullet: 'Over 60% of leads arrive off-hours',
    },
  ];

  return (
    <section className="w-full py-20 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase font-bold tracking-wider text-[#004ac6] px-3.5 py-1 rounded-full bg-[#dae2fd]/70 inline-block">
            Enterprise Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1c30] tracking-tight mt-3 mb-4">
            Engineered for Conversion, Not Just Contact Forms
          </h2>
          <p className="text-sm sm:text-base text-[#434655]">
            LeadFlow.ai replaces slow humans and rigid form builders with high-velocity conversational
            intelligence that accelerates sales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center ${item.iconColor} mb-5 group-hover:scale-105 transition-transform`}
              >
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-[#0b1c30]">{item.title}</h3>
                <span className={`text-xs font-semibold ${item.tagColor}`}>{item.tag}</span>
              </div>
              <p className="text-xs sm:text-[13px] text-[#434655] leading-relaxed mb-5">
                {item.description}
              </p>
              <div className="text-xs text-[#007d55] font-semibold flex items-center gap-1.5 pt-3 border-t border-gray-50">
                <span className="material-symbols-outlined text-base">check</span>
                <span>{item.bullet}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
