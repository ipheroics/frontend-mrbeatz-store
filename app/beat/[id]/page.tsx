'use client';

import { api } from '@/lib/api';
import { addToCart } from '@/lib/cart';
import AudioPlayer from '@/components/AudioPlayer';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function BeatPage() {
  const params = useParams();
  const id = String(params?.id || '');
  const [beat, setBeat] = useState<any|null>(null);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    if (!id) return;
    api.getBeat(id).then(d => setBeat(d.beat)).catch(e => setError(e.message));
  }, [id]);

  if (error) return <div className="text-red-400">{error}</div>;
  if (!beat) return <div>Loading...</div>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <img src={beat.coverUrl || 'https://placehold.co/800x800?text=Beat'} alt={beat.title} className="rounded-xl w-full aspect-square object-cover" />
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{beat.title}</h1>
        <div className="text-[color:var(--muted)]">{beat.tags?.join(', ')}</div>
        <AudioPlayer src={beat.audioMp3Url} />
        <div className="text-xl font-semibold">${(beat.price ?? 19.99).toFixed(2)}</div>
        <div className="flex gap-2">
          <button
            className="btn btn-primary"
            onClick={() => {
              addToCart({ id: beat._id, title: beat.title, price: beat.price ?? 19.99, coverUrl: beat.coverUrl });
              window.dispatchEvent(new Event('cart:update'));
            }}
          >
            Add to Cart
          </button>
        </div>
        <p className="text-sm text-[color:var(--muted)]">Non‑exclusive license. Instant delivery after payment.</p>
      </div>
    </div>
  );
}
