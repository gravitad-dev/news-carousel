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
  const [isIframeReady, setIsIframeReady] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Resetear estado de iframe al cambiar de portal
  useEffect(() => {
    setIsIframeReady(false);
  }, [externalUrl]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchPage = async () => {
      if (!externalUrl) return;
      const t0 = Date.now();
      try {
        setLoading(true);
        setIsIframeReady(false);
        setHtml(""); // Limpiamos el contenido previo para evitar el "flicker"
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:9000";
        const response = await fetch(
          `${baseUrl}/proxy?url=${encodeURIComponent(externalUrl)}`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error(
            `Proxy request failed with status ${response.status}`
          );
        }
        const data = await response.text();
        if (controller.signal.aborted) return;
        setHtml(data);

        // Asegurar que el loading se vea al menos un mínimo (el cache de El País vuelve instantáneo)
        const elapsed = Date.now() - t0;
        const minLoading = 700;
        const extra =
          externalUrl.includes("bbc.com") || externalUrl.includes("cnn.com")
            ? 800
            : 0;
        const wait = Math.max(minLoading - elapsed, 0) + extra;
        if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
        // No quitamos el loading acá: lo quita el onLoad del iframe cuando realmente pintó.
        // Fallback por si el iframe nunca dispara onLoad (CNN a veces no dispara)
        setTimeout(() => {
          if (!controller.signal.aborted) {
            setIsIframeReady(true);
            setLoading(false);
          }
        }, 4000);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        console.error("Error fetching proxied page:", err);
        if (!controller.signal.aborted) {
          setHtml(
            "<p style='padding:16px;font-family:sans-serif'>Error loading page through proxy. Intenta nuevamente.</p>"
          );
        }
        // también respetar mínimo en error
        const elapsed = Date.now() - t0;
        if (elapsed < 700)
          await new Promise((r) => setTimeout(r, 700 - elapsed));
        if (!controller.signal.aborted) {
          setIsIframeReady(true);
          setLoading(false);
        }
      }
    };
    fetchPage();
    return () => controller.abort();
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
    <div className="flex flex-col h-full bg-white relative overflow-hidden overflow-x-hidden max-w-full">
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

      <div className="flex-1 relative bg-white overflow-hidden overflow-x-hidden">
        {(loading || (html && !isIframeReady)) && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              <span className="text-sm font-medium text-gray-600">
                Cargando sitio real...
              </span>
            </div>
          </div>
        )}
        <div className="h-full w-full overflow-hidden overflow-x-hidden">
          {html ? (
            <iframe
              key={externalUrl}
              srcDoc={html}
              onLoad={() => {
                setIsIframeReady(true);
                setLoading(false);
              }}
              className="w-full h-full border-none shadow-inner block max-w-full"
              title="Real Portal"
              scrolling="yes"
              sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
              style={{ maxWidth: "100%" }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
