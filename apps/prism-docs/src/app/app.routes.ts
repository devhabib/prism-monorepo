import { Route } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
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
      {
        path: 'components/avatar',
         loadComponent: () =>
          import('./pages/components/avatar-demo').then(
            (m) => m.AvatarDemoComponent
          ),
      }
    ],
  },
];
