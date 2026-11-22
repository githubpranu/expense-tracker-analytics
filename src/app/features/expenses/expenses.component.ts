import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ExpenseService } from '../../core/services/expense.service';
import { SettingsService } from '../../core/services/settings.service';
import { Category, Expense, getCategory } from '../../core/models/expense.model';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent {
  readonly expenses$: Observable<Expense[]> = this.service.getExpenses();
  readonly categories: Category[] = this.service.getCategories();
  readonly currencyCode$: Observable<string> = this.settings.getCurrencyCode();
  readonly currencySymbol$: Observable<string> = this.settings.getCurrencySymbol();
  readonly getCategory = getCategory;

  readonly form = this.fb.nonNullable.group({
    description: ['', [Validators.required, Validators.maxLength(80)]],
    amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
    category: ['food' as Category['id'], Validators.required],
    date: [this.today(), Validators.required],
  });

  constructor(
    private readonly service: ExpenseService,
    private readonly settings: SettingsService,
    private readonly fb: FormBuilder
  ) {}

  add(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.service.addExpense({
      description: value.description.trim(),
      amount: Number(value.amount),
      category: value.category,
      date: value.date,
    });
    this.form.reset({
      description: '',
      amount: null,
      category: 'food',
      date: this.today(),
    });
  }

  remove(id: string): void {
    this.service.deleteExpense(id);
  }

  trackById(_index: number, expense: Expense): string {
    return expense.id;
  }

  private today(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate()
    ).padStart(2, '0')}`;
  }
}
