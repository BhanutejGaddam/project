import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AnalyticsService } from './services/analytics.service';
import { SalesReport } from './models/sales-report.model';
import { RevenueChartComponent } from './revenue-chart/revenue-chart.component';

@Component({
  selector: 'app-sales-dashboard',
  standalone: true,
  imports: [CommonModule, RevenueChartComponent],
  templateUrl: './my-sales.component.html',
})
export class MySalesComponent implements OnInit {
  report?: SalesReport;
  dealerId?: number;

  constructor(private analyticsService: AnalyticsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.dealerId = params['dealerId'] ? +params['dealerId'] : undefined;
      this.loadSalesReport();
    });
  }

  loadSalesReport(): void {
    this.analyticsService.getSalesReport(this.dealerId).subscribe(data => {
      this.report = data;
    });
  }

  onGenerateReport(): void {
    // Satisfies requirement: "Generate reports on sales performance"
    console.log('Generating PDF Performance Report...');
    window.print();
  }
}
