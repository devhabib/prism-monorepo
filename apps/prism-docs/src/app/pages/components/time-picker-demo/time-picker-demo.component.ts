import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  imports: [
    CommonModule, 
    FormsModule,
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
  readonly basicValue = signal<string | null>('14:30');
  readonly twelveHourValue = signal<string | null>('08:15 AM');
  readonly disabledValue = signal<string | null>('09:00');
  readonly secondsValue = signal<string | null>('12:45:30');

  readonly snippets = {
    basic: `<prism-time-picker [(value)]="time" />`,
    twelveHour: `<prism-time-picker [(value)]="time" format="hh:mm a" [use12Hour]="true" />`,
    disabled: `<prism-time-picker [(value)]="time" [disabled]="true" />`,
    seconds: `<prism-time-picker [(value)]="time" format="HH:mm:ss" />`
  };
}
