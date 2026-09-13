import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  Sparkles,
  Video,
} from 'lucide-react';
import { formatTime } from '../../utils/format';

export interface SoftVideoPlayerProps {
  src?: string;
  poster?: string;
  title?: string;
  subtitle?: string;
  aspectRatio?: '16:9' | '4:3' | '21:9';
  autoPlay?: boolean;
  loop?: boolean;
  elevation?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SoftVideoPlayer: React.FC<SoftVideoPlayerProps> = ({
  src,
  poster = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  title = 'Neumorphic Surface Simulation',
  subtitle = 'Dual Light Angles at 135° Inclination',
  aspectRatio = '16:9',
  autoPlay = false,
  loop = false,
  elevation = 'md',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(14);
  const [duration, setDuration] = useState(96); // 1:36 simulated
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hideControlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-hide controls overlay on inactivity during playback
  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    if (isPlaying) {
      hideControlsTimer.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    return () => {
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    };
  }, []);

  // Simulated playback time advancement if no real video media
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          if (loop) return 0;
          setIsPlaying(false);
          return duration;
        }
        return prev + 1;
      });
    }, 1000 / playbackSpeed);
    return () => clearInterval(timer);
  }, [isPlaying, duration, loop, playbackSpeed]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds: number) => {
    setCurrentTime((t) => Math.max(0, Math.min(duration, t + seconds)));
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case '16:9':
        return 'aspect-video';
      case '4:3':
        return 'aspect-[4/3]';
      case '21:9':
        return 'aspect-[21/9]';
      default:
        return 'aspect-video';
    }
  };

  const elevationClass =
    elevation === 'sm'
      ? 'soft-raised-sm'
      : elevation === 'lg'
        ? 'soft-raised-lg'
        : 'soft-raised-md';

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`
        soft-surface rounded-3xl p-4 sm:p-5 select-none ${elevationClass} border border-white/20 transition-all duration-300
        ${isFullscreen ? 'fixed inset-0 z-50 !rounded-none !p-0 flex flex-col justify-center bg-black' : ''}
        ${className}
      `}
    >
      {/* 1. TOP HEADER (Shown in normal mode) */}
      {!isFullscreen && (
        <div className="flex items-center justify-between gap-2 mb-3 px-1">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-primary)] flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5" />
              Video Player
            </span>
            <span className="text-xs text-[var(--soft-text)] font-semibold truncate hidden sm:inline">
              • {title}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[var(--soft-text-muted)] font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}

      {/* 2. VIDEO STAGE (Sunken Well with Ambient Surface Lighting) */}
      <div
        className={`
          relative w-full ${getAspectClass()} overflow-hidden rounded-2xl soft-pressed-xs bg-black flex items-center justify-center group cursor-pointer
        `}
        onClick={togglePlay}
      >
        {src ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            loop={loop}
            onTimeUpdate={() => {
              if (videoRef.current) {
                setCurrentTime(Math.floor(videoRef.current.currentTime));
                setDuration(Math.floor(videoRef.current.duration) || 96);
              }
            }}
            className="w-full h-full object-cover"
          />
        ) : (
          /* High-Fidelity Neumorphic Simulation Stage */
          <div className="relative w-full h-full">
            <img
              src={poster}
              alt={title}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isPlaying ? 'scale-105 filter brightness-95' : 'filter brightness-80'
              }`}
            />
            {/* Ambient Lighting Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Video Watermark / Title */}
            <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
              <div className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[var(--soft-primary)]" />
                4K HDR • 60 FPS
              </div>
            </div>
          </div>
        )}

        {/* Center Giant Play Button (visible when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full soft-surface soft-raised-lg border border-white/40 flex items-center justify-center text-[var(--soft-primary)] shadow-2xl transition-transform duration-200 group-hover:scale-110">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
          </div>
        )}

        {/* Floating Controls Overlay */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            absolute inset-x-0 bottom-0 p-3 sm:p-5 transition-opacity duration-300 pointer-events-auto bg-gradient-to-t from-black/90 via-black/50 to-transparent
            ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {/* Progress Timeline Track */}
          <div className="space-y-1 mb-3">
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                const newTime = Math.floor(pos * duration);
                setCurrentTime(newTime);
                if (videoRef.current) videoRef.current.currentTime = newTime;
              }}
              className="relative w-full h-2 rounded-full bg-white/20 backdrop-blur-sm cursor-pointer overflow-hidden group/track"
            >
              <div
                className="h-full bg-[var(--soft-primary)] rounded-full transition-all duration-150 relative shadow-[0_0_8px_var(--soft-primary)]"
                style={{ width: `${Math.min(100, (currentTime / duration) * 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-white/80">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons Strip */}
          <div className="flex items-center justify-between gap-2">
            {/* Left Controls: Play, Skip, Volume */}
            <div className="flex items-center gap-2 sm:gap-3 text-white">
              <button
                type="button"
                onClick={togglePlay}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white cursor-pointer transition-colors"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSkip(-10)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white cursor-pointer transition-colors"
                title="Rewind 10 seconds"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleSkip(10)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white cursor-pointer transition-colors"
                title="Forward 10 seconds"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Volume Slider in Video Bar */}
              <div className="hidden sm:flex items-center gap-2 ml-1">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 text-white/80 hover:text-white cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <div className="w-20">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setVolume(val);
                      if (isMuted) setIsMuted(false);
                      if (videoRef.current) videoRef.current.volume = val / 100;
                    }}
                    className="w-full accent-[var(--soft-primary)] h-1 rounded-full cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Right Controls: Speed, Settings, Fullscreen */}
            <div className="flex items-center gap-2 text-white relative">
              {/* Playback Speed Menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSpeedMenuOpen(!speedMenuOpen)}
                  className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-bold cursor-pointer"
                  title="Playback Speed"
                >
                  {playbackSpeed}x
                </button>
                {speedMenuOpen && (
                  <div className="absolute right-0 bottom-full mb-2 p-1.5 rounded-xl bg-black/90 border border-white/20 backdrop-blur-md shadow-2xl flex flex-col gap-1 min-w-[70px] z-20">
                    {[0.5, 1, 1.25, 1.5, 2].map((spd) => (
                      <button
                        key={spd}
                        type="button"
                        onClick={() => {
                          setPlaybackSpeed(spd);
                          if (videoRef.current) videoRef.current.playbackRate = spd;
                          setSpeedMenuOpen(false);
                        }}
                        className={`px-2 py-1 rounded-lg text-xs font-mono text-left cursor-pointer ${
                          playbackSpeed === spd
                            ? 'bg-[var(--soft-primary)] text-white font-bold'
                            : 'text-white/80 hover:bg-white/10'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white cursor-pointer transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SUBTITLE FOOTER (shown in normal mode) */}
      {!isFullscreen && subtitle && (
        <div className="mt-3 px-1 flex items-center justify-between text-xs text-[var(--soft-text-muted)]">
          <span>{subtitle}</span>
          <span className="text-[10px] font-semibold text-[var(--soft-primary)]">
            H.265 / HEVC Ready
          </span>
        </div>
      )}
    </div>
  );
};

export default SoftVideoPlayer;
