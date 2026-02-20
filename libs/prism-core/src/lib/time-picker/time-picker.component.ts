import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-time-picker',
  imports: [CommonModule],
  template: `<div class="prism-time-picker">Work in Progress: TimePicker</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismTimePickerComponent {
  readonly placeholder = input<string>();
}
