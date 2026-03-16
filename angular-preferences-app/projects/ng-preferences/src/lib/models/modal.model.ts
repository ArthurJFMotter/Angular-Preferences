export interface ModalAction {
  label: string;
  color?: 'primary' | 'accent' | 'warn' | '';
  isPrimary?: boolean;
  action: () => void;
}

export interface ModalConfig {
  title: string;
  message: string;
  icon?: string;
  actions?: ModalAction[];
  showCloseButton?: boolean;
}