import { Component, ChangeDetectionStrategy, input, inject, computed, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismBreadcrumbComponent } from './breadcrumb.component';

@Component({
  selector: 'prism-breadcrumb-item',
  imports: [CommonModule],
  template: `
    <li class="prism-breadcrumb__item">
      <a 
        [attr.href]="href() ? href() : null" 
        [attr.target]="href() ? target() : null"
        [class.prism-breadcrumb__link]="href()"
        [class.prism-breadcrumb__text]="!href()"
      >
        <ng-content></ng-content>
      </a>

      @if (!isLast()) {
        <span class="prism-breadcrumb__separator" aria-hidden="true">
          @if (parent.isTemplate(parent.separator())) {
            <ng-container *ngTemplateOutlet="asTemplate(parent.separator())"></ng-container>
          } @else {
            {{ parent.separator() }}
          }
        </span>
      }
    </li>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrismBreadcrumbItemComponent {
  readonly parent = inject(PrismBreadcrumbComponent);

  readonly href = input<string>();
  readonly target = input<string>('_self');

  readonly isLast = computed(() => {
    const items = this.parent.items();
    return items[items.length - 1] === this;
  });

  asTemplate(value: string | TemplateRef<void>): TemplateRef<void> {
    return value as TemplateRef<void>;
  }
}
