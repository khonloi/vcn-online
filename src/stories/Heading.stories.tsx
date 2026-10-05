import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Heading } from '@/components/ui/Heading';

const meta = {
  title: 'UI/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
    },
    font: {
      control: 'select',
      options: ['headline', 'sans', 'serif'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold', 'black'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'accent', 'breaking', 'inverse'],
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultH1: Story = {
  args: {
    as: 'h1',
    children: 'Global Markets Rally on Rate Cut Expectations',
  },
};

export const EditorialSerif: Story = {
  args: {
    as: 'h2',
    font: 'serif',
    size: '3xl',
    children: 'The Fall and Rise of Vice City Telecoms',
  },
};

export const BreakingNews: Story = {
  args: {
    as: 'h3',
    color: 'breaking',
    weight: 'black',
    children: 'FLASH: Emergency Board Session Adjourns Without Deal',
  },
};

export const SectionHeadline: Story = {
  args: {
    as: 'h3',
    size: 'xl',
    color: 'accent',
    children: 'Technology & AI Dispatches',
  },
};
