import React, { useState, useEffect, useRef } from 'react';
import {
  Palette,
  Sliders,
  RotateCcw,
  Compass,
  Layers,
  SlidersHorizontal,
  Play,
  Sun,
  ChevronLeft,
  ChevronRight,
  Menu,
  Box,
  Cpu,
  Code2,
  Images,
  MousePointerClick,
  FileSpreadsheet,
  Layout,
} from 'lucide-react';
import { SoftDivider } from './soft-ui/SoftDivider';
import { THEMES, useTheme, type ThemeName, type ThemeOption } from '../utils/theme';

export type { ThemeName, ThemeOption };
export { THEMES };

export interface NavSectionItem {
  id: string;
  label: string;
  badge?: string;
  icon?: React.ReactNode;
}

export interface NavCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: NavSectionItem[];
}

// Categorized Components (icons removed from individual components, preserved on categories)
const COMPONENT_CATEGORIES: NavCategory[] = [
  {
    id: 'layout',
    label: 'Layout',
    icon: <Layout className="w-3.5 h-3.5" />,
    items: [
      { id: 'layout-grid', label: 'Row & Column Grid' },
      { id: 'cards', label: 'Cards & Surfaces' },
      { id: 'divider', label: 'Dividers' },
      { id: 'left-nav', label: 'Left Nav' },
      { id: 'breadcrumbs', label: 'Breadcrumbs' },
      { id: 'tabs', label: 'Tabs' },
      { id: 'accordion', label: 'Accordion' },
    ],
  },
  {
    id: 'forms',
    label: 'Form & User Interaction',
    icon: <MousePointerClick className="w-3.5 h-3.5" />,
    items: [
      { id: 'buttons', label: 'Buttons' },
      { id: 'inputs', label: 'Form Controls' },
      { id: 'datetime-picker', label: 'Date & Time Picker', badge: 'New' },
      { id: 'sliders', label: 'Sliders' },
      { id: 'dialog', label: 'Dialog (Modal)' },
      { id: 'popup-menu', label: 'Popup Menu' },
    ],
  },
  {
    id: 'presentation',
    label: 'Presentation',
    icon: <Layers className="w-3.5 h-3.5" />,
    items: [
      { id: 'typography', label: 'Typography', badge: 'New' },
      { id: 'progress', label: 'Progress Bar' },
      { id: 'avatars', label: 'Avatars' },
      { id: 'chips', label: 'Chips & Tags' },
      { id: 'toasts', label: 'Toast Notifications' },
    ],
  },
  {
    id: 'media',
    label: 'Media',
    icon: <Images className="w-3.5 h-3.5" />,
    items: [
      { id: 'image', label: 'Image Frame' },
      { id: 'gallery', label: 'Image Gallery', badge: 'New' },
      { id: 'audio-player', label: 'Audio Player', badge: 'New' },
      { id: 'video-player', label: 'Video Player', badge: 'New' },
    ],
  },
  {
    id: 'documents',
    label: 'Formatted Documents',
    icon: <FileSpreadsheet className="w-3.5 h-3.5" />,
    items: [
      { id: 'pdf-viewer', label: 'PDF Viewer', badge: 'New' },
      { id: 'markdown', label: 'Markdown Viewer' },
    ],
  },
];

// Flat array for scroll-spy lookup
const ALL_COMPONENT_SECTIONS: NavSectionItem[] = COMPONENT_CATEGORIES.flatMap((c) => c.items);

// 2. WIDGETS: Compositions of multiple components
const WIDGET_SECTIONS: NavSectionItem[] = [
  { id: 'weather', label: 'Weather Widget', icon: <Sun className="w-3.5 h-3.5" /> },
  { id: 'audio-player', label: 'Audio Player', icon: <Play className="w-3.5 h-3.5" /> },
  {
    id: 'toolbar',
    label: 'Sticky Right Toolbar',
    icon: <SlidersHorizontal className="w-3.5 h-3.5" />,
  },
];

export interface LeftNavbarProps {
  activeTab: 'components' | 'widgets' | 'tokens';
  onTabChange: (tab: 'components' | 'widgets' | 'tokens') => void;
  className?: string;
}

export const LeftNavbar: React.FC<LeftNavbarProps> = ({
  activeTab,
  onTabChange,
  className = '',
}) => {
  const { currentTheme, setCurrentTheme, shadowDepth, setShadowDepth, resetCustomizations } =
    useTheme('classic', 1);
  const [activeSection, setActiveSection] = useState<string>('layout-grid');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Secondary Popup / Flyout Menu state
  interface FlyoutState {
    category: NavCategory;
    top: number;
    left: number;
  }
  const [flyout, setFlyout] = useState<FlyoutState | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCategoryMouseEnter = (cat: NavCategory, el: HTMLElement) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    const rect = el.getBoundingClientRect();
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    const estimatedHeight = 16 + cat.items.length * 36;
    let top = rect.top - 4;
    if (top + estimatedHeight > screenHeight - 16) {
      top = Math.max(16, screenHeight - estimatedHeight - 16);
    }
    let left = rect.right + 8;
    if (left + 230 > screenWidth - 12) {
      left = Math.max(12, rect.left - 238);
    }
    setFlyout({
      category: cat,
      top,
      left,
    });
  };

  const handleCategoryMouseLeave = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setFlyout(null);
    }, 180);
  };

  const handleFlyoutMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleFlyoutMouseLeave = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setFlyout(null);
    }, 180);
  };

  // Close flyout on scroll, resize, or escape key
  useEffect(() => {
    const handleDismiss = () => setFlyout(null);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFlyout(null);
    };

    window.addEventListener('scroll', handleDismiss, { passive: true });
    window.addEventListener('resize', handleDismiss);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
      window.removeEventListener('scroll', handleDismiss);
      window.removeEventListener('resize', handleDismiss);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Track active section on scroll
  useEffect(() => {
    if (activeTab === 'tokens') return;

    const sections = activeTab === 'components' ? ALL_COMPONENT_SECTIONS : WIDGET_SECTIONS;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i].id);
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const handleJump = (sectionId: string, targetTab: 'components' | 'widgets') => {
    setFlyout(null);
    if (activeTab !== targetTab) {
      onTabChange(targetTab);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setActiveSection(sectionId);
    setMobileOpen(false);
  };

  const handleSelectTokens = () => {
    onTabChange('tokens');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile toggle button (visible on smaller screens) */}
      <div className="lg:hidden fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-12 h-12 rounded-2xl soft-surface soft-raised-md flex items-center justify-center text-[var(--soft-primary)] shadow-lg cursor-pointer active:soft-pressed-xs"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Left Navigation Bar Container */}
      <aside
        className={`
          soft-surface soft-raised-md rounded-3xl p-5 border border-white/20
          transition-all duration-300 select-none z-40
          lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7.5rem)] lg:overflow-y-auto
          ${
            mobileOpen
              ? 'fixed top-20 left-4 right-4 bottom-24 overflow-y-auto block'
              : 'hidden lg:block'
          }
          ${isCollapsed ? 'lg:w-20' : 'lg:w-72'}
          ${className}
        `}
      >
        {/* Navbar Header & Collapse Toggle */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-[var(--soft-text-subtle)]/15">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl soft-surface soft-pressed-xs flex items-center justify-center text-[var(--soft-primary)] shrink-0">
              <Compass className="w-4 h-4 stroke-[2.5]" />
            </div>
            {!isCollapsed && (
              <span className="font-extrabold text-sm text-[var(--soft-text)] tracking-tight truncate">
                Navigation
              </span>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
            className="hidden lg:flex w-7 h-7 rounded-lg soft-surface soft-raised-xs items-center justify-center text-[var(--soft-text-muted)] hover:text-[var(--soft-text)] cursor-pointer active:soft-pressed-xs"
          >
            {isCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* 1. COMPONENTS: CATEGORIZED GROUPS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-1">
            <button
              onClick={() => {
                onTabChange('components');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-[11px] font-extrabold uppercase tracking-wider text-[var(--soft-text)] hover:text-[var(--soft-primary)] flex items-center gap-1.5 cursor-pointer ${
                isCollapsed ? 'justify-center w-full' : ''
              }`}
              title="Components Page"
            >
              <Box className="w-3.5 h-3.5 text-[var(--soft-primary)] shrink-0" />
              {!isCollapsed && <span>Components</span>}
            </button>
          </div>

          {/* Categories list */}
          <div className="space-y-1.5">
            {COMPONENT_CATEGORIES.map((cat) => {
              const isFlyoutOpen = flyout?.category.id === cat.id;
              const hasActiveSection =
                activeTab === 'components' && cat.items.some((item) => item.id === activeSection);

              return (
                <div
                  key={cat.id}
                  className="relative"
                  onMouseEnter={(e) => handleCategoryMouseEnter(cat, e.currentTarget)}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (cat.items.length > 0) {
                        handleJump(cat.items[0].id, 'components');
                      }
                    }}
                    className={`
                      w-full flex items-center rounded-xl text-xs font-semibold soft-transition cursor-pointer group
                      ${isCollapsed ? 'px-2 py-2 justify-center' : 'px-3 py-2 justify-between'}
                      ${
                        isFlyoutOpen
                          ? 'soft-pressed-xs text-[var(--soft-primary)] font-bold bg-[var(--soft-primary)]/8'
                          : hasActiveSection
                            ? 'soft-raised-xs text-[var(--soft-primary)] font-bold'
                            : 'text-[var(--soft-text)] hover:soft-raised-xs hover:text-[var(--soft-primary)]'
                      }
                    `}
                    title={cat.label}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`shrink-0 transition-colors ${
                          hasActiveSection || isFlyoutOpen
                            ? 'text-[var(--soft-primary)]'
                            : 'text-[var(--soft-text-muted)] group-hover:text-[var(--soft-primary)]'
                        }`}
                      >
                        {cat.icon}
                      </span>
                      {!isCollapsed && <span className="truncate">{cat.label}</span>}
                    </div>

                    {!isCollapsed && (
                      <div className="flex items-center gap-1.5 shrink-0">
                        {hasActiveSection && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--soft-primary)]" />
                        )}
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform duration-150 ${
                            isFlyoutOpen
                              ? 'text-[var(--soft-primary)] translate-x-0.5'
                              : 'text-[var(--soft-text-subtle)] group-hover:text-[var(--soft-text)]'
                          }`}
                        />
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* SOFT DIVIDER */}
        <SoftDivider variant="bevel" className="my-5" />

        {/* 2. WIDGETS (COMPOSITIONS OF MULTIPLE COMPONENTS) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => {
                onTabChange('widgets');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-[11px] font-bold uppercase tracking-wider text-[var(--soft-text-muted)] hover:text-[var(--soft-primary)] flex items-center gap-1.5 cursor-pointer ${
                isCollapsed ? 'justify-center w-full' : ''
              }`}
              title="Widgets Page"
            >
              <Cpu className="w-3.5 h-3.5 text-[var(--soft-primary)] shrink-0" />
              {!isCollapsed && <span>Widgets</span>}
            </button>
          </div>

          <div className="space-y-1">
            {WIDGET_SECTIONS.map((section) => {
              const isActive = activeTab === 'widgets' && activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => handleJump(section.id, 'widgets')}
                  title={section.label}
                  className={`
                    w-full py-1.5 rounded-xl text-xs font-medium soft-transition flex items-center gap-2.5 cursor-pointer
                    ${isCollapsed ? 'px-2 justify-center' : 'px-3 justify-between'}
                    ${
                      isActive
                        ? 'soft-pressed-xs text-[var(--soft-primary)] font-bold bg-[var(--soft-primary)]/5'
                        : 'text-[var(--soft-text-muted)] hover:soft-raised-xs hover:text-[var(--soft-text)]'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="shrink-0">{section.icon}</span>
                    {!isCollapsed && <span className="truncate">{section.label}</span>}
                  </div>

                  {!isCollapsed && section.badge && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-[var(--soft-primary)]/15 text-[var(--soft-primary)]">
                      {section.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* SOFT DIVIDER */}
        <SoftDivider variant="bevel" className="my-5" />

        {/* 3. SHADOW PHYSICS & TOKENS */}
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-[11px] font-bold uppercase tracking-wider text-[var(--soft-text-muted)] flex items-center gap-1.5 ${
                isCollapsed ? 'justify-center w-full' : ''
              }`}
              title="Shadow Physics & Tokens"
            >
              <Code2 className="w-3.5 h-3.5 text-[var(--soft-primary)] shrink-0" />
              {!isCollapsed && <span>Physics & Tokens</span>}
            </span>
          </div>

          <div>
            <button
              onClick={handleSelectTokens}
              title="Shadow Physics & Tokens Reference"
              className={`
                w-full py-2 rounded-xl text-xs font-semibold soft-transition flex items-center gap-2.5 cursor-pointer
                ${isCollapsed ? 'px-2 justify-center' : 'px-3 justify-between'}
                ${
                  activeTab === 'tokens'
                    ? 'soft-pressed-xs text-[var(--soft-primary)] font-bold bg-[var(--soft-primary)]/5'
                    : 'text-[var(--soft-text-muted)] hover:soft-raised-xs hover:text-[var(--soft-text)]'
                }
              `}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Code2 className="w-4 h-4 text-[var(--soft-primary)] shrink-0" />
                {!isCollapsed && <span className="truncate">Physics & Formulas</span>}
              </div>
              {!isCollapsed && (
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-[var(--soft-primary)]/15 text-[var(--soft-primary)]">
                  Spec
                </span>
              )}
            </button>
          </div>
        </div>

        {/* SOFT DIVIDER */}
        <SoftDivider variant="bevel" className="my-5" />

        {/* 4. SURFACE TONE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span
              className={`text-[11px] font-bold uppercase tracking-wider text-[var(--soft-text-muted)] flex items-center gap-1.5 ${
                isCollapsed ? 'justify-center w-full' : ''
              }`}
              title="Surface Tone"
            >
              <Palette className="w-3.5 h-3.5 text-[var(--soft-primary)] shrink-0" />
              {!isCollapsed && <span>Surface Tone</span>}
            </span>
          </div>

          <div className={`flex ${isCollapsed ? 'flex-col items-center' : 'flex-col'} gap-1.5`}>
            {THEMES.map((theme) => {
              const isSelected = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setCurrentTheme(theme.id)}
                  title={theme.name}
                  className={`
                    w-full py-2 rounded-xl text-xs font-semibold soft-transition flex items-center gap-2.5 cursor-pointer
                    ${isCollapsed ? 'px-2 justify-center' : 'px-3 justify-start'}
                    ${
                      isSelected
                        ? 'soft-pressed-xs text-[var(--soft-primary)] font-bold'
                        : 'soft-surface soft-raised-xs hover:soft-raised-sm text-[var(--soft-text)]'
                    }
                  `}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/40 shadow-xs"
                    style={{ backgroundColor: theme.bgHex }}
                  />
                  {!isCollapsed && <span className="truncate">{theme.name}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* SOFT DIVIDER */}
        <SoftDivider variant="bevel" className="my-5" />

        {/* 5. ELEVATION & SHADOW DEPTH */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span
              className={`text-[11px] font-bold uppercase tracking-wider text-[var(--soft-text-muted)] flex items-center gap-1.5 ${
                isCollapsed ? 'justify-center w-full' : ''
              }`}
              title="Elevation & Shadows"
            >
              <Sliders className="w-3.5 h-3.5 text-[var(--soft-primary)] shrink-0" />
              {!isCollapsed && <span>Elevation</span>}
            </span>

            {!isCollapsed && (
              <button
                onClick={resetCustomizations}
                title="Reset to defaults"
                className="text-[10px] text-[var(--soft-primary)] hover:underline flex items-center gap-1 cursor-pointer font-bold"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                Reset
              </button>
            )}
          </div>

          {!isCollapsed ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[var(--soft-text-muted)] font-medium">
                <span>Depth</span>
                <span className="font-mono text-[var(--soft-primary)] font-bold">
                  {shadowDepth === 0.5 ? 'Soft' : shadowDepth === 1 ? 'Standard' : 'Deep'}
                </span>
              </div>

              <div className="flex gap-2">
                {[
                  { label: 'Soft', value: 0.5 },
                  { label: 'Standard', value: 1 },
                  { label: 'Deep', value: 1.5 },
                ].map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setShadowDepth(level.value)}
                    className={`
                      flex-1 py-1.5 rounded-xl text-xs font-semibold soft-transition cursor-pointer
                      ${
                        shadowDepth === level.value
                          ? 'soft-pressed-xs text-[var(--soft-primary)] font-bold'
                          : 'soft-surface soft-raised-xs hover:soft-raised-sm text-[var(--soft-text-muted)]'
                      }
                    `}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <span className="w-2 h-2 rounded-full bg-[var(--soft-primary)]" />
            </div>
          )}
        </div>
      </aside>

      {/* SECONDARY POPUP / FLYOUT MENU */}
      {flyout && (
        <div
          style={{ top: `${flyout.top}px`, left: `${flyout.left}px` }}
          className="fixed z-50 min-w-[210px] max-w-[260px] soft-surface soft-raised-xl rounded-2xl p-2 border border-white/25 shadow-2xl animate-in fade-in zoom-in-95 duration-150 select-none backdrop-blur-md"
          onMouseEnter={handleFlyoutMouseEnter}
          onMouseLeave={handleFlyoutMouseLeave}
          role="menu"
        >
          {/* Invisible hover bridge connecting trigger button and popup */}
          <div className="absolute -left-3 top-0 bottom-0 w-3 cursor-default" />

          {/* List of sub-components */}
          <div className="space-y-0.5">
            {flyout.category.items.map((section) => {
              const isActive = activeTab === 'components' && activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    handleJump(section.id, 'components');
                    setFlyout(null);
                  }}
                  title={section.label}
                  className={`
                    w-full py-1.5 px-2.5 rounded-xl text-xs font-semibold soft-transition flex items-center justify-between cursor-pointer text-left
                    ${
                      isActive
                        ? 'soft-pressed-xs text-[var(--soft-primary)] font-bold bg-[var(--soft-primary)]/8'
                        : 'text-[var(--soft-text)] hover:soft-raised-xs hover:text-[var(--soft-primary)]'
                    }
                  `}
                >
                  <span className="truncate">{section.label}</span>
                  {section.badge && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-[var(--soft-primary)]/15 text-[var(--soft-primary)] shrink-0 ml-2">
                      {section.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default LeftNavbar;
