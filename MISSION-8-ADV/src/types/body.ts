type BodySize = 'large' | 'medium' | 'small';
type BodyWeight = 'bold' | 'semibold' | 'medium' | 'regular';

export interface BodyTextProps {
  children: React.ReactNode;
  size?: BodySize;
  weight?: BodyWeight;
  className?: string;
}