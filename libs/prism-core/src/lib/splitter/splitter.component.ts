import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-splitter',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-splitter">Work in Progress: Splitter</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismSplitterComponent {
  readonly placeholder = input<string>();
}
