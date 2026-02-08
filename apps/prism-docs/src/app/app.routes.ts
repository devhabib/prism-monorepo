import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'components/table',
    loadComponent: () =>
      import('./pages/components/table-demo/table-demo.component').then(
        (m) => m.TableDemoComponent
      ),
  },
];
