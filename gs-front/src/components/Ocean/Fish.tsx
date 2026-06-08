import { useEffect, useRef } from "react";

interface FishData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  emoji: string;
  zone: number;
  wobble: number;
  wobbleSpeed: number;
}

const FISH_BY_ZONE = [
  { emojis: ["🐠", "🐟", "🐡", "🐬"], zone: 0 },
  { emojis: ["🦑", "🐙", "🪼", "🦈"], zone: 1 },
  { emojis: ["🦈", "🪼", "🦐"], zone: 2 },
  { emojis: ["🪼", "🦐", "🐡"], zone: 3 },
  { emojis: ["🦑", "🦐"], zone: 4 },
];

function createFish(zone: number): FishData {
  const group = FISH_BY_ZONE[zone];
  return {
    x: Math.random() * 80 + 10,
    y: Math.random() * 70 + 10,
    vx: (Math.random() * 0.06 + 0.02) * (Math.random() < 0.5 ? 1 : -1),
    vy: Math.random() * 0.02 * (Math.random() < 0.5 ? 1 : -1),
    size: 24 + Math.random() * 20,
    emoji: group.emojis[Math.floor(Math.random() * group.emojis.length)],
    zone,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.02 + Math.random() * 0.03,
  };
}

export default function Fish({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fishRef = useRef<FishData[]>([]);
  const rafRef = useRef<number | null>(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    fishRef.current = FISH_BY_ZONE.flatMap((_, zone) =>
      Array.from({ length: 5 }, () => createFish(zone)),
    );

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const p = progressRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      fishRef.current.forEach((fish) => {
        const zoneStart = fish.zone * 0.2 - 0.05;
        const zoneEnd = (fish.zone + 1) * 0.2 + 0.05;

        // calcula opacidade por zona
        let opacity = 0;
        if (p >= zoneStart && p <= zoneEnd) {
          // Fade in no início da zona e fade out no final
          const zoneRange = zoneEnd - zoneStart;
          const zoneProgress = (p - zoneStart) / zoneRange;
          opacity = Math.min(zoneProgress / 0.2, (1 - zoneProgress) / 0.2, 1);
        }

        if (opacity <= 0.01) return;

        // movimento
        fish.wobble += fish.wobbleSpeed;
        fish.x += fish.vx;
        fish.y += fish.vy + Math.sin(fish.wobble) * 0.035;

        // rebate nas bordas
        if (fish.x < 3) {
          fish.vx = Math.abs(fish.vx);
          fish.x = 3;
        }
        if (fish.x > 97) {
          fish.vx = -Math.abs(fish.vx);
          fish.x = 97;
        }
        if (fish.y < 5) {
          fish.vy = Math.abs(fish.vy);
          fish.y = 5;
        }
        if (fish.y > 90) {
          fish.vy = -Math.abs(fish.vy);
          fish.y = 90;
        }

        const px = (fish.x / 100) * canvas.width;
        const py = (fish.y / 100) * canvas.height;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
        ctx.translate(px, py);

        // espelha conforme direção
        if (fish.vx < 0) ctx.scale(-1, 1);

        ctx.font = `${fish.size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(fish.emoji, 0, 0);
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current!);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 6 }}
    />
  );
}
