import React, { useState } from 'react';
import { Download, ExternalLink, X, FileText, Printer, ZoomIn, ZoomOut, CheckCircle2, AlertCircle } from 'lucide-react';
import { ADMISSION_FORM_PATH, ADMISSION_FORM_FILENAME, openAdmissionForm } from '../utils/admissionForm';
import { GeneratedAdmissionForm } from './GeneratedAdmissionForm';

interface AdmissionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPage?: 1 | 2 | 'all';
}

export const AdmissionFormModal: React.FC<AdmissionFormModalProps> = ({
  isOpen,
  onClose,
  initialPage = 'all',
}) => {
  const [activePage, setActivePage] = useState<1 | 2 | 'all'>(initialPage);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 15, 130));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 15, 70));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      id="admission-modal-backdrop"
    >
      <div
        className="bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-700 w-full max-w-5xl max-h-[94vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        id="admission-form-dialog"
      >
        {/* Modal Top Bar */}
        <div className="px-5 sm:px-6 py-4 bg-neutral-950 text-white flex items-center justify-between border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff2121] flex items-center justify-center text-white shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display leading-tight">
                Official Admission Application Form
              </h3>
              <p className="text-xs text-neutral-400">
                Phikiswayo Primary School • Grades R - 7 • Generated Document Reader
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition cursor-pointer"
              title="Print Application Form"
              id="modal-print-btn"
            >
              <Printer className="w-4 h-4 text-neutral-300" />
              <span>Print Form</span>
            </button>

            <button
              onClick={openAdmissionForm}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition cursor-pointer"
              title="Open Official PDF in New Tab"
              id="modal-open-tab-btn"
            >
              <ExternalLink className="w-4 h-4 text-neutral-300" />
              <span>Open in Tab</span>
            </button>

            {/* Direct Native Anchor Download (bypasses Chrome iframe block) */}
            <a
              href={ADMISSION_FORM_PATH}
              download={ADMISSION_FORM_FILENAME}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl bg-[#ff2121] hover:bg-[#e01a1a] text-white text-xs sm:text-sm font-extrabold shadow-md transition transform hover:scale-105 active:scale-95 cursor-pointer no-underline"
              id="modal-download-pdf-btn"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer ml-1"
              aria-label="Close modal"
              id="modal-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Toolbar */}
        <div className="bg-neutral-800/95 px-5 sm:px-6 py-2.5 border-b border-neutral-700 flex flex-wrap items-center justify-between gap-3 shrink-0 text-white">
          {/* Page Selector Tabs */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider hidden sm:inline">
              Page View:
            </span>
            <div className="inline-flex rounded-lg bg-neutral-900 p-1 border border-neutral-700 shadow-xs">
              <button
                onClick={() => setActivePage('all')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
                  activePage === 'all'
                    ? 'bg-[#ff2121] text-white shadow-xs'
                    : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                All Pages
              </button>
              <button
                onClick={() => setActivePage(1)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
                  activePage === 1
                    ? 'bg-[#ff2121] text-white shadow-xs'
                    : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                Page 1
              </button>
              <button
                onClick={() => setActivePage(2)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
                  activePage === 2
                    ? 'bg-[#ff2121] text-white shadow-xs'
                    : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                Page 2
              </button>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center rounded-lg bg-neutral-900 border border-neutral-700 px-1 py-0.5 text-xs text-neutral-300">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 70}
                className="p-1 hover:text-white disabled:opacity-40 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="px-2 font-mono font-semibold hover:text-white cursor-pointer text-[11px]"
                title="Reset Zoom"
              >
                {zoomLevel}%
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 130}
                className="p-1 hover:text-white disabled:opacity-40 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Crystal Sharp Vector Reader</span>
            </div>
          </div>
        </div>

        {/* Browser Notice Banner */}
        <div className="bg-amber-950/40 border-b border-amber-800/50 px-5 py-2 flex items-center justify-between text-[11px] text-amber-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Tip: If Chrome restricts automatic downloads, click <strong>Open in Tab</strong> or <strong>Print Form</strong> to view and save directly.
            </span>
          </div>
          <button
            onClick={openAdmissionForm}
            className="text-amber-300 hover:text-white underline font-bold ml-2 shrink-0 cursor-pointer"
          >
            Open in Tab
          </button>
        </div>

        {/* Form Document Viewport */}
        <div className="p-3 sm:p-6 md:p-8 overflow-y-auto bg-neutral-800 flex-1 flex justify-center custom-scrollbar">
          <div
            className="w-full transition-transform duration-150 origin-top flex justify-center"
            style={{ transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : undefined }}
          >
            <GeneratedAdmissionForm page={activePage} className="w-full" />
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 sm:px-6 py-3.5 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-neutral-400 text-center sm:text-left">
            Print or download this 2-page application, complete all sections, and submit with certified documents at the school office.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Form</span>
            </button>
            <a
              href={ADMISSION_FORM_PATH}
              download={ADMISSION_FORM_FILENAME}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-xl bg-[#ff2121] hover:bg-[#e01a1a] text-white text-xs sm:text-sm font-extrabold shadow-md transition flex items-center gap-2 cursor-pointer no-underline"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
