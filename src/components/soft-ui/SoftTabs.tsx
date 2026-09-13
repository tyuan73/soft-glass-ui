import React from 'react';

export interface SoftTabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SoftTabsProps {
  tabs: SoftTabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SoftTabs: React.FC<SoftTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  size = 'md',
  className = '',
}) => {
  const getPadding = () => {
    switch (size) {
      case 'sm':
        return 'p-1';
      case 'lg':
        return 'p-2';
      default:
        return 'p-1.5';
    }
  };

  const getItemPadding = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1 text-xs';
      case 'lg':
        return 'px-6 py-2.5 text-base';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  return (
    <div
      className={`
        inline-flex items-center rounded-2xl soft-surface soft-pressed-xs
        ${getPadding()} ${className}
      `}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`
              inline-flex items-center justify-center gap-2 rounded-xl font-semibold
              soft-transition select-none cursor-pointer
              ${getItemPadding()}
              ${
                isActive
                  ? 'soft-raised-sm bg-[var(--soft-surface)] text-[var(--soft-primary)] font-bold shadow-sm'
                  : 'text-[var(--soft-text-muted)] hover:text-[var(--soft-text)]'
              }
            `}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
