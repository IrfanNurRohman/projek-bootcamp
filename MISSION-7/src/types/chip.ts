export type ChipVariant = 'shadow' | 'fill' | 'outlined';
export type ChipType = 'success' | 'info' | 'warning' | 'error' | 'primary' | 'secondary';

export interface ChipProps {
  label: string;
  variant?: ChipVariant;
  type?: ChipType;
  disabled?: boolean;
  className?: string;
}