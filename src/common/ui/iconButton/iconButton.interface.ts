export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'large' | 'medium';
  variant?: 'primary' | 'plain' | 'outlined';
  icon: React.ReactNode;
}
