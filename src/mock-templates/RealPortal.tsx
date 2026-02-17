import { useEffect, useState } from "react";
import type { PortalTemplateProps } from "../types";

export const RealPortal = ({
  bannerUrl,
  onBannerClick,
  externalUrl,
  campaignName,
  images,
  rotationInterval = 5
}: PortalTemplateProps) => {
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPage = async () => {
      if (!externalUrl) return;
      try {
        setLoading(true);
        setHtml(""); // Limpiamos el contenido previo para evitar el "flicker"
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:9000";
        const response = await fetch(
          `${baseUrl}/proxy?url=${encodeURIComponent(externalUrl)}`
        );
        if (!response.ok) {
          throw new Error(
            `Proxy request failed with status ${response.status}`
          );
        }
        const data = await response.text();
        setHtml(data);

        if (
          externalUrl.includes("nytimes.com") ||
          externalUrl.includes("cnn.com")
        ) {
          await new Promise((resolve) => setTimeout(resolve, 800));
        }
      } catch (err) {
        console.error("Error fetching proxied page:", err);
        setHtml(
          "<p style='padding:16px;font-family:sans-serif'>Error loading page through proxy. Intenta nuevamente.</p>"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [externalUrl]);

  // Rotation effect: advance currentIndex every `rotationInterval` seconds
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((idx) => (idx + 1) % images.length);
    }, rotationInterval * 1000);
    return () => clearInterval(interval);
  }, [images, rotationInterval]);

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Top Banner (Incrustado pero NO sticky para no romper cabeceras reales) */}
      <div
        className="w-full bg-white border-b border-gray-200 p-3 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors z-50 shrink-0"
        onClick={() => onBannerClick()}
      >
        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
          Simulador Zafir Analytics - {campaignName || "Campaña Demo"}
        </div>
        <img
          src={
            images && images.length > 0
              ? images[currentIndex]?.secure_url || bannerUrl
              : bannerUrl
          }
          alt="Top Banner"
          className="w-full h-[100px] max-w-[800px] object-fill"
        />
      </div>

      <div className="flex-1 relative bg-white">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              <span className="text-sm font-medium text-gray-600">
                Cargando sitio real...
              </span>
            </div>
          </div>
        )}
        <div className="h-full w-full">
          <iframe
            srcDoc={html}
            className="w-full h-full border-none shadow-inner"
            title="Real Portal"
            scrolling="yes"
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      </div>
    </div>
  );
};
