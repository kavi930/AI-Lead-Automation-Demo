import React, { useState } from 'react';
import { LOGO_URL } from '../data/mockData';

interface HeaderProps {
  onOpenBookDemo: () => void;
  onOpenFreeTrial: () => void;
  onOpenWebhookSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBookDemo,
  onOpenFreeTrial,
  onOpenWebhookSettings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Notification Announcement Bar */}
      <div className="w-full bg-[#dae2fd]/70 text-[#0b1c30] py-2 px-4 sm:px-8 text-center text-xs sm:text-[13px] font-medium flex items-center justify-center gap-2 transition-colors border-b border-[#c3c6d7]/30">
        <span className="text-[#2563eb] text-sm leading-none">⚡</span>
        <span>New: Instant WhatsApp Business API Integration with multi-agent qualification.</span>
        <button
          onClick={onOpenWebhookSettings}
          className="text-[#004ac6] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer transition-all ml-1"
        >
          <span>Configure Webhook</span>
          <span>→</span>
        </button>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-18 sm:h-20 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6 lg:gap-8">
            <a href="#" className="flex items-center gap-2.5 group">
              <img
                src={LOGO_URL}
                alt="LeadFlow.ai Logo"
                className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  // Fallback icon if image network is delayed
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-xl sm:text-[22px] font-bold tracking-tight text-[#0b1c30]">
                LeadFlow<span className="text-[#2563eb]">.ai</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-7 text-[14px]">
              <a
                href="#how-it-works"
                className="font-medium text-[#434655] hover:text-[#004ac6] transition-colors"
              >
                How It Works
              </a>
              <a
                href="#live-demo-interactive"
                className="font-medium text-[#434655] hover:text-[#004ac6] transition-colors"
              >
                Live Demo
              </a>
              <a
                href="#analytics-dashboard"
                className="font-medium text-[#434655] hover:text-[#004ac6] transition-colors"
              >
                Dashboard
              </a>
              <a
                href="#features"
                className="font-medium text-[#434655] hover:text-[#004ac6] transition-colors"
              >
                Features
              </a>
              <a
                href="#industries"
                className="font-medium text-[#434655] hover:text-[#004ac6] transition-colors"
              >
                Industries
              </a>
              <a
                href="#testimonials"
                className="font-medium text-[#434655] hover:text-[#004ac6] transition-colors"
              >
                Testimonials
              </a>
            </nav>
          </div>

          {/* Action Buttons & Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onOpenBookDemo}
              className="hidden sm:inline-flex items-center justify-center h-10 px-4 rounded-lg bg-white border border-gray-200 text-[#0b1c30] text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-xs"
            >
              Book Demo
            </button>

            <button
              onClick={onOpenFreeTrial}
              className="inline-flex items-center justify-center h-10 px-4 sm:px-5 rounded-lg bg-[#2563eb] text-white text-[13px] font-semibold hover:bg-[#1d4ed8] transition-all shadow-[0_4px_12px_rgba(37,99,235,0.24)] cursor-pointer"
            >
              Start Free Trial
            </button>

            {/* User Profile / Settings Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="w-9 h-9 rounded-full bg-[#004ac6] hover:bg-[#003ea8] text-white flex items-center justify-center shrink-0 shadow-sm transition-all focus:ring-2 focus:ring-blue-400 focus:outline-none"
                title="Account & Integrations"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-2 text-xs z-50">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="font-semibold text-gray-900">Dr. Verma Practice</p>
                    <p className="text-gray-500 text-[11px] truncate">admin@apexclinic.com</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      ● Active Pro Plan
                    </span>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenWebhookSettings();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">webhook</span>
                      <span>Webhook & Make.com</span>
                    </button>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenBookDemo();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">calendar_month</span>
                      <span>Schedule VIP Walkthrough</span>
                    </button>
                  </div>
                  <div className="border-t border-gray-100 pt-1">
                    <div className="px-3 py-1.5 text-[11px] text-gray-500 flex items-center justify-between">
                      <span>Uptime</span>
                      <span className="font-semibold text-emerald-600">99.98%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-3 shadow-lg">
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-700 hover:text-blue-600 py-1"
          >
            How It Works
          </a>
          <a
            href="#live-demo-interactive"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-700 hover:text-blue-600 py-1"
          >
            Live Demo
          </a>
          <a
            href="#analytics-dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-700 hover:text-blue-600 py-1"
          >
            Dashboard
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-700 hover:text-blue-600 py-1"
          >
            Features
          </a>
          <a
            href="#industries"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-700 hover:text-blue-600 py-1"
          >
            Industries
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-700 hover:text-blue-600 py-1"
          >
            Testimonials
          </a>
          <div className="pt-2 flex flex-col gap-2 border-t border-gray-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookDemo();
              }}
              className="w-full h-10 rounded-lg bg-gray-100 text-gray-800 text-sm font-semibold"
            >
              Book Demo
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFreeTrial();
              }}
              className="w-full h-10 rounded-lg bg-blue-600 text-white text-sm font-semibold"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
