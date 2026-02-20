import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrismIconRegistry } from '@devynelogic/prism-core';
import * as icons from '@devynelogic/prism-icons';
import { PrismIconDef } from '@devynelogic/prism-icons';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected title = 'prism-docs';
  private registry = inject(PrismIconRegistry);

  constructor() {
    // Register all icons from bundle
    const allIcons = Object.values(icons).filter(
      (icon) => icon && typeof icon === 'object' && 'name' in icon
    ) as PrismIconDef[];
    this.registry.addIcons(allIcons);
  }
}
