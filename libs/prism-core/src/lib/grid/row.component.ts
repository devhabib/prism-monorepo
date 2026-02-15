import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-row',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.prism-row]': 'true',
    '[class.prism-row-justify-start]': "justify() === 'start'",
    '[class.prism-row-justify-end]': "justify() === 'end'",
    '[class.prism-row-justify-center]': "justify() === 'center'",
    '[class.prism-row-justify-space-around]': "justify() === 'space-around'",
    '[class.prism-row-justify-space-between]': "justify() === 'space-between'",
    '[class.prism-row-align-top]': "align() === 'top'",
    '[class.prism-row-align-middle]': "align() === 'middle'",
    '[class.prism-row-align-bottom]': "align() === 'bottom'",
    '[style.margin-left.px]': 'gutterValue() / -2',
    '[style.margin-right.px]': 'gutterValue() / -2',
    '[style.row-gap.px]': 'vGutterValue()'
  }
})
export class PrismRowComponent {
  readonly gutter = input<number | [number, number]>(0);
  readonly justify = input<'start' | 'end' | 'center' | 'space-around' | 'space-between'>('start');
  readonly align = input<'top' | 'middle' | 'bottom'>('top');

  readonly gutterValue = computed(() => {
    const g = this.gutter();
    return Array.isArray(g) ? g[0] : g;
  });

  readonly vGutterValue = computed(() => {
    const g = this.gutter();
    return Array.isArray(g) ? g[1] : 0;
  });
}
