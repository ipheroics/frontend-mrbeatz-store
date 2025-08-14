export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function request(path: string, opts: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers: any = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}/api${path}`, { ...opts, headers, cache: 'no-store' });
  if (!res.ok) {
    let msg = 'Request failed';
    try { const j = await res.json(); msg = j.error || msg; } catch {}
    throw new Error(msg);
  }
  return res.json();
}

export const api = {
  listBeats: (q?: string, tag?: string) => {
    const qs = new URLSearchParams();
    if (q) qs.set('search', q);
    if (tag) qs.set('tag', tag);
    const s = qs.toString();
    return request(`/beats${s ? `?${s}` : ''}`);
  },
  getBeat: (id: string) => request(`/beats/${id}`),
  register: (data: any) => request(`/auth/register`, { method: 'POST', body: JSON.stringify(data) }),
  login: (data: any) => request(`/auth/login`, { method: 'POST', body: JSON.stringify(data) }),
  me: () => request(`/auth/me`),
  createCheckout: (beatIds: string[]) => request(`/checkout/session`, { method: 'POST', body: JSON.stringify({ beatIds }) }),
  myOrders: () => request(`/orders/my`)
};
