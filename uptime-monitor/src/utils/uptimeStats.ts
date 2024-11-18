import { UptimeCheck, UptimeStats } from '../types/UptimeCheck';

export function calculateUptimeStats(checks: UptimeCheck[]): UptimeStats {
  const totalChecks = checks.length;
  if (totalChecks === 0) {
    return {
      totalChecks: 0,
      uptime: 0,
      averageResponseTime: 0,
      lastCheck: {
        timestamp: new Date().toISOString(),
        status: 'down',
        responseTime: 0,
      },
    };
  }

  const upChecks = checks.filter((check) => check.status === 'up').length;
  const uptime = (upChecks / totalChecks) * 100;
  const averageResponseTime =
    checks.reduce((sum, check) => sum + check.responseTime, 0) / totalChecks;

  return {
    totalChecks,
    uptime,
    averageResponseTime,
    lastCheck: checks[checks.length - 1],
  };
}