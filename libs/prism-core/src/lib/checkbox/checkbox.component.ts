import { Component, ChangeDetectionStrategy, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="prism-checkbox" [class.disabled]="disabled()">
      <input
        type="checkbox"
        class="prism-checkbox__input"
        [checked]="checked()"
        [disabled]="disabled()"
        [value]="value()"
        (change)="onCheckChange($event)"
      />
      <span class="prism-checkbox__box" [class.prism-checkbox__box--radio]="type() === 'radio'">
        @if (type() === 'checkbox' && checked()) {
          <svg class="prism-checkbox__icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        }
        @if (type() === 'radio' && checked()) {
          <span class="prism-checkbox__dot"></span>
        }
      </span>
      @if (label()) {
        <span class="prism-checkbox__label">{{ label() }}</span>
      }
    </label>
  `,
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrismCheckboxComponent {
  label = input<string>('');
  type = input<'checkbox' | 'radio'>('checkbox');
  disabled = input<boolean>(false);
  value = input<any>(null);
  
  checked = model<boolean>(false);

  onCheckChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked.set(target.checked);
  }
}
