import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card } from './Card';
import { Badge } from '../Badge';
import { Heading } from '../Heading';
import { Text } from '../Text';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['flat', 'bordered', 'elevated', 'interactive'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const InteractiveArticle: Story = {
  render: (args) => (
    <div style={{ maxWidth: '400px' }}>
      <Card {...args}>
        <Card.Media>
          <div style={{ height: '200px', backgroundColor: '#333' }} />
        </Card.Media>
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Card.Header>
            <Badge variant="breaking">Breaking</Badge>
            <Heading as="h3" size="lg">
              Market Alert: Global Indices Surge
            </Heading>
          </Card.Header>
          <Card.Body>
            <Text size="sm" color="secondary">
              Trading desks report strong institutional inflows across technology and energy
              equities.
            </Text>
          </Card.Body>
          <Card.Footer>
            <span>Sarah Vance &bull; 10m ago</span>
          </Card.Footer>
        </div>
      </Card>
    </div>
  ),
  args: {
    variant: 'interactive',
    padding: 'none',
    orientation: 'vertical',
  },
};
