export interface Website {
  id: string;
  url: string;
  name: string;
  interval: number; // Check interval in milliseconds
  isActive: boolean;
  createdAt: string;
}

export interface UptimeCheck {
  id: string;
  websiteId: string;
  timestamp: string;
  status: 'up' | 'down' | 'slow';
  responseTime: number;
}