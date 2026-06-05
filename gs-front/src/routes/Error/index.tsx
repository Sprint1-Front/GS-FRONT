import { Link } from "react-router-dom";

export default function Error() {
  return (
    <main className="flex-1 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-base text-text p-6 text-center overflow-hidden relative">
        {/* Efeito de fundo sutil */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-teal)_0%,_transparent_70%)] pointer-events-none"></div>

        <div className="space-y-6 max-w-xl relative z-10">
            <h1 className="text-9xl font-display font-bold text-teal drop-shadow-lg">
                404
            </h1>
            
            <h2 className="text-4xl font-display font-semibold text-sapphire">
                Águas Desconhecidas!
            </h2>
            
            <p className="text-lg text-subtext-0 leading-relaxed font-body">
                Parece que você navegou longe demais e acabou se perdendo nas profundezas. 
                A rota que você tentou acessar não existe ou foi levada pela maré.
            </p>
            
            <div className="pt-8">
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 px-8 py-3 bg-surface-1 text-text border border-crust rounded-xl shadow-md hover:bg-surface-2 hover:border-overlay-0 hover:-translate-y-1 transition-all duration-300 font-medium"
                >
                    <span>⚓</span>
                    Voltar para um porto seguro
                </Link>
            </div>
        </div>
        
        {/* Elemento decorativo */}
        <div className="mt-16 opacity-40 animate-pulse text-subtext-1 text-4xl flex gap-4 relative z-10 select-none">
            <span>〰️</span>
            <span>🐟</span>
            <span>〰️</span>
        </div>
    </main>
  );
}