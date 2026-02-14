import { Component, input, computed, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrismButtonComponent {
  label = input<string>('');
  icon = input<string | null>(null);
  iconPos = input<'left' | 'right'>('left');
  loading = input<boolean>(false);
  disabled = input<boolean>(false);
  variant = input<'primary' | 'secondary' | 'outline' | 'text' | 'danger'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');

  buttonClasses = computed(() => {
    return {
      'button': true,
      [`variant-${this.variant()}`]: true,
      [`size-${this.size()}`]: true,
      'is-loading': this.loading(),
      'icon-only': !this.label() && (this.icon() || this.loading())
    };
  });

  isButtonDisabled = computed(() => this.disabled() || this.loading());
}
