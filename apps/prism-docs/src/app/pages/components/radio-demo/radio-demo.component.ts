import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PrismRadioComponent,
  PrismRadioGroupComponent,
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-radio-demo',
  imports: [
    CommonModule,
    FormsModule,
    PrismRadioComponent, 
    PrismRadioGroupComponent,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
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
  <prism-radio value="cherry">Cherry</prism-radio>
</prism-radio-group>`,
    disabledGroup: `<prism-radio-group [disabled]="true" [value]="'apple'">
  <prism-radio value="apple">Apple</prism-radio>
  <prism-radio value="banana">Banana</prism-radio>
</prism-radio-group>`,
    disabledOption: `<prism-radio-group [value]="'banana'">
  <prism-radio value="apple" [disabled]="true">Apple (Disabled)</prism-radio>
  <prism-radio value="banana">Banana (Active)</prism-radio>
</prism-radio-group>`
  };
}
