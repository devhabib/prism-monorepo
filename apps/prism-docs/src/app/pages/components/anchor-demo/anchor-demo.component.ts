import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismAnchorComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-anchor-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismAnchorComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './anchor-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnchorDemoComponent {
  readonly snippets = {
    usage: `<prism-anchor></prism-anchor>`
  };
}
