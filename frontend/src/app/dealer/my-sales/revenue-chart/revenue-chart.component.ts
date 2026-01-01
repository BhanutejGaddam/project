import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../services/analytics.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { RevenueTrend } from '../models/sales-report.model';

Chart.register(...registerables);

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<div style="height: 350px;"><canvas #lineChart></canvas></div>`
})
export class RevenueChartComponent implements AfterViewInit {
  @ViewChild('lineChart') lineChartCanvas!: ElementRef;
  @Input() dealerId?: number;

  constructor(private analyticsService: AnalyticsService) {}

  ngAfterViewInit() {
    
this.analyticsService.getRevenueTrends(this.dealerId).subscribe({
      next: (trend: RevenueTrend) => {
        const labels = trend.dealerSales.map((d) => d.month);
        const salesRevenue = trend.dealerSales.map((d) => d.salesRevenue);
        const serviceRevenue = trend.dealerSales.map((d) => d.serviceRevenue);
          new Chart(this.lineChartCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            { label: 'Vehicle Sales ($)', data: salesRevenue, borderColor: '#2563eb', tension: 0.4 },
            { label: 'Service Revenue ($)', data: serviceRevenue, borderColor: '#10b981', tension: 0.4 }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
      }
  });

  }
}