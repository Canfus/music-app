export type NotificationType = 'success' | 'error' | 'default' | 'action';

export interface NotificationContentProps {
  content: React.ReactNode;
  type?: NotificationType;
  autoClose?: number;
  title?: string;
}

export interface NotificationSlice {
  notification: {
    isOpen: boolean;
    content: React.ReactNode;
    type?: NotificationType;
    title?: string;
  };
}
