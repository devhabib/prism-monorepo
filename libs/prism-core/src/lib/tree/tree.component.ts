import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-tree',
  imports: [CommonModule],
  template: `<div class="prism-tree">Work in Progress: Tree</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismTreeComponent {
  readonly placeholder = input<string>();
}
