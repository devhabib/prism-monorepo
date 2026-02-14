import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-input-number',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-input-number">Work in Progress: InputNumber</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismInputNumberComponent {
  readonly placeholder = input<string>();
}
