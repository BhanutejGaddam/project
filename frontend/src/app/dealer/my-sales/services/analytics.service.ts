import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SalesReport, RevenueTrend } from '../models/sales-report.model';
import { MOCK_SALES_REPORT, MOCK_REVENUE_TRENDS } from '../models/mock-analytics-data';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  // Logic for sales performance reports
  getSalesReport(dealerId?: number): Observable<SalesReport> {
    const report = dealerId ? this.getDealerSpecificReport(dealerId) : MOCK_SALES_REPORT;
    return of(report);
  }

  // Logic for tracking revenue trends and profitability
  getRevenueTrends(): Observable<RevenueTrend[]> {
    return of(MOCK_REVENUE_TRENDS);
  }

  private getDealerSpecificReport(dealerId: number): SalesReport {
    // Simple calculation based on dealer ID
    const dealerSize = (dealerId % 3) + 1; // 1, 2, or 3
    const variation = 0.8 + Math.random() * 0.4; // Random between 0.8-1.2

    // Simple capacity based on dealer ID
    const capacities = [3, 5, 7, 4, 6, 8];
    const capacity = capacities[dealerId % capacities.length] || 5;

    return {
      reportID: `DLR-AUTO-2025-REPT-${dealerId.toString().padStart(3, '0')}`,
      metrics: {
        vehiclesSold: Math.floor(450 * dealerSize * variation),
        vehiclesRemaining: Math.floor(150 * dealerSize * variation),
        salesRevenue: Math.floor(8500000 * dealerSize * variation),
        salesProfit: Math.floor(1250000 * dealerSize * variation),
        serviceRequestsProcessed: Math.floor(85 * dealerSize * variation),
        serviceCapacity: capacity,
        serviceRevenue: Math.floor(2100000 * dealerSize * variation),
        serviceProfit: Math.floor(450000 * dealerSize * variation),
        totalConsolidatedRevenue: Math.floor(10600000 * dealerSize * variation),
        netDealerProfit: Math.floor(1700000 * dealerSize * variation)
      },
      generatedDate: new Date().toISOString()
    };
  }
}
