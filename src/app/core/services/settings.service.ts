import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CURRENCIES, Currency, DEFAULT_CURRENCY, getCurrency } from '../models/expense.model';

const STORAGE_KEY = 'eta.currency';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly currency$ = new BehaviorSubject<Currency>(this.load());

  readonly currencies: Currency[] = CURRENCIES;

  getCurrency(): Observable<Currency> {
    return this.currency$.asObservable();
  }

  getCurrencyCode(): Observable<string> {
    return this.currency$.pipe(map((c) => c.code));
  }

  getCurrencySymbol(): Observable<string> {
    return this.currency$.pipe(map((c) => c.symbol));
  }

  get currentCurrency(): Currency {
    return this.currency$.value;
  }

  setCurrency(code: string): void {
    const currency = getCurrency(code);
    this.currency$.next(currency);
    this.save(currency);
  }

  private load(): Currency {
    try {
      const code = localStorage.getItem(STORAGE_KEY);
      if (code) {
        return getCurrency(code);
      }
    } catch {
      // storage unavailable; fall back to default
    }
    return DEFAULT_CURRENCY;
  }

  private save(currency: Currency): void {
    try {
      localStorage.setItem(STORAGE_KEY, currency.code);
    } catch {
      // storage may be unavailable (private mode); keep in-memory only
    }
  }
}
