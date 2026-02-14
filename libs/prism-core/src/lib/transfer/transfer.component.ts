import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-transfer',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-transfer">Work in Progress: Transfer</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismTransferComponent {
  readonly placeholder = input<string>();
}
