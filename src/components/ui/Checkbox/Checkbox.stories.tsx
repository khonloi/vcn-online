import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '360px' }}>
      <Checkbox id="breaking" defaultChecked label="Receive Breaking News push dispatches" />
      <Checkbox id="markets" label="Daily Morning Market Intelligence report" />
      <Checkbox
        id="disabled-opt"
        disabled
        label="VIP Exclusive Editorial Desk access (Enterprise tier only)"
      />
    </div>
  ),
};
