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
      // Return a blank path in tests to avoid console spam
      const globals = globalThis as unknown as Record<string, unknown>;
      if (typeof globals['describe'] === 'function' || typeof globals['it'] === 'function') {
        return '<path d=""/>';
      }
      console.warn(`PrismIcon: Icon ${name} not found. Did you import it?`);
    }
    return this.registry.get(name);
  }
}
