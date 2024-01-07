import z from 'zod';

import {
  getStringValidationSchema,
  getPasswordValidationSchema,
  getEmailValidationSchema,
  getPhoneValidationSchema,
} from '@app/common';

export const withOptionalFieldsSchema = z.object({
  email: getEmailValidationSchema(),
  username: getStringValidationSchema('Введите Ваше имя'),
  phone: getPhoneValidationSchema().optional(),
  telegram: getStringValidationSchema('Введите Ваш telegram').optional(),
  password: getPasswordValidationSchema(),
  repeat_password: getPasswordValidationSchema(),
});

export type WithOptionalFieldsSchema = z.infer<typeof withOptionalFieldsSchema>;
