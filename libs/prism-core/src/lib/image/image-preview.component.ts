import { 
  Component, 
  ChangeDetectionStrategy, 
  input, 
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismIconComponent } from '../icon/icon.component';

@Component({
  selector: 'prism-image-preview',
  imports: [CommonModule, PrismIconComponent],
  template: `
    <div class="prism-image-preview-mask" role="button" tabindex="0" (click)="close()" (keydown.enter)="close()"></div>
    <div class="prism-image-preview-wrap">
      <div class="prism-image-preview-body" role="button" tabindex="-1" (click)="close()" (keydown.enter)="close()">
         <div class="prism-image-preview-operations" role="button" tabindex="-1" (click)="$event.stopPropagation()" (keydown.enter)="$event.stopPropagation()">
            <button class="prism-image-preview-operations-operation" (click)="zoomIn()" title="Zoom In">
               <prism-icon name="zoom-in-line"></prism-icon>
            </button>
            <button class="prism-image-preview-operations-operation" (click)="zoomOut()" title="Zoom Out">
               <prism-icon name="zoom-out-line"></prism-icon>
            </button>
            <button class="prism-image-preview-operations-operation" (click)="rotateRight()" title="Rotate Right">
               <prism-icon name="clockwise-2-line"></prism-icon>
            </button>
            <button class="prism-image-preview-operations-operation" (click)="rotateLeft()" title="Rotate Left">
               <prism-icon name="anticlockwise-2-line"></prism-icon>
            </button>
         </div>
         <div class="prism-image-preview-img-wrapper" role="button" tabindex="-1" (mousedown)="onDragStart($event)" (touchstart)="onGestureStart($event)" (click)="$event.stopPropagation()" (keydown.enter)="$event.stopPropagation()" [style.transform]="transformString()">
            <img [src]="src()" [alt]="alt()" class="prism-image-preview-img" />
         </div>
         <button class="prism-image-preview-close" (click)="close()">
             <prism-icon name="close-line"></prism-icon>
         </button>
      </div>
    </div>
  `,
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:mousemove)': 'onDragMove($event)',
    '(window:mouseup)': 'onDragEnd()',
    '(window:touchmove)': 'onGestureMove($event)',
    '(window:touchend)': 'onGestureEnd($event)'
  }
})
export class PrismImagePreviewComponent {
  readonly src = input.required<string>();
  readonly alt = input<string>('');
  readonly onClose = input<() => void>();

  zoom = signal<number>(1);
  rotate = signal<number>(0);
  
  // Drag State
  translateX = signal<number>(0);
  translateY = signal<number>(0);
  
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private initialTranslateX = 0;
  private initialTranslateY = 0;

  // Touch handlers for mobile
  private initialPinchDistance = 0;
  private initialPinchZoom = 1;

  transformString(): string {
    return `translate3d(${this.translateX()}px, ${this.translateY()}px, 0) scale3d(${this.zoom()}, ${this.zoom()}, 1) rotate(${this.rotate()}deg)`;
  }

  zoomIn(): void {
    this.zoom.update(z => Math.min(z + 0.2, 5));
  }

  zoomOut(): void {
    this.zoom.update(z => Math.max(z - 0.2, 0.2));
  }

  rotateRight(): void {
    this.rotate.update(r => r + 90);
  }

  rotateLeft(): void {
    this.rotate.update(r => r - 90);
  }

  close(): void {
    const fn = this.onClose();
    if (fn) fn();
  }

  // Mouse Drag implementation
  onDragStart(event: MouseEvent): void {
     event.preventDefault();
     this.isDragging = true;
     this.startX = event.clientX;
     this.startY = event.clientY;
     this.initialTranslateX = this.translateX();
     this.initialTranslateY = this.translateY();
  }

  onDragMove(event: MouseEvent): void {
     if (!this.isDragging) return;
     const dx = event.clientX - this.startX;
     const dy = event.clientY - this.startY;
     this.translateX.set(this.initialTranslateX + dx);
     this.translateY.set(this.initialTranslateY + dy);
  }

  onDragEnd(): void {
     this.isDragging = false;
  }

  // Touch Gestures Implementation
  onGestureStart(event: TouchEvent): void {
     if (event.touches.length === 1) {
       this.isDragging = true;
       this.startX = event.touches[0].clientX;
       this.startY = event.touches[0].clientY;
       this.initialTranslateX = this.translateX();
       this.initialTranslateY = this.translateY();
     } else if (event.touches.length === 2) {
       // Pinch zoom start
       this.initialPinchDistance = Math.hypot(
         event.touches[0].clientX - event.touches[1].clientX,
         event.touches[0].clientY - event.touches[1].clientY
       );
       this.initialPinchZoom = this.zoom();
     }
  }

  onGestureMove(event: TouchEvent): void {
    if (event.touches.length === 1 && this.isDragging) {
       const dx = event.touches[0].clientX - this.startX;
       const dy = event.touches[0].clientY - this.startY;
       this.translateX.set(this.initialTranslateX + dx);
       this.translateY.set(this.initialTranslateY + dy);
    } else if (event.touches.length === 2) {
       // Pinch zoom
       const currentDistance = Math.hypot(
         event.touches[0].clientX - event.touches[1].clientX,
         event.touches[0].clientY - event.touches[1].clientY
       );
       const scale = currentDistance / this.initialPinchDistance;
       const newZoom = Math.max(0.2, Math.min(this.initialPinchZoom * scale, 5));
       this.zoom.set(newZoom);
    }
  }

  onGestureEnd(event: TouchEvent): void {
    if (event.touches.length === 0) {
      this.isDragging = false;
    }
  }
}
