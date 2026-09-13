import React, { useState } from 'react';
import { SoftStickyToolbar } from './components/soft-ui';
import { LeftNavbar } from './components/LeftNavbar';
import { ComponentCatalog } from './demo/ComponentCatalog';
import { WidgetsPage } from './demo/WidgetsPage';
import { Sparkles, Sun } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'components' | 'widgets' | 'tokens'>('components');

  return (
    <div className="min-h-screen soft-bg text-[var(--soft-text)] transition-colors duration-300 relative">
      {/* Sticky Right Toolbar (auto-scrolls, auto-minimizes, opens on hover) */}
      <SoftStickyToolbar />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--soft-bg)]/85 border-b border-white/20 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl soft-surface soft-raised-sm flex items-center justify-center text-[var(--soft-primary)]">
              <Sun className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-[var(--soft-text)] m-0 leading-tight">
                Classic Soft UI
              </h1>
              <p className="text-xs font-semibold text-[var(--soft-text-muted)] m-0">
                Neumorphic React Component System
              </p>
            </div>
          </div>

          {/* Right indicator badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl soft-surface soft-pressed-xs text-xs font-medium text-[var(--soft-text-muted)]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--soft-primary)]" />
            <span>
              {activeTab === 'components' && 'Components'}
              {activeTab === 'widgets' && 'Widgets'}
              {activeTab === 'tokens' && 'Physics & Tokens'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Container with Sticky Left Navbar */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Navbar with Components, Widgets, Physics & Tokens, Surface Tone, Elevation */}
          <LeftNavbar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 w-full">
            {/* View 1: Component Catalog (Default) */}
            {activeTab === 'components' && (
              <div className="animate-in fade-in duration-300">
                <ComponentCatalog />
              </div>
            )}

            {/* View 2: Widgets Page */}
            {activeTab === 'widgets' && (
              <div className="animate-in fade-in duration-300">
                <WidgetsPage />
              </div>
            )}

            {/* View 3: Shadow Physics & Token Reference */}
            {activeTab === 'tokens' && (
              <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
                <div className="text-center">
                  <h2 className="text-3xl font-extrabold text-[var(--soft-text)]">
                    Soft UI Shadow Physics & Formula
                  </h2>
                  <p className="mt-2 text-sm text-[var(--soft-text-muted)]">
                    The essence of Classic Soft (Neumorphism) relies on light modeling: a virtual
                    light source at the top-left (-135°) casts twin shadows — bright specular
                    reflection at top-left and diffuse absorption shadow at bottom-right.
                  </p>
                </div>

                {/* Formula Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl soft-surface soft-raised-md space-y-3">
                    <span className="text-xs font-bold text-[var(--soft-primary)] tracking-widest uppercase">
                      Raised Surface Formula
                    </span>
                    <h3 className="text-lg font-bold text-[var(--soft-text)]">
                      Extruded Dual Shadow
                    </h3>
                    <pre className="p-4 rounded-xl soft-surface soft-pressed-xs text-xs font-mono text-[var(--soft-text-muted)] overflow-x-auto">
                      {`box-shadow: 
  7px 7px 14px rgba(163, 177, 198, 0.6),   /* bottom-right dark */
  -7px -7px 14px rgba(255, 255, 255, 0.9); /* top-left highlight */`}
                    </pre>
                    <p className="text-xs text-[var(--soft-text-muted)]">
                      Creates the optical illusion of the shape extruding out from the canvas
                      background.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl soft-surface soft-raised-md space-y-3">
                    <span className="text-xs font-bold text-[var(--soft-primary)] tracking-widest uppercase">
                      Pressed / Inset Formula
                    </span>
                    <h3 className="text-lg font-bold text-[var(--soft-text)]">
                      Debossed Sunken Shadow
                    </h3>
                    <pre className="p-4 rounded-xl soft-surface soft-pressed-xs text-xs font-mono text-[var(--soft-text-muted)] overflow-x-auto">
                      {`box-shadow: 
  inset 4px 4px 8px rgba(163, 177, 198, 0.65),   /* inner dark */
  inset -4px -4px 8px rgba(255, 255, 255, 0.85); /* inner light */`}
                    </pre>
                    <p className="text-xs text-[var(--soft-text-muted)]">
                      Simulates the shape being physically pressed or carved into the background
                      material.
                    </p>
                  </div>
                </div>

                {/* Quick Component Installation Guide */}
                <div className="p-8 rounded-3xl soft-surface soft-raised-lg space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[var(--soft-primary)]" />
                    <h3 className="text-xl font-bold text-[var(--soft-text)]">
                      How to Use in Your Project
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--soft-text-muted)]">
                    All components are self-contained, typed, and available directly from{' '}
                    <code className="px-2 py-0.5 rounded-md soft-pressed-xs text-[var(--soft-primary)]">
                      src/components/soft-ui
                    </code>
                    :
                  </p>
                  <pre className="p-5 rounded-2xl soft-surface soft-pressed-sm text-xs font-mono text-[var(--soft-text)] overflow-x-auto leading-relaxed">
                    {`import { 
  SoftButton, 
  SoftCard, 
  SoftSwitch, 
  SoftSlider, 
  SoftProgressBar,
  SoftAvatar, 
  SoftChip, 
  SoftWeatherWidget,
  SoftInput,
  SoftTabs 
} from './components/soft-ui';

function MyDashboard() {
  return (
    <SoftCard title="RANGE SLIDER">
      <SoftSlider defaultValue={65} showValue={true} />
    </SoftCard>
  );
}`}
                  </pre>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Clean Soft Footer */}
      <footer className="mt-16 border-t border-white/20 py-8 text-center text-xs text-[var(--soft-text-subtle)] font-medium">
        <p>Classic Soft Component Library • Created with React 19, Vite, and Lucide React</p>
      </footer>
    </div>
  );
};

export default App;
