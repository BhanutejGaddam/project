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
  {
    dealerId: 101,
    dealerSales: [{ month: 'Oct', salesRevenue: 1100000, serviceRevenue: 250000 },
  { month: 'Nov', salesRevenue: 1550000, serviceRevenue: 450000 },
  { month: 'Dec', salesRevenue: 1850000, serviceRevenue: 550000 }
]},
{
    dealerId: 102,
    dealerSales: [{ month: 'Oct', salesRevenue: 900000, serviceRevenue: 200000 },
  { month: 'Nov', salesRevenue: 1300000, serviceRevenue: 350000 },
  { month: 'Dec', salesRevenue: 1600000, serviceRevenue: 500000 }
]},
{
    dealerId: 103,
    dealerSales: [{ month: 'Oct', salesRevenue: 1200000, serviceRevenue: 300000 },
  { month: 'Nov', salesRevenue: 1700000, serviceRevenue: 400000 },
  { month: 'Dec', salesRevenue: 2000000, serviceRevenue: 600000 }
]},
{
    dealerId: 104,
    dealerSales: [{ month: 'Oct', salesRevenue: 1000000, serviceRevenue: 220000 },
  { month: 'Nov', salesRevenue: 1400000, serviceRevenue: 370000 },
  { month: 'Dec', salesRevenue: 1750000, serviceRevenue: 520000 }
]
}
  
];