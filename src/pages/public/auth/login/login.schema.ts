import z from 'zod';

export const schema = z.object({
  username: z.string().min(1, { message: 'Введите логин' }).default(''),
  password: z
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
    .default(''),
});

export type Schema = z.infer<typeof schema>;
