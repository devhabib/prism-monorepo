import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-flex',
  imports: [CommonModule],
  template: `
    <div [class]="classes()" [style]="styles()">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './flex.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismFlexComponent {
  readonly vertical = input<boolean>(false);
  readonly justify = input<'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'>('start');
  readonly align = input<'start' | 'end' | 'center' | 'baseline' | 'stretch'>('start');
  readonly wrap = input<'nowrap' | 'wrap' | 'wrap-reverse'>('nowrap');
  readonly gap = input<number | string>(0);

  readonly classes = computed(() => ({
    'prism-flex': true,
    'prism-flex-vertical': this.vertical(),
    [`prism-flex-justify-${this.justify()}`]: true,
    [`prism-flex-align-${this.align()}`]: true,
    [`prism-flex-wrap-${this.wrap()}`]: true,
  }));

  readonly styles = computed(() => {
    const gapValue = this.gap();
    const gap = typeof gapValue === 'number' || !isNaN(Number(gapValue)) ? `${gapValue}px` : gapValue;
    return { gap };
  });
}
