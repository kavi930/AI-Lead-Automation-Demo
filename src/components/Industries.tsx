import React from 'react';
import { IndustryItem } from '../types';

interface IndustriesProps {
  industries: IndustryItem[];
  onSelectIndustry: (ind: IndustryItem) => void;
}

export const Industries: React.FC<IndustriesProps> = ({ industries, onSelectIndustry }) => {
  return (
    <section className="w-full py-20 bg-[#eff4ff]/60 border-y border-gray-100" id="industries">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase font-bold tracking-wider text-[#004ac6] px-3.5 py-1 rounded-full bg-[#dae2fd]/70 inline-block">
            Tailored Workflows
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1c30] tracking-tight mt-3 mb-4">
            Tailored AI Agents for Your Specific Industry
          </h2>
          <p className="text-sm sm:text-base text-[#434655]">
            LeadFlow's pre-trained vertical models come pre-equipped with domain terminology, triage
            prompts, and smart objection handling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#004ac6] group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0b1c30]">{item.title}</h3>
                </div>
                <p className="text-xs sm:text-[13px] text-[#434655] mb-5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div>
                <div className="bg-[#eff4ff] p-3 rounded-lg text-xs text-[#434655] mb-3 border border-blue-50">
                  <strong className="text-[#0b1c30] block mb-1">AI Handles:</strong>
                  <span className="italic">&ldquo;{item.examplePrompt}&rdquo;</span>
                </div>
                <button
                  onClick={() => onSelectIndustry(item)}
                  className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">play_circle</span>
                  <span>Test {item.title.split(' ')[0]} in Simulator</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
