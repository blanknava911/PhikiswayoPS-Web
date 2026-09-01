import React, { useState } from 'react';
import { Download, ExternalLink, X, FileText, CheckCircle } from 'lucide-react';
import { ADMISSION_FORM_PATH, ADMISSION_FORM_PREVIEW_PAGES, downloadAdmissionForm, openAdmissionForm } from '../utils/admissionForm';

interface AdmissionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdmissionFormModal: React.FC<AdmissionFormModalProps> = ({ isOpen, onClose }) => {
  const [activePage, setActivePage] = useState<1 | 2>(1);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    try {
      setIsDownloading(true);
      downloadAdmissionForm();
    } catch (err) {
      console.error('Error downloading PDF:', err);
    } finally {
      setTimeout(() => setIsDownloading(false), 600);
    }
  };

  const handlePrint = () => {
    openAdmissionForm();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      id="admission-modal-backdrop"
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-neutral-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        id="admission-form-dialog"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff2121] flex items-center justify-center text-white shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display leading-tight">
                Official Admission Application Form
              </h3>
              <p className="text-xs text-neutral-400">
                Phikiswayo Primary School • Grades R - 7 • Official PDF
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition cursor-pointer"
              title="Open Application Form"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open PDF</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#ff2121] hover:bg-[#e01a1a] text-white text-xs sm:text-sm font-extrabold shadow-md transition transform hover:scale-105 active:scale-95 cursor-pointer"
              id="modal-download-pdf-btn"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Preparing...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview toolbar */}
        <div className="bg-neutral-100 px-6 py-3 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider">
              Viewing Page:
            </span>
            <div className="inline-flex rounded-lg bg-white p-1 border border-neutral-200 shadow-xs">
              {[1, 2].map((page) => (
                <button
                  key={page}
                  onClick={() => setActivePage(page as 1 | 2)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
                    activePage === page
                      ? 'bg-[#ff2121] text-white shadow-xs'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  Page {page}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-600">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Showing image preview to avoid Chrome PDF blocking</span>
          </div>
        </div>

        {/* Form Document Viewport */}
        <div className="p-4 sm:p-8 overflow-y-auto bg-neutral-200/60 flex-1 flex justify-center">
          <a
            href={ADMISSION_FORM_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full max-w-[820px]"
            title="Open official admission PDF in a new tab"
          >
            <img
              src={ADMISSION_FORM_PREVIEW_PAGES[activePage - 1]}
              alt={`Admission form preview page ${activePage}`}
              className="w-full rounded-xl border border-neutral-300 bg-white shadow-xl"
            />
          </a>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-white border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-neutral-500 text-center sm:text-left">
            Download or print this 2-page application, complete and sign it, and bring all certified supporting documents to the school office.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 text-xs sm:text-sm font-bold hover:bg-neutral-100 transition cursor-pointer"
            >
              Close Preview
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-6 py-2.5 rounded-xl bg-[#ff2121] hover:bg-[#e01a1a] text-white text-xs sm:text-sm font-extrabold shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Downloading...' : 'Download Form (PDF)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
