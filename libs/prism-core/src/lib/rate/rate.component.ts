import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-rate',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-rate">Work in Progress: Rate</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismRateComponent {
  readonly placeholder = input<string>();
}
