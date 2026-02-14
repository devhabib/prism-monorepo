import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-breadcrumb-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="prism-breadcrumb-item">
      <span class="breadcrumb-link">
        <ng-content></ng-content>
      </span>
      @if (!isLast()) {
        <span class="breadcrumb-separator">{{ separator() }}</span>
      }
    </span>
  `,
  styles: [`
    .prism-breadcrumb-item {
      display: inline-flex;
      align-items: center;
      color: var(--text-muted);
      font-size: 0.875rem;

      .breadcrumb-link {
        transition: color 0.2s;
        cursor: pointer;
        
        &:hover {
          color: var(--primary-600);
        }
      }

      .breadcrumb-separator {
        margin: 0 0.5rem;
        color: var(--text-muted);
        opacity: 0.5;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismBreadcrumbItemComponent {
  isLast = signal<boolean>(false);
  separator = signal<string>('/');
}
