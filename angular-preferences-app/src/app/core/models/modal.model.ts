// --- INTERFACES ---
export interface ModalChecklistOption {
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
}

export interface ModalAction {
  label: string;
  value?: any;
  color?: 'primary' | 'accent' | 'warn';
  isPrimary?: boolean;
  returnsChecklist?: boolean;
}

export interface ModalData {
  title: string;
  message: string;
  previewSnippet?: string;
  icon?: string;
  showCloseButton?: boolean;
  checklist?: ModalChecklistOption[];
  actions?: ModalAction[];
}