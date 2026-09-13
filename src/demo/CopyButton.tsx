import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export interface CopyButtonProps {
  code: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  code,
  label = 'Copy Code',
  copiedLabel = 'Copied!',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`text-xs flex items-center gap-1.5 text-[var(--soft-text-muted)] hover:text-[var(--soft-primary)] cursor-pointer select-none transition-colors ${className}`}
      title={label}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-500" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
      <span>{copied ? copiedLabel : label}</span>
    </button>
  );
};

export default CopyButton;
