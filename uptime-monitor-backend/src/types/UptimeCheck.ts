// types/UptimeCheck.ts
export interface UptimeCheck {
  timestamp: string;
  status: 'up' | 'down' | 'slow';
  responseTime: number;
  websiteName: string; // Add the website name field
}
