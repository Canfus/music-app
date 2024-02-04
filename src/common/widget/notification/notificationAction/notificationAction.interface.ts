export interface NotificationActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onSuccess: () => void;
}
