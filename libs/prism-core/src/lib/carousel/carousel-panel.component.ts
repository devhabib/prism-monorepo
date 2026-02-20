import { Component, ChangeDetectionStrategy, ViewEncapsulation, signal } from '@angular/core';

@Component({
  selector: 'prism-carousel-panel',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'prism-carousel__panel',
    '[class.is-active]': 'isActive()'
  },
})
export class PrismCarouselPanelComponent {
  /** Marker to identify this as a carousel panel */
  readonly isCarouselPanel = true;
  
  /** Controlled by the parent carousel to manage fade transitions */
  readonly isActive = signal<boolean>(false);
}
