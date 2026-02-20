import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismTransferComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-transfer-demo',
  imports: [
    CommonModule, 
    PrismTransferComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './transfer-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferDemoComponent {
  readonly snippets = {
    usage: `<prism-transfer></prism-transfer>`
  };
}
