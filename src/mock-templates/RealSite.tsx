import type { PortalTemplateProps } from "../types";

export const RealSite = ({
  bannerUrl,
  onBannerClick,
  externalUrl
}: PortalTemplateProps) => {
  if (!externalUrl) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500 italic">
        Introduce una URL para previsualizar...
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-white">
      {/* Real site in iframe */}
      <iframe
        src={externalUrl}
        className="w-full h-full border-none"
        title="Real Site Preview"
        sandbox="allow-same-origin allow-scripts allow-popups"
      />

      {/* Embedded Banner Overlay */}
      <div
        className="absolute top-20 right-8 z-50 cursor-pointer shadow-2xl transition-transform hover:scale-105"
        onClick={onBannerClick}
      >
        <div className="bg-white/90 backdrop-blur-sm p-1 rounded-sm shadow-sm mb-1 text-[10px] text-gray-500 font-bold uppercase tracking-tighter text-center">
          Publicidad Zafir
        </div>
        <img
          src={bannerUrl}
          alt="Zafir Ad"
          className="max-w-[300px] border border-gray-200"
        />
      </div>

      {/* Warning if blocked */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
        <div className="bg-yellow-50 text-yellow-800 text-[10px] p-2 rounded border border-yellow-200 shadow-sm opacity-80 max-w-xs">
          Nota: Algunos sitios bloquean ser mostrados en iframes por seguridad.
        </div>
      </div>
    </div>
  );
};
