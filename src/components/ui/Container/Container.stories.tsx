import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Container } from './Container';

const meta = {
  title: 'UI/Container',
  component: Container,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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

export const NarrowReadingContainer: Story = {
  args: {
    size: 'sm',
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
        Editorial Article Reading Column (size: sm, max-width: 720px)
      </div>
    </Container>
  ),
};
