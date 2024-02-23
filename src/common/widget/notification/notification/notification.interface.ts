import { motion } from 'framer-motion';

import type { Notification } from '@app/common';

export interface NotificationProps
  extends React.ComponentPropsWithoutRef<typeof motion.div> {
  notification: Notification;
  onSuccess?: () => void;
}
