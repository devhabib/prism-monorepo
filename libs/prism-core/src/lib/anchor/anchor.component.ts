import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-anchor',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-anchor">Work in Progress: Anchor</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismAnchorComponent {
  readonly placeholder = input<string>();
}
