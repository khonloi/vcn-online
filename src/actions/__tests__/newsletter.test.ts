import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { subscribeToNewsletter } from '../newsletter';

describe('Newsletter Subscription Server Action', () => {
  test('rejects empty or whitespace-only emails', async () => {
    const formData = new FormData();
    formData.append('email', '   ');
    const result = await subscribeToNewsletter({ status: 'idle', message: '' }, formData);
    assert.equal(result.status, 'error');
    assert.match(result.message, /Please provide an email address/i);
  });

  test('rejects malformed email formats', async () => {
    const formData = new FormData();
    formData.append('email', 'invalid-user@');
    const result = await subscribeToNewsletter({ status: 'idle', message: '' }, formData);
    assert.equal(result.status, 'error');
    assert.match(result.message, /valid email address/i);
  });

  test('accepts valid email and returns success state', async () => {
    const formData = new FormData();
    formData.append('email', 'investor@hedgefund.com');
    const result = await subscribeToNewsletter({ status: 'idle', message: '' }, formData);
    assert.equal(result.status, 'success');
    assert.match(result.message, /You are subscribed/i);
  });
});
