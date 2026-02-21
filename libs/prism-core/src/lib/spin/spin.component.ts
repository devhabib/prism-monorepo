import { Component, ChangeDetectionStrategy, input, TemplateRef, effect, signal, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PrismSpinSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'prism-spin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prism-spin-container">
      @if (!simple()) {
        <div class="prism-spin-content" [class.prism-spin--blur]="shouldShow()">
          <ng-content></ng-content>
        </div>
      }
      
      @if (shouldShow()) {
        <div class="prism-spin-mask" [class.prism-spin-mask--simple]="simple()">
          <div class="prism-spin-loader" [class]="'prism-spin--' + size()">
            @if (indicator()) {
              <ng-container [ngTemplateOutlet]="indicator()!"></ng-container>
            } @else {
              <svg viewBox="0 0 50 50" class="prism-spin-svg">
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke-width="4"
                  class="prism-spin-circle"
                ></circle>
              </svg>
            }
            @if (tip()) {
              <div class="prism-spin-tip">{{ tip() }}</div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styleUrls: ['./spin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismSpinComponent {
  /** Size of the spinner: 'sm', 'md', 'lg' */
  readonly size = input<PrismSpinSize>('md');

  /** Whether the spin is standalone / simple (no wrapper) */
  readonly simple = input<boolean, unknown>(false, { transform: booleanAttribute });
  
  /** Whether the spin is active */
  readonly spinning = input<boolean>(true);
  
  /** Display text when spinning */
  readonly tip = input<string>();
  
  /** Delay in ms before showing spinner */
  readonly delay = input<number>(0);
  
  /** Custom indicator template */
  readonly indicator = input<TemplateRef<unknown>>();

  private _delayTimeout?: ReturnType<typeof setTimeout>;
  readonly shouldShow = signal(false);

  constructor() {
    effect(() => {
      const isSpinning = this.spinning();
      const delay = this.delay();
      
      if (this._delayTimeout) {
        clearTimeout(this._delayTimeout);
      }

      if (isSpinning && delay > 0) {
        this._delayTimeout = setTimeout(() => {
          this.shouldShow.set(true);
        }, delay);
      } else {
        this.shouldShow.set(isSpinning);
      }
    });
  }
}
