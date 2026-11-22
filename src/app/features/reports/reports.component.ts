import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExpenseService } from '../../core/services/expense.service';
import { SettingsService } from '../../core/services/settings.service';
import { MonthlyTotal } from '../../core/models/expense.model';

interface MonthlyView extends MonthlyTotal {
  percentage: number;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  readonly monthly$: Observable<MonthlyView[]> = this.service.getMonthlyTotals(6).pipe(
    map((totals) => {
      const max = Math.max(...totals.map((t) => t.total), 1);
      return totals.map((t) => ({ ...t, percentage: (t.total / max) * 100 }));
    })
  );

  readonly average$: Observable<number> = this.monthly$.pipe(
    map((totals) => {
      const active = totals.filter((t) => t.total > 0);
      if (active.length === 0) {
        return 0;
      }
      return active.reduce((sum, t) => sum + t.total, 0) / active.length;
    })
  );

  readonly currencyCode$: Observable<string> = this.settings.getCurrencyCode();
  readonly currencySymbol$: Observable<string> = this.settings.getCurrencySymbol();

  constructor(
    private readonly service: ExpenseService,
    private readonly settings: SettingsService
  ) {}

  exportCsv(): void {
    const csv = this.service.exportCsv();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expenses-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
