import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-layout',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-layout">Work in Progress: Layout</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismLayoutComponent {
  readonly placeholder = input<string>();
}
