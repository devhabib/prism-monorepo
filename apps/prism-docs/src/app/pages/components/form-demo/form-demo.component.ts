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
  SelectOption
} from '@prism-monorepo/prism-core';

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
    PrismSelectComponent
  ],
  templateUrl: './form-demo.component.html',
  styleUrl: './form-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDemoComponent {
  readonly activeTab = signal<'buttons' | 'inputs' | 'checks' | 'selects' | 'api'>('buttons');

  // Checkbox/Radio state
  checkbox1 = signal(false);
  checkbox2 = signal(true);
  checkboxDisabled = signal(true);
  radioValue = signal('option1');

  // Select state
  citySelect = signal(null);
  countrySelect = signal(null);
  multiSelect = signal<any[]>([]);

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

  buttonUsage = `<!-- Variants -->
<prism-button label="Primary" variant="primary"></prism-button>
<prism-button label="Danger" variant="danger"></prism-button>

<!-- Sizes & Icons -->
<prism-button label="Small" size="sm" icon="ri-add-line"></prism-button>
<prism-button label="Send" icon="ri-send-plane-fill" iconPos="right"></prism-button>

<!-- States -->
<prism-button label="Loading" [loading]="true"></prism-button>
<prism-button label="Disabled" [disabled]="true"></prism-button>`;

  inputUsage = `<!-- Standard Inputs -->
<input prismInput placeholder="Default" />
<input prismInput error="true" placeholder="Error state" />

<!-- Icon Overlays -->
<div class="prism-input-icon-wrapper icon-left">
  <i class="ri-user-line"></i>
  <input prismInput placeholder="Username" />
</div>

<!-- Input Groups -->
<div class="prism-input-group">
  <span class="prism-input-addon">@</span>
  <input prismInput placeholder="handle" />
</div>

<!-- Integrated Prefix Button -->
<div class="prism-input-group">
  <prism-button icon="ri-search-line" variant="primary"></prism-button>
  <input prismInput placeholder="Search everything..." />
</div>`;

  checkboxUsage = `<prism-checkbox label="Subscribe" [(checked)]="checked" />
<prism-checkbox label="Disabled" [disabled]="true" />`;

  radioUsage = `<prism-checkbox 
  type="radio" 
  label="Option 1" 
  [checked]="selected === '1'"
  (checkedChange)="selected = '1'" />`;

  selectUsage = `<!-- Single Select -->
<prism-select 
  [options]="options" 
  placeholder="Choose one"
  [(value)]="value" />

<!-- Searchable Multi-Select -->
<prism-select 
  [options]="options" 
  [searchable]="true"
  [multiple]="true"
  [(value)]="values" />`;

  setTab(tab: 'buttons' | 'inputs' | 'checks' | 'selects' | 'api'): void {
    this.activeTab.set(tab);
  }

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
