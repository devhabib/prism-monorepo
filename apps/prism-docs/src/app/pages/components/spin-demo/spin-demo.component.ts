import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismSpinComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-spin-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismSpinComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './spin-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinDemoComponent {
  readonly snippets = {
    usage: `<prism-spin></prism-spin>`
  };
}
