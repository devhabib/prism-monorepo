import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismPopconfirmComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-popconfirm-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismPopconfirmComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './popconfirm-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopconfirmDemoComponent {
  readonly snippets = {
    usage: `<prism-popconfirm></prism-popconfirm>`
  };
}
