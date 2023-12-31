import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Input,
  Button,
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@app/common';

import { schema, Schema } from './login.schema';
import styles from './login.module.css';

export const Login = () => {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onFormSubmit = (values: Schema) => {
    console.log(values);
  };

  return (
    <div className={styles.page}>
      <Form {...form}>
        <h1 className={styles.page__header}>Sign In</h1>
        <form
          className={styles.page__form}
          onSubmit={form.handleSubmit(onFormSubmit)}
        >
          <FormField
            control={form.control}
            name="login"
            render={({ field, fieldState }) => (
              <FormItem className={styles.form__item}>
                <FormControl>
                  <Input
                    placeholder="Enter your login"
                    invalid={fieldState.invalid}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem className={styles.form__item}>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    invalid={fieldState.invalid}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className={styles.form__button}>
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
};
