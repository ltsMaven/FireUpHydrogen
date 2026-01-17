import {useState} from 'react';
import {X, Flame} from 'lucide-react';

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div
      className={`
        fixed top-[73px] left-0 right-0 z-40
        bg-gradient-to-r from-orange-600 via-red-600 to-orange-600
        overflow-hidden
        transition-all duration-300
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
      `}
    >
      {/* Animated background (CSS only) */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_3s_linear_infinite]" />

      <div className="container mx-auto px-4 py-3 relative">
        <div className="flex items-center gap-3 text-white">
          <Flame className="w-5 h-5 animate-pulse" />

          <p className="text-sm md:text-base">
            <span className="hidden md:inline">🚀 </span>
            <strong>NEW FLAVOR ALERT!</strong>
            <span className="mx-2">•</span>
            <span className="hidden sm:inline">
              Tropical Thunder launching December 2025
            </span>
            <span className="sm:hidden">Coming Dec 2025</span>
            <span className="mx-2">•</span>
          </p>

          <button
            onClick={() => setIsVisible(false)}
            className="ml-auto p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}