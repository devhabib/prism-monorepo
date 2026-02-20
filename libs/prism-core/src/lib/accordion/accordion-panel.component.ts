import { 
  Component, 
  ChangeDetectionStrategy, 
  input, 
  output,
  TemplateRef,
  model
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'prism-accordion-panel',
  imports: [NgTemplateOutlet],
  template: `
    <div class="prism-collapse-panel" [class.prism-collapse-panel--active]="active()">
      <button 
        type="button"
        class="button prism-collapse-header"  
        [class.disabled]="disabled()"
        [attr.disabled]="disabled() ? true : null"
        [attr.aria-expanded]="active()"
        (click)="onHeaderClick()"
      >
        <span class="prism-collapse-header__arrow" [@rotateIcon]="active()">
          <i class="ri-arrow-right-s-line"></i>
        </span>
        
        <div class="prism-collapse-header__title">
          @if (isTemplate(header())) {
            <ng-container *ngTemplateOutlet="asTemplate(header())"></ng-container>
          } @else {
            {{ header() }}
          }
        </div>

        @if (extra()) {
          <div class="prism-collapse-header__extra">
            @if (isTemplate(extra())) {
              <ng-container *ngTemplateOutlet="asTemplate(extra())"></ng-container>
            } @else {
              {{ extra() }}
            }
          </div>
        }
      </button>
      
      <div 
        class="prism-collapse-content"
        [@expandContent]="active()"
        [attr.aria-hidden]="!active()"
      >
        <div class="prism-collapse-content__box">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .prism-collapse-panel {
      border-bottom: 1px solid var(--border);

      &:last-child {
        border-bottom: none;
      }
    }

    .prism-collapse-header {
      width: 100%;
      border: none;
      text-align: left;
      font: inherit;
      color: inherit;
      display: flex;
      align-items: center;
      padding: 12px 16px;
      background-color: transparent;
      cursor: pointer;
      user-select: none;
      transition: all 0.3s;
      outline: none;

      &:hover:not(.disabled) {
        background-color: var(--surface-50);
      }

      &:focus-visible:not(.disabled) {
        background-color: var(--surface-50);
        box-shadow: inset 0 0 0 2px var(--primary);
      }

      &.disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }

    .prism-collapse-header__arrow {
      margin-right: 12px;
      font-size: 14px;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      transition: transform 0.3s;
    }

    .prism-collapse-header__title {
      flex: 1;
      font-weight: 500;
      color: var(--text-main);
    }

    .prism-collapse-header__extra {
      margin-left: auto;
      color: var(--text-muted);
      font-size: 13px;
    }

    .prism-collapse-content {
      overflow: hidden;
      background-color: var(--bg-card);
    }

    .prism-collapse-content__box {
      padding: 16px;
      color: var(--text-main);
      font-size: 14px;
      line-height: 1.5;
    }
  `],
  animations: [
    trigger('expandContent', [
      state('false', style({ height: '0', visibility: 'hidden', opacity: 0 })),
      state('true', style({ height: '*', visibility: 'visible', opacity: 1 })),
      transition('false <=> true', animate('250ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ]),
    trigger('rotateIcon', [
      state('false', style({ transform: 'rotate(0)' })),
      state('true', style({ transform: 'rotate(90deg)' })),
      transition('false <=> true', animate('250ms ease-in-out'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismAccordionPanelComponent {
  /** The header content for the panel */
  header = input<string | TemplateRef<void>>('');
  
  /** Whether the panel is disabled */
  disabled = input<boolean>(false);
  
  /** Expansion state (two-way binding) */
  active = model<boolean>(false);

  /** Additional content on the right side of the header */
  extra = input<string | TemplateRef<void> | null>(null);

  /** Internal event for the parent accordion to listen to */
  toggleEvent = output<undefined>();

  isTemplate(value: string | TemplateRef<unknown> | null): value is TemplateRef<unknown> {
    return value instanceof TemplateRef;
  }

  asTemplate(value: string | TemplateRef<unknown> | null): TemplateRef<unknown> {
    return value as TemplateRef<unknown>;
  }

  onHeaderClick(): void {
    if (this.disabled()) return;
    this.toggleEvent.emit(undefined);
  }
}
