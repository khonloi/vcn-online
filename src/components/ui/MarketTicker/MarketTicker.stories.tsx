import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MarketTicker } from './MarketTicker';

const mockIndices = [
  { name: 'S&P 500', value: '5,864.67', change: '+0.42%', positive: true },
  { name: 'NASDAQ', value: '18,367.05', change: '+0.63%', positive: true },
  { name: 'DOW', value: '43,077.70', change: '-0.33%', positive: false },
  { name: 'VCN 100', value: '3,412.80', change: '+1.15%', positive: true },
];

const meta: Meta<typeof MarketTicker> = {
  title: 'UI/MarketTicker',
  component: MarketTicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MarketTicker>;

export const Default: Story = {
  args: {
    indices: mockIndices,
    delayNotice: '15M DELAY',
  },
};
