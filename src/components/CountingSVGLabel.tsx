import { useEffect, useRef, useState } from 'react';

type CountingSVGLabelProps = {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  value?: number | string;
  style: React.CSSProperties;
  duration?: number;
};
const CountingSVGLabel = ({
  x = 0,
  y = 0,
  width,
  value = 0,
  style,
  duration = 500,
}: CountingSVGLabelProps) => {
  const toNum = (v: number | string | undefined, fallback = 0) => {
    const n = typeof v === 'number' ? v : Number(v);
    return Number.isFinite(n) ? n : fallback;
  };

  const end = toNum(value, 0);

  const [display, setDisplay] = useState(0);
  const prev = useRef<number>(0);

  useEffect(() => {
    const from = prev.current ?? 0;
    const start = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf = 0;

    const step = (ts: number) => {
      const t = Math.min(1, (ts - start) / duration);
      const v = toNum(from) + (end - toNum(from)) * easeOutCubic(t);
      setDisplay(v);
      if (t < 1) raf = requestAnimationFrame(step);
      else prev.current = end;
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [duration, end]);

  const nx = toNum(x, 0);
  const ny = toNum(y, 0);
  const w = toNum(width, 0);

  return (
    <text
      x={nx + w / 2}
      y={ny - 12}
      textAnchor="middle"
      style={{ ...style, pointerEvents: 'none' }}
    >
      £{Math.round(display).toLocaleString()}
    </text>
  );
};

export default CountingSVGLabel;
