import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'components/table',
    pathMatch: 'full',
  },
  {
    path: 'components/table',
    loadComponent: () =>
      import('./pages/components/table-demo/table-demo.component').then(
        (m) => m.TableDemoComponent
      ),
  },
];
