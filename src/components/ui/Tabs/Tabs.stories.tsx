import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Text } from '@/components/ui/Text';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MarketIndicesTabs: Story = {
  render: () => (
    <div style={{ width: '450px' }}>
      <Tabs defaultValue="equities">
        <TabsList>
          <TabsTrigger value="equities">Equities</TabsTrigger>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="forex">Forex</TabsTrigger>
        </TabsList>
        <TabsContent value="equities">
          <Text size="sm" color="secondary">
            S&amp;P 500: 5,983.25 (+0.42%) • NASDAQ: 18,972.40 (+0.88%) • DOW: 43,870.10 (-0.15%)
          </Text>
        </TabsContent>
        <TabsContent value="commodities">
          <Text size="sm" color="secondary">
            Crude Oil (WTI): $72.15/bbl (-1.05%) • Gold: $2,735.40/oz (+0.32%)
          </Text>
        </TabsContent>
        <TabsContent value="crypto">
          <Text size="sm" color="secondary">
            Bitcoin (BTC): $96,450 (+2.30%) • Ethereum (ETH): $3,620 (+1.85%)
          </Text>
        </TabsContent>
        <TabsContent value="forex">
          <Text size="sm" color="secondary">
            EUR/USD: 1.0520 (-0.12%) • USD/JPY: 154.25 (+0.45%) • GBP/USD: 1.2610 (+0.05%)
          </Text>
        </TabsContent>
      </Tabs>
    </div>
  ),
};
