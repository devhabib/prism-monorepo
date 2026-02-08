import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  host: {
    '[class.p-avatar]': 'true',
    '[class.p-avatar-circle]': 'shape() === "circle"',
    '[class.p-avatar-square]': 'shape() === "square"',
    '[class.p-avatar-sm]': 'size() === "sm"',
    '[class.p-avatar-md]': 'size() === "md"',
    '[class.p-avatar-lg]': 'size() === "lg"',
    '[class.p-avatar-xl]': 'size() === "xl"',
    '[class.p-avatar-image]': '!!image() && !imageError()',
  },
})
export class PrismAvatarComponent {
  image = input<string | null>(null);
  label = input<string | null>(null);
  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
  shape = input<'circle' | 'square'>('circle');

  imageError = signal(false);

  onImageError() {
    this.imageError.set(true);
  }
}
