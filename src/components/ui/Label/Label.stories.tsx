import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Label } from './Label';

const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Editorial Desk Identifier',
    htmlFor: 'desk-id',
  },
};

export const Required: Story = {
  args: {
    children: 'Confidential Whistleblower Source Name',
    htmlFor: 'whistleblower-id',
    required: true,
  },
};
