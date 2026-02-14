import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-list',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-list">Work in Progress: List</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismListComponent {
  readonly placeholder = input<string>();
}
