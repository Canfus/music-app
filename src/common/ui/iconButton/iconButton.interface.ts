export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'large' | 'medium';
  variant?: 'plain' | 'outlined';
  icon: React.ReactNode;
}
