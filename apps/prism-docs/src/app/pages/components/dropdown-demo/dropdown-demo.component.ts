import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismDropdownTriggerDirective,
  PrismDropdownMenuComponent,
  PrismMenuItemComponent,
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismButtonComponent,
  PrismIconComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent,
  ApiDoc
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-dropdown-demo',
  imports: [
    CommonModule, 
    PrismDropdownTriggerDirective,
    PrismDropdownMenuComponent,
    PrismMenuItemComponent,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismButtonComponent,
    PrismIconComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent
  ],
  templateUrl: './dropdown-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownDemoComponent {
  readonly snippets = {
    // ... (snippets omitted for brevity, will keep them as is in the actual replace)
    hover: `
<button prismDropdown [prismDropdown]="hoverMenu" trigger="hover">
  Hover me
</button>

<prism-dropdown-menu #hoverMenu>
  <prism-menu-item>Profile</prism-menu-item>
  <prism-menu-item>Settings</prism-menu-item>
</prism-dropdown-menu>`,
    click: `
<prism-button 
  [prismDropdown]="clickMenu" 
  trigger="click" 
  label="Click me">
</prism-button>

<prism-dropdown-menu #clickMenu>
  <prism-menu-item>Dashboard</prism-menu-item>
  <prism-menu-item>Team Management</prism-menu-item>
</prism-dropdown-menu>`,
    placements: `
<prism-button [prismDropdown]="menu" placement="bottomLeft" label="Bottom Left"></prism-button>
<prism-button [prismDropdown]="menu" placement="bottomRight" label="Bottom Right"></prism-button>
<prism-button [prismDropdown]="menu" placement="topLeft" label="Top Left"></prism-button>
<prism-button [prismDropdown]="menu" placement="topRight" label="Top Right"></prism-button>`,
    items: `
<prism-dropdown-menu #menu>
  <prism-menu-item>
    <prism-icon name="user-line"></prism-icon>
    Profile
  </prism-menu-item>
  <prism-menu-item [disabled]="true">
    <prism-icon name="lock-line"></prism-icon>
    Admin Panel (Disabled)
  </prism-menu-item>
  <div class="prism-menu-divider"></div>
  <prism-menu-item class="text-danger-600">
    <prism-icon name="logout-box-r-line"></prism-icon>
    Sign out
  </prism-menu-item>
</prism-dropdown-menu>`
  };

  readonly apiData: ApiDoc[] = [
    { name: 'prismDropdown', type: 'PrismDropdownMenuComponent', default: 'required', description: 'The dropdown menu component instance to display.' },
    { name: 'trigger', type: "'click' | 'hover'", default: "'hover'", description: 'Trigger mode for showing/hiding the dropdown.' },
    { name: 'placement', type: 'PrismDropdownPlacement', default: "'bottomLeft'", description: 'The alignment position of the dropdown menu.' },
    { name: 'prism-menu-item [disabled]', type: 'boolean', default: 'false', description: 'Whether the menu item is disabled.' },
  ];

  onItemClick(label: string): void {
    console.warn(`Clicked on ${label}`);
  }
}

