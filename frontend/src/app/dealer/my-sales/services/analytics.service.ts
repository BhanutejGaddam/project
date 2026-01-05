
// my-sales/services/analytics.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SalesReport, RevenueTrend } from '../models/sales-report.model';
import { MOCK_SALES_REPORT, MOCK_REVENUE_TRENDS } from '../models/mock-analytics-data';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  // Existing: sales performance report
  getSalesReport(dealerId?: number): Observable<SalesReport> {
    const report = dealerId ? this.getDealerSpecificReport(dealerId) : MOCK_SALES_REPORT;
    return of(report);
  }

  // ✅ UPDATED: revenue trends per dealer
  getRevenueTrends(dealerId?: number): Observable<RevenueTrend[]> {
    if (!dealerId) {
      // fallback to global mock if no dealerId
      return of(MOCK_REVENUE_TRENDS);
    }
    return of(this.buildDealerTrends(dealerId));
  }

  // ----- helpers -----

  private getDealerSpecificReport(dealerId: number): SalesReport {
    const dealerSize = (dealerId % 3) + 1; // 1..3
    const variation = 0.8 + Math.random() * 0.4; // keep as-is (random each load)

    const capacities = [3, 5, 7, 4, 6, 8];
    const capacity = capacities[dealerId % capacities.length] || 5;

    return {
      reportID: `DLR-AUTO-2025-REPT-${dealerId.toString().padStart(3, '0')}`,
      metrics: {
        vehiclesSold: Math.floor(450 * dealerSize * variation),
        vehiclesRemaining: Math.floor(150 * dealerSize * variation),
        salesRevenue: Math.floor(8_500_000 * dealerSize * variation),
        salesProfit: Math.floor(1_250_000 * dealerSize * variation),
        serviceRequestsProcessed: Math.floor(85 * dealerSize * variation),
        serviceCapacity: capacity,
        serviceRevenue: Math.floor(2_100_000 * dealerSize * variation),
        serviceProfit: Math.floor(450_000 * dealerSize * variation),
        totalConsolidatedRevenue: Math.floor(10_600_000 * dealerSize * variation),
        netDealerProfit: Math.floor(1_700_000 * dealerSize * variation)
      },
      generatedDate: new Date().toISOString()
    };
  }

  /** Build per-dealer revenue trend series (Oct-Nov-Dec) */
  private buildDealerTrends(dealerId: number): RevenueTrend[] {
    // Base monthly values in INR
    const baseSales = [1_100_000, 1_550_000, 1_850_000];
    const baseService = [250_000, 450_000, 550_000];

    // Deterministic multipliers based on dealerId
    const salesMult = [
      0.95 + this.rand(dealerId * 101) * 0.5, // 0.95..1.45
      0.95 + this.rand(dealerId * 211) * 0.5,
      0.95 + this.rand(dealerId * 307) * 0.5,
    ];
    const serviceMult = [
      0.90 + this.rand(dealerId * 401) * 0.4, // 0.90..1.30
      0.90 + this.rand(dealerId * 503) * 0.4,
      0.90 + this.rand(dealerId * 601) * 0.4,
    ];

    const months = ['Oct', 'Nov', 'Dec'];
    return months.map((month, i) => ({
      month,
      salesRevenue: Math.round(baseSales[i] * salesMult[i]),
      serviceRevenue: Math.round(baseService[i] * serviceMult[i]),
    }));
  }

  /** Deterministic pseudo-random 0..1 based on integer seed (Mulberry32-like) */
  private rand(seed: number): number {
    let t = seed >>> 0;
    t += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}
