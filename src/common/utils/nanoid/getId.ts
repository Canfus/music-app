/* eslint-disable implicit-arrow-linebreak */
import { customAlphabet } from 'nanoid';

export const getId = (length?: number, pattern?: string): string =>
  customAlphabet(pattern || '0123456789abcdef', length || 10)();
