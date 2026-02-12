import { 
  Component, 
  ChangeDetectionStrategy, 
  input, 
  signal, 
  EventEmitter, 
  Output,
  TemplateRef,
  model
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'prism-accordion-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prism-collapse-panel" [class.prism-collapse-panel--active]="active()">
      <div 
        class="prism-collapse-header" 
        [class.disabled]="disabled()"
        (click)="onHeaderClick()"
      >
        <span class="prism-collapse-header__arrow" [@rotateIcon]="active()">
          <i class="ri-arrow-right-s-line"></i>
        </span>
        
        <div class="prism-collapse-header__title">
          <ng-container *ngIf="isTemplate(header()); else textHeader">
            <ng-container *ngTemplateOutlet="asTemplate(header())"></ng-container>
          </ng-container>
          <ng-template #textHeader>{{ header() }}</ng-template>
        </div>

        <div class="prism-collapse-header__extra" *ngIf="extra()">
          <ng-container *ngIf="isTemplate(extra()); else textExtra">
            <ng-container *ngTemplateOutlet="asTemplate(extra())"></ng-container>
          </ng-container>
          <ng-template #textExtra>{{ extra() }}</ng-template>
        </div>
      </div>
      
      <div 
        class="prism-collapse-content"
        [@expandContent]="active()"
      >
        <div class="prism-collapse-content__box">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .prism-collapse-panel {
      border-bottom: 1px solid var(--surface-200);

      &:last-child {
        border-bottom: none;
      }
    }

    .prism-collapse-header {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      background-color: transparent;
      cursor: pointer;
      user-select: none;
      transition: all 0.3s;

      &:hover:not(.disabled) {
        background-color: var(--surface-50);
      }

      &.disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }

    .prism-collapse-header__arrow {
      margin-right: 12px;
      font-size: 14px;
      color: var(--surface-500);
      display: flex;
      align-items: center;
      transition: transform 0.3s;
    }

    .prism-collapse-header__title {
      flex: 1;
      font-weight: 500;
      color: var(--surface-900);
    }

    .prism-collapse-header__extra {
      margin-left: auto;
      color: var(--surface-500);
      font-size: 13px;
    }

    .prism-collapse-content {
      overflow: hidden;
      background-color: var(--surface-0);
    }

    .prism-collapse-content__box {
      padding: 16px;
      color: var(--surface-700);
      font-size: 14px;
      line-height: 1.5;
    }

    :host-context([data-theme='dark']) {
      .prism-collapse-panel {
        border-color: var(--surface-800);
      }

      .prism-collapse-header {
        &:hover:not(.disabled) {
          background-color: var(--surface-800);
        }
      }

      .prism-collapse-header__title {
        color: var(--surface-50);
      }

      .prism-collapse-content {
        background-color: var(--surface-900);
      }

      .prism-collapse-content__box {
        color: var(--surface-300);
      }
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
  @Output() toggleEvent = new EventEmitter<void>();

  isTemplate(value: any): value is TemplateRef<any> {
    return value instanceof TemplateRef;
  }

  asTemplate(value: any): TemplateRef<any> {
    return value as TemplateRef<any>;
  }

  onHeaderClick(): void {
    if (this.disabled()) return;
    this.toggleEvent.emit();
  }
}
