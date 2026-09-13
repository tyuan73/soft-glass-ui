import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Bot, Cpu, ChevronRight, Pin, PinOff } from 'lucide-react';

export interface StickyToolbarSubItem {
  title: string;
  resetsIn?: string;
  value: number; // 0-100
  valueLabel?: string;
  color?: string;
}

export interface StickyToolbarItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  value: number; // 0-100
  color: string;
  badge?: string;
  subItems?: StickyToolbarSubItem[];
}

export interface SoftStickyToolbarProps {
  items?: StickyToolbarItem[];
  defaultPinned?: boolean;
  className?: string;
}

const DEFAULT_ITEMS: StickyToolbarItem[] = [
  {
    id: 'claude',
    name: 'Claude Usage',
    icon: <Sparkles className="w-4 h-4" />,
    value: 73,
    color: '#f97316', // orange/coral
    subItems: [
      {
        title: 'Current session',
        resetsIn: 'Resets in 51 min',
        value: 73,
        valueLabel: '73% Used',
        color: '#f97316',
      },
      {
        title: 'All models',
        resetsIn: 'Resets Thu 12:00 AM',
        value: 7,
        valueLabel: '7% Used',
        color: '#10b981',
      },
    ],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT Plus',
    icon: <Bot className="w-4 h-4" />,
    value: 21,
    color: '#10b981', // emerald
    subItems: [
      {
        title: 'GPT-4o Messages',
        resetsIn: 'Resets in 2h 15m',
        value: 21,
        valueLabel: '21% Used (17/80)',
        color: '#10b981',
      },
      {
        title: 'o1 Reasoning',
        resetsIn: 'Resets in 5 days',
        value: 40,
        valueLabel: '40% Used (12/30)',
        color: '#3b82f6',
      },
    ],
  },
  {
    id: 'gemini',
    name: 'Gemini Pro System',
    icon: <Cpu className="w-4 h-4" />,
    value: 52,
    color: '#eab308', // lime/yellow
    subItems: [
      {
        title: 'Ultra 1.5 Quota',
        resetsIn: 'Resets in 3h 40m',
        value: 52,
        valueLabel: '52% Rate limit',
        color: '#eab308',
      },
      {
        title: 'Flash Fast API',
        resetsIn: 'High throughput',
        value: 15,
        valueLabel: '15% Consumed',
        color: '#8b5cf6',
      },
    ],
  },
];

export const SoftStickyToolbar: React.FC<SoftStickyToolbarProps> = ({
  items = DEFAULT_ITEMS,
  defaultPinned = false,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(defaultPinned);
  const [activeItemId, setActiveItemId] = useState<string | null>(items[0]?.id || null);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeItem = items.find((it) => it.id === (hoveredItemId || activeItemId)) || items[0];

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      timerRef.current = setTimeout(() => {
        setIsHovered(false);
        setHoveredItemId(null);
      }, 350);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const isExpanded = isPinned || isHovered;

  return (
    <div
      className={`fixed right-0 top-1/3 z-50 flex items-stretch select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. LEFT DETAIL FLYOUT CARD (Shown when expanded & item active) */}
      {isExpanded && activeItem && (
        <div
          className="relative mr-3 self-center animate-in fade-in slide-in-from-right-3 duration-200"
          style={{ width: '300px' }}
        >
          {/* Main Card Surface */}
          <div className="relative soft-surface soft-raised-xl rounded-3xl p-5 border border-white/20 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/20">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-xl soft-surface soft-pressed-xs flex items-center justify-center shrink-0"
                  style={{ color: activeItem.color }}
                >
                  {activeItem.icon}
                </div>
                <h4 className="text-sm font-extrabold text-[var(--soft-text)] tracking-tight">
                  {activeItem.name}
                </h4>
              </div>

              {/* Pin / Unpin button */}
              <button
                type="button"
                onClick={() => setIsPinned(!isPinned)}
                title={isPinned ? 'Unpin toolbar (auto-minimize)' : 'Pin toolbar open'}
                className={`p-1.5 rounded-lg soft-surface soft-transition cursor-pointer ${
                  isPinned
                    ? 'soft-pressed-xs text-[var(--soft-primary)]'
                    : 'soft-raised-xs text-[var(--soft-text-muted)] hover:text-[var(--soft-text)]'
                }`}
              >
                {isPinned ? (
                  <Pin className="w-3.5 h-3.5 fill-current" />
                ) : (
                  <PinOff className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Sub-Items Progress Bars */}
            <div className="space-y-4">
              {activeItem.subItems?.map((sub, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[var(--soft-text)]">{sub.title}</span>
                    {sub.resetsIn && (
                      <span className="text-[10px] text-[var(--soft-text-subtle)] font-medium">
                        {sub.resetsIn}
                      </span>
                    )}
                  </div>

                  {/* Sunken Groove Progress Bar */}
                  <div className="relative w-full h-2 rounded-full soft-pressed-xs soft-surface overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
                      style={{
                        width: `${Math.min(100, Math.max(0, sub.value))}%`,
                        backgroundColor: sub.color || activeItem.color,
                      }}
                    />
                  </div>

                  {sub.valueLabel && (
                    <div className="text-right">
                      <span
                        className="text-[11px] font-bold"
                        style={{ color: sub.color || activeItem.color }}
                      >
                        {sub.valueLabel}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Triangle Pointer Arrow */}
          <div
            className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[9px]"
            style={{ borderLeftColor: 'var(--soft-surface)' }}
          />
        </div>
      )}

      {/* 2. MINIMIZED HANDLE TAB (Shown ONLY when minimized; 4px thinner, 2 lines occupy 92% height centered) */}
      {!isExpanded && (
        <div
          onClick={() => setIsPinned(true)}
          className="w-4 h-[310px] flex items-center justify-center soft-surface cursor-pointer rounded-l-xl border-l border-t border-b border-white/20 soft-raised-md hover:soft-raised-lg transition-all duration-300"
          title="Hover or click to expand toolbar"
        >
          {/* 2 Vertical Thin Lines occupying 92% of height, centered in width, lighter color */}
          <div className="flex gap-[2.5px] items-center justify-center h-[92%] w-full">
            <div className="w-[1px] h-full rounded-full bg-[var(--soft-text-muted)] opacity-30" />
            <div className="w-[1px] h-full rounded-full bg-[var(--soft-text-muted)] opacity-30" />
          </div>
        </div>
      )}

      {/* 3. STICKY RIGHT RAIL DOCK (Shown when expanded; 2 vertical lines are hidden) */}
      <div
        className={`
          h-[310px] relative flex flex-col items-center justify-between py-4 soft-surface
          border-l border-t border-b border-white/20 rounded-l-2xl transition-all duration-300 ease-out origin-right overflow-hidden
          ${
            isExpanded
              ? 'w-[76px] px-3 opacity-100 pointer-events-auto soft-raised-lg shadow-2xl'
              : 'w-0 !p-0 !border-0 opacity-0 pointer-events-none'
          }
        `}
      >
        {/* Action / Gauge Items */}
        <div className="flex flex-col items-center gap-4 w-full">
          {items.map((item) => {
            const isSelected = (hoveredItemId || activeItemId) === item.id;
            const radius = 18;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (item.value / 100) * circumference;

            return (
              <div
                key={item.id}
                onMouseEnter={() => {
                  setHoveredItemId(item.id);
                  setActiveItemId(item.id);
                }}
                className="flex flex-col items-center gap-1 group shrink-0"
              >
                {/* Circular Gauge Ring with Icon */}
                <div
                  className={`
                    relative w-12 h-12 rounded-full soft-surface flex items-center justify-center transition-all duration-200
                    ${isSelected ? 'soft-pressed-xs scale-105' : 'soft-raised-sm hover:soft-raised-md'}
                  `}
                >
                  {/* SVG Progress Arc */}
                  <svg
                    className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                    viewBox="0 0 44 44"
                  >
                    {/* Background Track */}
                    <circle
                      cx="22"
                      cy="22"
                      r={radius}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-black/10 dark:text-white/10"
                    />
                    {/* Active Value Arc */}
                    <circle
                      cx="22"
                      cy="22"
                      r={radius}
                      fill="none"
                      stroke={item.color}
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-500 ease-out drop-shadow-[0_0_2px_rgba(0,0,0,0.15)]"
                    />
                  </svg>

                  {/* Center Icon */}
                  <span
                    className="relative z-10 transition-transform duration-200 group-hover:scale-110"
                    style={{ color: isSelected ? item.color : 'var(--soft-text)' }}
                  >
                    {item.icon}
                  </span>
                </div>

                {/* Percentage Readout Label */}
                <span
                  className={`text-[11px] font-extrabold tracking-tight transition-colors ${
                    isSelected
                      ? 'text-[var(--soft-text)] font-black'
                      : 'text-[var(--soft-text-muted)]'
                  }`}
                >
                  {item.value}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom Minimize Icon */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsPinned(false);
            setIsHovered(false);
          }}
          className="mt-1 p-1 rounded-lg text-[var(--soft-text-subtle)] hover:text-[var(--soft-text)] cursor-pointer"
          title="Minimize toolbar"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
