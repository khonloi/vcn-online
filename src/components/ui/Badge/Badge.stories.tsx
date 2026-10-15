import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'breaking',
        'success',
        'warning',
        'info',
        'outline',
        'subtle',
        'market-positive',
        'market-negative',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Markets',
    variant: 'default',
    size: 'sm',
  },
};

export const Breaking: Story = {
  args: {
    children: 'Breaking News',
    variant: 'breaking',
    size: 'sm',
  },
};

export const MarketPositive: Story = {
  args: {
    children: '+1.42%',
    variant: 'market-positive',
    size: 'sm',
  },
};

export const MarketNegative: Story = {
  args: {
    children: '-0.85%',
    variant: 'market-negative',
    size: 'sm',
  },
};
