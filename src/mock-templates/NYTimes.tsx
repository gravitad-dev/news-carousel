import type { PortalTemplateProps } from '../types';

export const NYTimes = ({ bannerUrl, onBannerClick }: PortalTemplateProps) => {
  return (
    <div className="w-full bg-[#f7f7f5] min-h-screen font-serif text-gray-900">
      <div className="bg-white shadow-sm pb-1">
        {/* Header */}
        <header className="container mx-auto px-4 pt-4 pb-2 border-b border-gray-300 bg-white">
            <div className="flex justify-between items-center text-xs font-sans font-bold text-gray-700 mb-2">
            <div className="flex space-x-4">
                <span>U.S.</span>
                <span>International</span>
                <span>Canada</span>
                <span>Español</span>
            </div>
            <div>SUBSCRIBE FOR $1/WEEK</div>
            </div>
            <div className="text-center">
            <h1 className="text-6xl font-black font-serif tracking-tight mb-2" style={{ fontFamily: '"Chomsky", serif' }}>The New York Times</h1>
            <div className="flex justify-between items-center border-t border-b border-gray-800 py-1 text-xs font-sans text-gray-600">
                <span>Saturday, February 14, 2026</span>
                <span>Today's Paper</span>
                <span>Weather: 72°F</span>
            </div>
            </div>
            <nav className="flex justify-center space-x-6 py-3 text-sm font-bold font-sans">
            <span>World</span>
            <span>U.S.</span>
            <span>Politics</span>
            <span>N.Y.</span>
            <span>Business</span>
            <span>Opinion</span>
            <span>Tech</span>
            <span>Science</span>
            <span>Health</span>
            </nav>
        </header>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 grid grid-cols-12 gap-8 bg-white mt-4 shadow-sm min-h-[800px]">
        
        {/* Lead Story */}
        <div className="col-span-8 pr-8 border-r border-gray-200">
            <article className="mb-8">
                <h2 className="text-3xl font-bold italic mb-2">Tech Giants Agree on New Data Standards</h2>
                <div className="h-64 bg-gray-200 mb-4"></div>
                <div className="columns-2 gap-6 text-gray-800 text-justify text-base leading-relaxed">
                    <p className="mb-4">In a landmark decision, major technology companies have agreed to a unified standard for data privacy, signaling a shift in how digital information is handled globally.</p>
                    <p>The agreement comes after months of negotiation and is expected to impact millions of users worldwide.</p>
                </div>
            </article>
        </div>

        {/* Sidebar / Ads */}
        <div className="col-span-4 pl-4">
            <div className="border-t-2 border-black pt-1 mb-4">
                <h3 className="font-sans font-bold text-xs uppercase">Advertisement</h3>
            </div>

            {/* THE BANNER */}
            <div 
                className="w-full flex justify-center mb-8 cursor-pointer group"
                onClick={onBannerClick}
            >
                <div className="relative">
                    <img 
                        src={bannerUrl} 
                        alt="Sponsored" 
                        className="max-w-full h-auto shadow-sm group-hover:shadow-md transition-shadow"
                    />
                    <div className="absolute top-0 right-0 bg-white/80 text-[10px] px-1 font-sans text-gray-500">Sponsored</div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="border-t border-gray-200 pt-2">
                    <h4 className="font-bold text-sm mb-1">Opinion</h4>
                    <p className="text-sm text-gray-600">Why simulation is the future of testing.</p>
                </div>
                <div className="border-t border-gray-200 pt-2">
                    <h4 className="font-bold text-sm mb-1">Editors' Picks</h4>
                    <p className="text-sm text-gray-600">The best tools for modern developers.</p>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};