// --- INTERFACES ---
export interface ModalAction {
  label: string;
  value?: any; 
  color?: 'primary' | 'accent' | 'warn';
  isPrimary?: boolean;
}

export interface ModalData {
  title: string;
  message: string;
  previewSnippet?: string;
  icon?: string;
  showCloseButton?: boolean;
  actions?: ModalAction[];
}