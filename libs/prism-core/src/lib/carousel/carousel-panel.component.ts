import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'prism-carousel-panel',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'prism-carousel__panel',
  },
})
export class PrismCarouselPanelComponent {
  /** Marker to identify this as a carousel panel */
  readonly isCarouselPanel = true;
}
