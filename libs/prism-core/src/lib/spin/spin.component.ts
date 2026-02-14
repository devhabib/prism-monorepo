import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-spin',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-spin">Work in Progress: Spin</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismSpinComponent {
  readonly placeholder = input<string>();
}
