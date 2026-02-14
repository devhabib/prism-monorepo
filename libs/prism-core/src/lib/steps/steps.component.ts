import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-steps',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-steps">Work in Progress: Steps</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismStepsComponent {
  readonly placeholder = input<string>();
}
