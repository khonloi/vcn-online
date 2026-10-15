import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Stack, VStack, HStack } from './Stack';

const meta: Meta<typeof Stack> = {
  title: 'UI/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['column', 'row'],
    },
    gap: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 'none'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const VerticalStack: Story = {
  render: (args) => (
    <VStack {...args}>
      <div style={{ padding: '10px', background: '#f5f5f5' }}>Item 1</div>
      <div style={{ padding: '10px', background: '#e5e5e5' }}>Item 2</div>
      <div style={{ padding: '10px', background: '#d5d5d5' }}>Item 3</div>
    </VStack>
  ),
  args: {
    gap: 4,
  },
};

export const HorizontalStack: Story = {
  render: (args) => (
    <HStack {...args}>
      <div style={{ padding: '10px', background: '#f5f5f5' }}>Chip 1</div>
      <div style={{ padding: '10px', background: '#e5e5e5' }}>Chip 2</div>
      <div style={{ padding: '10px', background: '#d5d5d5' }}>Chip 3</div>
    </HStack>
  ),
  args: {
    gap: 3,
  },
};
