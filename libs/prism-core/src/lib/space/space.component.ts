import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PrismSpaceSize = 'small' | 'middle' | 'large' | number;

@Component({
  selector: 'prism-space',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="classes()" [style]="styles()">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './space.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismSpaceComponent {
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly size = input<PrismSpaceSize | [PrismSpaceSize, PrismSpaceSize]>('small');
  readonly align = input<'start' | 'end' | 'center' | 'baseline'>();
  readonly wrap = input<boolean>(false);

  private readonly sizeMap: Record<string, number> = {
    small: 8,
    middle: 16,
    large: 24,
  };

  readonly classes = computed(() => {
    const direction = this.direction();
    return {
      'prism-space': true,
      [`prism-space-${direction}`]: true,
      [`prism-space-align-${this.align() || (direction === 'horizontal' ? 'center' : 'start')}`]: true,
      'prism-space-wrap': this.wrap(),
    };
  });

  readonly styles = computed(() => {
    const size = this.size();
    let gap = '';

    if (Array.isArray(size)) {
      gap = `${this.getNumberSize(size[0])}px ${this.getNumberSize(size[1])}px`;
    } else {
      gap = `${this.getNumberSize(size)}px`;
    }

    return {
      gap,
    };
  });

  private getNumberSize(size: PrismSpaceSize): number {
    return typeof size === 'string' ? this.sizeMap[size] : size;
  }
}
