import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-calendar',
  imports: [CommonModule],
  template: `<div class="prism-calendar">Work in Progress: Calendar</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismCalendarComponent {
  readonly placeholder = input<string>();
}
