import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-dropdown">Work in Progress: Dropdown</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismDropdownComponent {
  readonly placeholder = input<string>();
}
