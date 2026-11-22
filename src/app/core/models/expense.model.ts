export type CategoryId =
  | 'food'
  | 'transport'
  | 'housing'
  | 'utilities'
  | 'entertainment'
  | 'health'
  | 'shopping'
  | 'other';

export interface Category {
  id: CategoryId;
  label: string;
  color: string;
  icon: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: CategoryId;
  date: string; // ISO date string (yyyy-mm-dd)
}

export interface CategoryTotal {
  category: Category;
  total: number;
  count: number;
  percentage: number;
}

export interface MonthlyTotal {
  month: string; // yyyy-mm
  label: string; // e.g. "Mar 2026"
  total: number;
}

export interface Currency {
  code: string; // ISO 4217 code, e.g. 'USD'
  label: string;
  symbol: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', label: 'US Dollar', symbol: '$' },
  { code: 'EUR', label: 'Euro', symbol: '€' },
  { code: 'GBP', label: 'British Pound', symbol: '£' },
  { code: 'INR', label: 'Indian Rupee', symbol: '₹' },
  { code: 'AUD', label: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', label: 'Canadian Dollar', symbol: 'C$' },
  { code: 'JPY', label: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', label: 'Chinese Yuan', symbol: '¥' },
  { code: 'SGD', label: 'Singapore Dollar', symbol: 'S$' },
  { code: 'AED', label: 'UAE Dirham', symbol: 'د.إ' },
];

export const DEFAULT_CURRENCY = CURRENCIES[0];

export function getCurrency(code: string): Currency {
  return CURRENCIES.find((c) => c.code === code) ?? DEFAULT_CURRENCY;
}

export const CATEGORIES: Category[] = [
  { id: 'food', label: 'Food & Dining', color: '#1e88e5', icon: 'restaurant' },
  { id: 'transport', label: 'Transport', color: '#43a047', icon: 'directions_car' },
  { id: 'housing', label: 'Housing', color: '#8e24aa', icon: 'home' },
  { id: 'utilities', label: 'Utilities', color: '#fb8c00', icon: 'bolt' },
  { id: 'entertainment', label: 'Entertainment', color: '#e53935', icon: 'movie' },
  { id: 'health', label: 'Health', color: '#00897b', icon: 'favorite' },
  { id: 'shopping', label: 'Shopping', color: '#d81b60', icon: 'shopping_bag' },
  { id: 'other', label: 'Other', color: '#6d4c41', icon: 'category' },
];

export function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1];
}
