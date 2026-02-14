import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismSpaceComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-space-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismSpaceComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './space-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceDemoComponent {
  readonly snippets = {
    usage: `<prism-space></prism-space>`
  };
}
