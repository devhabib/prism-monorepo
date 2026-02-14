import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-menu',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-menu">Work in Progress: Menu</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismMenuComponent {
  readonly placeholder = input<string>();
}
