import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PrismSpinSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'prism-spin',
  imports: [CommonModule],
  template: `
    <div class="prism-spin-container">
      <div class="prism-spin-content" [class.spinning]="spinning()">
        <ng-content></ng-content>
      </div>
      
      @if (spinning()) {
        <div class="prism-spin-mask">
          <div class="prism-spin-loader" [class]="'spin-' + size()">
            <svg viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke-width="4"
              ></circle>
            </svg>
          </div>
        </div>
      }
    </div>
  `,
  styleUrls: ['./spin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismSpinComponent {
  size = input<PrismSpinSize>('md');
  spinning = input<boolean>(true);
}
