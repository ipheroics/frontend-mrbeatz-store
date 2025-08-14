'use client';
import { api } from '@/lib/api';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    try {
      setLoading(true); setError(null);
      const { token } = await api.login(form as any);
      localStorage.setItem('token', token);
      window.location.href = '/';
    } catch (e:any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto card space-y-3">
      <h1 className="text-xl font-semibold">Welcome back</h1>
      <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
      <input className="input" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
      {error && <div className="text-red-400">{error}</div>}
      <button className="btn btn-primary" onClick={submit} disabled={loading}>{loading ? 'Please wait...' : 'Log in'}</button>
      <div className="text-sm text-[color:var(--muted)]">No account? <Link className="link" href="/register">Create one</Link></div>
    </div>
  );
}
