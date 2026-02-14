import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-cascader',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-cascader">Work in Progress: Cascader</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismCascaderComponent {
  readonly placeholder = input<string>();
}
