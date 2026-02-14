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

@Component({
  selector: 'app-slider-demo',
  standalone: true,
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
  readonly snippets = {
    usage: `<prism-slider></prism-slider>`
  };
}
