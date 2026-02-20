import { Directive, input, computed } from '@angular/core';

@Directive({
  selector: 'input[prismInput], textarea[prismInput]',
  host: {
    '[class]': 'hostClasses()'
  }
})
export class PrismInputDirective {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly error = input<boolean>(false);
  readonly success = input<boolean>(false);

  readonly hostClasses = computed(() => {
    return [
      'prism-input',
      `prism-input-${this.size()}`,
      this.error() ? 'p-error' : '',
      this.success() ? 'p-success' : ''
    ].filter(Boolean).join(' ');
  });
}
