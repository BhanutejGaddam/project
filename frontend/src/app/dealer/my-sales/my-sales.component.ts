import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AnalyticsService } from './services/analytics.service';
import { SalesReport } from './models/sales-report.model';
import { RevenueChartComponent } from './revenue-chart/revenue-chart.component';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-sales-dashboard',
  standalone: true,
  imports: [CommonModule, RevenueChartComponent],
  templateUrl: './my-sales.component.html',
  styleUrl: './my-sales.component.css'
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
    // window.print();

    
  
const el = document.querySelector<HTMLElement>('.print-area');
  if (!el) return;

  // Capture the element; increase scale for sharper text/charts
  html2canvas(el, { scale: 1 }).then(canvas => {
    const imgData = canvas.toDataURL('image/png', 1.0);

    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    printWindow.document.title = 'Dealer Executive Insights';

    const img = printWindow.document.createElement('img');
    img.src = imgData;
    printWindow.document.body.appendChild(img);

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 100);
  });


  }
}
