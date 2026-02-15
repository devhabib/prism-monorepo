import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismDemoCardComponent } from '@devynelogic/prism-core';
import { 
  PrismFlexComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,

  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent,
  PrismIconComponent,
  PrismCardComponent,
  PrismAvatarComponent,
  PrismTagComponent,
  PrismButtonComponent,
  ApiDoc
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-flex-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismFlexComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent,
    PrismIconComponent,
    PrismDemoCardComponent,
    PrismCardComponent,
    PrismAvatarComponent,
    PrismTagComponent,
    PrismButtonComponent
  ],
  template: `
<prism-demo-page-header title="Flex Layout" subtitle="A flexible layout primitive.">
</prism-demo-page-header>

<prism-tab-group>
  <prism-tab label="Examples">
    <div class="space-y-8">
      
      <!-- Basic Usage -->
      <prism-demo-section title="Basic Usage" description="A simple flex container. Perfect for layouts like stat cards.">
        <prism-demo-card>
          <div preview>
            <prism-flex gap="24">
              <!-- Stat Card 1 -->
              <prism-card class="flex-1">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <div class="text-sm text-surface-500 font-medium">Total Revenue</div>
                    <div class="text-3xl font-bold text-surface-900 mt-1">$45,231.89</div>
                  </div>
                  <div class="p-2 flex bg-primary-50 rounded-lg text-primary-600">
                    <prism-icon name="money-dollar-circle-line" size="24"></prism-icon>
                  </div>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <span class="text-green-600 flex items-center font-medium bg-green-50 px-2 py-0.5 rounded-full">
                    <prism-icon name="arrow-up-line" size="14" class="mr-1"></prism-icon>
                    20.1%
                  </span>
                  <span class="text-surface-400">vs last month</span>
                </div>
              </prism-card>

              <!-- Stat Card 2 -->
              <prism-card class="flex-1">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <div class="text-sm text-surface-500 font-medium">Active Users</div>
                    <div class="text-3xl font-bold text-surface-900 mt-1">2,350</div>
                  </div>
                  <div class="p-2 flex bg-info-50 rounded-lg text-info-600">
                    <prism-icon name="user-follow-line" size="24"></prism-icon>
                  </div>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <span class="text-info-600 flex items-center font-medium bg-info-50 px-2 py-0.5 rounded-full">
                    <prism-icon name="add-line" size="14" class="mr-1"></prism-icon>
                    180
                  </span>
                  <span class="text-surface-400">new this week</span>
                </div>
              </prism-card>
            </prism-flex>
          </div>
          <prism-code-block code [code]="snippets.basic" language="html"></prism-code-block>
        </prism-demo-card>
      </prism-demo-section>

      <!-- Vertical Stack -->
      <prism-demo-section title="Vertical Stack" description="Stack items vertically. Great for lists and feeds.">
        <prism-demo-card>
          <div preview>
            <prism-card header="Activity Feed">
              <prism-flex [vertical]="true" gap="0" class="divide-y divide-surface-100">
                <!-- Item 1 -->
                <div class="py-4 w-full hover:bg-surface-50  transition cursor-pointer -mx-6 px-6">
                  <prism-flex gap="16" align="start">
                    <prism-avatar label="SC" size="md" class="bg-primary-100 text-primary-700"></prism-avatar>
                    <div class="flex-1">
                      <div class="flex justify-between items-start">
                        <span class="font-semibold text-surface-900">Sarah Connor</span>
                        <span class="text-xs text-surface-400">2m ago</span>
                      </div>
                      <p class="text-sm text-surface-600 mt-1">Deployed the new repayment feature to production. 🚀</p>
                    </div>
                  </prism-flex>
                </div>
                <!-- Item 2 -->
                <div class="py-4 w-full hover:bg-surface-50 transition cursor-pointer -mx-6 px-6">
                  <prism-flex gap="16" align="start">
                    <prism-avatar label="JD" size="md" class="bg-warning-100 text-warning-700"></prism-avatar>
                    <div class="flex-1">
                      <div class="flex justify-between items-start">
                        <span class="font-semibold text-surface-900">John Doe</span>
                        <span class="text-xs text-surface-400">1h ago</span>
                      </div>
                      <p class="text-sm text-surface-600 mt-1">Commented on <span class="font-medium text-primary-600">#PR-420</span>: "Looks good to me!"</p>
                    </div>
                  </prism-flex>
                </div>
              </prism-flex>
            </prism-card>
          </div>
          <prism-code-block code [code]="snippets.vertical" language="html"></prism-code-block>
        </prism-demo-card>
      </prism-demo-section>

      <!-- Justify Content -->
      <prism-demo-section title="Justify Content" description="Control horizontal alignment. Essential for navigation bars.">
        <prism-demo-card>
          <div preview>
            <prism-card>
              <prism-flex justify="between" align="center" class="w-full">
                <prism-flex gap="12" align="center">
                  <prism-button variant="text" icon="ri-menu-line" size="sm"></prism-button>
                  <span class="font-bold text-lg text-surface-900">Dashboard</span>
                </prism-flex>
                <prism-flex gap="12">
                   <prism-button variant="outline" size="sm" icon="ri-filter-3-line">Filter</prism-button>
                   <prism-button variant="primary" size="sm" icon="ri-add-line">New Report</prism-button>
                </prism-flex>
              </prism-flex>
            </prism-card>
          </div>
          <prism-code-block code [code]="snippets.justify" language="html"></prism-code-block>
        </prism-demo-card>
      </prism-demo-section>

      <!-- Align Items -->
      <prism-demo-section title="Align Items" description="Control vertical alignment. Useful for user rows and media objects.">
        <prism-demo-card>
          <div preview>
            <prism-card>
              <div class="divide-y divide-surface-100">
                <div class="py-3">
                    <prism-flex align="center" gap="16">
                        <prism-avatar label="JD" size="lg" class="bg-primary-600 text-white"></prism-avatar>
                        <div class="flex-1">
                        <div class="text-lg font-bold text-surface-900">John Doe</div>
                        <div class="text-surface-500 text-sm">Product Designer</div>
                        </div>
                        <prism-tag variant="success" label="Active"></prism-tag>
                        <prism-button variant="text" icon="ri-more-2-fill" class="text-surface-400"></prism-button>
                    </prism-flex>
                </div>
              </div>
            </prism-card>
          </div>
          <prism-code-block code [code]="snippets.align" language="html"></prism-code-block>
        </prism-demo-card>
      </prism-demo-section>

      <!-- Gap -->
      <prism-demo-section title="Gap" description="Control spacing between items with gap.">
        <prism-demo-card>
          <div preview>
            <prism-flex gap="16" wrap="wrap">
              <prism-tag variant="primary" label="Angular"></prism-tag>
              <prism-tag variant="secondary" label="React"></prism-tag>
              <prism-tag variant="success" label="Vue"></prism-tag>
              <prism-tag variant="warning" label="Svelte"></prism-tag>
              <prism-tag variant="danger" label="Ember"></prism-tag>
              <prism-tag variant="info" label="Solid"></prism-tag>
              <prism-tag variant="primary" label="Qwik"></prism-tag>
              <prism-tag variant="secondary" label="Alpine"></prism-tag>
            </prism-flex>
          </div>
          <prism-code-block code [code]="snippets.gap" language="html"></prism-code-block>
        </prism-demo-card>
      </prism-demo-section>

    </div>
  </prism-tab>

  <prism-tab label="API">
    <prism-demo-section title="API Data">
      <prism-api-table [data]="apiProperties"></prism-api-table>
    </prism-demo-section>
  </prism-tab>
</prism-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexLayoutDemoComponent {
  readonly snippets = {
    basic: `<prism-flex gap="24">
  <!-- Stat Card 1 -->
  <prism-card class="flex-1">
    <div class="flex items-start justify-between mb-4">
      <div>
        <div class="text-sm text-slate-500 font-medium">Total Revenue</div>
        <div class="text-3xl font-bold text-slate-900 mt-1">$45,231.89</div>
      </div>
      <div class="p-2 bg-primary-50 rounded-lg text-primary-600">
        <prism-icon name="money-dollar-circle-line" size="24"></prism-icon>
      </div>
    </div>
    <div class="flex items-center gap-2 text-sm">
      <span class="text-green-600 flex items-center font-medium bg-green-50 px-2 py-0.5 rounded-full">
        <prism-icon name="arrow-up-line" size="14" class="mr-1"></prism-icon>
        20.1%
      </span>
      <span class="text-slate-400">vs last month</span>
    </div>
  </prism-card>

  <!-- Stat Card 2 -->
  <prism-card class="flex-1">
    <!-- ... -->
  </prism-card>
</prism-flex>`,
    vertical: `<prism-card header="Activity Feed">
  <prism-flex [vertical]="true" gap="0" class="divide-y divide-slate-100">
    <!-- Item 1 -->
    <div class="py-4 hover:bg-slate-50 transition cursor-pointer -mx-6 px-6">
      <prism-flex gap="16" align="start">
        <prism-avatar label="SC" size="md" class="bg-indigo-100 text-indigo-700"></prism-avatar>
        <div class="flex-1">
          <div class="flex justify-between items-start">
            <span class="font-semibold text-slate-900">Sarah Connor</span>
            <span class="text-xs text-slate-400">2m ago</span>
          </div>
          <p class="text-sm text-slate-600 mt-1">Deployed the new repayment feature to production. 🚀</p>
        </div>
      </prism-flex>
    </div>
    <!-- ... -->
  </prism-flex>
</prism-card>`,
    justify: `<prism-card>
  <prism-flex justify="between" align="center" class="w-full">
    <prism-flex gap="12" align="center">
      <prism-button variant="text" icon="ri-menu-line" size="sm"></prism-button>
      <span class="font-bold text-lg text-slate-900">Dashboard</span>
    </prism-flex>
    <prism-flex gap="12">
        <prism-button variant="outline" size="sm" icon="ri-filter-3-line">Filter</prism-button>
        <prism-button variant="primary" size="sm" icon="ri-add-line">New Report</prism-button>
    </prism-flex>
  </prism-flex>
</prism-card>`,
    align: `<prism-card>
  <div class="divide-y divide-slate-100 ">
    <div class="py-3">
        <prism-flex align="center" gap="16">
            <prism-avatar label="JD" size="lg" class="bg-indigo-600 text-white"></prism-avatar>
            <div class="flex-1">
            <div class="text-lg font-bold text-slate-900">John Doe</div>
            <div class="text-slate-500 text-sm">Product Designer</div>
            </div>
            <prism-tag variant="success" label="Active"></prism-tag>
            <prism-button variant="text" icon="ri-more-2-fill" class="text-slate-400"></prism-button>
        </prism-flex>
    </div>
  </div>
</prism-card>`,
    gap: `<prism-flex gap="16" wrap="wrap">
  <prism-tag variant="primary" label="Angular"></prism-tag>
  <prism-tag variant="secondary" label="React"></prism-tag>
  <prism-tag variant="success" label="Vue"></prism-tag>
  <prism-tag variant="warning" label="Svelte"></prism-tag>
  <!-- ... -->
</prism-flex>`
  };

  readonly apiProperties: ApiDoc[] = [
    { name: 'vertical', type: 'boolean', default: 'false', description: 'Whether to stack items vertically.' },
    { name: 'justify', type: `'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'`, default: `'start'`, description: 'Justify content alignment.' },
    { name: 'align', type: `'start' | 'end' | 'center' | 'baseline' | 'stretch'`, default: `'start'`, description: 'Align items alignment.' },
    { name: 'wrap', type: `'nowrap' | 'wrap' | 'wrap-reverse'`, default: `'nowrap'`, description: 'Flex wrap behavior.' },
    { name: 'gap', type: 'number | string', default: '0', description: 'Gap between items (px if number).' },
  ];
}
