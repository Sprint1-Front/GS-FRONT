import React from 'react'

export default function Shallow({progress}: {progress: number}) {
    const opacity = Math.max(0, 1 - progress / 20) // opacidade diminui até 20% de progresso

    const particles = React.useMemo(() =>
      [...Array(35)].map((_, i) => ({
      x: Math.random() * 95,
      y: Math.random() * 95,
      size: 2 + Math.random() * 5,
      duration: 1.5 + Math.random() * 4,
      delay: Math.random() * 4,
      hue: [180, 200, 160, 220][i % 4],
      
    
      }))
    , [])

  return (
    <div className='absolute inset-0 pointer-events-none' style={{opacity}}>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `hsl(${p.hue}, 80%, 70%)`,
            animation: `blink ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}
