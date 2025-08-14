"use client";
import Link from 'next/link';
import { addToCart } from '@/lib/cart';

export default function BeatCard({ beat }: { beat: any }) {
  return (
    <div className="card flex flex-col gap-3">
      <img src={beat.coverUrl || 'https://placehold.co/600x600?text=Beat'} alt={beat.title} className="rounded-xl aspect-square object-cover" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{beat.title}</h3>
        <div className="text-sm text-[color:var(--muted)]">{beat.tags?.join(', ')}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="font-semibold">${(beat.price ?? 19.99).toFixed(2)}</div>
        <div className="flex gap-2">
          <Link href={`/beat/${beat._id}`} className="btn btn-ghost">Preview</Link>
          <button
            className="btn btn-primary"
            onClick={() => {
              addToCart({ id: beat._id, title: beat.title, price: beat.price ?? 19.99, coverUrl: beat.coverUrl });
              window.dispatchEvent(new Event('cart:update'));
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
