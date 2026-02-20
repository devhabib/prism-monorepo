import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismSliderComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

import { signal } from '@angular/core';

@Component({
  selector: 'app-slider-demo',
  imports: [
    CommonModule, 
    PrismSliderComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './slider-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderDemoComponent {
  sliderValue = signal(30);

  readonly snippets = {
    usage: `<prism-slider [(value)]="sliderValue"></prism-slider>
<p>Value: {{ sliderValue() }}</p>`,
    advanced: `<prism-slider 
  [min]="0" 
  [max]="200" 
  [step]="10" 
  [(value)]="advancedValue">
</prism-slider>`
  };
}
