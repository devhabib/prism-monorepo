import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-radio',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-radio">Work in Progress: Radio</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismRadioComponent {
  readonly placeholder = input<string>();
}
