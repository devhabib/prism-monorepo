import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismButtonComponent, PrismInputDirective, PrismCodeBlockComponent, ApiTableComponent, ApiDoc } from '@prism-monorepo/prism-core';

@Component({
  selector: 'prism-form-demo',
  standalone: true,
  imports: [CommonModule, PrismButtonComponent, PrismInputDirective, PrismCodeBlockComponent, ApiTableComponent],
  templateUrl: './form-demo.component.html',
  styleUrl: './form-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDemoComponent {
  readonly activeTab = signal<'buttons' | 'inputs' | 'api'>('buttons');

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

  setTab(tab: 'buttons' | 'inputs' | 'api'): void {
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
}
