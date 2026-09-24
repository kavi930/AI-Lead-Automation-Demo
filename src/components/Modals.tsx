import React, { useState } from 'react';
import { Lead } from '../types';

interface ModalsProps {
  transcriptLead: Lead | null;
  onCloseTranscript: () => void;
  isBookDemoOpen: boolean;
  onCloseBookDemo: () => void;
  isFreeTrialOpen: boolean;
  onCloseFreeTrial: () => void;
  isWebhookModalOpen: boolean;
  onCloseWebhookModal: () => void;
  webhookUrl: string;
  onSaveWebhookUrl: (url: string) => void;
}

export const Modals: React.FC<ModalsProps> = ({
  transcriptLead,
  onCloseTranscript,
  isBookDemoOpen,
  onCloseBookDemo,
  isFreeTrialOpen,
  onCloseFreeTrial,
  isWebhookModalOpen,
  onCloseWebhookModal,
  webhookUrl,
  onSaveWebhookUrl,
}) => {
  // Webhook Modal state
  const [localWebhook, setLocalWebhook] = useState(webhookUrl);
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  // Book Demo state
  const [demoDate, setDemoDate] = useState('2026-09-25');
  const [demoTime, setDemoTime] = useState('11:00 AM');
  const [demoOrg, setDemoOrg] = useState('Apex Specialty Clinic');
  const [demoBooked, setDemoBooked] = useState(false);

  // Free Trial state
  const [trialName, setTrialName] = useState('');
  const [trialEmail, setTrialEmail] = useState('');
  const [trialVertical, setTrialVertical] = useState('Dental Clinics');
  const [trialCreated, setTrialCreated] = useState(false);

  // Transcript interactive chat input
  const [replyText, setReplyText] = useState('');
  const [chatHistory, setChatHistory] = useState<
    Array<{ sender: 'user' | 'bot'; text: string; time: string }>
  >([]);

  // Reset chat history when transcriptLead opens
  React.useEffect(() => {
    if (transcriptLead) {
      setChatHistory([
        {
          sender: 'user',
          text: transcriptLead.message,
          time: '10:14 AM',
        },
        {
          sender: 'bot',
          text: `Hi ${
            transcriptLead.name.split(' ')[0]
          }! Thanks for reaching out to us. We received your note regarding ${
            transcriptLead.service
          }. We've reserved a priority evaluation slot for you (${
            transcriptLead.extractedParameters.targetTime
          }). Tap here to confirm: https://leadflow.me/b/${transcriptLead.name
            .toLowerCase()
            .replace(/\s+/g, '-')}`,
          time: '10:14 AM (8s later)',
        },
      ]);
    }
  }, [transcriptLead]);

  const handleSendChatReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const userMsg = replyText.trim();
    setChatHistory((prev) => [...prev, { sender: 'user', text: userMsg, time: 'Just now' }]);
    setReplyText('');

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Got it! We have updated your preference in the doctor's calendar. Our patient coordinator will also ping you 30 minutes before your slot. Have a wonderful day!`,
          time: 'Just now (< 2s)',
        },
      ]);
    }, 900);
  };

  const handleTestWebhook = async () => {
    setIsTesting(true);
    setTestStatus(null);
    try {
      const response = await fetch(localWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          test: true,
          event: 'leadflow_ping',
          message: 'Connection verified from LeadFlow.ai interactive preview',
          timestamp: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        setTestStatus('SUCCESS: Webhook responded with 200 OK!');
      } else {
        setTestStatus(`WARNING: Webhook responded with status ${response.status}`);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Network error or CORS restriction';
      setTestStatus(`NOTICE: Request attempted. Note: Make.com webhooks require CORS or direct POST. (${errorMsg})`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <>
      {/* 1. CHAT TRANSCRIPT MODAL */}
      {transcriptLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 flex flex-col max-h-[90vh] animate-fadeIn">
            {/* Modal Header */}
            <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                  {transcriptLead.initials}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm sm:text-base leading-none">
                      {transcriptLead.name}
                    </h3>
                    <span className="material-symbols-outlined text-xs text-emerald-300 fill-1">
                      verified
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-100 font-mono">
                    {transcriptLead.phone} • WhatsApp Business API
                  </p>
                </div>
              </div>
              <button
                onClick={onCloseTranscript}
                className="text-white/80 hover:text-white p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {/* Sub-bar tags */}
            <div className="bg-[#128C7E] px-4 py-1.5 text-white/90 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
                LeadFlow Agent: Active Auto-Responder
              </span>
              <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded font-mono">
                {transcriptLead.classification}
              </span>
            </div>

            {/* Chat Body */}
            <div className="p-4 overflow-y-auto flex-1 bg-[#efeae2] space-y-3 min-h-[300px]">
              <div className="text-center my-1">
                <span className="bg-white/80 text-[10px] text-gray-600 px-2.5 py-1 rounded-full shadow-2xs">
                  MESSAGES ARE END-TO-END QUALIFIED BY LEADFLOW AI
                </span>
              </div>

              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-start' : 'items-end'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2 text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-white text-gray-900 rounded-tl-none'
                        : 'bg-[#dcf8c6] text-gray-900 rounded-tr-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div className="text-[10px] text-gray-500 text-right mt-1 flex items-center justify-end gap-1">
                      <span>{msg.time}</span>
                      {msg.sender === 'bot' && (
                        <span className="material-symbols-outlined text-xs text-blue-500">
                          done_all
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Chat Input */}
            <form
              onSubmit={handleSendChatReply}
              className="p-3 bg-gray-50 border-t border-gray-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type customer reply to test agent response..."
                className="flex-1 h-9 px-3 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
              <button
                type="submit"
                className="h-9 px-3.5 bg-[#075E54] hover:bg-[#128C7E] text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Send</span>
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. BOOK DEMO MODAL */}
      {isBookDemoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2563eb] text-2xl">
                  calendar_month
                </span>
                <h3 className="font-bold text-lg text-gray-900">Schedule 1-on-1 VIP Demo</h3>
              </div>
              <button
                onClick={onCloseBookDemo}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {demoBooked ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-2xl">check_circle</span>
                </div>
                <h4 className="font-bold text-gray-900 text-base">VIP Product Demo Confirmed!</h4>
                <p className="text-xs text-gray-600">
                  We've reserved {demoTime} on {demoDate} for {demoOrg}. An invite link has been
                  dispatched to your email and WhatsApp.
                </p>
                <button
                  onClick={onCloseBookDemo}
                  className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
                >
                  Return to LeadFlow
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDemoBooked(true);
                }}
                className="space-y-3.5"
              >
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Company / Clinic Name
                  </label>
                  <input
                    type="text"
                    required
                    value={demoOrg}
                    onChange={(e) => setDemoOrg(e.target.value)}
                    className="w-full h-9 px-3 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={demoDate}
                      onChange={(e) => setDemoDate(e.target.value)}
                      className="w-full h-9 px-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Time Slot</label>
                    <select
                      value={demoTime}
                      onChange={(e) => setDemoTime(e.target.value)}
                      className="w-full h-9 px-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:bg-white"
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="02:30 PM">02:30 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-900 space-y-1">
                  <div className="font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">stars</span>
                    What you'll see in the demo:
                  </div>
                  <ul className="list-disc list-inside text-blue-800 text-[11px] space-y-0.5">
                    <li>Live WhatsApp multi-agent qualification under 15 seconds</li>
                    <li>Connecting your current website forms & Google Ads</li>
                    <li>Custom triage and pricing objection rules</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-base">check</span>
                  <span>Confirm Demo Reservation</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. FREE TRIAL ONBOARDING MODAL */}
      {isFreeTrialOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#007d55] text-2xl">rocket_launch</span>
                <h3 className="font-bold text-lg text-gray-900">Start 14-Day Free Trial</h3>
              </div>
              <button
                onClick={onCloseFreeTrial}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {trialCreated ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-2xl">done_all</span>
                </div>
                <h4 className="font-bold text-gray-900 text-base">Workspace Ready!</h4>
                <p className="text-xs text-gray-600">
                  Welcome to LeadFlow.ai! Your dedicated AI agent template for {trialVertical} has
                  been initialized.
                </p>
                <button
                  onClick={onCloseFreeTrial}
                  className="mt-4 px-5 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
                >
                  Launch Dashboard
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setTrialCreated(true);
                }}
                className="space-y-3.5"
              >
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Verma"
                    value={trialName}
                    onChange={(e) => setTrialName(e.target.value)}
                    className="w-full h-9 px-3 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="doctor@apexclinic.com"
                    value={trialEmail}
                    onChange={(e) => setTrialEmail(e.target.value)}
                    className="w-full h-9 px-3 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Primary Industry</label>
                  <select
                    value={trialVertical}
                    onChange={(e) => setTrialVertical(e.target.value)}
                    className="w-full h-9 px-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:bg-white"
                  >
                    <option value="Dental Clinics">Dental Clinics</option>
                    <option value="Private Medical Healthcare">Private Medical Healthcare</option>
                    <option value="Gyms & Fitness Centers">Gyms & Fitness Centers</option>
                    <option value="Coaching & Test Prep">Coaching & Test Prep</option>
                    <option value="Commercial HVAC & Home Services">
                      Commercial HVAC & Home Services
                    </option>
                  </select>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-gray-500 py-1">
                  <span className="material-symbols-outlined text-emerald-600 text-base">
                    check_circle
                  </span>
                  <span>Zero upfront payment. 14 days full feature access.</span>
                </div>

                <button
                  type="submit"
                  className="w-full h-10 bg-[#007d55] hover:bg-[#006242] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
                >
                  <span>Activate 14-Day Free Access</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 4. WEBHOOK / MAKE.COM SETTINGS MODAL */}
      {isWebhookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-gray-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004ac6] text-2xl">webhook</span>
                <h3 className="font-bold text-lg text-gray-900">Make.com Webhook Integration</h3>
              </div>
              <button
                onClick={onCloseWebhookModal}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                Connect LeadFlow.ai to your live Make.com (Integromat), Zapier, or n8n Custom Webhook.
                When you click &ldquo;Submit Enquiry &amp; Trigger AI&rdquo; in the interactive demo, the
                live JSON payload will be dispatched to this URL.
              </p>

              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1">
                  Make.com Custom Webhook Endpoint URL
                </label>
                <input
                  type="text"
                  value={localWebhook}
                  onChange={(e) => setLocalWebhook(e.target.value)}
                  placeholder="https://hook.eu1.make.com/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full h-10 px-3 text-xs font-mono bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Sample Payload Preview */}
              <div className="bg-gray-900 text-gray-200 p-3 rounded-xl text-[11px] font-mono overflow-x-auto">
                <div className="text-gray-400 text-[10px] mb-1">Payload Structure:</div>
                <pre>{`{
  "name": "Rahul Sharma",
  "phone": "+91 98765 43210",
  "email": "rahul.sharma@example.com",
  "service": "Dental Consultation",
  "message": "...",
  "source": "Website"
}`}</pre>
              </div>

              {testStatus && (
                <div className="p-3 rounded-lg text-xs font-mono bg-blue-50 text-blue-900 border border-blue-200">
                  {testStatus}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  disabled={isTesting}
                  onClick={handleTestWebhook}
                  className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-sm">
                    {isTesting ? 'sync' : 'network_check'}
                  </span>
                  <span>{isTesting ? 'Sending Test...' : 'Send Test Ping'}</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onCloseWebhookModal}
                    className="px-3 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSaveWebhookUrl(localWebhook);
                      onCloseWebhookModal();
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Save Endpoint
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
