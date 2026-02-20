import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-image',
  imports: [CommonModule],
  template: `<div class="prism-image">Work in Progress: Image</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismImageComponent {
  readonly placeholder = input<string>();
}
