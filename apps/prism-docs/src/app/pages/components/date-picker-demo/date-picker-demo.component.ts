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
  PrismTabComponent,
  ApiTableComponent,
  ApiDoc
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
    PrismTabComponent,
    ApiTableComponent
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

  readonly apiData: ApiDoc[] = [
    { name: 'placeholder', type: 'input<string>', default: "'Select date'", description: 'Placeholder for the date input.' },
    { name: 'disabled', type: 'model<boolean>', default: 'false', description: 'Whether the date picker is disabled.' },
    { name: 'value', type: 'model<Date | null>', default: 'null', description: 'The two-way bound selected date.' }
  ];
}
