import React, { useState } from 'react';
import { Lead } from '../types';

interface InteractiveDemoProps {
  onLeadGenerated: (lead: Lead) => void;
  customWebhookUrl: string;
  onOpenWebhookModal: () => void;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({
  onLeadGenerated,
  customWebhookUrl,
  onOpenWebhookModal,
}) => {
  const [name, setName] = useState('Rahul Sharma');
  const [code, setCode] = useState('+91');
  const [phone, setPhone] = useState('98765 43210');
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [service, setService] = useState('Dental Consultation');
  const [message, setMessage] = useState(
    'Looking for teeth alignment consultation this Saturday morning. Mild pain on lower molar. Need urgent slot.'
  );

  const [isLoading, setIsLoading] = useState(false);
  const [analysisDuration, setAnalysisDuration] = useState('1.4s');
  const [feedbackAlert, setFeedbackAlert] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);

  // Live output state
  const [classification, setClassification] = useState<'HOT LEAD' | 'WARM LEAD' | 'COLD LEAD'>('HOT LEAD');
  const [score, setScore] = useState(96);
  const [priority, setPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [followupTime, setFollowupTime] = useState('In 15 Mins');
  const [extractedName, setExtractedName] = useState('👤 Rahul Sharma');
  const [extractedService, setExtractedService] = useState('🦷 Service: Dental Consultation');
  const [extractedTarget, setExtractedTarget] = useState('📅 Target: Saturday Morning');
  const [extractedUrgency, setExtractedUrgency] = useState('🚨 Urgency: Molar Discomfort');
  const [whatsappMessage, setWhatsappMessage] = useState(
    "\"Hi Rahul! Thanks for contacting Apex Dental. We noticed you're looking for a consultation regarding lower molar discomfort this Saturday morning. Dr. Verma has a VIP slot open at 10:30 AM. Tap below to confirm your visit in 5 seconds: https://leadflow.me/b/dr-v-sat\""
  );
  const [copied, setCopied] = useState(false);

  // Quick Preset Handlers
  const applyPreset = (presetKey: string) => {
    setFeedbackAlert(null);
    if (presetKey === 'dental') {
      setName('Rahul Sharma');
      setCode('+91');
      setPhone('98765 43210');
      setEmail('rahul.sharma@example.com');
      setService('Dental Consultation');
      setMessage('Looking for teeth alignment consultation this Saturday morning. Mild pain on lower molar. Need urgent slot.');
    } else if (presetKey === 'gym') {
      setName('Marcus Bell');
      setCode('+1');
      setPhone('646 555 8920');
      setEmail('marcus.bell@fitness.org');
      setService('Gym Membership');
      setMessage('Interested in elite personal training and 3-day guest pass. Morning 6 AM slots preferred.');
    } else if (presetKey === 'ielts') {
      setName('Pooja Varma');
      setCode('+91');
      setPhone('98200 45112');
      setEmail('pooja.v@academics.com');
      setService('IELTS / Exam Coaching');
      setMessage('Need band 7.5 for Canada PR immigration. Looking for weekend live demo lecture and fees.');
    } else if (presetKey === 'hvac') {
      setName('David Reynolds');
      setCode('+1');
      setPhone('415 890 2134');
      setEmail('david.r@enterprise.com');
      setService('Commercial HVAC Service');
      setMessage('Commercial chiller unit stopped cooling on 3rd floor. Server room overheating. Need immediate tech.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedbackAlert(null);

    const startTime = performance.now();
    const fullPhone = `${code} ${phone}`.trim();

    // Natural Language heuristic classification
    const lowerMsg = message.toLowerCase();
    let calculatedScore = 85;
    let calculatedPriority: 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM';
    let calculatedClass: 'HOT LEAD' | 'WARM LEAD' | 'COLD LEAD' = 'WARM LEAD';
    let detectedUrgency = 'Normal Inquiry';
    let detectedTarget = 'Next Available Slot';

    if (
      lowerMsg.includes('urgent') ||
      lowerMsg.includes('pain') ||
      lowerMsg.includes('immediate') ||
      lowerMsg.includes('emergency') ||
      lowerMsg.includes('overheating') ||
      lowerMsg.includes('asap') ||
      lowerMsg.includes('today')
    ) {
      calculatedScore = Math.floor(Math.random() * 5) + 95;
      calculatedPriority = 'HIGH';
      calculatedClass = 'HOT LEAD';
      detectedUrgency = 'High Urgency / Immediate';
    } else if (lowerMsg.includes('saturday') || lowerMsg.includes('tomorrow') || lowerMsg.includes('weekend')) {
      calculatedScore = Math.floor(Math.random() * 6) + 90;
      calculatedPriority = 'HIGH';
      calculatedClass = 'HOT LEAD';
      detectedUrgency = 'Time-Sensitive Booking';
    } else {
      calculatedScore = Math.floor(Math.random() * 10) + 80;
      calculatedPriority = 'MEDIUM';
      calculatedClass = 'WARM LEAD';
      detectedUrgency = 'Standard Information Request';
    }

    if (lowerMsg.includes('saturday morning')) detectedTarget = 'Saturday Morning (10:30 AM)';
    else if (lowerMsg.includes('weekend')) detectedTarget = 'Weekend Demo Session';
    else if (lowerMsg.includes('tomorrow')) detectedTarget = 'Tomorrow Afternoon';
    else if (lowerMsg.includes('morning')) detectedTarget = 'Morning Slot (8:00 AM - 11:00 AM)';
    else detectedTarget = 'Priority 24h Window';

    const firstName = name.trim().split(' ')[0] || 'there';
    const slug = firstName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const personalizedWhatsApp = `"Hi ${firstName}! Thanks for contacting our team regarding ${service}. We received your note: '${message.slice(0, 42)}...' and reserved a high-priority reservation slot for you (${detectedTarget}). Tap below to confirm in 5 seconds: https://leadflow.me/b/${slug}-slot"`;

    // Attempt actual Make.com Webhook if configured, else simulate
    const payload = {
      name: name.trim(),
      phone: fullPhone,
      email: email.trim(),
      service,
      message: message.trim(),
      source: 'Website Live Demo',
      qualification: {
        score: calculatedScore,
        classification: calculatedClass,
        priority: calculatedPriority,
        urgency: detectedUrgency,
      },
      timestamp: new Date().toISOString(),
    };

    let webhookDispatched = false;
    if (customWebhookUrl && customWebhookUrl !== 'PASTE_YOUR_MAKE_WEBHOOK_URL_HERE') {
      try {
        const res = await fetch(customWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          webhookDispatched = true;
        }
      } catch (err) {
        console.warn('Webhook dispatch caught:', err);
      }
    }

    // Realistic processing delay for AI feel
    await new Promise((resolve) => setTimeout(resolve, 850));

    const durationSec = Math.max(0.7, (performance.now() - startTime) / 1000).toFixed(1);
    setAnalysisDuration(`${durationSec}s`);

    // Update simulation displays
    setClassification(calculatedClass);
    setScore(calculatedScore);
    setPriority(calculatedPriority);
    setFollowupTime(calculatedPriority === 'HIGH' ? 'In 15 Mins' : 'In 45 Mins');
    setExtractedName(`👤 ${name.trim() || 'Lead'}`);
    setExtractedService(`🏷️ ${service}`);
    setExtractedTarget(`📅 ${detectedTarget}`);
    setExtractedUrgency(`🚨 ${detectedUrgency}`);
    setWhatsappMessage(personalizedWhatsApp);

    // Create new Lead record and add to parent dashboard state
    const newLead: Lead = {
      id: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim() || 'Valued Client',
      initials: (name.trim() || 'VC')
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      phone: fullPhone,
      email: email.trim(),
      service,
      message: message.trim(),
      source: 'Live Demo Form',
      timestamp: 'Just now',
      timeAgo: 'Just now',
      classification: calculatedClass,
      intentScore: calculatedScore,
      priority: calculatedPriority,
      detectedIntent: service + ' Inquiry',
      extractedParameters: {
        name: name.trim(),
        service,
        targetTime: detectedTarget,
        urgency: detectedUrgency,
      },
      whatsappPreview: personalizedWhatsApp,
      status: 'Approved',
      crmStatus: webhookDispatched ? 'Synced to Live Webhook & CRM' : 'Synced to Local CRM Record',
    };

    onLeadGenerated(newLead);

    setIsLoading(false);
    if (webhookDispatched) {
      setFeedbackAlert({
        type: 'success',
        text: 'Enquiry processed by AI & dispatched to your live Make.com webhook!',
      });
    } else {
      setFeedbackAlert({
        type: 'success',
        text: 'AI successfully evaluated intent score (96/100), structured CRM parameters, and formatted WhatsApp booking dispatch!',
      });
    }
  };

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-20 bg-[#f8f9ff]" id="live-demo-interactive">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase font-bold tracking-wider text-[#007d55] px-3.5 py-1 rounded-full bg-white shadow-xs border border-gray-100 inline-block">
            Interactive Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1c30] tracking-tight mt-3 mb-3">
            Test the AI Engine in Real Time
          </h2>
          <p className="text-sm sm:text-base text-[#434655]">
            Submit a simulated customer enquiry below to watch the LeadFlow AI qualification agent
            classify intent, evaluate score, and formulate WhatsApp automation.
          </p>

          {/* Preset Buttons */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-[#737686] font-medium mr-1">Try Scenario:</span>
            <button
              onClick={() => applyPreset('dental')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all shadow-2xs"
            >
              🦷 Dental Clinic
            </button>
            <button
              onClick={() => applyPreset('gym')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all shadow-2xs"
            >
              🏋️ Fitness Pass
            </button>
            <button
              onClick={() => applyPreset('ielts')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all shadow-2xs"
            >
              📚 IELTS Prep
            </button>
            <button
              onClick={() => applyPreset('hvac')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all shadow-2xs"
            >
              ❄️ Emergency HVAC
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-[#0b1c30]">Simulated Customer Lead</h3>
                <p className="text-xs text-[#434655]">Fill details as an interested customer</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#004ac6] bg-[#dae2fd]/60 px-2.5 py-1 rounded-full">
                Live Input
              </span>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-medium text-[#0b1c30] mb-1.5" htmlFor="demo-name">
                  Full Name
                </label>
                <input
                  id="demo-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all border border-transparent focus:border-blue-300"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-medium text-[#0b1c30] mb-1.5" htmlFor="demo-code">
                    Code
                  </label>
                  <select
                    id="demo-code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-10 px-2 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs sm:text-sm focus:bg-white focus:outline-none border border-transparent focus:border-blue-300"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+61">🇦🇺 +61</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-[#0b1c30] mb-1.5" htmlFor="demo-phone">
                    Phone Number
                  </label>
                  <input
                    id="demo-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-none border border-transparent focus:border-blue-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0b1c30] mb-1.5" htmlFor="demo-email">
                  Email Address
                </label>
                <input
                  id="demo-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-none border border-transparent focus:border-blue-300"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0b1c30] mb-1.5" htmlFor="demo-service">
                  Service Required
                </label>
                <select
                  id="demo-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-none border border-transparent focus:border-blue-300"
                >
                  <option value="Dental Consultation">Dental Consultation</option>
                  <option value="Gym Membership">Gym & Personal Training</option>
                  <option value="IELTS / Exam Coaching">IELTS / Exam Coaching</option>
                  <option value="Private Clinic Checkup">Private Clinic Checkup</option>
                  <option value="Commercial HVAC Service">Commercial HVAC Service</option>
                  <option value="School Admissions & Tour">School Admissions & Tour</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0b1c30] mb-1.5" htmlFor="demo-message">
                  Customer Message / Enquiry
                </label>
                <textarea
                  id="demo-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-none resize-none border border-transparent focus:border-blue-300"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-lg bg-[#2563eb] text-white text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-[#1d4ed8] shadow-sm transition-all disabled:opacity-75 cursor-pointer mt-2"
              >
                <span
                  className={`material-symbols-outlined text-lg ${isLoading ? 'animate-spin' : ''}`}
                >
                  {isLoading ? 'sync' : 'bolt'}
                </span>
                <span>{isLoading ? 'AI Analyzing Intent...' : 'Submit Enquiry & Trigger AI'}</span>
              </button>

              {/* Feedback Alert Container */}
              {feedbackAlert && (
                <div
                  className={`p-3.5 rounded-lg text-xs font-medium transition-all flex items-start gap-2.5 ${
                    feedbackAlert.type === 'success'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}
                >
                  <span className="material-symbols-outlined text-base shrink-0 mt-0.5 text-emerald-600">
                    check_circle
                  </span>
                  <div className="flex-1 leading-relaxed">{feedbackAlert.text}</div>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <p className="text-[11px] text-[#737686]">⚡ AI Analyzes & Formulates Response in &lt; 2s</p>
                <button
                  type="button"
                  onClick={onOpenWebhookModal}
                  className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-medium"
                >
                  <span className="material-symbols-outlined text-sm">settings_input_component</span>
                  <span>Webhook Setup</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live Output Preview */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#007d55] animate-pulse"></span>
                  <h3 className="text-xl font-bold text-[#0b1c30]">
                    AI Qualification Engine Simulation
                  </h3>
                </div>
                <span className="text-xs text-[#007d55] font-semibold bg-[#eff4ff] px-3 py-1 rounded-full border border-emerald-100">
                  Analyzed in {analysisDuration}
                </span>
              </div>

              {/* Dynamic Intelligence Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-[#eff4ff] p-3 rounded-xl border border-blue-50">
                  <span className="text-xs text-[#434655] block mb-1">Classification</span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#007d55] bg-white px-2.5 py-0.5 rounded-full shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007d55]"></span>
                    {classification}
                  </span>
                </div>
                <div className="bg-[#eff4ff] p-3 rounded-xl border border-blue-50">
                  <span className="text-xs text-[#434655] block mb-1">Intent Score</span>
                  <span className="text-lg font-bold text-[#0b1c30]">{score} / 100</span>
                </div>
                <div className="bg-[#eff4ff] p-3 rounded-xl border border-blue-50">
                  <span className="text-xs text-[#434655] block mb-1">Priority</span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                      priority === 'HIGH'
                        ? 'text-red-700 bg-red-100'
                        : 'text-amber-700 bg-amber-100'
                    }`}
                  >
                    {priority}
                  </span>
                </div>
                <div className="bg-[#eff4ff] p-3 rounded-xl border border-blue-50">
                  <span className="text-xs text-[#434655] block mb-1">Follow-up</span>
                  <span className="text-xs font-semibold text-[#004ac6]">{followupTime}</span>
                </div>
              </div>

              {/* Extracted Entity Breakdown */}
              <div className="bg-[#eff4ff] p-4 rounded-xl mb-6 space-y-2 border border-blue-50">
                <div className="text-[11px] uppercase font-bold text-[#434655] tracking-wider mb-2">
                  Extracted Parameter Matrix
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-white px-3 py-1 rounded-md text-[#0b1c30] font-medium shadow-2xs border border-gray-100">
                    {extractedName}
                  </span>
                  <span className="bg-white px-3 py-1 rounded-md text-[#0b1c30] font-medium shadow-2xs border border-gray-100">
                    {extractedService}
                  </span>
                  <span className="bg-white px-3 py-1 rounded-md text-[#0b1c30] font-medium shadow-2xs border border-gray-100">
                    {extractedTarget}
                  </span>
                  <span className="bg-white px-3 py-1 rounded-md text-red-600 font-medium shadow-2xs border border-gray-100">
                    {extractedUrgency}
                  </span>
                </div>
              </div>

              {/* Simulated WhatsApp Message Dispatched */}
              <div className="bg-[#e5eeff]/70 p-4 rounded-xl mb-6 border border-blue-100">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold text-[#007d55] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">chat</span> Instant WhatsApp
                    Outbound Dispatched
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#737686] text-[11px]">Sent just now</span>
                    <button
                      onClick={handleCopyWhatsApp}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-0.5 ml-1"
                      title="Copy dispatch text"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {copied ? 'check' : 'content_copy'}
                      </span>
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-xs text-[#0b1c30] text-xs sm:text-sm leading-relaxed border border-gray-100 font-sans">
                  {whatsappMessage}
                </div>
              </div>
            </div>

            {/* Notification Feedback Bar */}
            <div className="flex items-center justify-between bg-[#dae2fd]/40 p-3.5 rounded-lg text-[#0b1c30] text-xs sm:text-sm border border-[#c3c6d7]/30">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2563eb] text-base">task_alt</span>
                <span>CRM Record updated & Doctor schedule reserved.</span>
              </span>
              <span className="text-xs text-[#004ac6] font-bold px-2 py-0.5 rounded bg-white/80 shadow-2xs">
                Synced
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
