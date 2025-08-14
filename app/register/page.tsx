'use client';
import { api } from '@/lib/api';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    try {
      setLoading(true); setError(null);
      const { token } = await api.register(form as any);
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
      <h1 className="text-xl font-semibold">Create account</h1>
      <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
      <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
      <input className="input" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
      {error && <div className="text-red-400">{error}</div>}
      <button className="btn btn-primary" onClick={submit} disabled={loading}>{loading ? 'Please wait...' : 'Sign up'}</button>
      <div className="text-sm text-[color:var(--muted)]">Have an account? <Link className="link" href="/login">Log in</Link></div>
    </div>
  );
}
