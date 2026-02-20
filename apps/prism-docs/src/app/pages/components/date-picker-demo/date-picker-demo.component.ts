import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PrismDatePickerComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-date-picker-demo',
  imports: [
    CommonModule, 
    FormsModule,
    PrismDatePickerComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './date-picker-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerDemoComponent {
  selectedDate = signal<Date | null>(new Date());

  readonly snippets = {
    usage: `<prism-date-picker [(value)]="selectedDate" />`,
    disabled: `<prism-date-picker [disabled]="true" [value]="selectedDate()" />`,
    placeholder: `<prism-date-picker placeholder="Select a special day" />`
  };
}
