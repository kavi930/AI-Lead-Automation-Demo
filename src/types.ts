export interface Lead {
  id: string;
  name: string;
  initials: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  source: string;
  timestamp: string;
  classification: 'HOT LEAD' | 'WARM LEAD' | 'COLD LEAD';
  intentScore: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  detectedIntent: string;
  extractedParameters: {
    name: string;
    service: string;
    targetTime: string;
    urgency: string;
  };
  whatsappPreview: string;
  status: 'Approved' | 'Pending' | 'Follow-up Sent' | 'Converted';
  crmStatus: string;
  timeAgo: string;
}

export interface FeedItem {
  id: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  timestamp: string;
}

export interface IndustryItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  examplePrompt: string;
  presetData: {
    name: string;
    phone: string;
    email: string;
    service: string;
    message: string;
  };
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarUrl: string;
  rating: number;
}
