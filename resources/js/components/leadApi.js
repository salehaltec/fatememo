const csrf = () => document.querySelector('meta[name="csrf-token"]')?.content || '';

export async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: 'same-origin',
    ...options,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-CSRF-TOKEN': csrf(), ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const first = data.errors ? Object.values(data.errors).flat()[0] : null;
    throw new Error(first || data.message || 'خطایی رخ داد. دوباره تلاش کنید.');
  }
  return data;
}
