import { describe, expect, it } from 'vitest';
import { validateContactPayload } from './validation.js';

describe('validateContactPayload', () => {
  it('trims valid fields and returns a normalized payload', () => {
    expect(
      validateContactPayload({
        name: '  Asha  ',
        email: ' ASHA@example.com ',
        subject: '  Project idea ',
        message: '  Let us build something useful.  ',
      }),
    ).toEqual({
      ok: true,
      value: {
        name: 'Asha',
        email: 'asha@example.com',
        subject: 'Project idea',
        message: 'Let us build something useful.',
      },
    });
  });

  it('rejects missing required fields', () => {
    const result = validateContactPayload({ email: 'hello@example.com' });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toEqual({
        name: 'Please enter your name.',
        message: 'Please enter a message.',
      });
    }
  });

  it('rejects invalid email addresses and oversized messages', () => {
    const result = validateContactPayload({
      name: 'Asha',
      email: 'not-an-email',
      message: 'x'.repeat(4001),
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.email).toBe('Please enter a valid email address.');
      expect(result.errors.message).toBe('Message must be 4000 characters or fewer.');
    }
  });
});
