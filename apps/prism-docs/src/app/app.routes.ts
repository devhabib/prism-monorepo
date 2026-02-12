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
          import('./pages/components/avatar-demo/avatar-demo.component').then(
            (m) => m.AvatarDemoComponent
          ),
      },
      {
        path: 'components/toast',
        loadComponent: () =>
          import('./pages/components/toast-demo/toast-demo.component').then(
            (m) => m.ToastDemoComponent
          ),
      },
      {
        path: 'components/forms',
        loadComponent: () =>
          import('./pages/components/form-demo/form-demo.component').then(
            (m) => m.FormDemoComponent
          ),
      },
      {
        path: 'components/empty',
        loadComponent: () =>
          import('./pages/components/empty-demo/empty-demo.component').then(
            (m) => m.EmptyDemoComponent
          ),
      },
      {
        path: 'components/modal',
        loadComponent: () =>
          import('./pages/components/modal-demo/modal-demo.component').then(
            (m) => m.ModalDemoComponent
          ),
      },
      {
        path: 'components/drawer',
        loadComponent: () =>
          import('./pages/components/drawer-demo/drawer-demo.component').then(
            (m) => m.DrawerDemoComponent
          ),
      }
    ],
  },
];
