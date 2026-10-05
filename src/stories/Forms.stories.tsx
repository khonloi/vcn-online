import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Checkbox } from '@/components/ui/Checkbox';
import { Search } from 'lucide-react';

const meta = {
  title: 'UI/Forms',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardInput: Story = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Label htmlFor="email" required>
        Corporate Email
      </Label>
      <Input id="email" type="email" placeholder="editor@vicecitynews.com" />
    </div>
  ),
};

export const InputWithIcon: Story = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Label htmlFor="search">Search Dispatches</Label>
      <Input
        id="search"
        placeholder="Search filings, tickers, keywords..."
        leftElement={<Search size={16} />}
      />
    </div>
  ),
};

export const InputWithError: Story = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Label htmlFor="error-input" required>
        Subscriber ID
      </Label>
      <Input
        id="error-input"
        defaultValue="INVALID-123"
        error
        errorMessage="Subscriber credential not found in active circulation registry."
      />
    </div>
  ),
};

export const Checkboxes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
