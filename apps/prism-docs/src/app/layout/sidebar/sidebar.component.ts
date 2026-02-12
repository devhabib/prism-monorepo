import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PrismAvatarComponent, ThemeToggleComponent } from '@prism-monorepo/prism-core';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, PrismAvatarComponent, ThemeToggleComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  menuSections: { title: string; items: { label: string; route: string; icon?: string }[] }[] = [
    {
      title: 'Getting Started',
      items: [
        { label: 'Installation', route: '/getting-started/installation', icon: 'ri-download-cloud-2-line' },
        { label: 'Accessibility', route: '/getting-started/accessibility', icon: 'ri-accessibility-line' }
      ]
    },
    {
      title: 'Components',
      items: [
        { label: 'Table', route: '/components/table', icon: 'ri-table-line' },
        { label: 'Avatar', route: '/components/avatar', icon: 'ri-user-smile-line' },
        { label: 'Toast', route: '/components/toast', icon: 'ri-notification-badge-line' },
        { label: 'Forms', route: '/components/forms', icon: 'ri-input-cursor-move' },
        { label: 'Empty', route: '/components/empty', icon: 'ri-file-shred-line' },
        { label: 'Modal', route: '/components/modal', icon: 'ri-window-line' },
        { label: 'Drawer', route: '/components/drawer', icon: 'ri-layout-right-line' },
        { label: 'Switch', route: '/components/switch', icon: 'ri-toggle-line' },
        { label: 'Tooltip', route: '/components/tooltip', icon: 'ri-chat-1-line' },
        { label: 'Accordion', route: '/components/accordion', icon: 'ri-list-check' },
      ],
    },
  ];
}
