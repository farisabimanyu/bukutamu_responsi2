import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'bukutamu',
    pathMatch: 'full',
  },

  {
    path: 'bukutamu',
    loadComponent: () => import('./bukutamu/bukutamu.page').then(m => m.BukutamuPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage)
  },
];
