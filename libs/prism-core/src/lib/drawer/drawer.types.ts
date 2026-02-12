import { InjectionToken } from '@angular/core';

import { TemplateRef } from '@angular/core';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

export interface PrismDrawerConfig<D = any> {
  data?: D;
  title?: string | TemplateRef<any>;
  header?: string | TemplateRef<any>; // Support both naming conventions
  footer?: string | TemplateRef<any> | null;
  width?: string;
  height?: string;
  position?: DrawerPosition;
  dismissableMask?: boolean;
  maskClosable?: boolean; // Complementary name
  closeOnEscape?: boolean;
  showClose?: boolean;
}
