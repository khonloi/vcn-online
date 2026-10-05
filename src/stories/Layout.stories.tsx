import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Container } from '@/components/ui/Container';
import { Flex, Stack } from '@/components/ui/Flex';
import { Button } from '@/components/ui/Button';

const meta = {
  title: 'UI/Layout',
  component: Container,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ResponsiveContainer: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => (
    <Container {...args}>
      <div
        style={{
          padding: '24px',
          background: 'var(--color-surface-subtle)',
          border: '1px dashed var(--color-border-strong)',
          textAlign: 'center',
        }}
      >
        Container (size: lg, max-width: 1240px)
      </div>
    </Container>
  ),
};

export const FlexRowJustifyBetween: Story = {
  args: {},
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
  args: {},
  render: () => (
    <Stack gap={3} style={{ maxWidth: '300px' }}>
      <Button variant="primary">Headline Item 1</Button>
      <Button variant="secondary">Headline Item 2</Button>
      <Button variant="outline">Headline Item 3</Button>
    </Stack>
  ),
};
