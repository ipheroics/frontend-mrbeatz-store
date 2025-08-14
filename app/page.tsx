'use client';

import { api } from '@/lib/api';
import BeatCard from '@/components/BeatCard';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [beats, setBeats] = useState<any[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await api.listBeats(q);
      setBeats(data.beats || []);
    } catch (e: any) {
      setError(e.message || 'Failed');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input className="input" placeholder="Search beats..." value={q} onChange={e => setQ(e.target.value)} />
        <button className="btn btn-primary" onClick={load}>Search</button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-400">{error}</div>}
      <div className="grid-beats">
        {beats.map((b) => <BeatCard key={b._id} beat={b} />)}
      </div>
    </div>
  );
}
