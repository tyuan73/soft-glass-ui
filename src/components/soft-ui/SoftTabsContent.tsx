import React, { useState } from 'react';

export interface TabWithContentItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface SoftTabsContentProps {
  tabs: TabWithContentItem[];
  defaultActiveId?: string;
  activeId?: string;
  onChange?: (id: string) => void;
  size?: 'sm' | 'md' | 'lg';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const SoftTabsContent: React.FC<SoftTabsContentProps> = ({
  tabs,
  defaultActiveId,
  activeId: controlledActiveId,
  onChange,
  size = 'md',
  elevation = 'md',
  className = '',
}) => {
  const [internalActiveId, setInternalActiveId] = useState(
    defaultActiveId || (tabs.length > 0 ? tabs[0].id : '')
  );

  const isControlled = controlledActiveId !== undefined;
  const currentActiveId = isControlled ? controlledActiveId : internalActiveId;

  const handleTabChange = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (!isControlled) {
      setInternalActiveId(id);
    }
    onChange?.(id);
  };

  const getElevationShadow = () => {
    switch (elevation) {
      case 'none':
        return '';
      case 'sm':
        return 'soft-raised-sm';
      case 'lg':
        return 'soft-raised-lg';
      default:
        return 'soft-raised-md';
    }
  };

  const activeTab = tabs.find((t) => t.id === currentActiveId) || tabs[0];

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-xs';
      case 'lg':
        return 'px-6 py-2.5 text-base';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Top Tab Bar Controls */}
      <div className="flex items-center">
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl soft-surface soft-pressed-xs">
          {tabs.map((tab) => {
            const isActive = tab.id === currentActiveId;

            return (
              <button
                key={tab.id}
                type="button"
                disabled={tab.disabled}
                onClick={() => handleTabChange(tab.id, tab.disabled)}
                className={`
                  inline-flex items-center gap-2 rounded-xl font-semibold soft-transition select-none cursor-pointer outline-none
                  ${getSizeClasses()}
                  ${
                    isActive
                      ? 'soft-raised-sm bg-[var(--soft-surface)] text-[var(--soft-primary)] font-bold shadow-sm'
                      : 'text-[var(--soft-text-muted)] hover:text-[var(--soft-text)]'
                  }
                  ${tab.disabled ? 'opacity-40 cursor-not-allowed' : ''}
                `}
              >
                {tab.icon && <span className="shrink-0">{tab.icon}</span>}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-[var(--soft-primary)] text-[var(--soft-btn-accent-text)]'
                        : 'soft-pressed-xs text-[var(--soft-text-muted)]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panel Content Box */}
      <div
        className={`
          soft-surface rounded-3xl p-6 transition-all duration-300 animate-in fade-in
          ${getElevationShadow()}
        `}
      >
        {activeTab?.content}
      </div>
    </div>
  );
};
