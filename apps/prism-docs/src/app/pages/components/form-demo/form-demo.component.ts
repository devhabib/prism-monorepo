import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismButtonComponent, PrismInputDirective, PrismCodeBlockComponent } from '@prism-monorepo/prism-core';

@Component({
  selector: 'prism-form-demo',
  standalone: true,
  imports: [CommonModule, PrismButtonComponent, PrismInputDirective, PrismCodeBlockComponent],
  templateUrl: './form-demo.component.html',
  styleUrl: './form-demo.component.scss'
})
export class FormDemoComponent {
  activeTab = signal<'buttons' | 'inputs'>('buttons');

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

  setTab(tab: 'buttons' | 'inputs') {
    this.activeTab.set(tab);
  }
}
