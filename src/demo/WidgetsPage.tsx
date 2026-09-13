import React, { useState } from 'react';
import { SoftCard, SoftButton, SoftSlider, SoftWeatherWidget } from '../components/soft-ui';
import { Play, Pause, SkipForward, SkipBack, Volume2, Sparkles, Cpu } from 'lucide-react';
import { CopyButton } from './CopyButton';

export const WidgetsPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
      {/* Intro Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full soft-pressed-xs mb-3 text-xs font-bold text-[var(--soft-primary)] uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" /> High-Level Compositions
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--soft-text)]">Widgets</h2>
        <p className="mt-2 text-sm text-[var(--soft-text-muted)]">
          Composite interactive modules created by assembling primitive Soft UI components (cards,
          buttons, sliders, avatars, and progress controls) into rich functional experiences.
        </p>
      </div>

      <div className="space-y-16">
        {/* 1. WEATHER WIDGET */}
        <section id="weather" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Weather Widget (`SoftWeatherWidget`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Composed of SoftCard, weather icons, live temperature typography, forecast metrics,
                and status chips
              </p>
            </div>
            <CopyButton
              code={`<SoftWeatherWidget\n  temperature={24}\n  condition="Partly Sunny"\n  location="San Francisco, CA"\n  humidity={62}\n  windSpeed="12 km/h"\n/>`}
            />
          </div>

          <SoftCard elevation="md" rounded="3xl" title="WEATHER WIDGET">
            <SoftWeatherWidget
              temperature={24}
              condition="Partly Sunny"
              location="San Francisco, CA"
              humidity={62}
              windSpeed="12 km/h"
            />
          </SoftCard>
        </section>

        {/* 2. SOFT AUDIO PLAYER WIDGET */}
        <section id="audio-player" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">Soft Audio Player</h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Composed of SoftCard, vinyl disc animation, SoftButton playback controls, timeline
                track progress, and SoftSlider volume
              </p>
            </div>
            <CopyButton
              code={`// Composed from SoftCard, SoftButton, SoftSlider, and SoftProgressBar`}
            />
          </div>

          <div className="max-w-md mx-auto">
            <SoftCard elevation="md" rounded="3xl" className="flex flex-col justify-between p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-muted)] block mb-4 text-center">
                TACTILE MEDIA PLAYER
              </span>

              <div className="flex items-center gap-5 my-2">
                <div className="relative w-20 h-20 rounded-full soft-pressed-xs soft-surface flex items-center justify-center shrink-0">
                  <div
                    className={`w-14 h-14 rounded-full soft-raised-sm bg-[var(--soft-surface)] flex items-center justify-center ${
                      isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-[var(--soft-primary)]" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-bold text-[var(--soft-text)] truncate">
                    Aesthetic Solitude
                  </h4>
                  <p className="text-xs text-[var(--soft-text-muted)] truncate">
                    Classic Neumorphic Beats
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-[var(--soft-primary)] font-semibold">
                    <span>02:18</span>
                    <div className="flex-1 h-1.5 rounded-full soft-pressed-xs bg-slate-300 overflow-hidden">
                      <div className="h-full bg-[var(--soft-primary)] w-3/5" />
                    </div>
                    <span>03:45</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-5 my-5">
                <SoftButton size="icon" variant="raised">
                  <SkipBack className="w-4 h-4 text-[var(--soft-text)]" />
                </SoftButton>
                <SoftButton
                  size="icon"
                  variant="accent"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  )}
                </SoftButton>
                <SoftButton size="icon" variant="raised">
                  <SkipForward className="w-4 h-4 text-[var(--soft-text)]" />
                </SoftButton>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-white/20">
                <Volume2 className="w-4 h-4 text-[var(--soft-text-muted)] shrink-0" />
                <SoftSlider value={volume} onChange={setVolume} showValue={false} />
                <span className="text-xs font-semibold text-[var(--soft-text-muted)] w-8 text-right">
                  {volume}%
                </span>
              </div>
            </SoftCard>
          </div>
        </section>

        {/* 3. STICKY RIGHT TOOLBAR WIDGET */}
        <section id="toolbar" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Sticky Right Toolbar (`SoftStickyToolbar`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Composed of floating container pill, button triggers, flyout popover cards, progress
                rings, and quick actions
              </p>
            </div>
            <CopyButton code={`<SoftStickyToolbar items={[...]} defaultPinned={false} />`} />
          </div>

          <SoftCard elevation="md" rounded="3xl" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl soft-surface soft-pressed-xs">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[var(--soft-primary)] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Active Global Widget
                </span>
                <p className="text-sm font-semibold text-[var(--soft-text)]">
                  The Sticky Toolbar is live on the right edge of your browser window right now!
                </p>
                <p className="text-xs text-[var(--soft-text-muted)]">
                  Move your mouse to the right edge of the screen to reveal the dock. Hover over any
                  gauge to see its detailed session usage flyout card.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-[var(--soft-text-subtle)] uppercase">
                  Features:
                </span>
                <span className="px-2.5 py-1 rounded-xl soft-surface soft-raised-xs text-xs font-semibold text-[var(--soft-text)]">
                  Auto-scrolls
                </span>
                <span className="px-2.5 py-1 rounded-xl soft-surface soft-raised-xs text-xs font-semibold text-[var(--soft-text)]">
                  Auto-minimizes
                </span>
                <span className="px-2.5 py-1 rounded-xl soft-surface soft-raised-xs text-xs font-semibold text-[var(--soft-text)]">
                  Hover flyout
                </span>
              </div>
            </div>
          </SoftCard>
        </section>
      </div>
    </div>
  );
};

export default WidgetsPage;
