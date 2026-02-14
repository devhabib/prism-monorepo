import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismResultComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-result-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismResultComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './result-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultDemoComponent {
  readonly snippets = {
    usage: `<prism-result></prism-result>`
  };
}
