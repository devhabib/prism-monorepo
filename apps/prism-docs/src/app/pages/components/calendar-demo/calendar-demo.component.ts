import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismCalendarComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-calendar-demo',
  imports: [
    CommonModule, 
    PrismCalendarComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './calendar-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDemoComponent {
  readonly snippets = {
    usage: `<prism-calendar></prism-calendar>`
  };
}
