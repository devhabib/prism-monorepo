import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-slider',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-slider">Work in Progress: Slider</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismSliderComponent {
  readonly placeholder = input<string>();
}
