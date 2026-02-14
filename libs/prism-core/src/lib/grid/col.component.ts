import { Component, ChangeDetectionStrategy, input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismRowComponent } from './row.component';

@Component({
  selector: 'prism-col',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="classes()" [style]="styles()">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  readonly classes = computed(() => {
    const classes: Record<string, boolean> = {
      'prism-col': true,
    };

    if (this.span()) classes[`prism-col-${this.span()}`] = true;
    if (this.offset()) classes[`prism-col-offset-${this.offset()}`] = true;
    if (this.order()) classes[`prism-col-order-${this.order()}`] = true;

    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
    for (const bp of breakpoints) {
      const val = this[bp]();
      if (typeof val === 'number') {
        classes[`prism-col-${bp}-${val}`] = true;
      }
    }

    return classes;
  });

  readonly styles = computed(() => {
    if (!this.row) return {};
    const gutter = this.row.gutter();
    const hGutter = Array.isArray(gutter) ? gutter[0] : gutter;
    return {
      'padding-left': `${hGutter / 2}px`,
      'padding-right': `${hGutter / 2}px`,
    };
  });
}
