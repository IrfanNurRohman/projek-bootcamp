type TypographyVariant =
  | 'body-large-bold'
  | 'body-large-semibold'
  | 'body-large-medium'
  | 'body-large-regular'
  | 'body-medium-bold'
  | 'body-medium-semibold'
  | 'body-medium-medium'
  | 'body-medium-regular'
  | 'body-small-bold'
  | 'body-small-semibold'
  | 'body-small-medium'
  | 'body-small-regular';

type TypographyProps = {
  variant: TypographyVariant;
  children: React.ReactNode;
  className?: string;
};

const variantMap: Record<TypographyVariant, string> = {
  'body-large-bold': 'text-[18px] font-bold',
  'body-large-semibold': 'text-[18px] font-semibold',
  'body-large-medium': 'text-[18px] font-medium',
  'body-large-regular': 'text-[18px] font-normal',
  'body-medium-bold': 'text-[16px] font-bold',
  'body-medium-semibold': 'text-[16px] font-semibold',
  'body-medium-medium': 'text-[16px] font-medium',
  'body-medium-regular': 'text-[16px] font-normal',
  'body-small-bold': 'text-[14px] font-bold',
  'body-small-semibold': 'text-[14px] font-semibold',
  'body-small-medium': 'text-[14px] font-medium',
  'body-small-regular': 'text-[14px] font-normal',
};

const Typography = ({ variant, children, className = '' }: TypographyProps) => {
  const classes = variantMap[variant];
  return <div className={`${classes} ${className}`}>{children}</div>;
};

export default Typography;

