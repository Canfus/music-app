import { WriteToClipboardFunction } from './clipboard.interface';

export const copyToClipboard: WriteToClipboardFunction = (message, options) => {
  if (!message) {
    return;
  }

  navigator.clipboard
    .writeText(message)
    .then(() => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
    })
    .catch((error) => {
      if (options?.onError) {
        options.onError(error);
      }
    });
};
