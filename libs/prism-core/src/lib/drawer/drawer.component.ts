import { Component, input, model, output, TemplateRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { DrawerPosition } from './drawer.types';

@Component({
  selector: 'prism-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('panelState', [
      transition('void => left', [
        style({ transform: 'translateX(-100%)' }), 
        animate('250ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition('left => void', [
        animate('250ms ease-in', style({ transform: 'translateX(-100%)' }))
      ]),
      transition('void => right', [
        style({ transform: 'translateX(100%)' }), 
        animate('250ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition('right => void', [
        animate('250ms ease-in', style({ transform: 'translateX(100%)' }))
      ]),
      transition('void => top', [
        style({ transform: 'translateY(-100%)' }), 
        animate('250ms ease-out', style({ transform: 'translateY(0)' }))
      ]),
      transition('top => void', [
        animate('250ms ease-in', style({ transform: 'translateY(-100%)' }))
      ]),
      transition('void => bottom', [
        style({ transform: 'translateY(100%)' }), 
        animate('250ms ease-out', style({ transform: 'translateY(0)' }))
      ]),
      transition('bottom => void', [
        animate('250ms ease-in', style({ transform: 'translateY(100%)' }))
      ]),
    ]),
    trigger('backdropState', [
      transition(':enter', [
        style({ opacity: 0 }), 
        animate('250ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({ opacity: 0 }))
      ]),
    ])
  ]
})
export class PrismDrawerComponent {
  readonly visible = model<boolean>(false);
  readonly position = input<DrawerPosition>('right');
  readonly title = input<string | TemplateRef<unknown>>('');
  readonly header = input<string | TemplateRef<unknown>>(''); // Alias for title compatibility
  readonly footer = input<string | TemplateRef<unknown> | null>(null);
  readonly width = input<string>('300px'); // For Left/Right
  readonly height = input<string>('300px'); // For Top/Bottom
  readonly closeOnEscape = input<boolean>(true);
  readonly maskClosable = input<boolean>(true);
  readonly showClose = input<boolean>(true);

  readonly closed = output<undefined>();

  // Helper getters to handle title/header naming
  get displayTitle(): string | TemplateRef<unknown> {
    return this.title() || this.header();
  }

  close(): void {
    this.visible.set(false);
    this.closed.emit(undefined);
  }

  isTemplate(val: string | TemplateRef<unknown> | null): val is TemplateRef<unknown> {
    return val instanceof TemplateRef;
  }

  asTemplate(val: string | TemplateRef<unknown> | null): TemplateRef<unknown> {
    return val as TemplateRef<unknown>;
  }
}
