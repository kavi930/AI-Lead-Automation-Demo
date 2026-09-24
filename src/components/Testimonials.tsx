import React from 'react';
import { TESTIMONIALS_LIST } from '../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section className="w-full py-20 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase font-bold tracking-wider text-[#007d55] px-3.5 py-1 rounded-full bg-[#eff4ff] inline-block border border-emerald-100">
            Validated ROI
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1c30] tracking-tight mt-3 mb-4">
            Trusted by Practice Leaders &amp; Business Operators
          </h2>
          <p className="text-sm sm:text-base text-[#434655]">
            See how commercial clinics and local leaders turn dropped website visits into measurable revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_LIST.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                <div className="flex text-amber-500 text-sm mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-base fill-1">
                      star
                    </span>
                  ))}
                </div>
                <p className="text-sm sm:text-[15px] text-[#0b1c30] font-medium leading-relaxed mb-6 italic">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-gray-50">
                <img
                  src={item.avatarUrl}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100 shrink-0"
                  onError={(e) => {
                    // Fallback to avatar letter circle if network blocks image
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-[15px] font-bold text-[#0b1c30] truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#434655] truncate">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
