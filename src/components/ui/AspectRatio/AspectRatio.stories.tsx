import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AspectRatio } from './AspectRatio';

const meta: Meta<typeof AspectRatio> = {
  title: 'UI/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: 'select',
      options: ['16/9', '1/1', '4/3', '3/4', '21/9'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Video16x9: Story = {
  render: (args) => (
    <div style={{ width: '400px' }}>
      <AspectRatio {...args}>
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#111',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          16:9 Media Preview
        </div>
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: '16/9',
  },
};

export const Square1x1: Story = {
  render: (args) => (
    <div style={{ width: '200px' }}>
      <AspectRatio {...args}>
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#d60060',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          1:1 Thumbnail
        </div>
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: '1/1',
  },
};
