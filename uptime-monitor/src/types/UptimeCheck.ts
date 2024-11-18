export interface UptimeCheck {
  timestamp: string;
  status: 'up' | 'down' | 'slow';
  responseTime: number;
}

export interface UptimeStats {
  totalChecks: number;
  uptime: number;
  averageResponseTime: number;
  lastCheck: UptimeCheck;
}