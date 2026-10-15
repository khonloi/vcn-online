import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Rectangular: Story = {
  args: {
    width: '100%',
    height: 180,
    variant: 'rectangular',
  },
};

export const Text: Story = {
  args: {
    width: '80%',
    height: 20,
    variant: 'text',
  },
};

export const Circular: Story = {
  args: {
    width: 48,
    height: 48,
    variant: 'circular',
  },
};
