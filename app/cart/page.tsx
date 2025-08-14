'use client';
import { useEffect, useState } from 'react';
import { getCart, removeFromCart, clearCart } from '@/lib/cart';
import { api } from '@/lib/api';

export default function CartPage() {
  const [items, setItems] = useState(getCart());
  const [loading, setLoading] = useState(false);
  const total = items.reduce((s, i) => s + (i.price || 0), 0);

  function refresh() {
    setItems(getCart());
    window.dispatchEvent(new Event('cart:update'));
  }

  useEffect(() => { refresh(); }, []);

  async function checkout() {
    try {
      setLoading(true);
      const beatIds = items.map(i => i.id);
      const { url } = await api.createCheckout(beatIds);
      window.location.href = url;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Your Cart</h1>
      <div className="space-y-3">
        {items.length === 0 && <div className="text-[color:var(--muted)]">Cart is empty.</div>}
        {items.map((it) => (
          <div key={it.id} className="card flex items-center gap-3">
            <img src={it.coverUrl || 'https://placehold.co/100'} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1">
              <div className="font-medium">{it.title}</div>
              <div className="text-sm text-[color:var(--muted)]">${it.price.toFixed(2)}</div>
            </div>
            <button className="btn btn-ghost" onClick={() => { removeFromCart(it.id); refresh(); }}>Remove</button>
          </div>
        ))}
      </div>
      {items.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">Total: ${total.toFixed(2)}</div>
          <div className="flex gap-2">
            <button className="btn btn-ghost" onClick={() => { clearCart(); refresh(); }}>Clear</button>
            <button className="btn btn-primary" onClick={checkout} disabled={loading}>{loading ? 'Redirecting…' : 'Checkout'}</button>
          </div>
        </div>
      )}
    </div>
  );
}
