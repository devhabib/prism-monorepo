import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismDividerComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-divider-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismDividerComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './divider-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerDemoComponent {
  readonly snippets = {
    usage: `<prism-divider></prism-divider>`
  };
}
