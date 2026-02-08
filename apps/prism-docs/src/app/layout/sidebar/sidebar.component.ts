import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PrismAvatarComponent, ThemeToggleComponent } from '@prism-monorepo/prism-core';

interface MenuItem {
  label: string;
  route?: string;
  items?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, PrismAvatarComponent, ThemeToggleComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menu: MenuItem[] = [
    {
      label: 'Components',
      items: [
        { label: 'Table', route: '/components/table' },
        { label: 'Avatar', route: '/components/avatar' },
      ],
    },
  ];
}
