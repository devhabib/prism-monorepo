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
      group: 'General',
      items: [
        { label: 'Button', route: '/components/button', icon: 'flashlight-line' },
        { label: 'Icon', route: '/icons', icon: 'image-line' },
        { label: 'Typography', route: '/components/typography', icon: 'font-size' }
      ]
    },
    {
      group: 'Layout',
      items: [
        { label: 'Divider', route: '/components/divider', icon: 'subtract-line' },
        { label: 'Flex', route: '/layout/flex', icon: 'layout-line' },
        { label: 'Grid', route: '/layout/grid', icon: 'grid-line' },
        { label: 'Layout', route: '/layout/wrapper', icon: 'side-bar-line' },
        { label: 'Space', route: '/components/space', icon: 'fullscreen-line' },
        { label: 'Splitter', route: '/components/splitter', icon: 'layout-column-line' }
      ]
    },
    {
      group: 'Navigation',
      items: [
        { label: 'Anchor', route: '/components/anchor', icon: 'link' },
        { label: 'Breadcrumb', route: '/components/breadcrumb', icon: 'arrow-right-s-line' },
        { label: 'Dropdown', route: '/components/dropdown', icon: 'arrow-down-s-line' },
        { label: 'Menu', route: '/components/menu', icon: 'menu-line' },
        { label: 'Pagination', route: '/components/paginator', icon: 'number-1' },
        { label: 'Steps', route: '/components/steps', icon: 'list-check' },
        { label: 'Tabs', route: '/components/tabs', icon: 'more-line' }
      ]
    },
    {
      group: 'Data Entry',
      items: [
        { label: 'AutoComplete', route: '/components/autocomplete', icon: 'edit-box-line' },
        { label: 'Cascader', route: '/components/cascader', icon: 'git-merge-line' },
        { label: 'Checkbox', route: '/components/checkbox', icon: 'checkbox-line' },
        { label: 'DatePicker', route: '/components/date-picker', icon: 'calendar-line' },
        { label: 'Form', route: '/components/form', icon: 'clipboard-line' },
        { label: 'Input', route: '/components/input', icon: 'edit-line' },
        { label: 'InputNumber', route: '/components/input-number', icon: 'hashtag' },
        { label: 'Radio', route: '/components/radio', icon: 'checkbox-blank-circle-line' },
        { label: 'Rate', route: '/components/rate', icon: 'star-line' },
        { label: 'Select', route: '/components/select', icon: 'stack-line' },
        { label: 'Slider', route: '/components/slider', icon: 'settings-3-line' },
        { label: 'Switch', route: '/components/switch', icon: 'toggle-line' },
        { label: 'TimePicker', route: '/components/time-picker', icon: 'time-line' },
        { label: 'Transfer', route: '/components/transfer', icon: 'restart-line' },
        { label: 'Upload', route: '/components/upload', icon: 'upload-line' }
      ]
    },
    {
      group: 'Data Display',
      items: [
        { label: 'Avatar', route: '/components/avatar', icon: 'user-line' },
        { label: 'Badge', route: '/components/badge', icon: 'award-line' },
        { label: 'Calendar', route: '/components/calendar', icon: 'calendar-line' },
        { label: 'Card', route: '/components/card', icon: 'checkbox-blank-line' },
        { label: 'Carousel', route: '/components/carousel', icon: 'play-line' },
        { label: 'Collapse', route: '/components/accordion', icon: 'arrow-down-s-line' },
        { label: 'Empty', route: '/components/empty', icon: 'inbox-line' },
        { label: 'Image', route: '/components/image', icon: 'image-line' },
        { label: 'List', route: '/components/list', icon: 'list-check' },
        { label: 'Popover', route: '/components/popover', icon: 'chat-3-line' },
        { label: 'Statistic', route: '/components/statistic', icon: 'bar-chart-line' },
        { label: 'Table', route: '/components/table', icon: 'table-line' },
        { label: 'Tag', route: '/components/tag', icon: 'price-tag-line' },
        { label: 'Timeline', route: '/components/timeline', icon: 'pulse-line' },
        { label: 'Tooltip', route: '/components/tooltip', icon: 'question-line' },
        { label: 'Tree', route: '/components/tree', icon: 'share-line' }
      ]
    },
    {
      group: 'Feedback',
      items: [
        { label: 'Alert', route: '/components/alert', icon: 'error-warning-line' },
        { label: 'Drawer', route: '/components/drawer', icon: 'arrow-right-line' },
        { label: 'Message', route: '/components/toast', icon: 'chat-1-line' },
        { label: 'Modal', route: '/components/modal', icon: 'fullscreen-line' },
        { label: 'Popconfirm', route: '/components/popconfirm', icon: 'question-line' },
        { label: 'Progress', route: '/components/progress', icon: 'loader-line' },
        { label: 'Result', route: '/components/result', icon: 'checkbox-circle-line' },
        { label: 'Skeleton', route: '/components/skeleton', icon: 'box-3-line' },
        { label: 'Spin', route: '/components/spin', icon: 'refresh-line' }
      ]
    }
  ]);
}
