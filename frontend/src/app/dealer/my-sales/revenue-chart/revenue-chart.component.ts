
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../services/analytics.service';
import { RevenueTrend } from '../models/sales-report.model';

type Point = { x: number; y: number };

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.css']
})
export class RevenueChartComponent implements OnChanges {
  @Input() dealerId?: number;

  trends: RevenueTrend[] = [];
  loading = false;

  /** Base drawing size; scalable via viewBox */
  baseWidth = 720;
  baseHeight = 380;

  /** Margins tuned to avoid overlap and match the screenshot feel */
  margin = { top: 78, right: 32, bottom: 54, left: 96 };

  salesPoints: Point[] = [];
  servicePoints: Point[] = [];

  xLabels: string[] = [];
  yTicks: number[] = [];
  yMax = 0;

  constructor(private analytics: AnalyticsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dealerId']) {
      this.loadTrends();
    }
  }

  private loadTrends(): void {
    this.loading = true;
    this.analytics.getRevenueTrends(this.dealerId).subscribe({
      next: (t) => {
        this.trends = t;
        this.loading = false;
        this.prepareChart();
      },
      error: () => {
        this.trends = [];
        this.loading = false;
        this.prepareChart();
      }
    });
  }

  private prepareChart(): void {
    this.xLabels = this.trends.map(t => t.month);

    const maxSales = Math.max(0, ...this.trends.map(t => t.salesRevenue));
    const maxService = Math.max(0, ...this.trends.map(t => t.serviceRevenue));
    this.yMax = Math.max(maxSales, maxService);
    if (this.yMax === 0) this.yMax = 1;
    this.yMax = Math.ceil(this.yMax * 1.10);

    const tickCount = 5;
    const step = this.yMax / tickCount;
    this.yTicks = Array.from({ length: tickCount + 1 }, (_, i) => Math.round(i * step));

    const innerW = this.baseWidth - this.margin.left - this.margin.right;
    const innerH = this.baseHeight - this.margin.top - this.margin.bottom;

    const n = Math.max(1, this.trends.length);
    const dx = innerW / (n - 1 || 1);

    const toY = (v: number) => this.margin.top + innerH - (v / this.yMax) * innerH;
    const toX = (i: number) => this.margin.left + dx * i;

    this.salesPoints = this.trends.map((t, i) => ({ x: toX(i), y: toY(t.salesRevenue) }));
    this.servicePoints = this.trends.map((t, i) => ({ x: toX(i), y: toY(t.serviceRevenue) }));
  }

  path(points: Point[]): string {
    if (!points.length) return '';
    return points.map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`)).join(' ');
  }

  /** Indian-number grouping (e.g., 2330039 -> "23,30,039") */
  formatIndianNumber(num: number): string {
    const s = Math.round(num).toString();
    if (s.length <= 3) return s;
    const last3 = s.slice(-3);
    let rest = s.slice(0, -3);
    const parts: string[] = [];
    while (rest.length > 2) {
      parts.unshift(rest.slice(-2));
      rest = rest.slice(0, -2);
    }
    if (rest) parts.unshift(rest);
    return `${parts.join(',')},${last3}`;
  }

  // label/line positions
  xLabelX(i: number): number {
    const innerW = this.baseWidth - this.margin.left - this.margin.right;
    const n = Math.max(1, this.trends.length);
    const dx = innerW / (n - 1 || 1);
    return this.margin.left + dx * i;
  }
  xLabelY(): number {
    return this.baseHeight - this.margin.bottom + 24;
  }
  yTickX(): number {
    return this.margin.left - 14;
  }
  yTickY(v: number): number {
    const innerH = this.baseHeight - this.margin.top - this.margin.bottom;
    const toY = (val: number) => this.margin.top + innerH - (val / this.yMax) * innerH;
    return toY(v);
  }

  /** Single vertical line at "Nov" for the mid divider */
  midGridX(): number | null {
    const idx = this.xLabels.indexOf('Nov');
    return idx === -1 ? null : this.xLabelX(idx);
  }
}
