import { Component, signal, TemplateRef, viewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismButtonComponent, 
  PrismCardComponent, 
  PrismDrawerComponent, 
  PrismTabGroupComponent, 
  PrismTabComponent,
  PrismDrawerService,
  DrawerPosition,
  ApiDoc,
  ApiTableComponent,
  PrismCodeBlockComponent,
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent
} from '@prism-monorepo/prism-core';
import { UserProfileDialogComponent } from '../modal-demo/user-profile-dialog.component';

@Component({
  selector: 'prism-drawer-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismButtonComponent, 
    PrismCardComponent, 
    PrismDrawerComponent, 
    PrismTabGroupComponent, 
    PrismTabComponent,
    ApiTableComponent,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent
  ],
  templateUrl: './drawer-demo.component.html',
  styleUrl: './drawer-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerDemoComponent {
  private drawerService = inject(PrismDrawerService);

  isVisible = signal(false);
  placement = signal<DrawerPosition>('right');
  width = signal('300px');
  showFooter = signal(false);

  footerTpl = viewChild<TemplateRef<void>>('footerTpl');

  open(position: DrawerPosition): void {
    this.placement.set(position);
    this.width.set(position === 'top' || position === 'bottom' ? '100%' : '300px');
    this.showFooter.set(false);
    this.isVisible.set(true);
  }

  openCustom(): void {
    this.placement.set('right');
    this.width.set('50%');
    this.showFooter.set(true);
    this.isVisible.set(true);
  }

  openService(): void {
    this.drawerService.open(UserProfileDialogComponent, {
      title: 'User Profile (Service)',
      width: '400px',
      data: {
        name: 'John Doe',
        role: 'Fullstack Architect'
      }
    });
  }

  close(): void {
    this.isVisible.set(false);
  }

  readonly apiDocs: ApiDoc[] = [
    {
      name: 'visible',
      type: 'model<boolean>',
      default: 'false',
      description: 'Visibility of the drawer (two-way binding)'
    },
    {
      name: 'position',
      type: "'left' | 'right' | 'top' | 'bottom'",
      default: "'right'",
      description: 'Direction from which the drawer slides in'
    },
    {
      name: 'title / header',
      type: 'string | TemplateRef<any>',
      default: "''",
      description: 'Content for the header title area'
    },
    {
      name: 'footer',
      type: 'string | TemplateRef<any> | null',
      default: 'null',
      description: 'Content for the footer area'
    },
    {
      name: 'width',
      type: 'string',
      default: "'300px'",
      description: 'Width for left/right drawers'
    },
    {
      name: 'height',
      type: 'string',
      default: "'300px'",
      description: 'Height for top/bottom drawers'
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      description: 'Whether hitting ESC key closes the drawer'
    },
    {
      name: 'maskClosable',
      type: 'boolean',
      default: 'true',
      description: 'Whether clicking the mask closes the drawer'
    },
    {
      name: 'showClose',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show the close button in the header'
    }
  ];

  readonly serviceApiDocs: ApiDoc[] = [
    {
      name: 'open<T, D, R>(component, config)',
      type: 'PrismDrawerRef<R>',
      default: '-',
      description: 'Opens a drawer with a dynamic component'
    },
    {
      name: 'config.data',
      type: 'D',
      default: 'undefined',
      description: 'Data to inject into the component'
    },
    {
      name: 'config.title / config.header',
      type: 'string | TemplateRef<any>',
      default: "''",
      description: 'Header content'
    },
    {
      name: 'config.width / config.height',
      type: 'string',
      default: "'300px'",
      description: 'Dimensions based on position'
    },
    {
      name: 'config.position',
      type: 'DrawerPosition',
      default: "'right'",
      description: 'Placement direction'
    }
  ];

  readonly refApiDocs: ApiDoc[] = [
    {
      name: 'close(result?: R)',
      type: 'void',
      default: '-',
      description: 'Closes the drawer and emits the result'
    },
    {
      name: 'afterClosed$',
      type: 'Observable<R | undefined>',
      default: '-',
      description: 'Observable that emits when the drawer is closed'
    }
  ];

  readonly tokenApiDocs: ApiDoc[] = [
    {
      name: 'DRAWER_DATA',
      type: 'InjectionToken<unknown>',
      default: '-',
      description: 'Token to access data passed via config.data'
    }
  ];

  // Code Examples
  readonly basicUsageHTML = `<prism-button label="Open Drawer" (click)="isVisible.set(true)" />

<prism-drawer [(visible)]="isVisible" title="My Drawer">
  <p>Content goes here...</p>
</prism-drawer>`;

  readonly basicUsageTS = `export class MyComponent {
  isVisible = signal(false);
}`;

  readonly serviceUsageTS = `// In your component
private drawer = inject(PrismDrawerService);

open() {
  this.drawer.open(UserProfileComponent, {
    title: 'User Profile',
    width: '400px',
    data: { id: 123 }
  });
}`;

  readonly refUsageTS = `export class MyDrawerContent {
  ref = inject(PrismDrawerRef);

  close() {
    this.ref.close({ saved: true });
  }
}`;

  readonly tokenUsageTS = `export class MyDrawerContent {
  data = inject(DRAWER_DATA) as MyDataType;
}`;
}
