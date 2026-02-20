import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismSliderComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent,
  ApiDoc
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
    PrismTabComponent,
    ApiTableComponent
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

  readonly apiData: ApiDoc[] = [
    { name: 'min', type: 'input<number>', default: '0', description: 'The minimum allowed value.' },
    { name: 'max', type: 'input<number>', default: '100', description: 'The maximum allowed value.' },
    { name: 'step', type: 'input<number>', default: '1', description: 'The step granularity size.' },
    { name: 'disabled', type: 'input<boolean>', default: 'false', description: 'Whether the component is disabled.' },
    { name: 'value', type: 'model<number>', default: '0', description: 'The two-way bound slider value.' }
  ];
}
