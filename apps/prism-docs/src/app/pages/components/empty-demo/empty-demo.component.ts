import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismEmptyComponent, 
  PrismButtonComponent,
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismCodeBlockComponent,
  ApiTableComponent,
  ApiDoc,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@prism-monorepo/prism-core';

@Component({
  selector: 'app-empty-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismEmptyComponent, 
    PrismButtonComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismCodeBlockComponent,
    ApiTableComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './empty-demo.component.html',
  styleUrl: './empty-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyDemoComponent {
  readonly snippets = {
    default: `<prism-empty 
  title="No Records Found" 
  description="We couldn't find any items matching your current view." 
/>`,
    inbox: `<prism-empty 
  icon="ri-inbox-archive-line"
  title="Inbox Zero" 
  description="You have no new messages." 
/>`,
    search: `<prism-empty 
  icon="ri-file-search-line"
  title="No Results" 
  description="Try adjusting your search terms." 
/>`,
    actions: `<prism-empty 
  icon="ri-add-circle-line"
  title="First Step" 
  description="Create your first project to start tracking your progress.">
  <div class="flex gap-3 justify-center mt-4">
    <prism-button label="Create Project" icon="ri-add-line" />
    <prism-button label="Import Data" variant="outline" />
  </div>
</prism-empty>`,
    illustration: `<prism-empty 
  image="https://illustrations.popsy.co/gray/crashed-error.svg" 
  title="Something Went Wrong" 
  description="We're having trouble connecting to the server.">
  <prism-button label="Retry Now" class="mt-4" />
</prism-empty>`
  };

  readonly apiData: ApiDoc[] = [
    { name: 'icon', type: 'string', default: "'ri-inbox-2-line'", description: "RemixIcon class name. Hidden if image is set." },
    { name: 'image', type: 'string', default: "''", description: "URL for a custom illustration image." },
    { name: 'title', type: 'string', default: "'No Data'", description: "Main heading text." },
    { name: 'description', type: 'string', default: "''", description: "Secondary helper text." },
  ];
}
