import { Directive, input } from '@angular/core';

@Directive({
  selector: 'input[prismInput], textarea[prismInput]',
  standalone: true,
  host: {
    '[class.prism-input]': 'true',
    '[class.prism-input-sm]': 'size() === "sm"',
    '[class.prism-input-md]': 'size() === "md"',
    '[class.prism-input-lg]': 'size() === "lg"',
    '[class.p-error]': 'error()',
    '[class.p-success]': 'success()',
  },
})
export class PrismInputDirective {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly error = input<boolean>(false);
  readonly success = input<boolean>(false);
}
