import { Component, ChangeDetectionStrategy, input, computed, ViewEncapsulation } from '@angular/core';

export type PrismBadgeStatus = 'success' | 'error' | 'warning' | 'default' | 'processing';

@Component({
  selector: 'prism-badge',
  template: `
    <ng-content />
    @if (!isHidden()) {
      @if (dot()) {
        <sup
          class="prism-badge__dot"
          [class]="'prism-badge__dot--' + status()"
          [style.top.px]="offset()[1]"
          [style.right.px]="-offset()[0]"
        ></sup>
      } @else {
        <sup
          class="prism-badge__count"
          [class]="'prism-badge__count--' + status()"
          [style.top.px]="offset()[1]"
          [style.right.px]="-offset()[0]"
        >{{ displayCount() }}</sup>
      }
    }
  `,
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'prism-badge',
    '[class.prism-badge--standalone]': 'isStandalone()',
  },
})
export class PrismBadgeComponent {
  /** The number or text to display in the badge */
  readonly count = input<number | string>(0);

  /** Whether to show as a small dot instead of a number */
  readonly dot = input<boolean>(false);

  /** Whether to show the badge when count is 0 */
  readonly showZero = input<boolean>(false);

  /** Max count before showing overflow (e.g. 99+) */
  readonly overflowCount = input<number>(99);

  /** Status determines dot/count color */
  readonly status = input<PrismBadgeStatus>('error');

  /** Fine-tune badge position [x, y] offset in px */
  readonly offset = input<[number, number]>([0, 0]);

  /** Whether the badge has no projected content (standalone mode) */
  readonly isStandalone = input<boolean>(false);

  /** Compute the display text for the count badge */
  readonly displayCount = computed(() => {
    const c = this.count();
    if (typeof c === 'string') return c;
    const max = this.overflowCount();
    return c > max ? `${max}+` : `${c}`;
  });

  /** Whether the badge sup should be hidden */
  readonly isHidden = computed(() => {
    const c = this.count();
    const isDot = this.dot();
    if (isDot) return false;
    if (typeof c === 'string') return c.length === 0;
    return c === 0 && !this.showZero();
  });
}
