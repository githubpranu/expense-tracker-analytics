import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'expenses',
    loadChildren: () =>
      import('./features/expenses/expenses.module').then((m) => m.ExpensesModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./features/categories/categories.module').then((m) => m.CategoriesModule),
  },
  {
    path: 'reports',
    loadChildren: () => import('./features/reports/reports.module').then((m) => m.ReportsModule),
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
