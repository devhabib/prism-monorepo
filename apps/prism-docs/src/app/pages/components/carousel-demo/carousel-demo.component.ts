import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PrismCarouselComponent,
  PrismCarouselPanelComponent,
  PrismCodeBlockComponent,
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent,
  ApiDoc,
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-carousel-demo',
  imports: [
    CommonModule,
    PrismCarouselComponent,
    PrismCarouselPanelComponent,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent,
  ],
  templateUrl: './carousel-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselDemoComponent {
  readonly panelColors = [
    { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', label: 'Slide 1' },
    { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', label: 'Slide 2' },
    { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', label: 'Slide 3' },
    { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', label: 'Slide 4' },
  ];

  readonly snippets = {
    basic: `<prism-carousel>
  <prism-carousel-panel>
    <div class="slide">Slide 1</div>
  </prism-carousel-panel>
  <prism-carousel-panel>
    <div class="slide">Slide 2</div>
  </prism-carousel-panel>
  <prism-carousel-panel>
    <div class="slide">Slide 3</div>
  </prism-carousel-panel>
</prism-carousel>`,
    vertical: `<prism-carousel [vertical]="true">
  <prism-carousel-panel>...</prism-carousel-panel>
  <prism-carousel-panel>...</prism-carousel-panel>
</prism-carousel>`,
    autoplay: `<prism-carousel [autoplay]="true" [autoplaySpeed]="2000">
  <prism-carousel-panel>...</prism-carousel-panel>
  <prism-carousel-panel>...</prism-carousel-panel>
</prism-carousel>`,
    fade: `<prism-carousel effect="fade">
  <prism-carousel-panel>...</prism-carousel-panel>
  <prism-carousel-panel>...</prism-carousel-panel>
</prism-carousel>`,
  };

  readonly apiData: ApiDoc[] = [
    { name: 'autoplay', type: 'boolean', default: 'false', description: 'Enable automatic slide advancement.' },
    { name: 'autoplaySpeed', type: 'number', default: '3000', description: 'Time between slides in ms.' },
    { name: 'dotPosition', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Position of the navigation dots.' },
    { name: 'dots', type: 'boolean', default: 'true', description: 'Show dot navigation indicators.' },
    { name: 'effect', type: "'slide' | 'fade'", default: "'slide'", description: 'Transition effect between slides.' },
    { name: 'vertical', type: 'boolean', default: 'false', description: 'Enable vertical sliding mode.' },
    { name: 'activeIndex', type: 'Signal<number>', default: '0', description: 'Currently active slide index (signal).' },
    { name: 'indexChange', type: 'EventEmitter<number>', default: '—', description: 'Emitted when the active index changes.' },
  ];
}
