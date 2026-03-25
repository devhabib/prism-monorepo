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
        path: 'getting-started/installation',
        loadComponent: () => import('./pages/getting-started/installation/installation.component').then(m => m.InstallationComponent),
      },
      {
        path: 'getting-started/accessibility',
        loadComponent: () => import('./pages/getting-started/accessibility/accessibility.component').then(m => m.AccessibilityComponent),
      },
      {
        path: 'getting-started/contributing',
        loadComponent: () => import('./pages/getting-started/contributing/contributing.component').then(m => m.ContributingComponent),
      },
      {
        path: 'icons',
        loadComponent: () => import('./pages/icons-demo/icons-demo.component').then(m => m.IconsDemoComponent),
      },
      // General
      {
        path: 'components/button',
        loadComponent: () => import('./pages/components/button-demo/button-demo.component').then(m => m.ButtonDemoComponent),
      },
      {
        path: 'components/typography',
        loadComponent: () => import('./pages/components/typography-demo/typography-demo.component').then(m => m.TypographyDemoComponent),
      },
      // Layout
      {
        path: 'components/divider',
        loadComponent: () => import('./pages/components/divider-demo/divider-demo.component').then(m => m.DividerDemoComponent),
      },
      {
        path: 'layout/flex',
        loadComponent: () => import('./pages/components/flex-demo/flex-layout-demo.component').then(m => m.FlexLayoutDemoComponent),
      },
      {
        path: 'layout/flex-debug',
        loadComponent: () => import('./pages/components/flex-demo/flex-layout-demo.component').then(m => m.FlexLayoutDemoComponent),
      },
      {
        path: 'layout/grid',
        loadComponent: () => import('./pages/components/grid-demo/grid-demo.component').then(m => m.GridDemoComponent),
      },
      {
        path: 'layout/wrapper',
        loadComponent: () => import('./pages/components/layout-demo/layout-demo.component').then(m => m.LayoutDemoComponent),
      },
      {
        path: 'components/space',
        loadComponent: () => import('./pages/components/space-demo/space-demo.component').then(m => m.SpaceDemoComponent),
      },
      {
        path: 'components/splitter',
        loadComponent: () => import('./pages/components/splitter-demo/splitter-demo.component').then(m => m.SplitterDemoComponent),
      },
      // Navigation
      {
        path: 'components/anchor',
        loadComponent: () => import('./pages/components/anchor-demo/anchor-demo.component').then(m => m.AnchorDemoComponent),
      },
      {
        path: 'components/breadcrumb',
        loadComponent: () => import('./pages/components/breadcrumb-demo/breadcrumb-demo.component').then(m => m.BreadcrumbDemoComponent),
      },
      {
        path: 'components/dropdown',
        loadComponent: () => import('./pages/components/dropdown-demo/dropdown-demo.component').then(m => m.DropdownDemoComponent),
      },
      /*
      {
        path: 'components/menu',
        loadComponent: () => import('./pages/components/menu-demo/menu-demo.component').then(m => m.MenuDemoComponent),
      },
      */
      {
        path: 'components/pagination',
        loadComponent: () => import('./pages/components/pagination-demo/pagination-demo.component').then(m => m.PaginationDemoComponent),
      },
      {
        path: 'components/steps',
        loadComponent: () => import('./pages/components/steps-demo/steps-demo.component').then(m => m.StepsDemoComponent),
      },
      {
        path: 'components/tabs',
        loadComponent: () => import('./pages/components/tabs-demo/tabs-demo.component').then(m => m.TabsDemoComponent),
      },
      // Data Entry
      {
        path: 'components/autocomplete',
        loadComponent: () => import('./pages/components/autocomplete-demo/autocomplete-demo.component').then(m => m.AutoCompleteDemoComponent),
      },
      {
        path: 'components/cascader',
        loadComponent: () => import('./pages/components/cascader-demo/cascader-demo.component').then(m => m.CascaderDemoComponent),
      },
      {
        path: 'components/checkbox',
        loadComponent: () => import('./pages/components/checkbox-demo/checkbox-demo.component').then(m => m.CheckboxDemoComponent),
      },
      {
        path: 'components/date-picker',
        loadComponent: () => import('./pages/components/date-picker-demo/date-picker-demo.component').then(m => m.DatePickerDemoComponent),
      },
      {
        path: 'components/form',
        loadComponent: () => import('./pages/components/form-demo/form-demo.component').then(m => m.FormDemoComponent),
      },
      {
        path: 'components/input',
        loadComponent: () => import('./pages/components/input-demo/input-demo.component').then(m => m.InputDemoComponent),
      },
      {
        path: 'components/input-number',
        loadComponent: () => import('./pages/components/input-number-demo/input-number-demo.component').then(m => m.InputNumberDemoComponent),
      },
      {
        path: 'components/radio',
        loadComponent: () => import('./pages/components/radio-demo/radio-demo.component').then(m => m.RadioDemoComponent),
      },
      {
        path: 'components/rate',
        loadComponent: () => import('./pages/components/rate-demo/rate-demo.component').then(m => m.RateDemoComponent),
      },
      {
        path: 'components/select',
        loadComponent: () => import('./pages/components/select-demo/select-demo.component').then(m => m.SelectDemoComponent),
      },
      {
        path: 'components/slider',
        loadComponent: () => import('./pages/components/slider-demo/slider-demo.component').then(m => m.SliderDemoComponent),
      },
      {
        path: 'components/switch',
        loadComponent: () => import('./pages/components/switch-demo/switch-demo.component').then(m => m.SwitchDemoComponent),
      },
      {
        path: 'components/time-picker',
        loadComponent: () => import('./pages/components/time-picker-demo/time-picker-demo.component').then(m => m.TimePickerDemoComponent),
      },
      {
        path: 'components/transfer',
        loadComponent: () => import('./pages/components/transfer-demo/transfer-demo.component').then(m => m.TransferDemoComponent),
      },
      {
        path: 'components/upload',
        loadComponent: () => import('./pages/components/upload-demo/upload-demo.component').then(m => m.UploadDemoComponent),
      },
      // Data Display
      {
        path: 'components/avatar',
        loadComponent: () => import('./pages/components/avatar-demo/avatar-demo.component').then(m => m.AvatarDemoComponent),
      },
      {
        path: 'components/badge',
        loadComponent: () => import('./pages/components/badge-demo/badge-demo.component').then(m => m.BadgeDemoComponent),
      },
      {
        path: 'components/calendar',
        loadComponent: () => import('./pages/components/calendar-demo/calendar-demo.component').then(m => m.CalendarDemoComponent),
      },
      {
        path: 'components/card',
        loadComponent: () => import('./pages/components/card-demo/card-demo.component').then(m => m.CardDemoComponent),
      },
      {
        path: 'components/carousel',
        loadComponent: () => import('./pages/components/carousel-demo/carousel-demo.component').then(m => m.CarouselDemoComponent),
      },
      {
        path: 'components/accordion',
        loadComponent: () => import('./pages/components/accordion-demo/accordion-demo.component').then(m => m.AccordionDemoComponent),
      },
      {
        path: 'components/empty',
        loadComponent: () => import('./pages/components/empty-demo/empty-demo.component').then(m => m.EmptyDemoComponent),
      },
      {
        path: 'components/image',
        loadComponent: () => import('./pages/components/image-demo/image-demo.component').then(m => m.ImageDemoComponent),
      },
      {
        path: 'components/list',
        loadComponent: () => import('./pages/components/list-demo/list-demo.component').then(m => m.ListDemoComponent),
      },
      {
        path: 'components/popover',
        loadComponent: () => import('./pages/components/popover-demo/popover-demo.component').then(m => m.PopoverDemoComponent),
      },
      {
        path: 'components/statistic',
        loadComponent: () => import('./pages/components/statistic-demo/statistic-demo.component').then(m => m.StatisticDemoComponent),
      },
      {
        path: 'components/table',
        loadComponent: () => import('./pages/components/table-demo/table-demo.component').then(m => m.TableDemoComponent),
      },
      {
        path: 'components/tag',
        loadComponent: () => import('./pages/components/tag-demo/tag-demo.component').then(m => m.TagDemoComponent),
      },
      {
        path: 'components/timeline',
        loadComponent: () => import('./pages/components/timeline-demo/timeline-demo.component').then(m => m.TimelineDemoComponent),
      },
      {
        path: 'components/tooltip',
        loadComponent: () => import('./pages/components/tooltip-demo/tooltip-demo.component').then(m => m.TooltipDemoComponent),
      },
      {
        path: 'components/tree',
        loadComponent: () => import('./pages/components/tree-demo/tree-demo.component').then(m => m.TreeDemoComponent),
      },
      // Feedback
      {
        path: 'components/alert',
        loadComponent: () => import('./pages/components/alert-demo/alert-demo.component').then(m => m.AlertDemoComponent),
      },
      {
        path: 'components/drawer',
        loadComponent: () => import('./pages/components/drawer-demo/drawer-demo.component').then(m => m.DrawerDemoComponent),
      },
      {
        path: 'components/toast',
        loadComponent: () => import('./pages/components/toast-demo/toast-demo.component').then(m => m.ToastDemoComponent),
      },
      {
        path: 'components/modal',
        loadComponent: () => import('./pages/components/modal-demo/modal-demo.component').then(m => m.ModalDemoComponent),
      },
      {
        path: 'components/popconfirm',
        loadComponent: () => import('./pages/components/popconfirm-demo/popconfirm-demo.component').then(m => m.PopconfirmDemoComponent),
      },
      {
        path: 'components/progress',
        loadComponent: () => import('./pages/components/progress-demo/progress-demo.component').then(m => m.ProgressDemoComponent),
      },
      {
        path: 'components/result',
        loadComponent: () => import('./pages/components/result-demo/result-demo.component').then(m => m.ResultDemoComponent),
      },
      {
        path: 'components/skeleton',
        loadComponent: () => import('./pages/components/skeleton-demo/skeleton-demo.component').then(m => m.SkeletonDemoComponent),
      },
      {
        path: 'components/spin',
        loadComponent: () => import('./pages/components/spin-demo/spin-demo.component').then(m => m.SpinDemoComponent),
      }
    ],
  },
];
