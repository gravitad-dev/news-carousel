import type { PortalTemplateProps } from '../types';

export const ElMundo = ({ bannerUrl, onBannerClick }: PortalTemplateProps) => {
  return (
    <div className="w-full bg-white font-sans text-gray-900">
      {/* Header */}
      <header className="border-b-4 border-[#689f38]">
        <div className="bg-gray-100 text-xs py-1 px-4 flex justify-end space-x-4 text-gray-600">
          <span>Iniciar Sesión</span>
          <span>Suscríbete</span>
        </div>
        <div className="container mx-auto px-4 py-4 flex flex-col items-center">
          <h1 className="text-5xl font-serif font-black text-[#689f38] tracking-tight">EL MUNDO</h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Líder mundial en información en castellano</p>
        </div>
        <nav className="bg-[#689f38] text-white py-2 flex justify-center space-x-6 text-sm font-bold uppercase">
          <span>España</span>
          <span>Opinión</span>
          <span>Economía</span>
          <span>Internacional</span>
          <span>Deportes</span>
          <span>Cultura</span>
        </nav>
      </header>

      {/* Main Content + Banner */}
      <main className="container mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        
        {/* Top Banner Area (Optional) */}
        <div className="col-span-12 flex justify-center mb-6">
           <div className="text-xs text-gray-300 mb-1 w-full text-center">PUBLICIDAD</div>
        </div>

        {/* Left Sidebar (Menu) */}
        <div className="col-span-2 hidden md:block space-y-2 text-sm font-bold text-gray-700">
          <div className="border-t pt-2">Última Hora</div>
          <div className="border-t pt-2">Lo más leído</div>
          <div className="border-t pt-2">Tendencias</div>
        </div>

        {/* Center Content */}
        <div className="col-span-7 space-y-6">
          <article className="border-b pb-6">
            <h2 className="text-4xl font-serif font-bold leading-none mb-3 text-gray-900 hover:text-[#689f38] cursor-pointer">
              Avances revolucionarios en energía limpia prometen cambiar el panorama industrial
            </h2>
            <div className="flex space-x-2 text-xs text-gray-500 mb-2">
               <span className="text-[#689f38] font-bold">CIENCIA</span>
               <span>Hace 2 horas</span>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Un nuevo consorcio europeo ha presentado hoy los resultados de su investigación...
            </p>
          </article>
        </div>

        {/* Right Column (Ads - Skyscraper) */}
        <div className="col-span-3 flex flex-col items-center">
          <div className="text-[10px] text-gray-400 mb-1">PUBLICIDAD</div>
          
          {/* THE BANNER */}
          <div 
            className="cursor-pointer hover:opacity-90 transition-opacity border border-gray-100 shadow-sm"
            onClick={onBannerClick}
          >
            <img 
              src={bannerUrl} 
              alt="Anuncio" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
};