import React from 'react';
import { LOGO_URL } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src={LOGO_URL}
                alt="LeadFlow.ai Logo"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-xl font-bold tracking-tight text-[#0b1c30]">
                LeadFlow<span className="text-[#2563eb]">.ai</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#434655] max-w-sm leading-relaxed">
              High-performance lead qualification and pipeline automation for commercial service
              operators, private clinics, and multi-location businesses.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] text-[11px] font-semibold text-[#434655] border border-blue-50">
                <span className="material-symbols-outlined text-sm text-[#007d55]">
                  verified_user
                </span>
                GDPR Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] text-[11px] font-semibold text-[#434655] border border-blue-50">
                <span className="material-symbols-outlined text-sm text-[#2563eb]">shield</span>
                SOC2 Type II
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] text-[11px] font-semibold text-[#434655] border border-blue-50">
                <span className="material-symbols-outlined text-sm text-[#007d55]">
                  check_circle
                </span>
                99.9% Uptime
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] text-[11px] font-semibold text-[#434655] border border-blue-50">
                <span className="material-symbols-outlined text-sm text-[#565e74]">lock</span>
                HIPAA Ready
              </span>
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-xs text-[#434655]">
              <li>
                <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-blue-600 transition-colors">
                  Features Overview
                </a>
              </li>
              <li>
                <a href="#analytics-dashboard" className="hover:text-blue-600 transition-colors">
                  Qualification Engine
                </a>
              </li>
              <li>
                <a href="#live-demo-interactive" className="hover:text-blue-600 transition-colors">
                  Live Interactive Demo
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2 text-xs text-[#434655]">
              <li>
                <a href="#industries" className="hover:text-blue-600 transition-colors">
                  Private Medical &amp; Clinics
                </a>
              </li>
              <li>
                <a href="#industries" className="hover:text-blue-600 transition-colors">
                  Fitness &amp; Wellness Centers
                </a>
              </li>
              <li>
                <a href="#industries" className="hover:text-blue-600 transition-colors">
                  Home &amp; Field Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-blue-600 transition-colors">
                  Customer Case Studies
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider">Governance</h4>
            <ul className="space-y-2 text-xs text-[#434655]">
              <li>
                <a href="#governance" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#governance" className="hover:text-blue-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#governance" className="hover:text-blue-600 transition-colors">
                  Security Architecture
                </a>
              </li>
              <li>
                <a href="#governance" className="hover:text-blue-600 transition-colors">
                  Service Level Agreement
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#eff4ff]/50 px-4 py-3 rounded-xl border border-gray-100">
          <p className="text-xs text-[#737686]">
            © {new Date().getFullYear()} LeadFlow AI, Inc. Enterprise Grade Lead Qualification Systems.
            All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#0b1c30] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#007d55] animate-pulse"></span>
            <span>All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
