import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismRadioComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-radio-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismRadioComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './radio-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioDemoComponent {
  readonly snippets = {
    usage: `<prism-radio></prism-radio>`
  };
}
