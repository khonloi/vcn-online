export interface NewsletterState {
  status: 'idle' | 'success' | 'error';
  message: string;
}
