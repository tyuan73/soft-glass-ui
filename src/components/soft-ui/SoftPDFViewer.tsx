import React, { useState, useRef } from 'react';
import {
  FileText,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileCheck,
  Sparkles,
} from 'lucide-react';
import { SoftButton } from './SoftButton';

export interface SoftPDFViewerProps {
  url?: string;
  title?: string;
  subtitle?: string;
  totalPages?: number;
  initialPage?: number;
  allowDownload?: boolean;
  height?: string | number;
  className?: string;
}

export const SoftPDFViewer: React.FC<SoftPDFViewerProps> = ({
  url,
  title = 'Document Specification.pdf',
  subtitle = 'Classic Soft Neumorphic Design Guide',
  totalPages = 12,
  initialPage = 1,
  allowDownload = true,
  height = '520px',
  className = '',
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      ref={containerRef}
      className={`
        soft-surface rounded-3xl soft-raised-md overflow-hidden flex flex-col border border-white/20 transition-all duration-300
        ${isFullscreen ? 'fixed inset-4 z-50 shadow-2xl !h-[calc(100vh-32px)]' : ''}
        ${className}
      `}
      style={{ height: isFullscreen ? undefined : height }}
    >
      {/* 1. TOP HEADER TOOLBAR */}
      <div className="px-4 py-3 border-b border-white/20 flex flex-wrap items-center justify-between gap-3 bg-[var(--soft-surface)] select-none">
        {/* Document Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl soft-surface soft-pressed-xs flex items-center justify-center text-[var(--soft-primary)] shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-[var(--soft-text)] truncate">{title}</h4>
            <p className="text-xs text-[var(--soft-text-muted)] truncate">{subtitle}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center p-1 rounded-xl soft-surface soft-pressed-xs gap-1">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg text-[var(--soft-text-muted)] hover:text-[var(--soft-text)] cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-1 font-semibold text-[var(--soft-text)] min-w-[42px] text-center">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg text-[var(--soft-text-muted)] hover:text-[var(--soft-text)] cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Rotate button */}
          <SoftButton
            size="sm"
            onClick={handleRotate}
            title="Rotate 90 degrees"
            className="hidden sm:inline-flex"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </SoftButton>

          {/* Download button */}
          {allowDownload && url && (
            <a
              href={url}
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl soft-surface soft-raised-xs hover:soft-raised-sm text-xs font-semibold text-[var(--soft-text)] cursor-pointer"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Download</span>
            </a>
          )}

          {/* Open External / Popout */}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl soft-surface soft-raised-xs hover:soft-raised-sm text-[var(--soft-text)] cursor-pointer"
              title="Open in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {/* Fullscreen Toggle */}
          <SoftButton
            size="sm"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit fullscreen' : 'Maximize viewer'}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </SoftButton>
        </div>
      </div>

      {/* 2. MAIN DOCUMENT VIEWPORT (Sunken Neumorphic Well) */}
      <div className="flex-1 min-h-0 relative overflow-auto soft-pressed-xs bg-[var(--soft-bg)]/60 p-4 sm:p-8 flex items-center justify-center">
        {url ? (
          /* Actual PDF Embed if real URL provided */
          <div
            className="w-full h-full rounded-2xl overflow-hidden soft-raised-sm bg-white shadow-lg transition-transform duration-200 origin-center"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
            }}
          >
            <iframe
              src={`${url}#page=${currentPage}`}
              title={title}
              className="w-full h-full border-none"
            />
          </div>
        ) : (
          /* Simulated High-Fidelity Neumorphic Document Page */
          <div
            className="transition-transform duration-200 ease-out origin-top"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
            }}
          >
            <div className="w-[340px] sm:w-[480px] md:w-[580px] min-h-[720px] bg-white dark:bg-[#1a1d24] text-slate-800 dark:text-slate-200 rounded-2xl p-8 sm:p-12 shadow-2xl border border-black/5 dark:border-white/10 space-y-6 select-none">
              {/* Document Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-extrabold text-xs uppercase tracking-widest">
                    Design System Specification
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                  REV 2.4
                </div>
              </div>

              {/* Title & Page Header */}
              <div className="space-y-1 pt-2">
                <span className="text-[11px] font-bold text-blue-500 uppercase tracking-wider">
                  Chapter {currentPage}: Foundational Optics
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  Classic Soft Light Physics & Surface Geometry
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Document ID: SPEC-2026-NEUMO • Published September 2026
                </p>
              </div>

              {/* Simulated Content Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Classic Soft (Neumorphism) establishes a physical continuity between interactive
                  UI elements and their background material. Unlike flat interfaces that rely on
                  borders or elevated card dropshadows, soft surfaces simulate physical extrusions
                  and indentations.
                </p>

                {/* Technical Callout Box */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
                    <span>Twin-Light Formulation</span>
                    <span className="font-mono text-[10px] text-blue-500">Angle: -135°</span>
                  </div>
                  <pre className="text-[11px] font-mono text-slate-500 dark:text-slate-400 overflow-x-auto p-2 bg-white dark:bg-black/30 rounded-lg">
                    {`box-shadow:
  8px 8px 16px rgba(163, 177, 198, 0.6),
  -8px -8px 16px rgba(255, 255, 255, 0.85);`}
                  </pre>
                </div>

                <p>
                  On page {currentPage}, the elevation parameters are defined across five primary
                  scales (xs, sm, md, lg, xl). Touch surfaces depress smoothly into inset state upon
                  activation, giving direct visceral feedback without requiring high-chroma visual
                  noise.
                </p>
              </div>

              {/* Document Diagram Placeholder */}
              <div className="h-32 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-center p-4">
                <Sparkles className="w-6 h-6 text-slate-400 mb-1" />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Figure {currentPage}.1: Virtual Specular Ray Propagation Diagram
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Scale: 100% Vectorized</span>
              </div>

              {/* Page Footer */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>CONFIDENTIAL & PROPRIETARY</span>
                <span className="font-mono font-bold">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. BOTTOM PAGER FOOTER */}
      <div className="px-4 py-2.5 border-t border-white/20 flex items-center justify-between bg-[var(--soft-surface)] select-none">
        {/* Page status */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--soft-text-muted)]">Page</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val)) {
                setCurrentPage(Math.max(1, Math.min(totalPages, val)));
              }
            }}
            className="w-12 px-2 py-0.5 rounded-lg soft-surface soft-pressed-xs text-xs font-mono text-center font-bold text-[var(--soft-text)] outline-none"
          />
          <span className="text-xs text-[var(--soft-text-muted)]">of {totalPages}</span>
        </div>

        {/* Prev / Next Pagination Controls */}
        <div className="flex items-center gap-2">
          <SoftButton
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            icon={<ChevronLeft className="w-3.5 h-3.5" />}
          >
            Prev
          </SoftButton>
          <SoftButton
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            icon={<ChevronRight className="w-3.5 h-3.5" />}
          >
            Next
          </SoftButton>
        </div>
      </div>
    </div>
  );
};

export default SoftPDFViewer;
