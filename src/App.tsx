import clsx from "clsx";
import {
  AlertCircle,
  CheckCircle2,
  MousePointerClick,
  Play,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useEffect, useState } from "react";
import logo from "./assets/logoHeader.svg";
import { RealPortal } from "./mock-templates";
import { getCampaigns, getProjects, trackClick } from "./services/api";
import type { Campaign, PortalType, Project } from "./types";

const PORTAL_URLS: Record<PortalType, string> = {
  elpais: "https://elpais.com",
  elmundo: "https://www.elmundo.es",
  nytimes: "https://www.nytimes.com",
  cnn: "https://edition.cnn.com"
};

const COUNTRIES = ["USA", "POR", "GBR", "BRA", "ITA", "ESP", "CAN"];

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
  const [selectedPortal, setSelectedPortal] = useState<PortalType>("elpais");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clickStatus, setClickStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  // Auto-click configuration
  const [autoClickInterval, setAutoClickInterval] = useState<number>(5);
  const [minBatchSize, setMinBatchSize] = useState<number>(1);
  const [maxBatchSize, setMaxBatchSize] = useState<number>(5);
  const [isAutoClicking, setIsAutoClicking] = useState(false);
  const [totalSimulatedClicks, setTotalSimulatedClicks] = useState(0);
  const [lastSimulatedCountry, setLastSimulatedCountry] = useState<string>("");

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectsData, campaignsData] = await Promise.all([
          getProjects(),
          getCampaigns()
        ]);
        setProjects(projectsData);
        setCampaigns(campaignsData);
      } catch (err) {
        console.error(err);
        setError(
          `Error connecting to Zafir Backend. Ensure it is running on port ${import.meta.env.VITE_API_URL?.split(":").pop() || "9000"}.`
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter campaigns by selected project
  const availableCampaigns = campaigns.filter(
    (c) => c.projectId === selectedProjectId
  );

  // Get current campaign details
  const currentCampaign = campaigns.find((c) => c._id === selectedCampaignId);
  // Get first image (or placeholder)
  const bannerUrl =
    currentCampaign?.images?.[0]?.secure_url ||
    "https://via.placeholder.com/300x250?text=No+Image";

  const handleBannerClick = async (
    countryCode?: string,
    overrideCount?: number
  ) => {
    if (!selectedCampaignId) return;

    try {
      // Manual click = 1, Auto-click = random (passed via overrideCount)
      const numClicks = overrideCount || 1;

      const country =
        typeof countryCode === "string"
          ? countryCode
          : COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];

      for (let i = 0; i < numClicks; i++) {
        await trackClick(selectedCampaignId, country);
      }

      setLastSimulatedCountry(
        numClicks > 1 ? `${country} (x${numClicks})` : country
      );
      setTotalSimulatedClicks((prev) => prev + numClicks);
      setClickStatus("success");
      setTimeout(() => setClickStatus("idle"), 2000);
    } catch (err) {
      console.error(err);
      setClickStatus("error");
      setTimeout(() => setClickStatus("idle"), 3000);
    }
  };

  // Auto-click logic
  useEffect(
    () => {
      let timer: ReturnType<typeof setTimeout>;
      if (isAutoClicking) {
        timer = setTimeout(async () => {
          const randomBatch =
            Math.floor(Math.random() * (maxBatchSize - minBatchSize + 1)) +
            minBatchSize;
          await handleBannerClick(undefined, randomBatch);
        }, autoClickInterval * 1000);
      }
      return () => clearTimeout(timer);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      isAutoClicking,
      totalSimulatedClicks,
      autoClickInterval,
      minBatchSize,
      maxBatchSize
    ]
  );

  const startAutoClick = () => {
    if (!selectedCampaignId) return;
    setIsAutoClicking(true);
  };

  const stopAutoClick = () => {
    setIsAutoClicking(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Connection Error
          </h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans text-gray-900 overflow-hidden">
      {/* Single toggle button for sidebar (always visible) */}

      <aside
        className={clsx(
          "fixed left-0 top-0 bottom-0 w-full md:w-64  bg-gray-900 text-white p-6 flex flex-col shadow-2xl z-[110] transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Collapse toggle placed inside sidebar to move with it (prevents flash) */}
        {isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Collapse sidebar"
            className="absolute right-2 top-1 z-[120] flex items-center justify-center w-10 h-10 rounded-md bg-transparent hover:bg-gray-800 text-gray-200 shadow"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        <div className="mb-8 flex items-center space-x-3 mt-4">
          <img src={logo} alt="Zafir Logo" className="h-8" />
          <h1 className="text-xl font-bold tracking-tight">
            Traffic Simulator
          </h1>
        </div>

        <div className="space-y-6 flex-1">
          {/* Project Selector */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-gray-400 font-bold flex items-center gap-2">
              <Settings size={14} /> Project
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => {
                setSelectedProjectId(e.target.value);
                setSelectedCampaignId(""); // Reset campaign
              }}
              className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
            >
              <option value="">Select a Project...</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Campaign Selector */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-gray-400 font-bold flex items-center gap-2">
              <Play size={14} /> Campaign
            </label>
            <select
              value={selectedCampaignId}
              onChange={(e) => setSelectedCampaignId(e.target.value)}
              disabled={!selectedProjectId}
              className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-50"
            >
              <option value="">Select a Campaign...</option>
              {availableCampaigns
                .sort((a, b) => a._id.localeCompare(b._id))
                .map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.title}
                  </option>
                ))}
            </select>
          </div>

          {/* Portal Selector */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                Target Portal (Live View)
              </label>
              <div className="grid grid-cols-1 gap-2">
                {(["elpais", "elmundo", "nytimes", "cnn"] as PortalType[]).map(
                  (portal) => (
                    <button
                      key={portal}
                      onClick={() => setSelectedPortal(portal)}
                      className={clsx(
                        "p-3 rounded text-sm font-medium transition text-left border",
                        selectedPortal === portal
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                      )}
                    >
                      <span>
                        {portal === "elpais" && "El País"}
                        {portal === "elmundo" && "El Mundo"}
                        {portal === "nytimes" && "The New York Times"}
                        {portal === "cnn" && "CNN"}
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Auto-Click Panel */}
          <div className="bg-gray-800 rounded-lg p-4 space-y-2 border border-gray-700">
            <h3 className="text-xs font-bold uppercase text-blue-400 tracking-wider flex items-center gap-2">
              <MousePointerClick size={14} /> Auto-Clicker
            </h3>

            <div className="space-y-1">
              <label className="text-[10px] text-gray-400 uppercase">
                Interval (seconds)
              </label>
              <input
                type="number"
                min="1"
                value={autoClickInterval}
                onChange={(e) => setAutoClickInterval(Number(e.target.value))}
                className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] text-gray-400 uppercase font-bold">
                  Batch Range
                </label>
                <span className="text-[10px] text-blue-400 font-mono">
                  {minBatchSize}-{maxBatchSize} clicks
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-gray-500 w-6">Min</span>
                  <input
                    type="range"
                    min="1"
                    max={maxBatchSize}
                    value={minBatchSize}
                    onChange={(e) => setMinBatchSize(Number(e.target.value))}
                    className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-gray-500 w-6">Max</span>
                  <input
                    type="range"
                    min={minBatchSize}
                    max="10"
                    value={maxBatchSize}
                    onChange={(e) => setMaxBatchSize(Number(e.target.value))}
                    className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-400"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={isAutoClicking ? stopAutoClick : startAutoClick}
              disabled={!selectedCampaignId}
              className={clsx(
                "w-full py-2 rounded text-xs font-bold transition-colors uppercase tracking-widest",
                isAutoClicking
                  ? "bg-red-600/90 text-white hover:bg-red-700 animate-[pulse_4s_infinite]"
                  : "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500"
              )}
            >
              {isAutoClicking ? "Stop Auto-Clicking" : "Start Infinite Loop"}
            </button>

            {totalSimulatedClicks > 0 && (
              <div className="mt-2 p-2 bg-gray-900/50 rounded border border-gray-700/50 flex flex-col items-center text-center">
                <span className="text-[10px] text-gray-500 uppercase font-bold">
                  Session Stats
                </span>
                <div className="text-lg font-mono text-blue-400 font-bold leading-tight">
                  {totalSimulatedClicks}
                </div>
                <div className="text-[9px] text-gray-400 flex items-center gap-1">
                  Last:{" "}
                  <span className="text-blue-300 font-bold">
                    {lastSimulatedCountry}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Area */}
        <div className="mt-auto pt-2 border-t border-gray-800">
          <div
            className={clsx(
              "p-4 rounded flex items-center gap-3",
              clickStatus === "idle" && "bg-gray-800/50 text-gray-400",
              clickStatus === "success" &&
                "bg-green-950/40 text-green-400 border border-green-800/30",
              clickStatus === "error" &&
                "bg-red-950/40 text-red-400 border border-red-800/30"
            )}
          >
            {clickStatus === "idle" && (
              <MousePointerClick size={18} className="opacity-50" />
            )}
            {clickStatus === "success" && <CheckCircle2 size={18} />}
            {clickStatus === "error" && <AlertCircle size={18} />}

            <div className="text-[10px] font-normal">
              {clickStatus === "idle" && "Ready to simulate clicks"}
              {clickStatus === "success" && "Click tracked successfully!"}
              {clickStatus === "error" && "Failed to track click"}
            </div>
          </div>
        </div>
      </aside>

      {/* Fixed toggle when sidebar is closed (avoids floating button before sidebar arrives) */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open sidebar"
          className="fixed left-0 top-1/2 -translate-y-1/2 z-[120] flex items-center justify-center w-8 h-10 rounded-r-md bg-blue-600 text-white shadow"
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Main Preview Area */}
      <main className="flex-1 bg-gray-200 overflow-hidden h-screen relative">
        {selectedCampaignId ? (
          <RealPortal
            bannerUrl={bannerUrl}
            images={currentCampaign?.images}
            rotationInterval={5}
            onBannerClick={handleBannerClick}
            externalUrl={PORTAL_URLS[selectedPortal]}
            campaignName={currentCampaign?.title}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
              <Play size={48} className="text-gray-400 ml-2" />
            </div>
            <p className="text-xl font-medium">
              Select a Project and Campaign to start
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
