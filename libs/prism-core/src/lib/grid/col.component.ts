import { Component, ChangeDetectionStrategy, input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismRowComponent } from './row.component';

@Component({
  selector: 'prism-col',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.prism-col]': 'true',
    '[class]': 'classes()',
    '[style.padding-left.px]': 'gutterValue() / 2',
    '[style.padding-right.px]': 'gutterValue() / 2'
  }
})
export class PrismColComponent {
  readonly span = input<number>();
  readonly offset = input<number>();
  readonly order = input<number>();
  
  // Responsive props
  readonly xs = input<number>();
  readonly sm = input<number>();
  readonly md = input<number>();
  readonly lg = input<number>();
  readonly xl = input<number>();
  readonly xxl = input<number>();

  private row = inject(PrismRowComponent, { optional: true });

  readonly gutterValue = computed(() => {
    if (!this.row) return 0;
    const gutter = this.row.gutter();
    return Array.isArray(gutter) ? gutter[0] : gutter;
  });

  readonly classes = computed(() => {
    const classList: string[] = [];
    
    if (this.span()) classList.push(`prism-col-${this.span()}`);
    if (this.offset()) classList.push(`prism-col-offset-${this.offset()}`);
    if (this.order()) classList.push(`prism-col-order-${this.order()}`);

    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
    for (const bp of breakpoints) {
      const val = this[bp]();
      if (typeof val === 'number') {
        classList.push(`prism-col-${bp}-${val}`);
      }
    }

    return classList.join(' ');
  });
}
