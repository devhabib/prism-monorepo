import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { ToastService, Toast } from '../services/toast.service';

@Component({
  selector: 'prism-toast',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div 
          class="toast-item"
          [class]="toast.severity"
          [@slideIn]
        >
          <div class="toast-icon">
            <i [class]="getIcon(toast.severity)"></i>
          </div>
          <div class="toast-content">
            {{ toast.message }}
          </div>
          <button class="button toast-close" (click)="toastService.remove(toast.id)">
            <i class="ri-close-line"></i>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 1.5rem;
      right: 1.5rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      pointer-events: none;
    }

    .toast-item {
      pointer-events: auto;
      min-width: 320px;
      max-width: 450px;
      padding: 1rem 1.25rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 1rem;
      background: var(--bg-card);
      color: var(--text-main);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border: 1px solid var(--border);
      border-left: 6px solid var(--primary-500);
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);

      &.success { 
        border-left-color: var(--success); 
        background: linear-gradient(90deg, rgba(16, 185, 129, 0.1) 0%, var(--bg-card) 100%);
        .toast-icon { color: var(--success); } 
      }
      &.warning { 
        border-left-color: var(--warning); 
        background: linear-gradient(90deg, rgba(245, 158, 11, 0.1) 0%, var(--bg-card) 100%);
        .toast-icon { color: var(--warning); } 
      }
      &.danger { 
        border-left-color: var(--danger); 
        background: linear-gradient(90deg, rgba(239, 68, 68, 0.1) 0%, var(--bg-card) 100%);
        .toast-icon { color: var(--danger); } 
      }
      &.info { 
        border-left-color: var(--primary-500); 
        background: linear-gradient(90deg, rgba(79, 70, 229, 0.1) 0%, var(--bg-card) 100%);
        .toast-icon { color: var(--primary-500); } 
      }
    }

    .toast-icon {
      font-size: 1.5rem;
      display: flex;
      flex-shrink: 0;
    }

    .toast-content {
      flex: 1;
      font-size: 0.9375rem;
      font-weight: 600;
      line-height: 1.5;
    }

    .toast-close {
      background: rgba(0,0,0,0.05);
      border: none;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-muted);
      transition: all 0.2s;
      flex-shrink: 0;
      
      &:hover {
        background: rgba(0,0,0,0.1);
        color: var(--text-main);
        transform: rotate(90deg);
      }
    }
  `],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ToastComponent {
  readonly toastService = inject(ToastService);

  trackById(index: number, item: Toast): number {
    return item.id;
  }

  getIcon(severity: string): string {
    switch (severity) {
      case 'success': return 'ri-checkbox-circle-fill';
      case 'warning': return 'ri-error-warning-fill';
      case 'danger': return 'ri-close-circle-fill';
      default: return 'ri-information-fill';
    }
  }
}
