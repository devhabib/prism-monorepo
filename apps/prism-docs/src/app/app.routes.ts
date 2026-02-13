import { Route } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'getting-started/installation',
        pathMatch: 'full',
      },
      {
        path: 'icons',
        loadComponent: () =>
          import('./pages/icons-demo/icons-demo.component').then(
            (m) => m.IconsDemoComponent
          ),
      },
      {
        path: 'getting-started/installation',
        loadComponent: () =>
          import('./pages/getting-started/installation/installation.component').then(
            (m) => m.InstallationComponent
          ),
      },
      {
        path: 'getting-started/accessibility',
        loadComponent: () =>
          import('./pages/getting-started/accessibility/accessibility.component').then(
            (m) => m.AccessibilityComponent
          ),
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
        path: 'components/switch',
        loadComponent: () =>
          import('./pages/components/switch-demo/switch-demo.component').then(
            (m) => m.SwitchDemoComponent
          ),
      },
      {
        path: 'components/tooltip',
        loadComponent: () =>
          import('./pages/components/tooltip-demo/tooltip-demo.component').then(
            (m) => m.TooltipDemoComponent
          ),
      },
      {
        path: 'components/accordion',
        loadComponent: () =>
          import('./pages/components/accordion-demo/accordion-demo.component').then(
            (m) => m.AccordionDemoComponent
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
