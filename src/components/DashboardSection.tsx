import React, { useState } from 'react';
import { Lead, FeedItem } from '../types';

interface DashboardSectionProps {
  leads: Lead[];
  currentLead: Lead;
  feedItems: FeedItem[];
  onSelectLead: (lead: Lead) => void;
  onOpenTranscript: (lead: Lead) => void;
  onApproveSlot: (lead: Lead) => void;
  onExportCRM: (lead: Lead) => void;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({
  leads,
  currentLead,
  feedItems,
  onSelectLead,
  onOpenTranscript,
  onApproveSlot,
  onExportCRM,
}) => {
  const [activeTab, setActiveTab] = useState<'dossier' | 'pipeline'>('dossier');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredLeads = leads.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || item.classification === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <section className="w-full py-20 bg-[#eff4ff]/60 border-b border-gray-100" id="analytics-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase font-bold tracking-wider text-[#004ac6] px-3.5 py-1 rounded-full bg-[#dae2fd]/70 inline-block">
            Executive Control
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1c30] tracking-tight mt-3 mb-4">
            AI Lead Dossier &amp; Real-Time Pipeline Dashboard
          </h2>
          <p className="text-sm sm:text-base text-[#434655]">
            Complete end-to-end visibility. Every prospect categorized, scored, and nudged without
            adding administrative overhead.
          </p>

          {/* View Tab Switcher */}
          <div className="mt-6 inline-flex p-1 bg-white rounded-xl shadow-xs border border-gray-200">
            <button
              onClick={() => setActiveTab('dossier')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'dossier'
                  ? 'bg-[#2563eb] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Real-Time AI Dossier
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'pipeline'
                  ? 'bg-[#2563eb] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Live Pipeline Table</span>
              <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {leads.length}
              </span>
            </button>
          </div>
        </div>

        {/* 4 High Impact Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Metric 1 */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-[#434655] mb-2">
              <span className="text-[13px] font-medium">New Leads</span>
              <span className="material-symbols-outlined text-[#2563eb] text-xl">person_add</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-[#0b1c30]">1,284</span>
              <span className="text-xs font-bold text-[#007d55]">+24% wk</span>
            </div>
            <p className="text-xs text-[#737686]">Omnichannel capture volume</p>
          </div>

          {/* Metric 2 */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-[#434655] mb-2">
              <span className="text-[13px] font-medium">AI Qualified</span>
              <span className="material-symbols-outlined text-[#007d55] text-xl">smart_toy</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-[#0b1c30]">1,142</span>
              <span className="text-xs font-bold text-[#007d55]">88.9% rate</span>
            </div>
            <p className="text-xs text-[#737686]">Processed fully autonomously</p>
          </div>

          {/* Metric 3 */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-[#434655] mb-2">
              <span className="text-[13px] font-medium">Hot Leads</span>
              <span className="material-symbols-outlined text-red-600 text-xl">
                local_fire_department
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-[#0b1c30]">438</span>
              <span className="text-xs font-bold text-red-600">High Intent</span>
            </div>
            <p className="text-xs text-[#737686]">Ready to buy &amp; book slots</p>
          </div>

          {/* Metric 4 */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-[#434655] mb-2">
              <span className="text-[13px] font-medium">Appointments</span>
              <span className="material-symbols-outlined text-[#2563eb] text-xl">calendar_month</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-[#0b1c30]">312</span>
              <span className="text-xs font-bold text-[#004ac6]">Via WhatsApp</span>
            </div>
            <p className="text-xs text-[#737686]">Confirmed on live calendars</p>
          </div>
        </div>

        {/* Tab 1: Dossier & Live Feed Split */}
        {activeTab === 'dossier' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Lead Dossier Card */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 gap-3 border-b border-gray-100">
                <div>
                  <div className="text-xs uppercase font-bold text-[#004ac6] tracking-wider">
                    Lead Dossier #{currentLead.id}
                  </div>
                  <h3 className="text-xl font-bold text-[#0b1c30]">
                    Real-Time AI Classification Record
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] text-xs font-semibold text-[#007d55] border border-emerald-100">
                    <span className="w-2 h-2 rounded-full bg-[#007d55] animate-ping"></span>
                    Live Agent Active
                  </span>
                </div>
              </div>

              {/* Lead Demographics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-6">
                <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-blue-50">
                  <span className="text-xs text-[#737686] block mb-1">Lead Name</span>
                  <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#0b1c30]">
                    <div className="w-6 h-6 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[10px] font-bold">
                      {currentLead.initials}
                    </div>
                    <span className="truncate">{currentLead.name}</span>
                  </div>
                </div>

                <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-blue-50">
                  <span className="text-xs text-[#737686] block mb-1">Service Requested</span>
                  <div className="text-sm sm:text-base font-bold text-[#0b1c30] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#004ac6] text-base shrink-0">
                      dentistry
                    </span>
                    <span className="truncate">{currentLead.service}</span>
                  </div>
                </div>

                <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-blue-50">
                  <span className="text-xs text-[#737686] block mb-1">Detected Intent</span>
                  <div className="text-sm sm:text-base font-bold text-[#0b1c30] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#007d55] text-base shrink-0">
                      target
                    </span>
                    <span className="truncate">{currentLead.detectedIntent}</span>
                  </div>
                </div>

                <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-blue-50">
                  <span className="text-xs text-[#737686] block mb-1">Lead Status</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-xs font-bold text-[#007d55] shadow-2xs border border-gray-100">
                    🔥 {currentLead.classification}
                  </span>
                </div>

                <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-blue-50">
                  <span className="text-xs text-[#737686] block mb-1">Priority Level</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      currentLead.priority === 'HIGH'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {currentLead.priority} PRIORITY
                  </span>
                </div>

                <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-blue-50">
                  <span className="text-xs text-[#737686] block mb-1">Follow-up Cadence</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    Sched. in 15 mins
                  </span>
                </div>
              </div>

              {/* AI Extracted Insights Box */}
              <div className="bg-[#dae2fd]/30 p-4 rounded-xl mb-6 border border-[#c3c6d7]/30">
                <div className="flex items-center gap-2 mb-2 text-[#004ac6] text-sm font-bold">
                  <span className="material-symbols-outlined text-base">psychology</span>
                  <span>AI Synthesized Intelligence</span>
                </div>
                <p className="text-xs sm:text-sm text-[#0b1c30] leading-relaxed italic">
                  &ldquo;Patient reports {currentLead.extractedParameters.urgency}; requesting doctor's slot for{' '}
                  {currentLead.extractedParameters.targetTime}. Budget qualified for comprehensive care.
                  Instant personalized WhatsApp booking dispatch generated.&rdquo;
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onApproveSlot(currentLead)}
                  className="h-10 px-4 rounded-lg bg-[#2563eb] text-white text-xs sm:text-[13px] font-semibold hover:bg-[#1d4ed8] shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>Approve WhatsApp Slot</span>
                </button>
                <button
                  onClick={() => onOpenTranscript(currentLead)}
                  className="h-10 px-4 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs sm:text-[13px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer border border-blue-100"
                >
                  <span className="material-symbols-outlined text-base text-blue-600">visibility</span>
                  <span>View Chat Transcript</span>
                </button>
                <button
                  onClick={() => onExportCRM(currentLead)}
                  className="h-10 px-4 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs sm:text-[13px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer border border-blue-100"
                >
                  <span className="material-symbols-outlined text-base text-gray-600">cloud_upload</span>
                  <span>Export to CRM</span>
                </button>
              </div>
            </div>

            {/* Live Activity Stream */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-[#0b1c30]">Live Automation Feed</h3>
                <span className="w-2.5 h-2.5 rounded-full bg-[#007d55] animate-ping"></span>
              </div>

              <div className="space-y-4">
                {feedItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start pb-3 border-b border-gray-50 last:border-b-0">
                    <div
                      className={`w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center shrink-0 ${item.iconColor}`}
                    >
                      <span className="material-symbols-outlined text-sm">{item.icon}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-[13px] text-[#0b1c30] font-semibold truncate">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-[#737686]">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-3 bg-[#eff4ff] p-3 rounded-xl text-center border border-blue-50">
                <span className="text-xs text-[#004ac6] font-bold flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  99.8% Agent Uptime Active
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2: Full Live Pipeline Table */
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {/* Table Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 mb-4 border-b border-gray-100">
              <div className="relative w-full sm:w-72">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-lg">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search lead, service, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 text-xs rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-gray-500">Filter:</span>
                <div className="flex gap-1">
                  {['ALL', 'HOT LEAD', 'WARM LEAD'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                        statusFilter === filter
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Lead ID</th>
                    <th className="py-3 px-3">Prospect</th>
                    <th className="py-3 px-3">Service</th>
                    <th className="py-3 px-3">Intent Score</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Channel Sync</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredLeads.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => onSelectLead(item)}
                      className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${
                        item.id === currentLead.id ? 'bg-blue-50/70 font-medium' : ''
                      }`}
                    >
                      <td className="py-3 px-3 font-mono text-blue-600 font-bold">{item.id}</td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-gray-900">{item.name}</div>
                        <div className="text-[11px] text-gray-500">{item.phone}</div>
                      </td>
                      <td className="py-3 px-3 text-gray-700">{item.service}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${item.intentScore}%` }}
                            ></div>
                          </div>
                          <span className="font-bold text-gray-900">{item.intentScore}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            item.classification === 'HOT LEAD'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.classification}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-gray-500 text-[11px]">{item.crmStatus}</td>
                      <td className="py-3 px-3 text-right space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectLead(item);
                            setActiveTab('dossier');
                          }}
                          className="px-2 py-1 bg-white border border-gray-200 hover:bg-gray-50 rounded text-blue-600 font-medium text-[11px]"
                        >
                          View Dossier
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenTranscript(item);
                          }}
                          className="px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded text-blue-700 font-medium text-[11px]"
                        >
                          Chat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
