import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CATEGORIES,
  Category,
  CategoryId,
  CategoryTotal,
  Expense,
  MonthlyTotal,
  getCategory,
} from '../models/expense.model';

const STORAGE_KEY = 'eta.expenses';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private readonly expenses$ = new BehaviorSubject<Expense[]>(this.load());

  getExpenses(): Observable<Expense[]> {
    return this.expenses$.asObservable().pipe(
      map((list) => [...list].sort((a, b) => b.date.localeCompare(a.date)))
    );
  }

  getCategories(): Category[] {
    return CATEGORIES;
  }

  addExpense(input: Omit<Expense, 'id'>): void {
    const expense: Expense = { ...input, id: this.createId() };
    const next = [...this.expenses$.value, expense];
    this.commit(next);
  }

  deleteExpense(id: string): void {
    this.commit(this.expenses$.value.filter((e) => e.id !== id));
  }

  getTotalsByCategory(): Observable<CategoryTotal[]> {
    return this.expenses$.pipe(
      map((list) => {
        const grandTotal = list.reduce((sum, e) => sum + e.amount, 0);
        return CATEGORIES.map((category) => {
          const items = list.filter((e) => e.category === category.id);
          const total = items.reduce((sum, e) => sum + e.amount, 0);
          return {
            category,
            total,
            count: items.length,
            percentage: grandTotal > 0 ? (total / grandTotal) * 100 : 0,
          };
        })
          .filter((ct) => ct.count > 0)
          .sort((a, b) => b.total - a.total);
      })
    );
  }

  getMonthlyTotals(months = 6): Observable<MonthlyTotal[]> {
    return this.expenses$.pipe(
      map((list) => {
        const result: MonthlyTotal[] = [];
        const now = new Date();
        for (let i = months - 1; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
          const total = list
            .filter((e) => e.date.startsWith(key))
            .reduce((sum, e) => sum + e.amount, 0);
          result.push({
            month: key,
            label: d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
            total,
          });
        }
        return result;
      })
    );
  }

  getCurrentMonthTotal(): Observable<number> {
    const key = this.monthKey(new Date());
    return this.expenses$.pipe(
      map((list) =>
        list.filter((e) => e.date.startsWith(key)).reduce((sum, e) => sum + e.amount, 0)
      )
    );
  }

  getTotal(): Observable<number> {
    return this.expenses$.pipe(map((list) => list.reduce((sum, e) => sum + e.amount, 0)));
  }

  exportCsv(): string {
    const header = 'Date,Description,Category,Amount';
    const rows = [...this.expenses$.value]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((e) => {
        const label = getCategory(e.category).label;
        const description = `"${e.description.replace(/"/g, '""')}"`;
        return `${e.date},${description},${label},${e.amount.toFixed(2)}`;
      });
    return [header, ...rows].join('\n');
  }

  private commit(list: Expense[]): void {
    this.expenses$.next(list);
    this.save(list);
  }

  private monthKey(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }

  private createId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  private load(): Expense[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw) as Expense[];
      }
    } catch {
      // ignore malformed storage and fall back to seed data
    }
    return this.seed();
  }

  private save(list: Expense[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // storage may be unavailable (private mode); keep in-memory only
    }
  }

  private seed(): Expense[] {
    const today = new Date();
    const iso = (offsetDays: number): string => {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - offsetDays);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate()
      ).padStart(2, '0')}`;
    };
    const make = (
      description: string,
      amount: number,
      category: CategoryId,
      offsetDays: number
    ): Expense => ({ id: this.createId(), description, amount, category, date: iso(offsetDays) });

    return [
      make('Grocery shopping', 86.4, 'food', 1),
      make('Monthly bus pass', 55, 'transport', 3),
      make('Electricity bill', 120.75, 'utilities', 5),
      make('Cinema tickets', 32, 'entertainment', 6),
      make('Pharmacy', 18.9, 'health', 8),
      make('Rent', 950, 'housing', 10),
      make('New headphones', 149.99, 'shopping', 12),
      make('Dinner out', 64.2, 'food', 14),
      make('Fuel', 48.3, 'transport', 20),
      make('Internet bill', 45, 'utilities', 35),
    ];
  }
}
