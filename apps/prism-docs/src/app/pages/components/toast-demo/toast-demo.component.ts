import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ToastService, 
  PrismCodeBlockComponent, 
  ApiTableComponent, 
  ApiDoc,
  PrismButtonComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'prism-toast-demo',
  imports: [
    CommonModule, 
    PrismCodeBlockComponent, 
    ApiTableComponent,
    PrismButtonComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toast-demo.component.html',
  styleUrl: './toast-demo.component.scss',
})
export class ToastDemoComponent {
  readonly toast = inject(ToastService);

  showSuccess(): void { this.toast.success('Configuration saved successfully!'); }
  showWarning(): void { this.toast.warning('Storage limit approaching (85%).'); }
  showDanger(): void { this.toast.danger('Failed to connect to the database.'); }
  showInfo(): void { this.toast.info('New updates available for your system.'); }

  readonly snippets = {
    usageTS: `import { inject } from '@angular/core';
import { ToastService } from '@devynelogic/prism-core';

@Component({ ... })
export class MyComponent {
  toast = inject(ToastService);

  notify() {
    this.toast.success('Action completed!');
    // OR
    this.toast.show('Custom message', 'info', 5000);
  }
}`,
    usageHTML: `<button class="button" (click)="notify()">Show Toast</button>`
  };

  readonly apiData: ApiDoc[] = [
    { name: 'success', type: '(message: string) => void', default: '-', description: 'Show a success toast notification with green styling.' },
    { name: 'warning', type: '(message: string) => void', default: '-', description: 'Show a warning toast notification with yellow styling.' },
    { name: 'danger', type: '(message: string) => void', default: '-', description: 'Show a danger/error toast notification with red styling.' },
    { name: 'info', type: '(message: string) => void', default: '-', description: 'Show an info toast notification with blue styling.' },
    { name: 'show', type: '(message: string, type: string, duration?: number) => void', default: 'duration: 3000', description: 'Show a custom toast with specified type and optional duration in milliseconds.' },
  ];
}
