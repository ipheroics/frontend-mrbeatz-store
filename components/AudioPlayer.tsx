"use client";
import { useEffect, useRef, useState } from 'react';

export default function AudioPlayer({ src }: { src?: string }) {
  const ref = useRef<HTMLAudioElement|null>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    const onEnd = () => setPlaying(false);
    a.addEventListener('ended', onEnd);
    return () => a.removeEventListener('ended', onEnd);
  }, []);
  return (
    <div className="flex items-center gap-3">
      <button
        className="btn btn-primary"
        onClick={() => {
          if (!ref.current) return;
          if (playing) { ref.current.pause(); setPlaying(false); }
          else { ref.current.play(); setPlaying(true); }
        }}
      >{playing ? 'Pause' : 'Play'}</button>
      <audio ref={ref} src={src} preload="none" />
      <span className="text-sm text-[color:var(--muted)]">Preview</span>
    </div>
  );
}
