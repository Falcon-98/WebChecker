import { v4 as uuidv4 } from 'uuid';
import { UptimeCheck, Website } from '../types/Website';

// In-memory storage
let websites: Website[] = [];
let uptimeChecks: Record<string, UptimeCheck[]> = {};

export const websiteDb = {
  addWebsite: (data: Omit<Website, 'id' | 'createdAt'>): Website => {
    const website: Website = {
      id: uuidv4(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    websites.push(website);
    uptimeChecks[website.id] = [];
    return website;
  },

  getWebsites: (): Website[] => {
    return websites;
  },

  getWebsite: (id: string): Website | undefined => {
    return websites.find(w => w.id === id);
  },

  updateWebsite: (id: string, data: Partial<Website>): Website | null => {
    const index = websites.findIndex(w => w.id === id);
    if (index === -1) return null;
    
    websites[index] = { ...websites[index], ...data };
    return websites[index];
  },

  deleteWebsite: (id: string): boolean => {
    const initialLength = websites.length;
    websites = websites.filter(w => w.id !== id);
    delete uptimeChecks[id];
    return websites.length !== initialLength;
  },

  addUptimeCheck: (websiteId: string, check: Omit<UptimeCheck, 'id'>): void => {
    const checkWithId: UptimeCheck = {
      id: uuidv4(),
      ...check,
    };
    if (!uptimeChecks[websiteId]) {
      uptimeChecks[websiteId] = [];
    }
    uptimeChecks[websiteId].push(checkWithId);
    
    // Keep only last 1000 checks per website
    if (uptimeChecks[websiteId].length > 1000) {
      uptimeChecks[websiteId] = uptimeChecks[websiteId].slice(-1000);
    }
  },

  getUptimeChecks: (websiteId: string): UptimeCheck[] => {
    return uptimeChecks[websiteId] || [];
  },
};