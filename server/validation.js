const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stringValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function validateContactPayload(payload) {
  const body = payload && typeof payload === 'object' ? payload : {};
  const name = stringValue(body.name);
  const email = stringValue(body.email).toLowerCase();
  const subject = stringValue(body.subject);
  const message = stringValue(body.message);
  const errors = {};

  if (!name) errors.name = 'Please enter your name.';
  if (name.length > 120) errors.name = 'Name must be 120 characters or fewer.';
  if (!email) errors.email = 'Please enter your email.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Please enter a valid email address.';
  if (email.length > 254) errors.email = 'Email must be 254 characters or fewer.';
  if (subject.length > 200) errors.subject = 'Subject must be 200 characters or fewer.';
  if (!message) errors.message = 'Please enter a message.';
  if (message.length > 4000) errors.message = 'Message must be 4000 characters or fewer.';

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: { name, email, subject, message },
  };
}
