import { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export function UnderwaterBackground({
  className,
  children,
  intensity = 1,
  speed = 1,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let tick = 0;

    const particleCount = Math.floor(40 * intensity);

    const particles = Array.from({ length: particleCount }, () => ({
      x: 0,
      y: 0,
      size: 0,
      speed: 0,
      opacity: 0,
      wobbleOffset: Math.random() * Math.PI * 2,
    }));

    const resetParticle = (p, randomY = true) => {
      p.x = Math.random() * width;
      p.y = randomY ? Math.random() * height : height + 10;
      p.size = 1 + Math.random() * 2;
      p.speed = 0.3 + Math.random() * 0.4;
      p.opacity = 0.4 + Math.random() * 0.4;
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles.forEach((p) => resetParticle(p));
    };

    const animate = () => {
      tick += 0.02 * speed;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y -= p.speed * speed;
        p.x += Math.sin(tick + p.wobbleOffset) * 0.5;

        if (p.y < -10) resetParticle(p, false);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,230,255,${p.opacity})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();
    };
  }, [speed, intensity]);

  const duration = (base) => base / speed;

  return (
    <div
      ref={containerRef}
      className={cn("fixed inset-0 overflow-hidden -z-10", className)}
      style={{
        background:
          "linear-gradient(180deg, #0a1a15 0%, #051a14 40%, #020f0a 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute -inset-[50%]"
            style={{
              opacity: 0.25,
              background: `radial-gradient(ellipse 40% 35% at ${
                30 + i * 15
              }% ${30 + i * 10}%, rgba(23,201,100,${
                0.35 * intensity
              }), transparent)`,
              animation: `caustic${i} ${duration(8 + i * 2)}s ease-in-out infinite`,
              filter: "blur(45px)",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0"
            style={{
              left: `${15 + i * 18}%`,
              width: "8%",
              height: "100%",
              background: `linear-gradient(180deg, rgba(23,201,100,${
                0.12 * intensity
              }) 0%, transparent 80%)`,
              transform: "skewX(-5deg)",
              animation: `ray ${duration(6 + i * 2)}s ease-in-out infinite`,
              animationDelay: `${i * -1.5}s`,
              filter: "blur(8px)",
            }}
          />
        ))}
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      />

      {children}

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes caustic1 {
            0%,100%{transform:translate(0,0) scale(1);}
            50%{transform:translate(5%,3%) scale(1.05);}
          }
          @keyframes caustic2 {
            0%,100%{transform:translate(0,0) scale(1);}
            50%{transform:translate(-6%,4%) scale(1.08);}
          }
          @keyframes caustic3 {
            0%,100%{transform:translate(0,0) scale(1.02);}
            50%{transform:translate(4%,-3%) scale(0.96);}
          }
          @keyframes ray {
            0%,100%{opacity:.6;transform:skewX(-5deg) translateX(0);}
            50%{opacity:1;transform:skewX(-8deg) translateX(10px);}
          }
        `,
        }}
      />
    </div>
  );
}
