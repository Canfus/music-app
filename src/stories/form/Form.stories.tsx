import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Input,
  Button,
} from '@app/common';

import { withInputSchema, withOptionalFieldsSchema } from './schemas';
import type { WithInputSchema, WithOptionalFieldsSchema } from './schemas';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/Form',
  component: Form,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const FormWithInput = () => {
  const form = useForm<WithInputSchema>({
    resolver: zodResolver(withInputSchema),
    defaultValues: {
      username: '',
      password: '',
      repeat_password: '',
    },
  });

  const onFormSubmit = (values: WithInputSchema) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        style={{
          width: 400,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          rowGap: 16,
          backgroundColor: '#333',
        }}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem style={{ width: '100%', backgroundColor: 'inherit' }}>
              <FormControl>
                <Input
                  placeholder="Name"
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
            <FormItem style={{ width: '100%', backgroundColor: 'inherit' }}>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
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
          name="repeat_password"
          render={({ field, fieldState }) => (
            <FormItem style={{ width: '100%', backgroundColor: 'inherit' }}>
              <FormControl>
                <Input
                  placeholder="Repeat password"
                  type="password"
                  invalid={fieldState.invalid}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Partial<Story> = {
  render: () => <FormWithInput />,
};

const FormWithOptionalFields = () => {
  const form = useForm<WithOptionalFieldsSchema>({
    resolver: zodResolver(withOptionalFieldsSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      repeat_password: '',
    },
  });

  const onFormSubmit = (values: WithOptionalFieldsSchema) => {
    // eslint-disable-next-line operator-linebreak
    const submitValues: WithOptionalFieldsSchema =
      {} as WithOptionalFieldsSchema;

    const keys = Object.keys(values) as (keyof WithOptionalFieldsSchema)[];

    keys.forEach((key) => {
      if (values[key]) {
        // @ts-expect-error
        submitValues[key] = values[key];
      }
    });

    console.log(submitValues);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        style={{
          width: 400,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          rowGap: 16,
          backgroundColor: '#333',
        }}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem style={{ width: '100%', backgroundColor: 'inherit' }}>
              <FormControl>
                <Input
                  placeholder="Email *"
                  type="email"
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
          name="username"
          render={({ field, fieldState }) => (
            <FormItem style={{ width: '100%', backgroundColor: 'inherit' }}>
              <FormControl>
                <Input
                  placeholder="Name *"
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
          name="phone"
          render={({ field, fieldState }) => (
            <FormItem style={{ width: '100%', backgroundColor: 'inherit' }}>
              <FormControl>
                <Input
                  placeholder="Phone"
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
          name="telegram"
          render={({ field, fieldState }) => (
            <FormItem style={{ width: '100%', backgroundColor: 'inherit' }}>
              <FormControl>
                <Input
                  placeholder="Telegram"
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
            <FormItem style={{ width: '100%', backgroundColor: 'inherit' }}>
              <FormControl>
                <Input
                  placeholder="Password *"
                  type="password"
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
          name="repeat_password"
          render={({ field, fieldState }) => (
            <FormItem style={{ width: '100%', backgroundColor: 'inherit' }}>
              <FormControl>
                <Input
                  placeholder="Repeat password *"
                  type="password"
                  invalid={fieldState.invalid}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export const WithOptionalFields: Partial<Story> = {
  render: () => <FormWithOptionalFields />,
};
