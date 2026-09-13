import React from 'react';

export interface SoftAvatarProps {
  initials?: string;
  src?: string;
  alt?: string;
  name?: string;
  statusText?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDetails?: boolean;
  className?: string;
}

export const SoftAvatar: React.FC<SoftAvatarProps> = ({
  initials = 'JD',
  src,
  alt = 'Avatar',
  name = 'Jane Doe',
  statusText = 'Online',
  status = 'online',
  size = 'md',
  showDetails = true,
  className = '',
}) => {
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return {
          box: 'w-9 h-9 text-xs',
          dot: 'w-2.5 h-2.5 -bottom-0.5 -right-0.5',
          name: 'text-xs',
          status: 'text-[10px]',
        };
      case 'lg':
        return {
          box: 'w-16 h-16 text-lg',
          dot: 'w-4 h-4 bottom-0 right-0',
          name: 'text-base',
          status: 'text-sm',
        };
      case 'xl':
        return {
          box: 'w-20 h-20 text-xl',
          dot: 'w-5 h-5 bottom-0.5 right-0.5',
          name: 'text-lg',
          status: 'text-sm',
        };
      default: // md
        return {
          box: 'w-12 h-12 text-sm',
          dot: 'w-3.5 h-3.5 -bottom-0.5 -right-0.5',
          name: 'text-sm',
          status: 'text-xs',
        };
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'offline':
        return 'bg-gray-400 text-gray-500';
      case 'busy':
        return 'bg-rose-500 text-rose-500';
      case 'away':
        return 'bg-amber-400 text-amber-500';
      default:
        return 'bg-emerald-500 text-emerald-600';
    }
  };

  const dims = getDimensions();
  const statusColorClass = getStatusColor();

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Avatar Circle Container */}
      <div className="relative">
        <div
          className={`
            ${dims.box} rounded-full soft-surface soft-raised-sm
            flex items-center justify-center font-bold text-[var(--soft-text)]
            overflow-hidden
          `}
        >
          {src ? (
            <img src={src} alt={alt} className="w-full h-full object-cover" />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        {/* Status Indicator Dot */}
        {status && (
          <span
            className={`
              absolute ${dims.dot} rounded-full border-2 border-[var(--soft-surface)]
              ${statusColorClass.split(' ')[0]} shadow-[0_0_8px_rgba(16,185,129,0.5)]
            `}
          />
        )}
      </div>

      {/* User Info */}
      {showDetails && (
        <div className="flex flex-col">
          <span className={`font-bold text-[var(--soft-text)] leading-tight ${dims.name}`}>
            {name}
          </span>
          <span className={`font-medium ${dims.status} ${statusColorClass.split(' ')[1]}`}>
            {statusText}
          </span>
        </div>
      )}
    </div>
  );
};
