import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismResultComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-result-demo',
  imports: [
    CommonModule, 
    PrismResultComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent
  ],
  templateUrl: './result-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultDemoComponent {
  readonly snippets = {
    usage: `<prism-result 
  status="success" 
  title="Successfully Purchased Cloud Server" 
  subtitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.">
  <div extra>
    <button class="px-4 py-2 bg-blue-600 text-white rounded">Go Console</button>
    <button class="px-4 py-2 border border-gray-300 rounded">Buy Again</button>
  </div>
</prism-result>`,
    error404: `<prism-result 
  status="404" 
  title="404" 
  subtitle="Sorry, the page you visited does not exist.">
  <div extra>
    <button class="px-4 py-2 bg-blue-600 text-white rounded">Back Home</button>
  </div>
</prism-result>`
  };

  readonly apiData = [
    { name: 'status', description: 'Result status', type: "'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'", default: "'info'" },
    { name: 'title', description: 'The title', type: 'string | TemplateRef<any>', default: '-' },
    { name: 'subtitle', description: 'The subtitle', type: 'string | TemplateRef<any>', default: '-' },
    { name: 'icon', description: 'Custom icon template', type: 'TemplateRef<any>', default: '-' }
  ];
}
