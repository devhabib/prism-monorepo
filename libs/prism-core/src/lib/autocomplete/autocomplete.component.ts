import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-autocomplete',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-autocomplete">Work in Progress: AutoComplete</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismAutoCompleteComponent {
  readonly placeholder = input<string>();
}
