import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-row',
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
export class PrismRowComponent {
  readonly gutter = input<number | [number, number]>(0);
  readonly justify = input<'start' | 'end' | 'center' | 'space-around' | 'space-between'>('start');
  readonly align = input<'top' | 'middle' | 'bottom'>('top');

  readonly classes = computed(() => ({
    'prism-row': true,
    [`prism-row-justify-${this.justify()}`]: true,
    [`prism-row-align-${this.align()}`]: true,
  }));

  readonly styles = computed(() => {
    const gutter = this.gutter();
    if (Array.isArray(gutter)) {
      return {
        'margin-left': `${-gutter[0] / 2}px`,
        'margin-right': `${-gutter[0] / 2}px`,
        'row-gap': `${gutter[1]}px`,
      };
    }
    return {
      'margin-left': `${-gutter / 2}px`,
      'margin-right': `${-gutter / 2}px`,
    };
  });
}
