import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-popconfirm',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-popconfirm">Work in Progress: Popconfirm</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismPopconfirmComponent {
  readonly placeholder = input<string>();
}
