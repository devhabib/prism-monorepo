import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PrismAvatarComponent, ThemeToggleComponent, PrismIconComponent } from '@devynelogic/prism-core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, PrismAvatarComponent, ThemeToggleComponent, PrismIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  menu = signal([
    {
      group: 'Getting Started',
      items: [
        { label: 'Installation', route: '/getting-started/installation', icon: 'download-cloud-2-line' },
        { label: 'Accessibility', route: '/getting-started/accessibility', icon: 'accessibility-line' }
      ]
    },
    {
      group: 'Foundation',
      items: [
        { label: 'Iconography', route: '/icons', icon: 'remix-run-line' }
      ]
    },
    {
      items: [
        { label: 'Accordion', route: '/components/accordion', icon: 'list-check' },
        { label: 'Avatar', route: '/components/avatar', icon: 'user-smile-line' },
        { label: 'Card', route: '/components/card', icon: 'file-text-line' },
        { label: 'Drawer', route: '/components/drawer', icon: 'layout-right-line' },
        { label: 'Empty', route: '/components/empty', icon: 'file-shred-line' },
        { label: 'Forms', route: '/components/forms', icon: 'input-cursor-move' },
        { label: 'Modal', route: '/components/modal', icon: 'window-line' },
        { label: 'Switch', route: '/components/switch', icon: 'toggle-line' },
        { label: 'Table', route: '/components/table', icon: 'table-line' },
        { label: 'Tabs', route: '/components/tabs', icon: 'layout-top-line' },
        { label: 'Toast', route: '/components/toast', icon: 'notification-badge-line' },
        { label: 'Tooltip', route: '/components/tooltip', icon: 'chat-1-line' },
      ],
    },
  ]);
}
