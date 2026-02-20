import {
  Component,
  ChangeDetectionStrategy,
  input,
  contentChildren,
  computed,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-sider',
  imports: [CommonModule],
  template: `
    <div class="prism-sider-children">
      <ng-content></ng-content>
    </div>
    @if (collapsible()) {
      <div
        class="prism-sider-trigger"
        role="button"
        tabindex="0"
        (click)="toggleCollapse()"
        (keydown.enter)="toggleCollapse()"
        (keydown.space)="$event.preventDefault(); toggleCollapse()"
      >
        <span class="prism-sider-zero-width-trigger">
          <!-- TODO: Add Icon here -->
          {{ collapsed() ? '>' : '<' }}
        </span>
      </div>
    }
  `,
  host: {
    '[class.prism-sider]': 'true',
    '[class.prism-sider-collapsed]': 'collapsed()',
    '[style.width]': 'siderWidth()',
    '[style.flex]': 'siderFlex()',
    '[style.max-width]': 'siderWidth()',
    '[style.min-width]': 'siderWidth()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrismSiderComponent {
  readonly width = input<string | number>(200);
  readonly collapsedWidth = input<string | number>(80);
  readonly collapsible = input<boolean>(false);
  readonly collapsed = model<boolean>(false);

  readonly siderWidth = computed(() => {
    const w = this.collapsed() ? this.collapsedWidth() : this.width();
    return typeof w === 'number' ? `${w}px` : w;
  });

  readonly siderFlex = computed(() => `0 0 ${this.siderWidth()}`);

  toggleCollapse(): void {
    this.collapsed.set(!this.collapsed());
  }
}

@Component({
  selector: 'prism-header',
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  host: {
    '[class.prism-header]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrismHeaderComponent {
  readonly _prismHeader = true;
}

@Component({
  selector: 'prism-content',
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  host: {
    '[class.prism-content]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrismContentComponent {
  readonly _prismContent = true;
}

@Component({
  selector: 'prism-footer',
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  host: {
    '[class.prism-footer]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrismFooterComponent {
  readonly _prismFooter = true;
}

@Component({
  selector: 'prism-layout',
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
  styleUrl: './layout.component.scss',
  host: {
    '[class.prism-layout]': 'true',
    '[class.prism-layout-has-sider]': 'hasSider()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrismLayoutComponent {
  private readonly siders = contentChildren(PrismSiderComponent);
  readonly hasSider = computed(() => this.siders().length > 0);
}
