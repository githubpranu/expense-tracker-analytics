import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExpenseService } from '../../core/services/expense.service';
import { SettingsService } from '../../core/services/settings.service';
import {
  CategoryTotal,
  Expense,
  getCategory,
} from '../../core/models/expense.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  readonly total$: Observable<number> = this.service.getTotal();
  readonly monthTotal$: Observable<number> = this.service.getCurrentMonthTotal();
  readonly categoryTotals$: Observable<CategoryTotal[]> = this.service.getTotalsByCategory();
  readonly recent$: Observable<Expense[]> = this.service
    .getExpenses()
    .pipe(map((list) => list.slice(0, 5)));
  readonly count$: Observable<number> = this.service.getExpenses().pipe(map((l) => l.length));
  readonly topCategory$: Observable<CategoryTotal | undefined> = this.categoryTotals$.pipe(
    map((totals) => totals[0])
  );

  readonly getCategory = getCategory;
  readonly currencyCode$: Observable<string> = this.settings.getCurrencyCode();
  readonly currencySymbol$: Observable<string> = this.settings.getCurrencySymbol();

  constructor(
    private readonly service: ExpenseService,
    private readonly settings: SettingsService
  ) {}
}
