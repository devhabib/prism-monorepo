import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, PrismCodeBlockComponent } from '@prism-monorepo/prism-core';

@Component({
  selector: 'prism-toast-demo',
  standalone: true,
  imports: [CommonModule, PrismCodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toast-demo.component.html',
  styles: [`
    .demo-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 2rem;
    }
    .btn {
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.2s;
    }
    .btn-success { background: var(--success); color: white; }
    .btn-warning { background: var(--warning); color: white; }
    .btn-danger { background: var(--danger); color: white; }
    .btn-info { background: var(--primary-500); color: white; }
    
    .btn:hover { opacity: 0.9; transform: translateY(-1px); }
  `]
})
export class ToastDemoComponent {
  readonly toast = inject(ToastService);

  showSuccess(): void { this.toast.success('Configuration saved successfully!'); }
  showWarning(): void { this.toast.warning('Storage limit approaching (85%).'); }
  showDanger(): void { this.toast.danger('Failed to connect to the database.'); }
  showInfo(): void { this.toast.info('New updates available for your system.'); }

  usageTS = `import { inject } from '@angular/core';
import { ToastService } from '@prism-monorepo/prism-core';

@Component({ ... })
export class MyComponent {
  toast = inject(ToastService);

  notify() {
    this.toast.success('Action completed!');
    // OR
    this.toast.show('Custom message', 'info', 5000);
  }
}`;

  usageHTML = `<button (click)="notify()">Show Toast</button>`;
}
