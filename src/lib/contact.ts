export type ContactPayload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export async function submitContact(
  apiUrl: string,
  payload: ContactPayload,
  fetcher: typeof fetch = fetch,
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    const response = await fetcher(`${apiUrl.replace(/\/$/, '')}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = (await response.json()) as { ok?: boolean; message?: string };

    if (response.ok && body.ok) return { ok: true };
    return { ok: false, message: body.message || 'Please try again in a moment.' };
  } catch {
    return { ok: false, message: 'The contact service is unavailable right now.' };
  }
}
