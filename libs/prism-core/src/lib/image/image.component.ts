import { 
  Component, 
  ChangeDetectionStrategy, 
  input, 
  signal,
  inject,
  ComponentRef,
  Renderer2,
  ApplicationRef,
  EnvironmentInjector,
  createComponent
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { PrismImagePreviewComponent } from './image-preview.component';
import { PrismIconComponent } from '../icon/icon.component';

@Component({
  selector: 'prism-image',
  imports: [CommonModule, NgOptimizedImage, PrismIconComponent],
  template: `
    <div class="prism-image-wrapper" [style.width]="formatSize(width())" [style.height]="formatSize(height())">
      @if (!isError() && !isFallbackActive()) {
        <img
          [ngSrc]="src()"
          [alt]="alt()"
          [width]="width()"
          [height]="height()"
          (load)="onLoad()"
          (error)="onError()"
          class="prism-image-img"
        />
      }
      
      @if (isFallbackActive() && !isError()) {
        <img
          [src]="fallback()"
          [alt]="alt()"
          [style.width.px]="width()"
          [style.height.px]="height()"
          (load)="onLoad()"
          (error)="onFallbackError()"
          class="prism-image-img prism-image-img-fallback"
        />
      }
      
      @if (isLoading()) {
         <div class="prism-image-placeholder">
            Loading...
         </div>
      }
      
      @if (isError()) {
         <div class="prism-image-error">
            <prism-icon name="image-line"></prism-icon>
            <div class="prism-image-error-text">Load Error</div>
         </div>
      }

      @if (preview() && !isError()) {
         <div class="prism-image-mask" role="button" tabindex="0" (click)="openPreview()" (keydown.enter)="openPreview()">
            <div class="prism-image-mask-info">
               <prism-icon name="eye-line"></prism-icon>
               <span>Preview</span>
            </div>
         </div>
      }
    </div>
  `,
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.display]': '"inline-block"',
    '[style.width]': 'formatSize(width())',
    '[style.height]': 'formatSize(height())'
  }
})
export class PrismImageComponent {
  readonly src = input.required<string>();
  readonly alt = input<string>('');
  readonly width = input<string | number>('100');
  readonly height = input<string | number>('100');
  readonly fallback = input<string | null>(null);
  readonly preview = input<boolean>(true);
  
  readonly isLoading = signal(true);
  readonly isError = signal(false);
  readonly isFallbackActive = signal(false);

  // Removed implicit loader logic
  
  private previewRef: ComponentRef<PrismImagePreviewComponent> | null = null;

  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private environmentInjector = inject(EnvironmentInjector);
  private applicationRef = inject(ApplicationRef);

  onLoad(): void {
    this.isLoading.set(false);
  }

  onError(): void {
    if (this.fallback() && !this.isFallbackActive()) {
       this.isFallbackActive.set(true);
    } else {
       this.isLoading.set(false);
       this.isError.set(true);
    }
  }

  onFallbackError(): void {
    this.isLoading.set(false);
    this.isError.set(true);
  }

  formatSize(size: string | number): string {
    if (typeof size === 'number') return `${size}px`;
    return /^\d+$/.test(size.toString()) ? `${size}px` : size.toString();
  }

  openPreview(): void {
    if (this.isError()) return;

    if (!this.previewRef) {
      this.previewRef = createComponent(PrismImagePreviewComponent, {
        environmentInjector: this.environmentInjector,
      });

      this.previewRef.setInput('src', this.src());
      this.previewRef.setInput('alt', this.alt());
      this.previewRef.setInput('onClose', () => this.closePreview());

      this.applicationRef.attachView(this.previewRef.hostView);
      this.renderer.appendChild(
        this.document.body,
        this.previewRef.location.nativeElement
      );
      this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
    }
  }

  closePreview(): void {
    if (this.previewRef) {
      this.applicationRef.detachView(this.previewRef.hostView);
      this.previewRef.destroy();
      this.previewRef = null;
      this.renderer.removeStyle(this.document.body, 'overflow');
    }
  }
}
