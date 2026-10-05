import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Grid } from './Grid';

const meta = {
  title: 'UI/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Grid cols={3} gap="md">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          style={{
            padding: '20px',
            backgroundColor: 'var(--color-surface-subtle)',
            border: '1px solid var(--color-border)',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Dispatch #{i}
        </div>
      ))}
    </Grid>
  ),
};

export const AutoFitNewsGrid: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Grid cols={4} gap="md">
      {['Tech', 'Markets', 'Finance', 'Economy'].map((cat) => (
        <div
          key={cat}
          style={{
            padding: '24px',
            backgroundColor: 'var(--color-surface-subtle)',
            border: '1px solid var(--color-border)',
            textAlign: 'center',
          }}
        >
          <h3>{cat}</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>
            Latest intelligence and dispatches
          </p>
        </div>
      ))}
    </Grid>
  ),
};
