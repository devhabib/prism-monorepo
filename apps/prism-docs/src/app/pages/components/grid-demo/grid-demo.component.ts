import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismRowComponent, 
  PrismColComponent,
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-grid-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismRowComponent, 
    PrismColComponent,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './grid-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDemoComponent {
  readonly snippets = {
    usage: `<prism-row [gutter]="16">
  <prism-col [span]="8">Column 1</prism-col>
  <prism-col [span]="8">Column 2</prism-col>
  <prism-col [span]="8">Column 3</prism-col>
</prism-row>`
  };
}
