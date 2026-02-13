import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismButtonComponent, 
  PrismInputDirective, 
  PrismCodeBlockComponent, 
  ApiTableComponent, 
  ApiDoc,
  PrismCheckboxComponent,
  PrismSelectComponent,
  SelectOption,
  PrismTabGroupComponent,
  PrismTabComponent,
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismIconComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'prism-form-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismButtonComponent, 
    PrismInputDirective, 
    PrismCodeBlockComponent, 
    ApiTableComponent,
    PrismCheckboxComponent,
    PrismSelectComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismIconComponent
  ],
  templateUrl: './form-demo.component.html',
  styleUrl: './form-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDemoComponent {
  // Checkbox/Radio state
  checkbox1 = signal(false);
  checkbox2 = signal(true);
  checkboxDisabled = signal(true);
  radioValue = signal('option1');

  // Select state
  citySelect = signal(null);
  countrySelect = signal(null);
  multiSelect = signal<string[]>([]);

  // Select options
  readonly cityOptions: SelectOption[] = [
    { label: 'New York', value: 'nyc' },
    { label: 'London', value: 'ldn' },
    { label: 'Tokyo', value: 'tyo' },
    { label: 'Paris', value: 'par' },
  ];

  readonly countryOptions: SelectOption[] = [
    { label: 'United States', value: 'usa' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Germany', value: 'ger' },
    { label: 'France', value: 'fra' },
    { label: 'Canada', value: 'can' },
  ];

  readonly skillOptions: SelectOption[] = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'TypeScript', value: 'typescript' },
  ];

  readonly snippets = {
    buttonVariants: `<prism-button label="Primary"></prism-button>
<prism-button label="Secondary" variant="secondary"></prism-button>
<prism-button label="Outline" variant="outline"></prism-button>
<prism-button label="Danger" variant="danger"></prism-button>
<prism-button label="Text Only" variant="text"></prism-button>`,
    
    buttonSizes: `<prism-button label="Small" size="sm"></prism-button>
<prism-button label="Medium" size="md"></prism-button>
<prism-button label="Large" size="lg"></prism-button>
<prism-button label="Settings" icon="settings-line"></prism-button>
<prism-button label="Send Message" icon="send-plane-fill" iconPos="right"></prism-button>
<prism-button icon="notification-3-line" variant="secondary"></prism-button>`,
    
    buttonStates: `<prism-button label="Loading" [loading]="true"></prism-button>
<prism-button label="Disabled" [disabled]="true"></prism-button>
<prism-button label="Destructive Disabled" variant="danger" [disabled]="true" icon="delete-bin-line"></prism-button>`,

    inputsBase: `<!-- Standard -->
<input prismInput placeholder="Enter placeholder..." />

<!-- Small -->
<input prismInput size="sm" placeholder="Search data..." />

<!-- Success -->
<input prismInput [success]="true" value="valid.email@prism.com" />

<!-- Error -->
<input prismInput [error]="true" placeholder="Incorrect password" />`,

    inputsIcons: `<!-- Prefix Icon -->
<div class="prism-input-icon-wrapper icon-left">
  <prism-icon name="mail-line" />
  <input prismInput placeholder="Email Address" />
</div>

<!-- Suffix Icon -->
<div class="prism-input-icon-wrapper icon-right">
  <prism-icon name="eye-off-line" />
  <input prismInput type="password" placeholder="Password" />
</div>`,

    inputsGroups: `<!-- Prefix Addon -->
<div class="prism-input-group">
  <span class="prism-input-addon">https://</span>
  <input prismInput placeholder="prism.design" />
</div>

<!-- Mixed Group -->
<div class="prism-input-group">
  <span class="prism-input-addon">$</span>
  <input prismInput placeholder="0.00" />
  <span class="prism-input-addon">.00</span>
</div>

<!-- Prefix Button -->
<div class="prism-input-group">
  <prism-button icon="search-line" variant="primary"></prism-button>
  <input prismInput placeholder="Search components..." />
</div>

<!-- Action Suffix -->
<div class="prism-input-group">
  <input prismInput placeholder="Voucher Code" />
  <prism-button label="Apply"></prism-button>
</div>`,

    checkbox: `<prism-checkbox label="Unchecked" [(checked)]="checkbox1" />
<prism-checkbox label="Checked" [(checked)]="checkbox2" />
<prism-checkbox label="Disabled" [disabled]="true" [(checked)]="checkboxDisabled" />`,

    radio: `<prism-checkbox 
  type="radio" 
  label="Option 1" 
  [checked]="radioValue() === 'option1'"
  (checkedChange)="radioValue.set('option1')" />`,

    selectSingle: `<prism-select 
  [options]="cityOptions" 
  placeholder="Select a city..."
  [(value)]="citySelect" />`,

    selectSearchable: `<prism-select 
  [searchable]="true"
  [options]="countryOptions" 
  placeholder="Search countries..."
  [(value)]="countrySelect" />`,

    selectMulti: `<prism-select 
  [multiple]="true"
  [searchable]="true"
  [options]="skillOptions" 
  placeholder="Select multiple skills..."
  [(value)]="multiSelect" />`,

    selectNative: `<prism-select 
  mode="native" 
  [options]="cityOptions" 
  [(value)]="citySelect" />`
  };

  readonly buttonApiData: ApiDoc[] = [
    { name: 'label', type: 'string', default: "''", description: 'Text to display inside the button.' },
    { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'danger' | 'text'", default: "'primary'", description: 'Visual style of the button.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the button.' },
    { name: 'icon', type: 'string', default: "''", description: 'Remix Icon class name to display.' },
    { name: 'iconPos', type: "'left' | 'right'", default: "'left'", description: 'Position of the icon relative to label.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Shows loading spinner and disables interaction.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' },
  ];

  readonly inputApiData: ApiDoc[] = [
    { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Size of the input field.' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Applies error styling to indicate validation failure.' },
    { name: 'success', type: 'boolean', default: 'false', description: 'Applies success styling to indicate validation passed.' },
  ];

  readonly checkboxApiData: ApiDoc[] = [
    { name: 'label', type: 'string', default: "''", description: 'Text to display next to the control.' },
    { name: 'type', type: "'checkbox' | 'radio'", default: "'checkbox'", description: 'Specifies the type of control.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
    { name: 'checked', type: 'boolean', default: 'false', description: 'Two-way binding for selection state.' },
  ];

  readonly selectApiData: ApiDoc[] = [
    { name: 'options', type: 'SelectOption[]', default: '[]', description: 'Array of data objects with label and value.' },
    { name: 'placeholder', type: 'string', default: "'Select...'", description: 'Placeholder when no value is selected.' },
    { name: 'mode', type: "'native' | 'custom'", default: "'custom'", description: 'Use native browser select or custom dropdown.' },
    { name: 'searchable', type: 'boolean', default: 'false', description: 'Enable internal search/filter.' },
    { name: 'multiple', type: 'boolean', default: 'false', description: 'Enable multi-selection with tags.' },
    { name: 'closeOnOutsideClick', type: 'boolean', default: 'true', description: 'Dropdown closes when clicking outside.' },
  ];
}
