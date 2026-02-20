import { Component, ChangeDetectionStrategy, input, computed, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismRowComponent } from './row.component';

@Component({
  selector: 'prism-col, [prism-col]',
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
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
  readonly xs = input<number | { span: number, offset?: number, order?: number }>();
  readonly sm = input<number | { span: number, offset?: number, order?: number }>();
  readonly md = input<number | { span: number, offset?: number, order?: number }>();
  readonly lg = input<number | { span: number, offset?: number, order?: number }>();
  readonly xl = input<number | { span: number, offset?: number, order?: number }>();
  readonly xxl = input<number | { span: number, offset?: number, order?: number }>();

  private row = inject(PrismRowComponent, { optional: true });

  readonly gutterValue = computed(() => {
    if (!this.row) return 0;
    const gutter = this.row.gutter();
    return Array.isArray(gutter) ? gutter[0] : gutter;
  });

  readonly classes = computed(() => {
    const classList: string[] = [];
    
    if (this.span() !== undefined) classList.push(`prism-col-${this.span()}`);
    if (this.offset() !== undefined) classList.push(`prism-col-offset-${this.offset()}`);
    if (this.order() !== undefined) classList.push(`prism-col-order-${this.order()}`);

    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
    for (const bp of breakpoints) {
      const val = this[bp]();
      if (typeof val === 'number') {
        classList.push(`prism-col-${bp}-${val}`);
      } else if (typeof val === 'object' && val !== null) {
        if (val.span !== undefined) classList.push(`prism-col-${bp}-${val.span}`);
        if (val.offset !== undefined) classList.push(`prism-col-${bp}-offset-${val.offset}`);
        if (val.order !== undefined) classList.push(`prism-col-${bp}-order-${val.order}`);
      }
    }

    return classList.join(' ');
  });
}
