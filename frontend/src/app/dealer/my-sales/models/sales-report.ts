export interface SalesReport {
  reportID: string; // [cite: 61]
  metrics: {
    salesVolume: number; // [cite: 62]
    revenueAnalysis: number; // [cite: 62]
  };
  generatedDate: string; // [cite: 63]
}

export interface RevenueTrend {
  month: string;
  revenue: number;
}