import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseService } from '../../core/services/expense.service';
import { SettingsService } from '../../core/services/settings.service';
import { CategoryTotal } from '../../core/models/expense.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  readonly totals$: Observable<CategoryTotal[]> = this.service.getTotalsByCategory();
  readonly currencyCode$: Observable<string> = this.settings.getCurrencyCode();

  constructor(
    private readonly service: ExpenseService,
    private readonly settings: SettingsService
  ) {}

  trackById(_index: number, ct: CategoryTotal): string {
    return ct.category.id;
  }
}
