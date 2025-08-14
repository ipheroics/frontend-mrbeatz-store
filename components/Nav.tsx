"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCart } from '@/lib/cart';

export default function Nav() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(getCart().length);
    const on = () => setCount(getCart().length);
    window.addEventListener('cart:update', on);
    return () => window.removeEventListener('cart:update', on);
  }, []);

  return (
    <nav className="border-b border-white/10">
      <div className="container flex items-center h-14 justify-between">
        <Link href="/" className="font-semibold tracking-wide">Mr. Beatz Store</Link>
        <div className="flex gap-2">
          <Link className="btn btn-ghost" href="/account">Account</Link>
          <Link className="btn btn-primary" href="/cart">Cart ({count})</Link>
        </div>
      </div>
    </nav>
  );
}
