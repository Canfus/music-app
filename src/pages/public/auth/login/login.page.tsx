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
  useNotification,
} from '@app/common';
import { useLoginMutation } from '@app/api';

import { schema, Schema } from './login.schema';
import styles from './login.module.css';

export const Login = () => {
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { callNotification } = useNotification();

  const { mutate } = useLoginMutation({
    onSuccess: (data) => {
      updateUser(data);
      callNotification({
        type: 'success',
        content: 'Login successful',
      });
      navigate('/');
    },
    onError: (error) => {
      callNotification({
        type: 'error',
        content: 'Login failed',
      });
      switch (error.response?.status) {
        case 404:
          error.response.data.details.fieldErrors?.forEach((field) => {
            const [key, value] = Object.entries(field)[0];
            form.setError(key as keyof Schema, { message: value });
          });
          break;
        case 400:
          error.response.data.details.fieldErrors?.forEach((field) => {
            const [key, value] = Object.entries(field)[0];
            form.setError(key as keyof Schema, { message: value });
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
        <h1 className={styles.page__header}>Sign In</h1>
        <form
          className={styles.page__form}
          onSubmit={form.handleSubmit(onFormSubmit)}
        >
          <Link to="/auth/register" className={styles.form__link}>
            Don&apos;t have an account? Sign up
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
          <Link to="/auth/register" className={styles.form__link}>
            Forgot password? Reset
          </Link>
          <Button type="submit" className={styles.form__button}>
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
};
