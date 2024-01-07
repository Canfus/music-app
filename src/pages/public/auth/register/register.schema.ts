import z from 'zod';

import {
  getPasswordValidationSchema,
  getStringValidationSchema,
  getEmailValidationSchema,
} from '@app/common';

export const schema = z
  .object({
    username: getStringValidationSchema('Введите логин'),
    email: getEmailValidationSchema(),
    password: getPasswordValidationSchema(),
    repeat_password: getPasswordValidationSchema(),
  })
  .refine((values) => values.password === values.repeat_password, {
    message: 'Пароли не совпадают',
    path: ['repeat_password'],
  });

export type Schema = z.infer<typeof schema>;
