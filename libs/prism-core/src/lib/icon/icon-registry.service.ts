import { Injectable } from '@angular/core';
import { PrismIconDef } from '@devynelogic/prism-icons';

@Injectable({ providedIn: 'root' })
export class PrismIconRegistry {
  private registry = new Map<string, string>();

  addIcons(icons: PrismIconDef[]): void {
    icons.forEach(icon => {
      this.registry.set(icon.name, icon.data);
    });
  }

  getIcon(name: string): string | undefined {
    if (!this.registry.has(name)) {
      console.warn(`PrismIcon: Icon ${name} not found. Did you import it?`);
    }
    return this.registry.get(name);
  }
}
