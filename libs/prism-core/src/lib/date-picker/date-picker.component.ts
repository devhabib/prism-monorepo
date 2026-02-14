import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-date-picker',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-date-picker">Work in Progress: DatePicker</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismDatePickerComponent {
  readonly placeholder = input<string>();
}
