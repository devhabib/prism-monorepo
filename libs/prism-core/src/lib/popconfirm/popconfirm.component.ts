import { 
  Component, 
  ChangeDetectionStrategy, 
  input, 
  output, 
  viewChild, 
  TemplateRef,
  Directive,
  inject,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismPopoverComponent, PrismPopoverTriggerDirective } from '../popover/popover.component';
import { PrismButtonComponent } from '../button/button.component';

@Component({
  selector: 'prism-popconfirm',
  standalone: true,
  imports: [CommonModule, PrismPopoverComponent, PrismButtonComponent],
  template: `
    <prism-popover #popover [title]="undefined" [content]="confirmContent" (mouseenter)="$event.stopPropagation()" (mouseleave)="$event.stopPropagation()">
      <ng-template #confirmContent>
        <div class="prism-popconfirm__content">
          <div class="prism-popconfirm__message">
            @if (icon()) {
              <span class="prism-popconfirm__message-icon">
                <ng-container [ngTemplateOutlet]="isTemplateRef(icon()) ? $any(icon()) : defaultIcon"></ng-container>
                <ng-template #defaultIcon>
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 13a.5.5 0 01-.5-.5v-1a.5.5 0 011 0v1a.5.5 0 01-.5.5zm0-3a.5.5 0 01-.5-.5v-6a.5.5 0 011 0v6a.5.5 0 01-.5.5z"/>
                  </svg>
                </ng-template>
              </span>
            }
            <div class="prism-popconfirm__message-text">
              <ng-container [ngTemplateOutlet]="isTemplateRef(title()) ? $any(title()) : stringTitle"></ng-container>
              <ng-template #stringTitle>{{ title() }}</ng-template>
            </div>
          </div>
          <div class="prism-popconfirm__buttons">
            <prism-button size="sm" (click)="handleCancel()">{{ cancelText() }}</prism-button>
            <prism-button size="sm" color="primary" (click)="handleConfirm()">{{ confirmText() }}</prism-button>
          </div>
        </div>
      </ng-template>
    </prism-popover>
  `,
  styleUrls: ['./popconfirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'prismPopconfirm'
})
export class PrismPopconfirmComponent {
  readonly popover = viewChild<PrismPopoverComponent>('popover');

  /** Title or message of the confirmation bubble */
  readonly title = input.required<string | TemplateRef<unknown>>();
  
  /** Text for the confirm button */
  readonly confirmText = input<string>('Confirm');
  
  /** Text for the cancel button */
  readonly cancelText = input<string>('Cancel');
  
  /** Icon to display (optional) */
  readonly icon = input<string | TemplateRef<unknown>>('exclamation-circle');

  /** Emit when confirmed */
  readonly confirmed = output();
  
  /** Emit when cancelled */
  readonly cancelled = output();

  isTemplateRef(val: unknown): val is TemplateRef<unknown> {
    return val instanceof TemplateRef;
  }

  show(): void {
    this.popover()?.show();
  }

  hide(): void {
    this.popover()?.hide();
  }

  handleConfirm(): void {
    this.confirmed.emit();
    this.hide();
  }

  handleCancel(): void {
    this.cancelled.emit();
    this.hide();
  }
}

@Directive({
  selector: '[prismPopconfirmTrigger]',
  standalone: true,
  hostDirectives: [{
    directive: PrismPopoverTriggerDirective,
    inputs: ['placement', 'trigger']
  }]
})
export class PrismPopconfirmTriggerDirective {
  private readonly popoverTrigger = inject(PrismPopoverTriggerDirective);
  readonly popconfirm = input.required<PrismPopconfirmComponent>({ alias: 'prismPopconfirmTrigger' });

  constructor() {
    effect(() => {
      const pc = this.popconfirm();
      const popover = pc?.popover(); // This is the popover() call that was likely referenced. It's already correct.
      if (popover) {
        this.popoverTrigger.manualPopover = popover;
      }
    });
  }
}
