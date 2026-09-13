import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Music,
  ListMusic,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SoftButton } from './SoftButton';
import { SoftSlider } from './SoftSlider';
import { formatTime } from '../../utils/format';

export interface AudioTrack {
  id: string | number;
  title: string;
  artist: string;
  album?: string;
  duration: number; // in seconds
  src?: string;
  coverArt?: string;
}

export interface SoftAudioPlayerProps {
  tracks?: AudioTrack[];
  initialTrackIndex?: number;
  autoPlay?: boolean;
  elevation?: 'sm' | 'md' | 'lg';
  showPlaylist?: boolean;
  defaultMinimized?: boolean;
  allowMinimize?: boolean;
  className?: string;
}

const DEFAULT_TRACKS: AudioTrack[] = [
  {
    id: '1',
    title: 'Aesthetic Solitude',
    artist: 'Classic Neumorphic Beats',
    album: 'Dual Shadow Vibes',
    duration: 225, // 3:45
    coverArt:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    title: 'Specular Reflections',
    artist: 'Ambient Soundscapes',
    album: 'Twin Light Resonance',
    duration: 198, // 3:18
    coverArt:
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    title: 'Plastic Substrate Dreams',
    artist: 'Monochrome Echoes',
    album: 'Tactile Horizon',
    duration: 254, // 4:14
    coverArt:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
  },
];

export const SoftAudioPlayer: React.FC<SoftAudioPlayerProps> = ({
  tracks = DEFAULT_TRACKS,
  initialTrackIndex = 0,
  autoPlay = false,
  elevation = 'md',
  showPlaylist = true,
  defaultMinimized = false,
  allowMinimize = true,
  className = '',
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrackIndex);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(65);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(defaultMinimized);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Simulation timer if no real audio src playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= currentTrack.duration) {
          if (isRepeat) return 0;
          // Next track
          setCurrentTrackIndex((idx) => (idx + 1) % tracks.length);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack.duration, isRepeat, tracks.length]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    if (currentTime > 4) {
      setCurrentTime(0);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
      setCurrentTime(0);
    }
  };

  const handleNext = () => {
    if (isShuffle) {
      const nextIdx = Math.floor(Math.random() * tracks.length);
      setCurrentTrackIndex(nextIdx);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    }
    setCurrentTime(0);
  };

  const elevationClass =
    elevation === 'sm'
      ? 'soft-raised-sm'
      : elevation === 'lg'
        ? 'soft-raised-lg'
        : 'soft-raised-md';

  return (
    <div
      className={`
        soft-surface select-none ${elevationClass} border border-white/20 transition-all duration-300
        ${isMinimized ? 'rounded-2xl p-3.5' : 'rounded-3xl p-6'}
        ${className}
      `}
    >
      {/* Hidden native audio element if src is provided */}
      {currentTrack.src && <audio ref={audioRef} src={currentTrack.src} onEnded={handleNext} />}

      {/* ========================================================================= */}
      {/* 1. MINIMIZED SLIM CAPSULE VIEW */}
      {/* ========================================================================= */}
      {isMinimized ? (
        <div className="flex items-center justify-between gap-3 animate-in fade-in duration-200">
          {/* Mini Album Art / Vinyl Disc */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="relative w-10 h-10 rounded-full soft-pressed-xs soft-surface flex items-center justify-center shrink-0 p-0.5">
              {currentTrack.coverArt ? (
                <div
                  className={`w-full h-full rounded-full overflow-hidden relative flex items-center justify-center ${
                    isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''
                  }`}
                >
                  <img
                    src={currentTrack.coverArt}
                    alt={currentTrack.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute w-2 h-2 rounded-full bg-[var(--soft-primary)]" />
                </div>
              ) : (
                <Music className="w-4 h-4 text-[var(--soft-primary)]" />
              )}
            </div>

            {/* Title & Artist & Mini Progress */}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="text-xs font-bold text-[var(--soft-text)] truncate">
                  {currentTrack.title}
                </h4>
                <span className="text-[10px] font-mono text-[var(--soft-text-muted)] shrink-0">
                  {formatTime(currentTime)}
                </span>
              </div>
              <p className="text-[10px] text-[var(--soft-text-muted)] truncate">
                {currentTrack.artist}
              </p>
              {/* Mini scrub progress bar */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  setCurrentTime(Math.floor(pos * currentTrack.duration));
                }}
                className="relative w-full h-1 mt-1 rounded-full soft-pressed-xs bg-slate-300/60 dark:bg-slate-700/60 cursor-pointer overflow-hidden"
              >
                <div
                  className="h-full bg-[var(--soft-primary)] rounded-full transition-all duration-200"
                  style={{
                    width: `${Math.min(100, (currentTime / currentTrack.duration) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Quick Mini Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <SoftButton
              size="icon"
              variant="raised"
              onClick={handlePrev}
              title="Previous"
              className="!w-8 !h-8 !p-0"
              icon={<SkipBack className="w-3.5 h-3.5 text-[var(--soft-text)]" />}
            />

            <SoftButton
              size="icon"
              variant="accent"
              onClick={togglePlay}
              className="!w-9 !h-9 !p-0"
              title={isPlaying ? 'Pause' : 'Play'}
              icon={
                isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )
              }
            />

            <SoftButton
              size="icon"
              variant="raised"
              onClick={handleNext}
              title="Next"
              className="!w-8 !h-8 !p-0"
              icon={<SkipForward className="w-3.5 h-3.5 text-[var(--soft-text)]" />}
            />

            {/* Expand button */}
            {allowMinimize && (
              <SoftButton
                size="icon"
                variant="raised"
                onClick={() => setIsMinimized(false)}
                title="Expand player"
                className="!w-8 !h-8 !p-0 ml-1"
                icon={<ChevronDown className="w-4 h-4 text-[var(--soft-text)]" />}
              />
            )}
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. FULL EXPANDED VIEW */
        /* ========================================================================= */
        <div className="animate-in fade-in duration-200">
          {/* Top Bar / Header with Minimize & Playlist buttons */}
          <div className="flex items-center justify-between gap-2 mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-muted)] flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-[var(--soft-primary)]" />
              Soft Audio Player
            </span>
            <div className="flex items-center gap-2">
              {showPlaylist && (
                <SoftButton
                  size="sm"
                  variant={playlistOpen ? 'pressed' : 'raised'}
                  onClick={() => setPlaylistOpen(!playlistOpen)}
                  title="Toggle playlist"
                >
                  <ListMusic className="w-3.5 h-3.5" />
                </SoftButton>
              )}

              {allowMinimize && (
                <SoftButton
                  size="sm"
                  variant="raised"
                  onClick={() => setIsMinimized(true)}
                  title="Minimize player"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </SoftButton>
              )}
            </div>
          </div>

          {/* Main Track Display */}
          <div className="flex flex-col sm:flex-row items-center gap-6 my-2">
            {/* Vinyl Disc / Album Art Frame */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full soft-pressed-xs soft-surface flex items-center justify-center shrink-0 p-2">
              {currentTrack.coverArt ? (
                <div
                  className={`w-full h-full rounded-full overflow-hidden soft-raised-sm relative flex items-center justify-center ${
                    isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''
                  }`}
                >
                  <img
                    src={currentTrack.coverArt}
                    alt={currentTrack.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Spindle hole */}
                  <div className="absolute w-5 h-5 rounded-full bg-[var(--soft-surface)] soft-pressed-xs border border-white/40 shadow-inner flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[var(--soft-primary)]" />
                  </div>
                </div>
              ) : (
                <div
                  className={`w-full h-full rounded-full soft-raised-sm bg-[var(--soft-surface)] flex items-center justify-center ${
                    isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-[var(--soft-primary)]" />
                </div>
              )}
            </div>

            {/* Track Title, Artist, Timeline */}
            <div className="min-w-0 flex-1 w-full text-center sm:text-left space-y-2">
              <div>
                <h4 className="text-base sm:text-lg font-extrabold text-[var(--soft-text)] truncate">
                  {currentTrack.title}
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-[var(--soft-text-muted)] truncate">
                  {currentTrack.artist} {currentTrack.album && `• ${currentTrack.album}`}
                </p>
              </div>

              {/* Interactive Timeline Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    setCurrentTime(Math.floor(pos * currentTrack.duration));
                  }}
                  className="relative w-full h-2 rounded-full soft-pressed-xs bg-slate-300/60 dark:bg-slate-700/60 cursor-pointer overflow-hidden"
                >
                  <div
                    className="h-full bg-[var(--soft-primary)] rounded-full transition-all duration-200"
                    style={{
                      width: `${Math.min(100, (currentTime / currentTrack.duration) * 100)}%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-[var(--soft-text-muted)]">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(currentTrack.duration)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 my-6">
            {/* Shuffle */}
            <SoftButton
              size="sm"
              variant={isShuffle ? 'pressed' : 'raised'}
              onClick={() => setIsShuffle(!isShuffle)}
              title="Shuffle"
            >
              <Shuffle
                className={`w-3.5 h-3.5 ${isShuffle ? 'text-[var(--soft-primary)]' : 'text-[var(--soft-text-muted)]'}`}
              />
            </SoftButton>

            {/* Prev */}
            <SoftButton size="icon" variant="raised" onClick={handlePrev} title="Previous track">
              <SkipBack className="w-4 h-4 text-[var(--soft-text)]" />
            </SoftButton>

            {/* Play/Pause Main Button */}
            <SoftButton
              size="icon"
              variant="accent"
              onClick={togglePlay}
              className="w-14 h-14"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </SoftButton>

            {/* Next */}
            <SoftButton size="icon" variant="raised" onClick={handleNext} title="Next track">
              <SkipForward className="w-4 h-4 text-[var(--soft-text)]" />
            </SoftButton>

            {/* Repeat */}
            <SoftButton
              size="sm"
              variant={isRepeat ? 'pressed' : 'raised'}
              onClick={() => setIsRepeat(!isRepeat)}
              title="Repeat"
            >
              <Repeat
                className={`w-3.5 h-3.5 ${isRepeat ? 'text-[var(--soft-primary)]' : 'text-[var(--soft-text-muted)]'}`}
              />
            </SoftButton>
          </div>

          {/* Volume & Bottom Controls */}
          <div className="flex items-center gap-3 pt-3 border-t border-white/20">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="text-[var(--soft-text-muted)] hover:text-[var(--soft-text)] cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <div className="flex-1 max-w-xs">
              <SoftSlider
                value={isMuted ? 0 : volume}
                onChange={(val) => {
                  setVolume(val);
                  if (isMuted) setIsMuted(false);
                }}
                showValue={false}
              />
            </div>
            <span className="text-xs font-mono font-semibold text-[var(--soft-text-muted)] w-9 text-right">
              {isMuted ? '0%' : `${volume}%`}
            </span>
          </div>

          {/* Dropdown / Expandable Playlist */}
          {showPlaylist && playlistOpen && (
            <div className="mt-4 pt-4 border-t border-white/20 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-2">
                Queue ({tracks.length} tracks)
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {tracks.map((track, idx) => {
                  const isSelected = idx === currentTrackIndex;
                  return (
                    <div
                      key={track.id}
                      onClick={() => {
                        setCurrentTrackIndex(idx);
                        setCurrentTime(0);
                        setIsPlaying(true);
                      }}
                      className={`
                        flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200
                        ${
                          isSelected
                            ? 'soft-pressed-xs text-[var(--soft-primary)] font-bold'
                            : 'soft-surface soft-raised-xs hover:soft-raised-sm text-[var(--soft-text)]'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="text-xs font-mono text-[var(--soft-text-muted)] w-4 text-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs truncate">{track.title}</span>
                        <span className="text-[10px] text-[var(--soft-text-muted)] truncate">
                          • {track.artist}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[var(--soft-text-muted)] shrink-0 ml-2">
                        {formatTime(track.duration)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SoftAudioPlayer;
