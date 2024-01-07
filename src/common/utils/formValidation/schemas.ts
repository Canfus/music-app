/* eslint-disable implicit-arrow-linebreak */
import z from 'zod';

export const getPasswordValidationSchema = () =>
  z
    .string()
    .superRefine((value, context) => {
      if (!value.length) {
        context.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          inclusive: false,
          type: 'string',
          message: 'Введите пароль',
        });
      }

      if (!/[0-9]/g.test(value)) {
        context.addIssue({
          code: z.ZodIssueCode.invalid_string,
          validation: 'regex',
          message: 'Пароль должен содержать минимум 1 цифру',
        });
      }

      if (!/[A-Z]/g.test(value)) {
        context.addIssue({
          code: z.ZodIssueCode.invalid_string,
          validation: 'regex',
          message: 'Пароль должен содержать минимум 1 заглавную букву',
        });
      }

      if (value.length < 8) {
        context.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 8,
          inclusive: false,
          type: 'string',
          message: 'Пароль должен быть длиннее 8 символов',
        });
      }
    })
    .default('');

export const getPhoneValidationSchema = () =>
  z
    .string()
    .superRefine((value, context) => {
      if (!value.length) {
        context.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          type: 'string',
          inclusive: false,
          message: 'Введите номер телефона',
        });
      }

      if (!/\d/g.test(value)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Некорректный номер телефона',
        });
      }

      if (value[0] !== '+') {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Номер телефона должен начинаться с +',
        });
      }
    })
    .default('');

export const getStringValidationSchema = (message: string) =>
  z.string().min(1, { message }).default('');

export const getEmailValidationSchema = () =>
  z.string().email('Введите email').default('');
