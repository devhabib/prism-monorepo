import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-result',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-result">Work in Progress: Result</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismResultComponent {
  readonly placeholder = input<string>();
}
