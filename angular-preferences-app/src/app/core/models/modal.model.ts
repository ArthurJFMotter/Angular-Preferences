// --- INTERFACES ---
export interface ModalAction {
  label: string;
  value?: any; // Button value
  color?: 'primary' | 'accent' | 'warn';
  isPrimary?: boolean;
}

export interface ModalData {
  title: string;
  message: string;
  icon?: string;
  showCloseButton?: boolean;
  actions?: ModalAction[];
}