import { TemplateRef } from '@angular/core';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

export type PrismDrawerConfig<D = unknown> = {
  data?: D;
  title?: string | TemplateRef<unknown>;
  header?: string | TemplateRef<unknown>; // Support both naming conventions
  footer?: string | TemplateRef<unknown> | null;
  width?: string;
  height?: string;
  position?: DrawerPosition;
  dismissableMask?: boolean;
  maskClosable?: boolean; // Complementary name
  closeOnEscape?: boolean;
  showClose?: boolean;
};
