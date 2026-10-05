import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BreakingNewsAlert: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Configure Breaking Alerts</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Market Wire Subscriptions</DialogTitle>
          <DialogDescription>
            Configure real-time push dispatches for high-priority market movements and regulatory
            announcements.
          </DialogDescription>
        </DialogHeader>
        <div style={{ margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <Label htmlFor="alert-email">Destination Email</Label>
            <Input id="alert-email" defaultValue="desk@vicecitynews.com" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="primary">Save Preferences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const DestructiveConfirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Retract Story</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Issue Editorial Retraction</DialogTitle>
          <DialogDescription>
            Are you sure you want to issue a full retraction for this dispatch? A permanent
            retraction statement will be published to the public record and syndicated to all feeds.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Dismiss</Button>
          </DialogClose>
          <Button variant="destructive">Confirm Retraction</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
