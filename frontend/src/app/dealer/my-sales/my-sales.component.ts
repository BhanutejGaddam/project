import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from './services/analytics.service';
import { SalesReport } from './models/sales-report.model';
import { RevenueChartComponent } from './revenue-chart/revenue-chart.component';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sales-dashboard',
  standalone: true,
  imports: [CommonModule, RevenueChartComponent],
  templateUrl: './my-sales.component.html',
  styleUrl: './my-sales.component.css'
})
export class MySalesComponent implements OnInit {
  report?: SalesReport;
  dealerId: string | null = null;

  private analyticsService = inject(AnalyticsService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // 1. Subscribe to queryParams to support Admin view (e.g., ?dealerId=D363)
    this.route.queryParams.subscribe(params => {
      const urlId = params['dealerId'];

      if (urlId) {
        // SCENARIO: Admin is viewing a specific dealer's details
        this.dealerId = urlId;
        this.loadSalesReport(urlId);
      } else {
        // SCENARIO: Dealer is viewing their own dashboard
        const localId = localStorage.getItem('userId');
        if (localId) {
          this.dealerId = localId;
          this.loadSalesReport(localId);
        } else {
          console.error('No Dealer ID found in URL or LocalStorage.');
        }
      }
    });
  }

  loadSalesReport(id: string): void {
    this.analyticsService.getSalesReport(id).subscribe({
      next: (data) => {
        this.report = data;
      },
      error: (err) => {
        console.error('Failed to load report:', err);
      }
    });
  }

  onGenerateReport(): void {
    const el = document.querySelector<HTMLElement>('.print-area');
    if (!el) return;

    html2canvas(el, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png', 1.0);
      const printWindow = window.open('', '', 'width=900,height=700');
      
      if (!printWindow) return;

      printWindow.document.write(`
        <html>
          <head><title>Dealer Executive Insights</title></head>
          <body style="margin:0; padding:20px; text-align:center;">
            <img src="${imgData}" style="width:100%; max-width:800px;">
          </body>
        </html>
      `);
      printWindow.document.close();

      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 250);
    });
  }
}