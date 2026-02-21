import { Component, ChangeDetectionStrategy, input, computed, model } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PrismProgressType = 'line' | 'circle';
export type PrismProgressStatus = 'normal' | 'active' | 'success' | 'exception';

@Component({
  selector: 'prism-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prism-progress" 
         [class.prism-progress--line]="type() === 'line'"
         [class.prism-progress--circle]="type() === 'circle'"
         [class.prism-progress--success]="resolvedStatus() === 'success'"
         [class.prism-progress--exception]="resolvedStatus() === 'exception'"
         [class.prism-progress--active]="resolvedStatus() === 'active'"
    >
      @if (type() === 'line') {
        <div class="prism-progress__outer">
          <div class="prism-progress__inner" [style.width.%]="clampedPercent()"></div>
        </div>
        @if (showInfo()) {
          <span class="prism-progress__text">
            @if (resolvedStatus() === 'success') {
              <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.5 6.5l-4 4a.5.5 0 01-.7 0l-2-2a.5.5 0 11.7-.7l1.65 1.65 3.65-3.65a.5.5 0 11.7.7z"/>
              </svg>
            } @else if (resolvedStatus() === 'exception') {
              <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.5 10.8a.5.5 0 01-.7.7L8 8.7l-2.8 2.8a.5.5 0 01-.7-.7L7.3 8 4.5 5.2a.5.5 0 11.7-.7L8 7.3l2.8-2.8a.5.5 0 01.7.7L8.7 8l2.8 2.8z"/>
              </svg>
            } @else {
              {{ clampedPercent() }}%
            }
          </span>
        }
      } @else {
        <div class="prism-progress__circle-container" [style.width.px]="width()" [style.height.px]="width()">
          <svg viewBox="0 0 100 100">
            <circle
              class="prism-progress__circle-trail"
              cx="50"
              cy="50"
              [attr.r]="radius()"
              fill="none"
              [attr.stroke-width]="strokeWidth()"
              stroke="var(--surface-200)"
            ></circle>
            <circle
              class="prism-progress__circle-path"
              cx="50"
              cy="50"
              [attr.r]="radius()"
              fill="none"
              [attr.stroke-width]="strokeWidth()"
              stroke-linecap="round"
              [attr.stroke-dasharray]="dashArray()"
              [attr.stroke-dashoffset]="dashOffset()"
              transform="rotate(-90 50 50)"
            ></circle>
          </svg>
          @if (showInfo()) {
            <span class="prism-progress__circle-text">
              @if (resolvedStatus() === 'success') {
                <svg viewBox="0 0 16 16" width="24" height="24" fill="var(--success-main)">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.5 6.5l-4 4a.5.5 0 01-.7 0l-2-2a.5.5 0 11.7-.7l1.65 1.65 3.65-3.65a.5.5 0 11.7.7z"/>
                </svg>
              } @else if (resolvedStatus() === 'exception') {
                <svg viewBox="0 0 16 16" width="24" height="24" fill="var(--danger-main)">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.5 10.8a.5.5 0 01-.7.7L8 8.7l-2.8 2.8a.5.5 0 01-.7-.7L7.3 8 4.5 5.2a.5.5 0 11.7-.7L8 7.3l2.8-2.8a.5.5 0 01.7.7L8.7 8l2.8 2.8z"/>
                </svg>
              } @else {
                {{ clampedPercent() }}%
              }
            </span>
          }
        </div>
      }
    </div>
  `,
  styleUrls: ['./progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismProgressComponent {
  /** Type of progress: 'line' or 'circle' */
  readonly type = input<PrismProgressType>('line');
  
  /** Current percentage (0-100) */
  readonly percent = model<number>(0);
  
  /** Status: 'normal', 'active', 'success', 'exception' */
  readonly status = input<PrismProgressStatus>('normal');
  
  /** Stroke width in px */
  readonly strokeWidth = input<number>(6);
  
  /** Whether to show percentage text or icons */
  readonly showInfo = input<boolean>(true);

  /** Width of the circle canvas in px */
  readonly width = input<number>(120);

  readonly clampedPercent = computed(() => {
    const p = this.percent();
    return Math.min(Math.max(p, 0), 100);
  });

  readonly resolvedStatus = computed(() => {
    const s = this.status();
    const p = this.clampedPercent();
    if (p >= 100 && s === 'normal') return 'success';
    return s;
  });

  /** Circle specific calculations */
  readonly radius = computed(() => 50 - this.strokeWidth() / 2);
  readonly dashArray = computed(() => {
    const r = this.radius();
    return 2 * Math.PI * r;
  });
  readonly dashOffset = computed(() => {
    const p = this.clampedPercent();
    const array = this.dashArray();
    return array - (p / 100) * array;
  });
}
