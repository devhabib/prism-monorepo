import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismTimePickerComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-time-picker-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismTimePickerComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './time-picker-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerDemoComponent {
  readonly snippets = {
    usage: `<prism-time-picker></prism-time-picker>`
  };
}
