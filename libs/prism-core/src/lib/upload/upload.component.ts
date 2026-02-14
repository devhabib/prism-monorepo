import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-upload',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-upload">Work in Progress: Upload</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismUploadComponent {
  readonly placeholder = input<string>();
}
