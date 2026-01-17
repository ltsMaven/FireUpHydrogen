import {useState, useEffect, useRef} from 'react';
import {Volume2, VolumeX, SkipForward} from 'lucide-react';
import {Button} from '~/ui/button';

interface VideoIntroProps {
  onComplete: () => void;
}

export function VideoIntro({onComplete}: VideoIntroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Show skip button after 2 seconds
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-play video
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Auto-play prevented:', error);
      });
    }
  }, []);

  const handleVideoEnd = () => {
    onComplete();
  };

  const handleSkip = () => {
    onComplete();
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (videoRef.current) {
        videoRef.current.muted = next;
      }
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted={isMuted}
          playsInline
          onEnded={handleVideoEnd}
          poster="https://images.unsplash.com/photo-1741519735476-cfc8bf0b2ae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBkcmluayUyMGNhbnxlbnwxfHx8fHwxNzYwMjcwNzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Logo + Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <span className="text-white text-6xl">F</span>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-pulse" />
          </div>

          <div>
            <h1 className="text-6xl md:text-8xl text-white uppercase tracking-wider mb-2">
              Fire Up
            </h1>
            <p className="text-xl md:text-2xl text-orange-400 uppercase tracking-widest">
              Ignite Your Energy
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
        <div className="container mx-auto flex items-center justify-between">
          {/* Mute Button */}
          <Button
            onClick={toggleMute}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 bg-black/30 backdrop-blur-sm"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </Button>

          {/* Skip Button */}
          {showSkip && (
            <Button
              onClick={handleSkip}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 group"
              size="lg"
            >
              Skip Intro
              <SkipForward className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>
      </div>

      {/* Loading dots – simplified */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full" />
          <div className="w-2 h-2 bg-orange-500 rounded-full" />
          <div className="w-2 h-2 bg-orange-500 rounded-full" />
        </div>
      </div>
    </div>
  );
}