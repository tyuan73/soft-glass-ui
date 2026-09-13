import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemData {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface SoftAccordionProps {
  items: AccordionItemData[];
  defaultOpenIds?: string[];
  multiple?: boolean;
  elevation?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SoftAccordion: React.FC<SoftAccordionProps> = ({
  items,
  defaultOpenIds = [],
  multiple = false,
  elevation = 'md',
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenIds.length > 0 ? defaultOpenIds : items.length > 0 ? [items[0].id] : []
  );

  const toggleItem = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (multiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  const getElevationClass = () => {
    switch (elevation) {
      case 'sm':
        return 'soft-raised-sm';
      case 'lg':
        return 'soft-raised-lg';
      default:
        return 'soft-raised-md';
    }
  };

  return (
    <div className={`space-y-4 w-full ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={`
              overflow-hidden rounded-2xl soft-surface transition-all duration-300
              ${isOpen ? 'soft-pressed-xs' : getElevationClass()}
              ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {/* Header Trigger */}
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => toggleItem(item.id, item.disabled)}
              className={`
                w-full px-6 py-4.5 flex items-center justify-between gap-4 text-left select-none outline-none
                transition-colors duration-200 cursor-pointer
                ${isOpen ? 'text-[var(--soft-primary)] font-bold' : 'text-[var(--soft-text)] font-semibold'}
              `}
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                {item.icon && (
                  <span
                    className={`shrink-0 transition-transform duration-200 ${
                      isOpen ? 'text-[var(--soft-primary)]' : 'text-[var(--soft-text-muted)]'
                    }`}
                  >
                    {item.icon}
                  </span>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-base truncate">{item.title}</span>
                  {item.subtitle && (
                    <span className="text-xs font-normal text-[var(--soft-text-muted)] mt-0.5 truncate">
                      {item.subtitle}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {item.badge && (
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      isOpen
                        ? 'soft-pressed-xs bg-[var(--soft-primary)]/15 text-[var(--soft-primary)]'
                        : 'soft-raised-xs text-[var(--soft-text-muted)]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Animated Chevron */}
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center soft-surface soft-transition
                    ${isOpen ? 'soft-pressed-xs rotate-180 text-[var(--soft-primary)]' : 'soft-raised-xs text-[var(--soft-text-muted)]'}
                  `}
                >
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </button>

            {/* Expandable Content Panel */}
            <div
              className={`
                transition-all duration-300 ease-in-out overflow-hidden
                ${isOpen ? 'max-h-96 opacity-100 py-4 px-6 border-t border-white/20' : 'max-h-0 opacity-0 py-0 px-6 border-transparent'}
              `}
            >
              <div className="text-sm leading-relaxed text-[var(--soft-text)]">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
