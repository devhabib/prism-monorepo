import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-statistic',
  imports: [CommonModule],
  template: `<div class="prism-statistic">Work in Progress: Statistic</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismStatisticComponent {
  readonly placeholder = input<string>();
}
