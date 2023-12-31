import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@app/common';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/Input',
  component: Input,
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
      control: false,
    },
    placeholder: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#232323', padding: 16, width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    placeholder: 'Enter your name',
    id: '1',
  },
};

export const Readonly: Story = {
  args: {
    placeholder: 'Enter your name',
    id: '2',
    readOnly: true,
    value: 'Worldspawn',
  },
};

export const Invalid: Story = {
  args: {
    placeholder: 'Enter your name',
    id: '3',
    value: 'Worldspawn',
    invalid: true,
  },
};
