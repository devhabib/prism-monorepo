import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      class="prism-badge" 
      [class]="'prism-badge--' + variant() + ' prism-badge--' + shape()">
      {{ label() }}
    </span>
  `,
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrismBadgeComponent {
  label = input.required<string>();
  variant = input<'success' | 'warning' | 'danger' | 'info'>('info');
  shape = input<'pill' | 'square'>('pill');
}
