import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: 'input[prismInput], textarea[prismInput]',
  standalone: true
})
export class PrismInputDirective {
  size = input<'sm' | 'md' | 'lg'>('md');
  error = input<boolean>(false);
  success = input<boolean>(false);

  @HostBinding('class.prism-input') true = true;
  
  @HostBinding('class.prism-input-sm')
  get isSmall() { return this.size() === 'sm'; }

  @HostBinding('class.prism-input-md')
  get isMedium() { return this.size() === 'md'; }

  @HostBinding('class.prism-input-lg')
  get isLarge() { return this.size() === 'lg'; }

  @HostBinding('class.p-error')
  get hasError() { return this.error(); }

  @HostBinding('class.p-success')
  get hasSuccess() { return this.success(); }
}
