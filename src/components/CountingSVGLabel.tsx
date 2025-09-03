import { useEffect, useRef, useState } from 'react';

type CountingSVGLabelProps = {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  value?: number | string;
  style: React.CSSProperties;
  duration?: number;
  withBackground?: boolean;
};
const CountingSVGLabel = ({
  x = 0,
  y = 0,
  width,
  value = 0,
  style,
  duration = 500,
  withBackground = false,
}: CountingSVGLabelProps) => {
  const toNum = (v: number | string | undefined, fallback = 0) => {
    const n = typeof v === 'number' ? v : Number(v);
    return Number.isFinite(n) ? n : fallback;
  };

  const end = toNum(value, 0);

  const [display, setDisplay] = useState(0);
  const prev = useRef<number>(0);
  const textRef = useRef<SVGTextElement | null>(null);
  const [bgBox, setBgBox] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

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

  // Measure background box whenever the displayed text changes
  useEffect(() => {
    if (!withBackground) return;
    const el = textRef.current;
    if (!el) return;
    try {
      const box = el.getBBox();
      setBgBox({ x: box.x, y: box.y, width: box.width, height: box.height });
    } catch {
      // getBBox can throw if element not in DOM yet
    }
  }, [display, withBackground, style?.fontSize, style?.fontWeight]);

  const textX = nx + w / 2;
  const textY = ny - 12;
  const BG_COLOR = 'white';
  const BG_PADDING_X = 4; // horizontal padding
  const BG_PADDING_Y = 0; // vertical padding to keep box height tight

  return (
    <g pointerEvents="none">
      {withBackground && bgBox && (
        <rect
          x={bgBox.x - BG_PADDING_X}
          y={bgBox.y - BG_PADDING_Y}
          width={bgBox.width + BG_PADDING_X * 2}
          height={bgBox.height + BG_PADDING_Y * 2}
          fill={BG_COLOR}
        />
      )}
      <text
        ref={textRef}
        x={textX}
        y={textY}
        textAnchor="middle"
        style={{ ...style, pointerEvents: 'none' }}
      >
        £{Math.round(display).toLocaleString()}
      </text>
    </g>
  );
};

export default CountingSVGLabel;
