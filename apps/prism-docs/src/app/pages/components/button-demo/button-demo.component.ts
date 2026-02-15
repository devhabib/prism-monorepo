import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismButtonComponent, 
  PrismDemoPageHeaderComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismButtonComponent, 
    PrismDemoPageHeaderComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './button-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoComponent {
  readonly snippets = {
    basic: `<prism-button label="Primary"></prism-button>
<prism-button label="Secondary" variant="secondary"></prism-button>
<prism-button label="Outline" variant="outline"></prism-button>
<prism-button label="Text" variant="text"></prism-button>
<prism-button label="Danger" variant="danger"></prism-button>`,
    
    sizes: `<prism-button label="Small" size="sm"></prism-button>
<prism-button label="Medium" size="md"></prism-button>
<prism-button label="Large" size="lg"></prism-button>`,

    icons: `<prism-button label="Search" icon="ri-search-line"></prism-button>
<prism-button label="Next" icon="ri-arrow-right-line" iconPos="right"></prism-button>
<prism-button icon="ri-settings-3-line"></prism-button>`,

    states: `<prism-button label="Loading" [loading]="true"></prism-button>
<prism-button label="Disabled" [disabled]="true"></prism-button>`
  };

  readonly apiProperties = [
    { name: 'label', type: 'string', default: "''", description: 'Text label of the button.' },
    { name: 'icon', type: 'string', default: 'null', description: 'Icon class name (e.g. remixicon).' },
    { name: 'iconPos', type: "'left' | 'right'", default: "'left'", description: 'Position of the icon relative to the label.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Displays a loading spinner.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button interactions.' },
    { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'text' | 'danger'", default: "'primary'", description: 'Visual style of the button.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the button.' },
  ];
}
