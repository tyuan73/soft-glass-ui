import React from 'react';

export interface BreadcrumbItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  current?: boolean;
}

export interface SoftBreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export const SoftBreadcrumbs: React.FC<SoftBreadcrumbsProps> = ({
  items,
  separator = <span className="text-[var(--soft-text-subtle)] font-light select-none">/</span>,
  className = '',
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`inline-flex items-center text-xs font-medium ${className}`}
    >
      <ol className="flex items-center gap-2.5 list-none p-0 m-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.current;

          return (
            <li key={item.id} className="inline-flex items-center gap-2.5">
              {isLast ? (
                <span
                  aria-current="page"
                  className="inline-flex items-center gap-1.5 font-bold text-[var(--soft-text)] select-none"
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="inline-flex items-center gap-1.5 text-[var(--soft-text-muted)] hover:text-[var(--soft-primary)] transition-colors cursor-pointer bg-transparent border-0 p-0 outline-none"
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              )}

              {!isLast && <span className="flex items-center select-none">{separator}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
