import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@app/common';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    className: {
      control: false,
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'Button',
  },
};

export const PrimaryLarge: Story = {
  args: {
    children: 'Button',
    size: 'large',
  },
};

export const PrimaryLargeDisabled: Story = {
  args: {
    children: 'Button',
    size: 'large',
    disabled: true,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
};

export const SecondaryLarge: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'large',
  },
};

export const SecondaryLargeDisabled: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'large',
    disabled: true,
  },
};

export const SecondaryDisabled: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    disabled: true,
  },
};

export const Plain: Story = {
  args: {
    children: 'Button',
    variant: 'plain',
  },
};

export const PlainLarge: Story = {
  args: {
    children: 'Button',
    variant: 'plain',
    size: 'large',
  },
};

export const PlainLargeDisabled: Story = {
  args: {
    children: 'Button',
    variant: 'plain',
    size: 'large',
    disabled: true,
  },
};

export const PlainDisabled: Story = {
  args: {
    children: 'Button',
    variant: 'plain',
    disabled: true,
  },
};

export const Outlined: Story = {
  args: {
    children: 'Button',
    variant: 'outlined',
  },
};

export const OutlinedLarge: Story = {
  args: {
    children: 'Button',
    variant: 'outlined',
    size: 'large',
  },
};

export const OutlinedLargeDisabled: Story = {
  args: {
    children: 'Button',
    variant: 'outlined',
    size: 'large',
    disabled: true,
  },
};

export const OutlinedDisabled: Story = {
  args: {
    children: 'Button',
    variant: 'outlined',
    disabled: true,
  },
};
