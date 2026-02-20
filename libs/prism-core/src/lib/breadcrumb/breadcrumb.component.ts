import { Component, ChangeDetectionStrategy, input, contentChildren, TemplateRef, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismBreadcrumbItemComponent } from './breadcrumb-item.component';

@Component({
  selector: 'prism-breadcrumb',
  imports: [CommonModule],
  template: `
    <nav class="prism-breadcrumb" aria-label="Breadcrumb">
      <ol class="prism-breadcrumb__list">
        <ng-content></ng-content>
      </ol>
    </nav>
  `,
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrismBreadcrumbComponent {
  readonly items = contentChildren(forwardRef(() => PrismBreadcrumbItemComponent));
  readonly separator = input<string | TemplateRef<void>>('/');
  
  isTemplate(value: string | TemplateRef<void>): value is TemplateRef<void> {
    return value instanceof TemplateRef;
  }
}
