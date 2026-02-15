import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-step',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prism-step-item">
      <div class="prism-step-item-container">
        <div class="prism-step-item-tail"></div>
        <div class="prism-step-item-icon">
          <span class="prism-step-icon">
            @if (status() === 'finish') {
              <i class="ri-check-line"></i>
            } @else if (status() === 'error') {
              <i class="ri-close-line"></i>
            } @else {
              {{ index() + 1 }}
            }
          </span>
        </div>
        <div class="prism-step-item-content">
          <div class="prism-step-item-title">{{ title() }}</div>
          @if (description()) {
            <div class="prism-step-item-description">{{ description() }}</div>
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismStepComponent {
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly status = input<'wait' | 'process' | 'finish' | 'error'>('wait');
  readonly index = input<number>(0);
}
