import { Component, ChangeDetectionStrategy, input, computed, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipe cast helper since we can't use type guard in template easily directly with stricter checks without a pipe or method
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'asTemplate', standalone: true })
export class AsTemplatePipe implements PipeTransform {
    transform(value: unknown): TemplateRef<unknown> {
        return value as TemplateRef<unknown>;
    }
}

@Component({
  selector: 'prism-divider',
  standalone: true,
  imports: [CommonModule, AsTemplatePipe],
  template: `
    <div 
      [class]="classes()" 
      role="separator"
    >
      @if (content()) {
        <span class="prism-divider-inner-text">
            <ng-container *ngTemplateOutlet="isTemplate(content()) ? (content() | asTemplate) : defaultText"></ng-container>
            <ng-template #defaultText>{{ content() }}</ng-template>
        </span>
      }
    </div>
  `,
  styleUrl: './divider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismDividerComponent {
  readonly type = input<'horizontal' | 'vertical'>('horizontal');
  readonly orientation = input<'left' | 'right' | 'center'>('center');
  readonly dashed = input<boolean>(false);
  readonly content = input<string | TemplateRef<unknown> | null>(null);

  readonly classes = computed(() => ({
    'prism-divider': true,
    'prism-divider-horizontal': this.type() === 'horizontal',
    'prism-divider-vertical': this.type() === 'vertical',
    'prism-divider-dashed': this.dashed(),
    'prism-divider-with-text': this.type() === 'horizontal' && !!this.content(),
    [`prism-divider-with-text-${this.orientation()}`]: this.type() === 'horizontal' && !!this.content(),
  }));

  isTemplate(val: unknown): boolean {
    return val instanceof TemplateRef;
  }
}
