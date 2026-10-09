import { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';

// HanziWriter needs its character data; the default CDN (jsdelivr) has open CORS.
const writerOpts = {
  width: 98,
  height: 98,
  padding: 4,
  showOutline: true,
  strokeAnimationSpeed: 1,
  delayBetweenStrokes: 120,
  strokeColor: '#1d4ed8',
  outlineColor: '#cbd5e1',
  radicalColor: '#dc2626',
  charDataLoader: (char: string, onLoad: (data: unknown) => void, onError: (err: unknown) => void) => {
    fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${encodeURIComponent(char)}.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load char data');
        return res.json();
      })
      .then(onLoad)
      .catch(onError);
  },
};

function HanziBox({ char, index }: { char: string; index: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriter | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const writer = HanziWriter.create(ref.current, char, writerOpts);
    writerRef.current = writer;
    return () => {
      writerRef.current = null;
    };
  }, [char]);

  return (
    <div className="flex flex-col items-center gap-2 bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
      <div ref={ref} className="w-[98px] h-[98px]" />
      <div className="flex gap-2">
        <button
          onClick={() => writerRef.current?.animateCharacter()}
          className="px-3 py-1 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          title="Play stroke order"
        >
          ▶ Play
        </button>
        <button
          onClick={() => {
            const w = writerRef.current;
            if (!w) return;
            w.cancelAnimation();
            w.hideCharacter();
            setTimeout(() => w.animateCharacter(), 150);
          }}
          className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors"
          title="Replay stroke order"
        >
          🔄 Replay
        </button>
      </div>
    </div>
  );
}

function TianzigePad({ padId }: { padId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawGrid = () => {
      ctx.clearRect(0, 0, 105, 105);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      // Border
      ctx.strokeRect(0.5, 0.5, 104, 104);
      // Dashed mid lines
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(52.5, 0); ctx.lineTo(52.5, 105);
      ctx.moveTo(0, 52.5); ctx.lineTo(105, 52.5);
      ctx.stroke();
      // Diagonals
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(105, 105);
      ctx.moveTo(105, 0); ctx.lineTo(0, 105);
      ctx.stroke();
      ctx.setLineDash([]);
    };
    drawGrid();

    const pos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: ((e.clientX - rect.left) / rect.width) * 105, y: ((e.clientY - rect.top) / rect.height) * 105 };
    };

    const start = (e: PointerEvent) => {
      drawingRef.current = true;
      setHasDrawn(true);
      const p = pos(e);
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    };
    const move = (e: PointerEvent) => {
      if (!drawingRef.current) return;
      const p = pos(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    };
    const end = () => { drawingRef.current = false; };

    canvas.addEventListener('pointerdown', start);
    canvas.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
    return () => {
      canvas.removeEventListener('pointerdown', start);
      canvas.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
    };
  }, [padId]);

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, 105, 105);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.strokeRect(0.5, 0.5, 104, 104);
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(52.5, 0); ctx.lineTo(52.5, 105);
    ctx.moveTo(0, 52.5); ctx.lineTo(105, 52.5);
    ctx.moveTo(0, 0); ctx.lineTo(105, 105);
    ctx.moveTo(105, 0); ctx.lineTo(0, 105);
    ctx.stroke();
    ctx.setLineDash([]);
    setHasDrawn(false);
  };

  return (
    <div className="flex flex-col items-center gap-2 bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
      <canvas
        ref={canvasRef}
        width={105}
        height={105}
        className="w-[98px] h-[98px] touch-none cursor-crosshair rounded-md bg-slate-50 border border-slate-100"
      />
      <button
        onClick={clear}
        disabled={!hasDrawn}
        className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 disabled:opacity-40 transition-colors"
        title="Clear writing pad"
      >
        🗑️ Clear
      </button>
    </div>
  );
}

export default function SimTab({ words }: { words: { word: string; chars: string[] }[] }) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600 max-w-3xl">
        Watch the stroke order animation, then practice writing each character in the tianzige (田字格) pad.
        Use your mouse, finger, or a stylus. Blue = full stroke, red = radical.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {words.map((w) => (
          <div key={w.word} className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
            <div className="text-center mb-3">
              <span className="text-2xl font-bold text-slate-900">{w.word}</span>
            </div>
            {w.chars.map((c) => (
              <div key={`${w.word}-${c}`} className="flex items-start justify-center gap-3 mb-3 flex-wrap">
                <HanziBox char={c} index={`${w.word}-${c}`} />
                <TianzigePad padId={`${w.word}-${c}`} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
