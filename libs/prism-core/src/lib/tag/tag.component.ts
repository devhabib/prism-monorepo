import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-tag',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="prism-tag">
      <span class="prism-tag__label">{{ label() }}</span>
      @if (removable()) {
        <button 
          type="button"
          class="prism-tag__remove" 
          (click)="handleRemove()"
          aria-label="Remove tag">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      }
    </span>
  `,
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrismTagComponent {
  label = input.required<string>();
  removable = input<boolean>(false);
  
  onRemove = output<void>();

  handleRemove(): void {
    this.onRemove.emit();
  }
}
