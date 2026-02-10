export interface PrismDialogConfig<D = any> {
  data?: D;
  header?: string;
  width?: string;
  dismissableMask?: boolean;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
}
