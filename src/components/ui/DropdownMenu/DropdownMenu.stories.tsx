import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';
import { ChevronDown, Share2, Bookmark, Download, Flag } from 'lucide-react';

const meta = {
  title: 'UI/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ArticleActionsMenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Article Actions <ChevronDown size={14} style={{ marginLeft: 6 }} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Reader Tools</DropdownMenuLabel>
        <DropdownMenuItem>
          <Share2 size={14} /> Share Dispatch
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bookmark size={14} /> Save to Reading List
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download size={14} /> Download PDF Brief
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>
          <Flag size={14} /> Report Factual Dispute
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
