import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { InteractiveDemo } from './components/InteractiveDemo';
import { DashboardSection } from './components/DashboardSection';
import { Features } from './components/Features';
import { Industries } from './components/Industries';
import { Testimonials } from './components/Testimonials';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';
import { INITIAL_LEADS, DEFAULT_LEAD, INITIAL_FEED_ITEMS, INDUSTRIES_LIST } from './data/mockData';
import { Lead, FeedItem, IndustryItem } from './types';

export default function App() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [currentLead, setCurrentLead] = useState<Lead>(DEFAULT_LEAD);
  const [feedItems, setFeedItems] = useState<FeedItem[]>(INITIAL_FEED_ITEMS);

  // Modal states
  const [transcriptLead, setTranscriptLead] = useState<Lead | null>(null);
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const [isFreeTrialOpen, setIsFreeTrialOpen] = useState(false);
  const [isWebhookModalOpen, setIsWebhookModalOpen] = useState(false);
  const [customWebhookUrl, setCustomWebhookUrl] = useState('PASTE_YOUR_MAKE_WEBHOOK_URL_HERE');

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLeadGenerated = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
    setCurrentLead(newLead);

    // Prepend to Live Automation Feed
    const newFeedItem: FeedItem = {
      id: `feed-${Date.now()}`,
      icon: 'auto_awesome',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
      title: `${newLead.name} qualified for ${newLead.service}`,
      subtitle: `Score: ${newLead.intentScore}% • WhatsApp Queued • Just now`,
      timestamp: 'Just now',
    };
    setFeedItems((prev) => [newFeedItem, ...prev.slice(0, 5)]);

    showToast(`Lead for ${newLead.name} (${newLead.service}) qualified & WhatsApp scheduled!`);
  };

  const handleSelectIndustry = (ind: IndustryItem) => {
    const el = document.getElementById('live-demo-interactive');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApproveSlot = (lead: Lead) => {
    showToast(`WhatsApp booking slot approved for ${lead.name}. Invitation synced with clinic calendar!`);
  };

  const handleExportCRM = (lead: Lead) => {
    showToast(`Lead record #${lead.id} (${lead.name}) exported to CRM webhook & Salesforce!`);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Fixed Header */}
      <Header
        onOpenBookDemo={() => setIsBookDemoOpen(true)}
        onOpenFreeTrial={() => setIsFreeTrialOpen(true)}
        onOpenWebhookSettings={() => setIsWebhookModalOpen(true)}
      />

      {/* Main Content Area (padding-top accounts for fixed notification bar + navbar) */}
      <main className="flex-1 pt-24 sm:pt-28">
        <Hero
          onTryLiveDemo={() => {
            const el = document.getElementById('live-demo-interactive');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <HowItWorks />

        <InteractiveDemo
          onLeadGenerated={handleLeadGenerated}
          customWebhookUrl={customWebhookUrl}
          onOpenWebhookModal={() => setIsWebhookModalOpen(true)}
        />

        <DashboardSection
          leads={leads}
          currentLead={currentLead}
          feedItems={feedItems}
          onSelectLead={(selected) => setCurrentLead(selected)}
          onOpenTranscript={(lead) => setTranscriptLead(lead)}
          onApproveSlot={handleApproveSlot}
          onExportCRM={handleExportCRM}
        />

        <Features />

        <Industries
          industries={INDUSTRIES_LIST}
          onSelectIndustry={handleSelectIndustry}
        />

        <Testimonials />

        <FinalCTA
          onStartTrial={() => setIsFreeTrialOpen(true)}
          onScheduleDemo={() => setIsBookDemoOpen(true)}
        />
      </main>

      <Footer />

      {/* Interactive Modals */}
      <Modals
        transcriptLead={transcriptLead}
        onCloseTranscript={() => setTranscriptLead(null)}
        isBookDemoOpen={isBookDemoOpen}
        onCloseBookDemo={() => setIsBookDemoOpen(false)}
        isFreeTrialOpen={isFreeTrialOpen}
        onCloseFreeTrial={() => setIsFreeTrialOpen(false)}
        isWebhookModalOpen={isWebhookModalOpen}
        onCloseWebhookModal={() => setIsWebhookModalOpen(false)}
        webhookUrl={customWebhookUrl}
        onSaveWebhookUrl={(url) => {
          setCustomWebhookUrl(url);
          showToast('Make.com webhook endpoint saved successfully!');
        }}
      />

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-800 animate-fadeIn">
          <span className="material-symbols-outlined text-emerald-400 text-xl shrink-0">
            check_circle
          </span>
          <p className="text-xs font-medium leading-relaxed">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-white ml-auto"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
