import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismRateComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-rate-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismRateComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './rate-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RateDemoComponent {
  readonly snippets = {
    usage: `<prism-rate></prism-rate>`
  };
}
