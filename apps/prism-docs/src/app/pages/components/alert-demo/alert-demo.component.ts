import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismAlertComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-alert-demo',
  imports: [
    CommonModule, 
    PrismAlertComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './alert-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDemoComponent {
  readonly snippets = {
    usage: `<prism-alert 
  type="success" 
  title="Success" 
  description="Action completed successfully."
  [showIcon]="true">
</prism-alert>`,
    types: `<prism-alert type="info" title="Informational" description="This is an info alert."></prism-alert>
<prism-alert type="warning" title="Warning" description="This is a warning alert."></prism-alert>
<prism-alert type="error" title="Error" description="This is an error alert."></prism-alert>`,
    closeable: `<prism-alert 
  type="info" 
  title="Closeable" 
  description="You can close this alert."
  [closeable]="true"
  (onClose)="handleClose()">
</prism-alert>`
  };
}
