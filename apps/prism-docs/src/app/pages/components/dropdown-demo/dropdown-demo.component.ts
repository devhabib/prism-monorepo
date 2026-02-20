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
  PrismIconComponent
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
    PrismIconComponent
  ],
  templateUrl: './dropdown-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownDemoComponent {
  readonly snippets = {
    hover: `
<button prismDropdown [prismDropdown]="hoverMenu" trigger="hover">
  Hover me
</button>

<prism-dropdown-menu #hoverMenu>
  <button prism-menu-item>Profile</button>
  <button prism-menu-item>Settings</button>
</prism-dropdown-menu>`,
    click: `
<prism-button 
  [prismDropdown]="clickMenu" 
  trigger="click" 
  label="Click me">
</prism-button>

<prism-dropdown-menu #clickMenu>
  <button prism-menu-item>Dashboard</button>
  <button prism-menu-item>Team Management</button>
</prism-dropdown-menu>`,
    placements: `
<prism-button [prismDropdown]="menu" placement="bottomLeft" label="Bottom Left"></prism-button>
<prism-button [prismDropdown]="menu" placement="bottomRight" label="Bottom Right"></prism-button>
<prism-button [prismDropdown]="menu" placement="topLeft" label="Top Left"></prism-button>
<prism-button [prismDropdown]="menu" placement="topRight" label="Top Right"></prism-button>`,
    items: `
<prism-dropdown-menu #menu>
  <button prism-menu-item>
    <prism-icon name="user-line"></prism-icon>
    Profile
  </button>
  <button prism-menu-item [disabled]="true">
    <prism-icon name="lock-line"></prism-icon>
    Admin Panel (Disabled)
  </button>
  <div class="prism-menu-divider"></div>
  <button prism-menu-item class="text-danger-600">
    <prism-icon name="logout-box-r-line"></prism-icon>
    Sign out
  </button>
</prism-dropdown-menu>`
  };

  onItemClick(label: string): void {
    console.warn(`Clicked on ${label}`);
  }
}
