import React, { useState, useRef, useEffect } from 'react';

export interface PopupMenuItem {
  id: string;
  label?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
  onClick?: () => void;
}

export interface SoftPopupMenuProps {
  trigger: React.ReactNode;
  items: PopupMenuItem[];
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  className?: string;
}

export const SoftPopupMenu: React.FC<SoftPopupMenuProps> = ({
  trigger,
  items,
  placement = 'bottom-right',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const getPlacementClass = () => {
    switch (placement) {
      case 'bottom-left':
        return 'top-full left-0 mt-2';
      case 'top-left':
        return 'bottom-full left-0 mb-2';
      case 'top-right':
        return 'bottom-full right-0 mb-2';
      default:
        return 'top-full right-0 mt-2'; // bottom-right
    }
  };

  const handleItemClick = (item: PopupMenuItem) => {
    if (item.disabled || item.divider) return;
    item.onClick?.();
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Trigger */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer inline-flex items-center"
      >
        {trigger}
      </div>

      {/* Floating Popup Menu */}
      {isOpen && (
        <div
          className={`
            absolute z-50 min-w-[200px] soft-surface soft-raised-lg rounded-2xl p-1.5 border border-white/20
            animate-in fade-in zoom-in-95 duration-150 select-none
            ${getPlacementClass()}
          `}
          role="menu"
        >
          {items.map((item, index) => {
            if (item.divider) {
              return (
                <div
                  key={`div-${index}`}
                  className="my-1 border-t border-white/20 soft-pressed-xs h-0.5"
                />
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => handleItemClick(item)}
                className={`
                  w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-xs font-semibold
                  soft-transition outline-none cursor-pointer text-left
                  ${
                    item.danger
                      ? 'text-[var(--soft-danger)] hover:soft-pressed-xs hover:bg-[var(--soft-danger)]/10'
                      : 'text-[var(--soft-text)] hover:soft-pressed-xs hover:text-[var(--soft-primary)]'
                  }
                  ${item.disabled ? 'opacity-40 cursor-not-allowed' : ''}
                `}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </div>
                {item.shortcut && (
                  <span className="text-[10px] font-mono text-[var(--soft-text-subtle)] px-1.5 py-0.5 rounded soft-pressed-xs">
                    {item.shortcut}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
