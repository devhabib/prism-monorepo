export type PrismDialogConfig<D = unknown> = {
  header?: string;
  data?: D;
  width?: string;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  dismissableMask?: boolean;
};
