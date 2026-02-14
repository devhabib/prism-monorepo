import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismIconComponent } from '../icon/icon.component';

export type PrismResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403';

@Component({
  selector: 'prism-result',
  standalone: true,
  imports: [CommonModule, PrismIconComponent],
  template: `
    <div class="prism-result">
      <div class="result-icon" [class]="'status-' + status()">
        <prism-icon [name]="iconName()" size="4rem"></prism-icon>
      </div>
      
      @if (title()) {
        <div class="result-title">{{ title() }}</div>
      }
      
      @if (subtitle()) {
        <div class="result-subtitle">{{ subtitle() }}</div>
      }

      <div class="result-content">
        <ng-content></ng-content>
      </div>

      <div class="result-extra">
        <ng-content select="[extra]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismResultComponent {
  status = input<PrismResultStatus>('info');
  title = input<string>();
  subtitle = input<string>();

  iconName(): string {
    switch (this.status()) {
      case 'success': return 'checkbox-circle-fill';
      case 'error': return 'close-circle-fill';
      case 'warning': return 'error-warning-fill';
      case '404': return 'find-replace-line';
      case '403': return 'lock-password-line';
      case 'info':
      default: return 'information-fill';
    }
  }
}
