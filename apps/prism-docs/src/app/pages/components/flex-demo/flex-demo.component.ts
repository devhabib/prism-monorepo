import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismFlexComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-flex-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismFlexComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './flex-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexDemoComponent {
  readonly snippets = {
    usage: `<prism-flex justify="between" align="center">
  <div>Item 1</div>
  <div>Item 2</div>
</prism-flex>`
  };
}
