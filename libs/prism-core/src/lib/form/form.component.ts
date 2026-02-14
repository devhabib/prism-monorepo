import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-form',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-form">Work in Progress: Form</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismFormComponent {
  readonly placeholder = input<string>();
}
