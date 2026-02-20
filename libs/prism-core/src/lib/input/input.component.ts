import { Component, ChangeDetectionStrategy, input, model, forwardRef, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PrismIconComponent } from '../icon/icon.component';
import { PrismInputDirective } from './input.directive';

@Component({
  selector: 'prism-input',
  imports: [CommonModule, PrismIconComponent, PrismInputDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrismInputComponent),
      multi: true
    }
  ],
  template: `
    <div 
      class="prism-input-wrapper"
      [class.prism-input-icon-wrapper]="hasPrefix() || hasSuffix()"
      [class.icon-left]="hasPrefix()"
      [class.icon-right]="hasSuffix()"
      [class.is-disabled]="disabled()"
    >
      @if (prefix()) {
        <span class="prism-input-prefix">
          @if (isString(prefix())) {
             <prism-icon [name]="asString(prefix())" />
          } @else {
            <ng-container [ngTemplateOutlet]="asTemplate(prefix())" />
          }
        </span>
      }

      <input
        #input
        prismInput
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [attr.disabled]="disabled() ? true : null"
        [readonly]="readonly()"
        [value]="value()"
        (input)="onInputChange($event)"
        (blur)="onTouched()"
        [size]="size()"
        [error]="error()"
        [success]="success()"
      />

      @if (suffix()) {
        <span class="prism-input-suffix">
           @if (isString(suffix())) {
             <prism-icon [name]="asString(suffix())" />
          } @else {
            <ng-container [ngTemplateOutlet]="asTemplate(suffix())" />
          }
        </span>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    .prism-input-wrapper {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
    }
    .prism-input-prefix, .prism-input-suffix {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      z-index: 10;
      pointer-events: none;
    }
  .prism-input-suffix {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    z-index: 10;
    pointer-events: none;
  }

    .icon-left .prism-input { padding-left: 2.5rem !important; }
    .icon-right .prism-input { padding-right: 2.5rem !important; }
    
    .is-disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    .prism-input-suffix{
      .prism-icon{
        right: 0.75rem;
        left: auto;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrismInputComponent implements ControlValueAccessor {
  readonly type = input<string>('text');
  readonly placeholder = input<string>('');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly error = input<boolean>(false);
  readonly success = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly disabled = model<boolean>(false);
  
  readonly prefix = input<string | TemplateRef<unknown> | null>(null);
  readonly suffix = input<string | TemplateRef<unknown> | null>(null);

  value = model<string>('');

  private onChange: (value: string) => void = () => {
    // Registered by ControlValueAccessor
  };
  onTouched: () => void = () => {
    // Registered by ControlValueAccessor
  };


  onInputChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChange(val);
  }

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected hasPrefix(): boolean {
    return this.prefix() !== null;
  }

  protected hasSuffix(): boolean {
    return this.suffix() !== null;
  }

  protected isString(val: string | TemplateRef<unknown> | null): boolean {
    return typeof val === 'string';
  }

  protected asString(val: string | TemplateRef<unknown> | null): string {
    return val as string;
  }

  protected asTemplate(val: string | TemplateRef<unknown> | null): TemplateRef<unknown> {
    return val as TemplateRef<unknown>;
  }
}
