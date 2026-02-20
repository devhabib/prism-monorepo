import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-popover',
  imports: [CommonModule],
  template: `<div class="prism-popover">Work in Progress: Popover</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismPopoverComponent {
  readonly placeholder = input<string>();
}
