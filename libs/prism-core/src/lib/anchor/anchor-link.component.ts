import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  ElementRef,
  computed,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismAnchorComponent } from './anchor.component';

@Component({
  selector: 'prism-link',
  imports: [CommonModule],
  template: `
    <div class="prism-anchor-link-container">
      <a
        class="prism-anchor-link"
        [class.prism-anchor-link--active]="isActive()"
        [href]="href()"
        (click)="handleClick($event)">
        @if (isTemplate(title())) {
          <ng-container *ngTemplateOutlet="asTemplate(title())"></ng-container>
        } @else {
          {{ title() }}
        }
      </a>
      <div class="prism-anchor-link__nested">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismAnchorLinkComponent {
  readonly parent = inject(PrismAnchorComponent);
  readonly elementRef = inject(ElementRef);

  readonly href = input.required<string>();
  readonly title = input.required<string | TemplateRef<void>>();

  readonly isActive = computed(() => this.parent.activeLink() === this.href());

  isTemplate(value: string | TemplateRef<void>): value is TemplateRef<void> {
    return value instanceof TemplateRef;
  }

  asTemplate(value: string | TemplateRef<void>): TemplateRef<void> {
    return value as TemplateRef<void>;
  }

  handleClick(event: MouseEvent): void {
    event.preventDefault();
    this.parent.handleLinkClick(this.href());
  }
}
