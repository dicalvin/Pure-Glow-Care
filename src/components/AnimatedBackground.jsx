import React, { useEffect, useRef } from 'react';

/** Soft drifting blobs using brand colors #edeeef and #f7f6f2 */
export default function AnimatedBackground({ intensity = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W = 0;
    let H = 0;
    const particles = [];

    const colors = [
      'rgba(237, 238, 239, 0.55)',
      'rgba(247, 246, 242, 0.65)',
      'rgba(196, 168, 130, 0.12)',
      'rgba(0, 100, 0, 0.08)',
      'rgba(232, 207, 196, 0.14)',
      'rgba(240, 228, 204, 0.18)',
    ];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = Math.floor(14 * intensity);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * 1200,
        y: Math.random() * 900,
        r: 50 + Math.random() * 140,
        dx: (Math.random() - 0.5) * 0.25,
        dy: (Math.random() - 0.5) * 0.18,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
      });
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy + Math.sin(t * 0.0004 + p.phase) * 0.12;
        if (p.x < -p.r * 2) p.x = W + p.r;
        if (p.x > W + p.r * 2) p.x = -p.r;
        if (p.y < -p.r * 2) p.y = H + p.r;
        if (p.y > H + p.r * 2) p.y = -p.r;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, p.color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [intensity]);

  return <canvas ref={canvasRef} aria-hidden className="animated-bg-canvas" />;
}

export function FloatingOrbs() {
  const orbs = [
    { size: 90, top: '12%', left: '6%', delay: 0, duration: 8 },
    { size: 55, top: '58%', left: '4%', delay: 1.2, duration: 10 },
    { size: 130, top: '22%', right: '5%', delay: 0.4, duration: 9 },
    { size: 65, bottom: '18%', right: '10%', delay: 2, duration: 11 },
    { size: 42, top: '42%', left: '42%', delay: 1.6, duration: 7 },
  ];

  return (
    <div className="floating-orbs" aria-hidden>
      {orbs.map((o, i) => (
        <div
          key={i}
          className="floating-orb"
          style={{
            width: o.size,
            height: o.size,
            top: o.top,
            left: o.left,
            right: o.right,
            bottom: o.bottom,
            animationDuration: `${o.duration}s`,
            animationDelay: `${o.delay}s`,
            background:
              i % 2 === 0
                ? 'radial-gradient(circle, rgba(237,238,239,0.5) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(247,246,242,0.6) 0%, transparent 70%)',
          }}
        />
      ))}
    </div>
  );
}
