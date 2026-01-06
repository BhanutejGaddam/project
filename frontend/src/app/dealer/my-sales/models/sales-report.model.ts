export interface SalesReport {
  reportID: string; // [cite: 61]
  metrics: {
    // Vehicle Inventory Metrics
    vehiclesSold: number;
    vehiclesRemaining: number;
    salesRevenue: number;
    salesProfit: number;

    // Service Workshop Metrics
    serviceRequestsProcessed: number; // [cite: 45]
    serviceCapacity: number; // Daily service capacity
    serviceRevenue: number;
    serviceProfit: number;

    // Consolidated Metrics
    totalConsolidatedRevenue: number; // [cite: 62]
    netDealerProfit: number; // 
  };
  generatedDate: string; // [cite: 63]
}

export interface RevenueTrend {
  dealerId: number;
  dealerSales: {
  month: string;
  salesRevenue: number;
  serviceRevenue: number;
  }[]
}