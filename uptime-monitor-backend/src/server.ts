import axios from 'axios';
import cors from 'cors';
import express from 'express';
import { CONFIG } from './config/config';
import { UptimeCheck } from './types/UptimeCheck';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/securityscorecard', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.securityscorecard.io/companies/eguardian.com/history/events',
      {
        headers: {
          Authorization: 'Token P5IMS6RXrJtAentsjat7jPUs5gxf',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from SecurityScorecard' });
  }
});


// In-memory storage for uptime data
let uptimeData: UptimeCheck[] = [];

async function checkWebsite(url: string, websiteName: string): Promise<UptimeCheck> {
  const startTime = Date.now();
  try {
    const response = await axios.get(url, { timeout: 10000 });
    const responseTime = Date.now() - startTime;
    
    return {
      timestamp: new Date().toISOString(),
      status: responseTime > CONFIG.RESPONSE_THRESHOLD ? 'slow' : 'up',
      responseTime,
      websiteName, // Include website name in the result
    };
  } catch (error) {
    return {
      timestamp: new Date().toISOString(),
      status: 'down',
      responseTime: Date.now() - startTime,
      websiteName, // Include website name in the result
    };
  }
}

// API endpoint to get uptime data
app.get('/api/uptime', (req, res) => {
  res.json(uptimeData.slice(-50)); // Return the last 50 checks along with the website name
});

// Start monitoring
async function startMonitoring() {
  setInterval(async () => {
    for (const website of CONFIG.WEBSITES) {
      const check = await checkWebsite(website.url, website.name); // Pass the website name
      uptimeData.push(check);
      
      // Keep only last 1000 checks in memory
      if (uptimeData.length > 1000) {
        uptimeData = uptimeData.slice(-1000);
      }
    }
  }, CONFIG.CHECK_INTERVAL);
}

app.listen(CONFIG.PORT, () => {
  console.log(`Server running on port ${CONFIG.PORT}`);
  console.log(`Frontend running on port http://localhost:${CONFIG.PORT}`);
  console.log(`Check interval: ${CONFIG.CHECK_INTERVAL}ms`);
  console.log(`Response threshold: ${CONFIG.RESPONSE_THRESHOLD}ms`);
  console.log(`Monitoring websites: ${CONFIG.WEBSITES.map(website => website.name).join(', ')}`);
  startMonitoring();
});
