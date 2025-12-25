import { SalesReport, RevenueTrend } from './sales-report.model';

export const MOCK_SALES_REPORT: SalesReport = {
  reportID: 'DLR-AUTO-2025-REPT-001',
  metrics: {
    vehiclesSold: 450,
    vehiclesRemaining: 150,
    salesRevenue: 8500000,
    salesProfit: 1250000,
    serviceRequestsProcessed: 85,
    serviceCapacity: 5,
    serviceRevenue: 2100000,
    serviceProfit: 450000,
    totalConsolidatedRevenue: 10600000,
    netDealerProfit: 1700000
  },
  generatedDate: new Date().toISOString()
};

export const MOCK_REVENUE_TRENDS: RevenueTrend[] = [
  { month: 'Oct', salesRevenue: 1100000, serviceRevenue: 250000 },
  { month: 'Nov', salesRevenue: 1550000, serviceRevenue: 450000 },
  { month: 'Dec', salesRevenue: 1850000, serviceRevenue: 550000 }
];