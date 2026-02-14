import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-alert',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-alert">Work in Progress: Alert</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismAlertComponent {
  readonly placeholder = input<string>();
}
