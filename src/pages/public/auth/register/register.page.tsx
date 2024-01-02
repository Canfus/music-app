/* eslint-disable no-case-declarations */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';

import {
  Input,
  Button,
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  useAuth,
} from '@app/common';
import { useRegisterMutation } from '@app/api';

import { schema, Schema } from './register.schema';
import styles from './register.module.css';

export const Register = () => {
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      repeat_password: '',
    },
  });

  const { mutate } = useRegisterMutation({
    onSuccess: (data) => {
      updateUser(data);
      navigate('/');
    },
    onError: (error) => {
      switch (error.response?.status) {
        case 400:
          const errorData = error.response?.data as Partial<Schema>;
          const keys = Object.keys(errorData) as (keyof Schema)[];
          keys.forEach((key) => {
            form.setError(key, { message: errorData[key] });
          });
          break;
        default:
          console.log('Something went wrong');
      }
    },
  });

  const onFormSubmit = (values: Schema) => {
    mutate(values);
  };

  return (
    <div className={styles.page}>
      <Form {...form}>
        <h1 className={styles.page__header}>Sign Up</h1>
        <form
          className={styles.page__form}
          onSubmit={form.handleSubmit(onFormSubmit)}
        >
          <Link to="/auth/login" className={styles.form__link}>
            Already have an account? Sign in
          </Link>
          <FormField
            control={form.control}
            name="username"
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
            name="email"
            render={({ field, fieldState }) => (
              <FormItem className={styles.form__item}>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    invalid={fieldState.invalid}
                    type="email"
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
                    invalid={fieldState.invalid}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repeat_password"
            render={({ field, fieldState }) => (
              <FormItem className={styles.form__item}>
                <FormControl>
                  <Input
                    placeholder="Repeat your password"
                    invalid={fieldState.invalid}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className={styles.form__button}>
            Sign up
          </Button>
        </form>
      </Form>
    </div>
  );
};
