interface WriteToClipboardOptions {
  onSuccess: () => void;
  onError?: (error?: any) => void;
}

export type WriteToClipboardFunction = (
  message: string,
  options?: WriteToClipboardOptions,
) => void;
