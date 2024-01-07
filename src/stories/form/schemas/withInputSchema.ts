import z from 'zod';

import {
  getStringValidationSchema,
  getPasswordValidationSchema,
} from '@app/common';

export const withInputSchema = z
  .object({
    username: getStringValidationSchema('Введите Ваше имя'),
    password: getPasswordValidationSchema(),
    repeat_password: getPasswordValidationSchema(),
  })
  .refine((schema) => schema.password === schema.repeat_password, {
    message: "Password doesn't match",
    path: ['repeat_password'],
  });

export type WithInputSchema = z.infer<typeof withInputSchema>;
