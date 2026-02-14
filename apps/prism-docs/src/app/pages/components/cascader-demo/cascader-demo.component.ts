import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismCascaderComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-cascader-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismCascaderComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './cascader-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CascaderDemoComponent {
  readonly snippets = {
    usage: `<prism-cascader></prism-cascader>`
  };
}
