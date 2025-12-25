import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../services/analytics.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<div style="height: 350px;"><canvas #lineChart></canvas></div>`
})
export class RevenueChartComponent implements AfterViewInit {
  @ViewChild('lineChart') lineChartCanvas!: ElementRef;

  constructor(private analyticsService: AnalyticsService) {}

  ngAfterViewInit() {
    this.analyticsService.getRevenueTrends().subscribe(data => {
      new Chart(this.lineChartCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: data.map(d => d.month),
          datasets: [
            { label: 'Vehicle Sales ($)', data: data.map(d => d.salesRevenue), borderColor: '#2563eb', tension: 0.4 },
            { label: 'Service Revenue ($)', data: data.map(d => d.serviceRevenue), borderColor: '#10b981', tension: 0.4 }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    });
  }
}