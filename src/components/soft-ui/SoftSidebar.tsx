import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, LogOut, Settings, Sparkles } from 'lucide-react';
import { SoftAvatar } from './SoftAvatar';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  section?: string;
  disabled?: boolean;
}

export interface SoftSidebarProps {
  items: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  brandName?: string;
  brandLogo?: React.ReactNode;
  user?: {
    name: string;
    email: string;
    initials?: string;
    avatarUrl?: string;
    status?: 'online' | 'busy' | 'away' | 'offline';
  };
  defaultCollapsed?: boolean;
  collapsible?: boolean;
  className?: string;
}

export const SoftSidebar: React.FC<SoftSidebarProps> = ({
  items,
  activeId: controlledActive,
  onSelect,
  brandName = 'Soft UI',
  brandLogo,
  user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    initials: 'JD',
    status: 'online',
  },
  defaultCollapsed = false,
  collapsible = true,
  className = '',
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [internalActive, setInternalActive] = useState(items[0]?.id ?? '');
  const activeId = controlledActive !== undefined ? controlledActive : internalActive;

  const handleSelect = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (controlledActive === undefined) {
      setInternalActive(id);
    }
    onSelect?.(id);
  };

  // Group items by section
  const sections = items.reduce<Record<string, NavItem[]>>((acc, item) => {
    const sec = item.section || 'default';
    if (!acc[sec]) acc[sec] = [];
    acc[sec].push(item);
    return acc;
  }, {});

  return (
    <aside
      className={`
        relative flex flex-col justify-between h-full soft-surface soft-raised-lg rounded-3xl p-4
        transition-all duration-300 select-none
        ${collapsed ? 'w-20' : 'w-64'}
        ${className}
      `}
    >
      {/* Top Brand Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-6 px-2 py-1">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl soft-surface soft-raised-sm flex items-center justify-center text-[var(--soft-primary)] shrink-0">
              {brandLogo || <Sparkles className="w-5 h-5 fill-current" />}
            </div>
            {!collapsed && (
              <span className="font-extrabold text-lg text-[var(--soft-text)] truncate tracking-tight">
                {brandName}
              </span>
            )}
          </div>

          {/* Collapse Toggle Button */}
          {collapsible && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="w-8 h-8 rounded-xl soft-surface soft-raised-xs flex items-center justify-center text-[var(--soft-text-muted)] hover:text-[var(--soft-text)] hover:soft-raised-sm active:soft-pressed-xs cursor-pointer shrink-0"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              )}
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="space-y-4 flex-1 overflow-y-auto py-1">
          {Object.entries(sections).map(([sectionTitle, sectionItems]) => (
            <div key={sectionTitle} className="space-y-1.5">
              {sectionTitle !== 'default' && !collapsed && (
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--soft-text-subtle)]">
                  {sectionTitle}
                </div>
              )}

              {sectionItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={item.disabled}
                    onClick={() => handleSelect(item.id, item.disabled)}
                    title={collapsed ? item.label : undefined}
                    className={`
                      w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl soft-transition outline-none cursor-pointer
                      ${
                        isActive
                          ? 'soft-pressed-sm text-[var(--soft-primary)] font-bold'
                          : 'text-[var(--soft-text-muted)] hover:text-[var(--soft-text)] hover:soft-raised-xs'
                      }
                      ${item.disabled ? 'opacity-40 cursor-not-allowed' : ''}
                      ${collapsed ? 'justify-center px-0' : ''}
                    `}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    {!collapsed && (
                      <span className="text-sm truncate flex-1 text-left">{item.label}</span>
                    )}
                    {!collapsed && item.badge !== undefined && (
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-[var(--soft-primary)] text-[var(--soft-btn-accent-text)]'
                            : 'soft-pressed-xs text-[var(--soft-text-muted)]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom User Profile Section */}
      <div className="border-t border-white/20 pt-4 mt-4 shrink-0">
        <div
          className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between gap-3'}`}
        >
          <SoftAvatar
            initials={user.initials}
            src={user.avatarUrl}
            name={user.name}
            status={user.status}
            statusText={user.email}
            size="sm"
            showDetails={!collapsed}
          />
          {!collapsed && (
            <div className="flex items-center gap-1">
              <button
                title="Settings"
                className="p-2 rounded-xl soft-surface soft-raised-xs text-[var(--soft-text-muted)] hover:text-[var(--soft-text)] hover:soft-raised-sm active:soft-pressed-xs cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
              <button
                title="Log out"
                className="p-2 rounded-xl soft-surface soft-raised-xs text-[var(--soft-text-muted)] hover:text-[var(--soft-danger)] hover:soft-raised-sm active:soft-pressed-xs cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
