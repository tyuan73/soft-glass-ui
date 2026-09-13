import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { SoftButton } from './SoftButton';

export interface SoftDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showShadow?: boolean;
  className?: string;
}

export const SoftDialog: React.FC<SoftDialogProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  size = 'md',
  showShadow = false,
  className = '',
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [open]);

  // Fallback light-dismiss for browsers that do not yet support closedby="any"
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    const handleClick = (e: MouseEvent) => {
      if (!('closedBy' in HTMLDialogElement.prototype)) {
        if (e.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isContent =
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width;
        if (!isContent) {
          onClose();
        }
      }
    };

    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('click', handleClick);

    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm';
      case 'lg':
        return 'max-w-2xl';
      case 'xl':
        return 'max-w-4xl';
      default:
        return 'max-w-lg';
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={title ? 'soft-dialog-title' : undefined}
      className={`
        fixed inset-0 m-auto bg-transparent p-4 outline-none border-0
        backdrop:bg-black/45 backdrop:backdrop-blur-sm
        animate-in fade-in zoom-in-95 duration-200
        ${getSizeClass()} w-full ${className}
      `}
    >
      {/* Modal Surface Box (No heavy shadow, clean soft surface & border) */}
      <div
        className={`
          relative soft-surface rounded-3xl p-6 sm:p-8 flex flex-col max-h-[90vh]
          border border-white/30 dark:border-white/10
          ${showShadow ? 'soft-raised-xl' : 'shadow-none'}
        `}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {title && (
              <h3
                id="soft-dialog-title"
                className="text-xl sm:text-2xl font-extrabold text-[var(--soft-text)] tracking-tight"
              >
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs sm:text-sm text-[var(--soft-text-muted)] mt-1 font-medium">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-full soft-surface soft-raised-xs flex items-center justify-center text-[var(--soft-text-muted)] hover:text-[var(--soft-text)] hover:soft-raised-sm active:soft-pressed-xs cursor-pointer shrink-0"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto pr-1 my-2 text-sm text-[var(--soft-text)] leading-relaxed">
          {children}
        </div>

        {/* Action Footer */}
        <div className="border-t border-white/20 pt-5 mt-4 flex items-center justify-end gap-3">
          {footer ? (
            footer
          ) : (
            <>
              <SoftButton variant="raised" size="md" onClick={onClose}>
                {cancelLabel}
              </SoftButton>
              {onConfirm && (
                <SoftButton variant="accent" size="md" onClick={onConfirm}>
                  {confirmLabel}
                </SoftButton>
              )}
            </>
          )}
        </div>
      </div>
    </dialog>
  );
};
