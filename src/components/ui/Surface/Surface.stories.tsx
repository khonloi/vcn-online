import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Surface } from './Surface';

const meta: Meta<typeof Surface> = {
  title: 'UI/Surface',
  component: Surface,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['card', 'subtle', 'muted', 'glass', 'elevated'],
    },
    border: {
      control: 'select',
      options: ['none', 'default', 'subtle', 'top', 'bottom'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Surface>;

export const Glass: Story = {
  render: (args) => (
    <div style={{ padding: '40px', background: 'linear-gradient(135deg, #111, #d60060)' }}>
      <Surface {...args}>
        <h3>Glassmorphism Card</h3>
        <p>Premium frosted glass effect with backdrop blur.</p>
      </Surface>
    </div>
  ),
  args: {
    variant: 'glass',
    border: 'default',
    padding: 'md',
  },
};
