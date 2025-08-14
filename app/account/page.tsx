'use client';

import { api } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function AccountPage() {
  const [user, setUser] = useState<any|null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    api.me().then(d => setUser(d.user)).catch(e => setError(e.message));
    api.myOrders().then(d => setOrders(d.orders || [])).catch(() => {});
  }, []);

  if (error) return <div className="text-red-400">{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="font-semibold text-lg">Account</div>
        <div className="text-[color:var(--muted)]">{user.email}</div>
      </div>
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Orders</h2>
        <div className="space-y-3">
          {orders.length === 0 && <div className="text-[color:var(--muted)]">No orders yet.</div>}
          {orders.map((o:any) => (
            <div key={o._id} className="card">
              <div className="flex items-center justify-between">
                <div className="font-medium">Order #{o._id.slice(-6)}</div>
                <div className="badge">{o.status}</div>
              </div>
              <ul className="text-sm text-[color:var(--muted)] list-disc ml-5">
                {o.items?.map((it:any, i:number) => <li key={i}>{it.beat?.title || 'Beat'} - ${Number(it.price).toFixed(2)}</li>)}
              </ul>
              {o.licensePdfUrl && <a className="link" href={o.licensePdfUrl} target="_blank">Download License PDF</a>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
