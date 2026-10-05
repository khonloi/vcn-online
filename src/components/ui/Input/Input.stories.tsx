import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';
import { Label } from '../Label';
import { Search } from 'lucide-react';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Label htmlFor="email" required>
        Corporate Email
      </Label>
      <Input id="email" type="email" placeholder="editor@vicecitynews.com" />
    </div>
  ),
};

export const WithIcon: Story = {
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

export const WithError: Story = {
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
