export interface SalesReport {
  reportID: string;
  generatedDate: string;
  metrics: {
    vehiclesSold: number;
    vehiclesRemaining: number;
    salesRevenue: number;
    salesProfit: number;
    serviceRequestsProcessed: number;
    serviceCapacity: number;
    serviceRevenue: number;
    serviceProfit: number;
    netDealerProfit: number;
  };
}

export interface RevenueTrend {
  dealerSales: Array<{
    month: string;
    salesRevenue: number;
    serviceRevenue: number;
  }>;
}