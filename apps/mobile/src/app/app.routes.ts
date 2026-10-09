import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/tabs').then((m) => m.TabsLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'sessions' },
      {
        path: 'sessions',
        loadComponent: () =>
          import('./features/sessions/session-list').then((m) => m.SessionList),
      },
      {
        path: 'sessions/:id',
        loadComponent: () =>
          import('./features/sessions/session-detail').then((m) => m.SessionDetail),
      },
      {
        path: 'movements',
        loadComponent: () =>
          import('./features/movements/movement-list').then((m) => m.MovementList),
      },
      {
        path: 'movements/:id',
        loadComponent: () =>
          import('./features/movements/movement-detail').then((m) => m.MovementDetail),
      },
    ],
  },
];
