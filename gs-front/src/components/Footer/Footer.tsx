import Floor from "../Ocean/Floor";

export default function Footer() {
  return (
    <div>
      <Floor progress={1} />

      {/* logo */}
      <div className="text-center mt-8">
        <p
          className="text-white/90 font-light"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42 }}
        >
          Grupo de Software
        </p>
        <p className="text-white/40 text-xs tracking-widest uppercase mt-1"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          THALASSOR - 2026
        </p>
      </div>
    </div>
  )
}
