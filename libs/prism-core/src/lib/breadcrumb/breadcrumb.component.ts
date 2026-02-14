import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-breadcrumb">Work in Progress: Breadcrumb</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismBreadcrumbComponent {
  readonly placeholder = input<string>();
}
