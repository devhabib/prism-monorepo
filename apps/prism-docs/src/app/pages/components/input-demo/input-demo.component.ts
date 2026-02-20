import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PrismInputComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-input-demo',
  imports: [
    CommonModule,
    FormsModule,
    PrismInputComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './input-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDemoComponent {
  inputValue = signal('');

  readonly snippets = {
    usage: `<prism-input [(value)]="name" placeholder="Enter your name" />`,
    sizes: `
<prism-input size="sm" placeholder="Small size" />
<prism-input size="md" placeholder="Medium size" />
<prism-input size="lg" placeholder="Large size" />`,
    icons: `
<prism-input prefix="user-line" placeholder="Username" />
<prism-input suffix="search-line" placeholder="Search..." />`,
    states: `
<prism-input [error]="true" placeholder="Error state" />
<prism-input [success]="true" placeholder="Success state" />
<prism-input [disabled]="true" placeholder="Disabled input" />`
  };
}
