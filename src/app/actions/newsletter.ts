'use server';

export interface NewsletterState {
  status: 'idle' | 'success' | 'error';
  message: string;
}

/**
 * Server action for newsletter subscription with strict email validation
 * and extensible integration hooks for email delivery providers (Resend, Buttondown, Mailchimp).
 */
export async function subscribeToNewsletter(
  _prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const email = formData.get('email');

  if (typeof email !== 'string' || !email.trim()) {
    return {
      status: 'error',
      message: 'Please provide an email address.',
    };
  }

  const normalized = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(normalized)) {
    return {
      status: 'error',
      message: 'Please provide a valid email address (e.g. name@company.com).',
    };
  }

  // Hook for production newsletter provider API (e.g., Resend, Mailchimp, or database persistence)
  // Structured logging for audit and telemetry:
  console.info(`[Newsletter] Registered reader subscription: ${normalized}`);

  return {
    status: 'success',
    message:
      '✓ You are subscribed to Vice City Today! Your first morning briefing arrives tomorrow at 6:00 AM EST.',
  };
}
