import { Component, ChangeDetectionStrategy, input, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismIconComponent } from '../icon/icon.component';

@Component({
  selector: 'prism-step',
  imports: [CommonModule, PrismIconComponent],
  template: `
    <div class="prism-step-item"
         [class.prism-step-item-process]="status() === 'process'"
         [class.prism-step-item-wait]="status() === 'wait'"
         [class.prism-step-item-finish]="status() === 'finish'"
         [class.prism-step-item-error]="status() === 'error'"
         [class.prism-step-item-last]="isLast()">
      <div class="prism-step-item-container">
        <div class="prism-step-item-tail"></div>
        <div class="prism-step-item-icon">
          <span class="prism-step-icon">
            @if (status() === 'finish') {
              <prism-icon name="check-line" size="18" />
            } @else if (status() === 'error') {
              <prism-icon name="close-line" size="18" />
            } @else {
              <span class="prism-step-index">{{ index() + 1 }}</span>
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
  styles: [`
    :host {
      display: inline-block;
      flex: 1;
      overflow: hidden;
      vertical-align: top;
    }
  `]
})
export class PrismStepComponent {
  readonly title = input.required<string>();
  readonly description = input<string>('');
  
  // These are managed by the parent PrismStepsComponent but can be overridden
  readonly status = model<'wait' | 'process' | 'finish' | 'error'>('wait');
  readonly index = model<number>(0);
  readonly isLast = signal<boolean>(false);
}
