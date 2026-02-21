export type PrismTreeNode = {
  key: string;
  title: string;
  expanded?: boolean;
  selected?: boolean;
  checked?: boolean;
  disabled?: boolean;
  isLeaf?: boolean;
  children?: PrismTreeNode[];
  icon?: string;
  data?: Record<string, unknown>;
};

export type PrismTreeMode = 'directory' | 'default';
