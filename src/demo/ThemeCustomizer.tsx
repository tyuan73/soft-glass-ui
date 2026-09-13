import { Palette, Sliders, RotateCcw } from 'lucide-react';
import { useTheme, type ThemeName } from '../utils/theme';

export type { ThemeName };

export const ThemeCustomizer: React.FC = () => {
  const {
    currentTheme,
    setCurrentTheme,
    shadowDepth,
    setShadowDepth,
    resetCustomizations,
    themes,
  } = useTheme('classic', 1);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-6 rounded-2xl soft-surface soft-pressed-xs border border-white/20">
      {/* Theme Picker */}
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-muted)] flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-[var(--soft-primary)]" />
          Surface Tone:
        </span>
        <div className="flex items-center gap-1.5">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setCurrentTheme(theme.id)}
              className={`
                px-2.5 py-1 rounded-xl text-xs font-semibold soft-transition flex items-center gap-1.5 cursor-pointer
                ${
                  currentTheme === theme.id
                    ? 'soft-pressed-xs text-[var(--soft-primary)] font-bold'
                    : 'soft-raised-xs text-[var(--soft-text-muted)] hover:text-[var(--soft-text)]'
                }
              `}
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-black/10"
                style={{ backgroundColor: theme.bgHex }}
              />
              <span className="hidden sm:inline">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Shadow Depth Intensity Slider */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-muted)] flex items-center gap-1">
          <Sliders className="w-3.5 h-3.5 text-[var(--soft-primary)]" />
          Elevation:
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShadowDepth(0.55)}
            className={`px-2 py-0.5 rounded-lg text-xs font-medium cursor-pointer ${
              shadowDepth === 0.55
                ? 'soft-pressed-xs text-[var(--soft-primary)]'
                : 'soft-raised-xs text-[var(--soft-text-muted)]'
            }`}
          >
            Soft
          </button>
          <button
            onClick={() => setShadowDepth(1.0)}
            className={`px-2 py-0.5 rounded-lg text-xs font-medium cursor-pointer ${
              shadowDepth === 1.0
                ? 'soft-pressed-xs text-[var(--soft-primary)]'
                : 'soft-raised-xs text-[var(--soft-text-muted)]'
            }`}
          >
            Default
          </button>
          <button
            onClick={() => setShadowDepth(1.4)}
            className={`px-2 py-0.5 rounded-lg text-xs font-medium cursor-pointer ${
              shadowDepth === 1.4
                ? 'soft-pressed-xs text-[var(--soft-primary)]'
                : 'soft-raised-xs text-[var(--soft-text-muted)]'
            }`}
          >
            Deep
          </button>
        </div>

        <button
          onClick={resetCustomizations}
          title="Reset to classic default"
          className="p-1 rounded-lg text-[var(--soft-text-subtle)] hover:text-[var(--soft-text)] cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default ThemeCustomizer;
