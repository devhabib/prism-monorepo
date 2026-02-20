import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-form-field',
  imports: [CommonModule],
  template: `
    <div class="prism-form-field" [class.prism-form-field--error]="error()">
      @if (label()) {
        <label [attr.for]="controlId()" class="prism-form-field__label">
          {{ label() }}
          @if (required()) {
            <span class="prism-form-field__required-marker" aria-hidden="true">*</span>
          }
        </label>
      }
      
      <div class="prism-form-field__control">
        <ng-content></ng-content>
      </div>

      @if (error()) {
        <div class="prism-form-field__error" role="alert">
          {{ error() }}
        </div>
      } @else if (hint()) {
        <div class="prism-form-field__hint">
          {{ hint() }}
        </div>
      }
    </div>
  `,
  styles: [`
    .prism-form-field {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      width: 100%;
      margin-bottom: 1rem;
    }

    .prism-form-field__label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .prism-form-field__required-marker {
      color: var(--danger, #ef4444);
    }

    .prism-form-field__control {
      position: relative;
    }

    .prism-form-field__error {
      font-size: 0.75rem;
      color: var(--danger, #ef4444);
      margin-top: 0.125rem;
    }

    .prism-form-field__hint {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: 0.125rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismFormFieldComponent {
  readonly label = input<string>('');
  readonly hint = input<string>('');
  readonly error = input<string | null>(null);
  readonly required = input<boolean>(false);
  readonly controlId = input<string>('');
}
