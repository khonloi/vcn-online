import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Text } from '@/components/ui/Text';

const meta = {
  title: 'UI/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'label', 'small', 'time'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'muted',
        'accent',
        'inverse',
        'success',
        'warning',
        'error',
      ],
    },
    italic: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Paragraph: Story = {
  args: {
    as: 'p',
    size: 'base',
    children:
      'Federal regulators signaled an impending review of algorithmic trading infrastructure across high-frequency exchanges earlier this morning.',
  },
};

export const EditorialSerifBody: Story = {
  args: {
    as: 'p',
    font: 'serif',
    size: 'lg',
    children:
      'Across the sun-drenched avenues of Ocean Beach, boardroom whispers turned into undeniable market movements.',
  },
};

export const MetadataMuted: Story = {
  args: {
    as: 'time',
    size: 'xs',
    color: 'muted',
    children: 'Published October 5, 2026 • 4 min read',
  },
};

export const ErrorStatus: Story = {
  args: {
    as: 'span',
    size: 'sm',
    color: 'error',
    weight: 'semibold',
    children: 'Unable to connect to live market feed. Reconnecting...',
  },
};
