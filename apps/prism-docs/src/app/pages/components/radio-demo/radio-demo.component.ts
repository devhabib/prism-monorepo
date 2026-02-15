import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismRadioComponent,
  PrismRadioGroupComponent,
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-radio-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismRadioComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismRadioGroupComponent
  ],
  templateUrl: './radio-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioDemoComponent {
  selectedValue = signal('apple');

  readonly snippets = {
    usage: `<prism-radio-group [(value)]="selectedValue">
  <prism-radio value="apple">Apple</prism-radio>
  <prism-radio value="banana">Banana</prism-radio>
  <prism-radio value="cherry">Cherry</prism-radio>
</prism-radio-group>`,
    vertical: `<prism-radio-group direction="vertical" [(value)]="selectedValue">
  <prism-radio value="apple">Apple</prism-radio>
  <prism-radio value="banana">Banana</prism-radio>
</prism-radio-group>`
  };
}
