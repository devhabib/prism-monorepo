import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-typography',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-typography">Work in Progress: Typography</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismTypographyComponent {
  readonly placeholder = input<string>();
}
