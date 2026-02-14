import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismAlertComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismAlertComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './alert-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDemoComponent {
  readonly snippets = {
    usage: `<prism-alert></prism-alert>`
  };
}
