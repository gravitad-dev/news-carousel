import type { PortalTemplateProps } from '../types';

export const ElPais = ({ bannerUrl, onBannerClick }: PortalTemplateProps) => {
  return (
    <div className="w-full bg-white font-sans text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="bg-[#004a87] text-white text-xs py-1 px-4 flex justify-between">
          <span>ESPAÑA | AMÉRICA | BRASIL | CATALUÑA</span>
          <span>SUSCRÍBETE</span>
        </div>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-4xl font-serif font-bold tracking-tighter">EL PAÍS</h1>
          <div className="text-sm text-gray-500 text-right">
            <p>Sábado, 14 de febrero de 2026</p>
            <p>EDICIÓN ESPAÑA</p>
          </div>
        </div>
        <nav className="border-t border-b border-gray-300 py-2 flex justify-center space-x-6 text-sm font-bold text-gray-700">
          <span>Internacional</span>
          <span>Opinión</span>
          <span>España</span>
          <span>Economía</span>
          <span>Ciencia</span>
          <span>Tecnología</span>
          <span>Cultura</span>
          <span>Deportes</span>
        </nav>
      </header>

      {/* Main Content + Banner */}
      <main className="container mx-auto px-4 py-8 grid grid-cols-12 gap-8">
        {/* Left Column (News) */}
        <div className="col-span-8 space-y-6">
          <article>
            <h2 className="text-3xl font-serif font-bold leading-tight mb-2">
              La economía global muestra signos de recuperación tras el acuerdo tecnológico
            </h2>
            <p className="text-gray-600 text-lg">
              Los mercados reaccionan con optimismo ante las nuevas regulaciones de inteligencia artificial.
            </p>
            <div className="h-48 bg-gray-200 mt-4 animate-pulse rounded"></div>
          </article>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 bg-gray-100 rounded"></div>
            <div className="h-32 bg-gray-100 rounded"></div>
          </div>
        </div>

        {/* Right Column (Ads) */}
        <div className="col-span-4 flex flex-col items-center space-y-4">
          <div className="text-xs text-gray-400 uppercase tracking-widest">Publicidad</div>
          
          {/* THE BANNER */}
          <div 
            className="cursor-pointer transition-transform hover:scale-[1.02] shadow-lg border border-gray-200"
            onClick={onBannerClick}
          >
            <img 
              src={bannerUrl} 
              alt="Anuncio Patrocinado" 
              className="max-w-full h-auto object-contain bg-gray-50"
              style={{ maxHeight: '600px' }}
            />
          </div>

          <div className="w-full h-64 bg-gray-100 rounded p-4 text-center text-gray-400 text-sm">
            Más noticias relacionadas...
          </div>
        </div>
      </main>
    </div>
  );
};