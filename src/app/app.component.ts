import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription, filter } from 'rxjs';
import { Currency } from './core/models/expense.model';
import { SettingsService } from './core/services/settings.service';

interface NavItem {
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  drawerOpen = true;
  activeRoute = '/dashboard';

  readonly navItems: NavItem[] = [
    { title: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { title: 'Expenses', icon: 'receipt_long', route: '/expenses' },
    { title: 'Categories', icon: 'category', route: '/categories' },
    { title: 'Reports', icon: 'bar_chart', route: '/reports' },
  ];

  readonly currencies: Currency[] = this.settings.currencies;
  readonly currency$: Observable<Currency> = this.settings.getCurrency();

  private readonly sub: Subscription;

  constructor(
    private readonly router: Router,
    private readonly settings: SettingsService
  ) {
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => (this.activeRoute = e.urlAfterRedirects));
  }

  toggleDrawer(): void {
    this.drawerOpen = !this.drawerOpen;
  }

  setCurrency(code: string): void {
    this.settings.setCurrency(code);
  }

  navigate(route: string): void {
    this.router.navigateByUrl(route);
  }

  get activeTitle(): string {
    return this.navItems.find((n) => this.activeRoute.startsWith(n.route))?.title ?? 'Dashboard';
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
