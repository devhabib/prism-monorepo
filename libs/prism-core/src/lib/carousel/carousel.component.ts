import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-carousel">Work in Progress: Carousel</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismCarouselComponent {
  readonly placeholder = input<string>();
}
