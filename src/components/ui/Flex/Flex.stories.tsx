import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Flex, Stack } from './Flex';
import { Button } from '../Button';

const meta = {
  title: 'UI/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RowJustifyBetween: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Flex
      align="center"
      justify="between"
      style={{ padding: '16px', background: 'var(--color-surface-subtle)' }}
    >
      <strong>Vice City News</strong>
      <Flex gap={2}>
        <Button variant="ghost" size="sm">
          Login
        </Button>
        <Button variant="primary" size="sm">
          Subscribe
        </Button>
      </Flex>
    </Flex>
  ),
};

export const VerticalStack: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Stack gap={3} style={{ maxWidth: '300px' }}>
      <Button variant="secondary" size="md">
        Markets Dashboard
      </Button>
      <Button variant="secondary" size="md">
        Fed Watch Tool
      </Button>
      <Button variant="secondary" size="md">
        Earnings Calendar
      </Button>
    </Stack>
  ),
};
