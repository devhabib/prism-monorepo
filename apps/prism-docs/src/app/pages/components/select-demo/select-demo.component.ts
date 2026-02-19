import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismSelectComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-select-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismSelectComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent
  ],
  templateUrl: './select-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDemoComponent {
  readonly snippets = {
    usage: `<prism-select label="Select option"></prism-select>`
  };
}
