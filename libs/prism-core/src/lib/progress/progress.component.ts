import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-progress',
  imports: [CommonModule],
  template: `<div class="prism-progress">Work in Progress: Progress</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismProgressComponent {
  readonly placeholder = input<string>();
}
