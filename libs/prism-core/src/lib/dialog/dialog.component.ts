import { Component, input, model, output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'prism-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('backdropAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('dialogAnimation', [
      // CENTER: Scale/Fade
      transition('void => center', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition('center => void', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
      ]),

      // TOP: Slide Down
      transition('void => top', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('250ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition('top => void', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ]),

      // BOTTOM: Slide Up
      transition('void => bottom', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('250ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition('bottom => void', [
        animate('200ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
      ]),

      // LEFT: Slide Right
      transition('void => left', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('250ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition('left => void', [
        animate('200ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ]),

      // RIGHT: Slide Left (Sidebar)
      transition('void => right', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('250ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition('right => void', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class PrismDialogComponent {
  readonly header = input<string>('');
  readonly visible = model<boolean>(false);
  readonly width = input<string>('500px');
  readonly position = input<'center' | 'top' | 'bottom' | 'left' | 'right'>('center');
  readonly dismissableMask = input<boolean>(true);
  
  readonly show = output<undefined>();
  readonly hide = output<undefined>();

  close(): void {
    this.visible.set(false);
    this.hide.emit(undefined);
  }

  onBackdropClick(): void {
    if (this.dismissableMask()) {
      this.close();
    }
  }
}
