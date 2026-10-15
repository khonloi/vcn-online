import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'strong'],
    },
    decorative: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: (args) => (
    <div style={{ width: '300px', padding: '20px' }}>
      <p style={{ margin: '0 0 10px' }}>Section Header</p>
      <Separator {...args} />
      <p style={{ margin: '10px 0 0' }}>Section Content</p>
    </div>
  ),
  args: {
    orientation: 'horizontal',
    variant: 'default',
  },
};

export const Vertical: Story = {
  render: (args) => (
    <div style={{ display: 'flex', height: '40px', alignItems: 'center', gap: '15px' }}>
      <span>Left Col</span>
      <Separator {...args} />
      <span>Right Col</span>
    </div>
  ),
  args: {
    orientation: 'vertical',
    variant: 'default',
  },
};
