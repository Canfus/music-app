export interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
}
