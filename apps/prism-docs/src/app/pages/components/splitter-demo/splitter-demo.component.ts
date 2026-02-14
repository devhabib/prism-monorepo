import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismSplitterComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-splitter-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismSplitterComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './splitter-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitterDemoComponent {
  readonly snippets = {
    usage: `<prism-splitter></prism-splitter>`
  };
}
