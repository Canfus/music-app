import type { Meta, StoryObj } from '@storybook/react';

import { IconButton, LikeIcon } from '@app/common';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: IconButton,
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
    icon: {
      control: false,
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    icon: <LikeIcon />,
  },
};

export const Outlined: Story = {
  args: {
    icon: <LikeIcon />,
    variant: 'outlined',
  },
};

export const Large: Story = {
  args: {
    icon: <LikeIcon />,
    size: 'large',
  },
};

export const OutlinedLarge: Story = {
  args: {
    icon: <LikeIcon />,
    size: 'large',
    variant: 'outlined',
  },
};

export const Disabled: Story = {
  args: {
    icon: <LikeIcon />,
    disabled: true,
  },
};

export const LargeDisabled: Story = {
  args: {
    icon: <LikeIcon />,
    disabled: true,
    size: 'large',
  },
};

export const OutlinedLargeDisabled: Story = {
  args: {
    icon: <LikeIcon />,
    disabled: true,
    size: 'large',
    variant: 'outlined',
  },
};
