import { Component, input, signal, computed, ChangeDetectionStrategy, ViewEncapsulation, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-code-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrismCodeBlockComponent {
  // Single code input (legacy)
  code = input<string | null>(null);
  
  // Tab-based inputs
  html = input<string | null>(null);
  ts = input<string | null>(null);
  scss = input<string | null>(null);
  
  
  language = input<string>('html');

  // Intelligently set initial active tab based on which content is provided
  activeTab = computed(() => {
    if (this.ts()) return 'ts';
    if (this.scss()) return 'scss';
    return 'html';
  });
  
  // Track user-selected tab (overrides auto-detection)
  selectedTab = signal<'html' | 'ts' | 'scss' | null>(null);
  
  currentTab = computed(() => this.selectedTab() ?? this.activeTab());
  
  currentCode = computed(() => {
    switch (this.currentTab()) {
      case 'html': return this.html() ?? this.code() ?? '';
      case 'ts': return this.ts() ?? '';
      case 'scss': return this.scss() ?? '';
      default: return '';
    }
  });

  copied = signal(false);

  copyToClipboard() {
    const textToCopy = this.currentCode();
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }
}
