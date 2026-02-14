import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismIconComponent } from '../icon/icon.component';

export type PrismAlertType = 'success' | 'info' | 'warning' | 'error';

@Component({
  selector: 'prism-alert',
  standalone: true,
  imports: [CommonModule, PrismIconComponent],
  template: `
    @if (!closed()) {
      <div 
        class="prism-alert" 
        [class]="'alert-' + type()"
        role="alert">
        
        @if (showIcon()) {
          <div class="alert-icon">
            <prism-icon [name]="iconName()" size="1.25rem"></prism-icon>
          </div>
        }

        <div class="alert-content">
          @if (title()) {
            <div class="alert-title">{{ title() }}</div>
          }
          @if (description()) {
            <div class="alert-description">
              <ng-container *ngTemplateOutlet="descriptionContent"></ng-container>
            </div>
          }
          <ng-template #descriptionContent>
            {{ description() }}
            <ng-content></ng-content>
          </ng-template>
        </div>

        @if (closeable()) {
          <button class="alert-close" (click)="close($event)">
            <prism-icon name="close-line" size="1.25rem"></prism-icon>
          </button>
        }
      </div>
    }
  `,
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismAlertComponent {
  type = input<PrismAlertType>('info');
  title = input<string>();
  description = input<string>();
  showIcon = input<boolean>(false);
  closeable = input<boolean>(false);
  
  onClose = output<void>();

  closed = signal(false);

  iconName(): string {
    switch (this.type()) {
      case 'success': return 'checkbox-circle-line';
      case 'error': return 'error-warning-line';
      case 'warning': return 'alert-line';
      case 'info':
      default: return 'information-line';
    }
  }

  close(event: MouseEvent): void {
    event.preventDefault();
    this.closed.set(true);
    this.onClose.emit();
  }
}
