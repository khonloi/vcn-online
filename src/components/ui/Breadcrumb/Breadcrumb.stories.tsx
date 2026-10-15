import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { name: 'Home', href: '/' },
      { name: 'Tech', href: '/tech' },
      { name: 'Artificial Intelligence' },
    ],
  },
};
