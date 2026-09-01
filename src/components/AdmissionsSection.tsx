import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Download, 
  Eye, 
  FileCheck2
} from 'lucide-react';
import { downloadAdmissionForm } from '../utils/admissionForm';
import { AdmissionFormModal } from './AdmissionFormModal';
import { SchoolCrest } from './SchoolCrest';

export const AdmissionsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Interactive Document Checklist state for parents
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    doc1: false,
    doc2: false,
    doc3: false,
    doc4: false,
  });

  const toggleDoc = (id: string) => {
    setCheckedDocs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleDirectDownload = () => {
    try {
      setIsDownloading(true);
      downloadAdmissionForm();
    } catch (err) {
      console.error('Error downloading PDF:', err);
    } finally {
      setTimeout(() => setIsDownloading(false), 500);
    }
  };

  const allChecked = Object.values(checkedDocs).every(Boolean);

  return (
    <section className="py-20 bg-[#F9F9F9]" id="admissions-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14" id="admissions-header">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#ff2121] font-bold text-xs uppercase tracking-widest border border-red-200 mb-3">
            Admissions & Enrolment
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ff2121] font-display">
            School Admission & Application Form
          </h2>
          <p className="mt-3 text-neutral-600 text-sm sm:text-base">
            Download the official Phikiswayo Primary School application form for Grades R through 7, prepare required documents, and complete registration at our office.
          </p>
        </div>

        {/* HERO CARD: Downloadable Admission Form PDF */}
        <div className="mb-14 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-red-500/30 overflow-hidden relative" id="admission-hero-card">
          
          {/* Subtle background glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#ff2121]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff2121]/20 border border-[#ff2121]/40 text-[#ff4d4d] text-xs font-bold uppercase tracking-wider">
                <FileCheck2 className="w-4 h-4" />
                <span>Official Department of Education Approved Form</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display leading-tight">
                Download Official School Admission Form (PDF)
              </h3>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Parents and guardians can download the official <strong>Application for Admission to School</strong> document. Complete the learner, sibling, medical, and parent details at your convenience, sign the parent declaration, and bring it along with certified copies to our school office.
              </p>

              {/* Highlights pills */}
              <div className="flex flex-wrap gap-3 pt-1 text-xs text-neutral-300">
                <span className="flex items-center gap-1.5 bg-neutral-800/80 px-3 py-1.5 rounded-lg border border-neutral-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4d4d]" /> 2-Page Standard A4 Printable
                </span>
                <span className="flex items-center gap-1.5 bg-neutral-800/80 px-3 py-1.5 rounded-lg border border-neutral-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4d4d]" /> Grade R – Grade 7
                </span>
                <span className="flex items-center gap-1.5 bg-neutral-800/80 px-3 py-1.5 rounded-lg border border-neutral-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4d4d]" /> Sibling & Medical Sections
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={handleDirectDownload}
                  disabled={isDownloading}
                  className="inline-flex items-center gap-2.5 bg-[#ff2121] hover:bg-[#e01a1a] text-white font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-red-900/40 transition transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base cursor-pointer"
                  id="admissions-download-pdf-hero"
                >
                  <Download className="w-5 h-5" />
                  <span>{isDownloading ? 'Preparing PDF...' : 'Download Application Form (PDF)'}</span>
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-bold px-6 py-4 rounded-xl border border-neutral-700 transition text-sm sm:text-base cursor-pointer"
                  id="admissions-preview-btn"
                >
                  <Eye className="w-5 h-5 text-[#ff4d4d]" />
                  <span>Preview & Print On Screen</span>
                </button>
              </div>
            </div>

            {/* Right: Document Miniature Preview Card */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div 
                onClick={() => setIsModalOpen(true)}
                className="w-full max-w-[280px] bg-white text-neutral-900 rounded-2xl p-5 shadow-2xl border border-neutral-300 transform hover:scale-105 transition-all duration-300 cursor-pointer group"
                id="doc-miniature-card"
              >
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2 mb-3">
                  <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-500">
                    Document Sample
                  </div>
                  <SchoolCrest size={36} variant="shield" />
                </div>
                
                <div className="text-[11px] font-black text-center mb-1 text-neutral-900">
                  APPLICATION FOR ADMISSION
                </div>
                <div className="text-[9px] font-bold text-center text-[#ff2121] mb-3">
                  PHIKISWAYO PRIMARY SCHOOL
                </div>

                {/* Simulated form rows */}
                <div className="space-y-1.5 mb-4 text-[8px] text-neutral-500">
                  <div className="h-4 bg-neutral-100 border border-neutral-200 rounded px-1.5 flex items-center justify-between font-semibold">
                    <span>Grade Applied For:</span>
                    <span>Accession No:</span>
                  </div>
                  <div className="h-4 bg-neutral-100 border border-neutral-200 rounded px-1.5 flex items-center font-semibold">
                    <span>Surname & First Name</span>
                  </div>
                  <div className="h-4 bg-neutral-100 border border-neutral-200 rounded px-1.5 flex items-center font-semibold">
                    <span>ID / Passport Number (13 digits)</span>
                  </div>
                  <div className="h-4 bg-neutral-100 border border-neutral-200 rounded px-1.5 flex items-center font-semibold">
                    <span>Parent / Guardian Information</span>
                  </div>
                </div>

                <div className="w-full py-2 bg-red-50 text-[#ff2121] text-[11px] font-extrabold rounded-lg text-center flex items-center justify-center gap-1.5 group-hover:bg-[#ff2121] group-hover:text-white transition">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click to Preview Full Form</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Clear Banner Stating In-Person Admissions Submission */}
        <div className="mb-12 bg-red-50 border-2 border-[#ff2121] rounded-2xl p-6 sm:p-8 shadow-md" id="admission-submission-banner">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="p-3.5 rounded-2xl bg-[#ff2121] text-white flex-shrink-0">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#ff2121] mb-1">
                Submission at School Administration Desk
              </h3>
              <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
                After downloading and completing the form, all learner registrations are submitted <strong>in person</strong> at our school administration office at 348 Khangela Street, Ntuzuma A. Please bring original and certified copies of all supporting documents.
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Admission Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" id="admission-steps-grid">
          
          {/* Step 1 */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm transition hover:shadow-md hover:border-[#ff2121] flex flex-col justify-between" id="admission-step-1-card">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#ff2121] text-white flex items-center justify-center font-extrabold text-xl mb-5 shadow-sm">
                1
              </div>
              <h4 className="text-lg font-bold text-neutral-900 mb-2">
                Download or Collect Form
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                Download the official 2-page PDF form above, or collect a physical hard-copy directly from the school administration office during standard hours.
              </p>
            </div>
            <button
              onClick={handleDirectDownload}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#ff2121] hover:underline cursor-pointer pt-2"
              id="admission-step-1-download"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Form</span>
            </button>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm transition hover:shadow-md hover:border-[#ff2121] flex flex-col justify-between" id="admission-step-2-card">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#ff2121] text-white flex items-center justify-center font-extrabold text-xl mb-5 shadow-sm">
                2
              </div>
              <h4 className="text-lg font-bold text-neutral-900 mb-2">
                Prepare Required Documents
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                Prepare certified copies of Parent/Guardian ID, Learner's Birth Certificate, Latest School Report, Immunisation Clinic Card, and official Transfer Card.
              </p>
            </div>
            <div className="text-xs text-neutral-500 font-semibold pt-2">
              Check off the list below ↓
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm transition hover:shadow-md hover:border-[#ff2121] flex flex-col justify-between" id="admission-step-3-card">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#ff2121] text-white flex items-center justify-center font-extrabold text-xl mb-5 shadow-sm">
                3
              </div>
              <h4 className="text-lg font-bold text-neutral-900 mb-2">
                Submit to Admissions Office
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                Submit the completed, signed form and all certified supporting documents directly to the school admissions committee at 348 Khangela St, Ntuzuma A.
              </p>
            </div>
            <div className="text-xs text-neutral-500 font-semibold pt-2">
              Mon – Fri: 07:30 – 15:30
            </div>
          </div>

        </div>

        {/* Document Checklist Helper */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-10 shadow-sm max-w-4xl mx-auto mb-14" id="documents-checklist-card">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-6 pb-4 border-b border-neutral-100">
            <div>
              <h3 className="text-xl font-bold text-[#ff2121] font-display">
                Required Supporting Documents Checklist
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500">
                Check off each item to ensure your admission folder is complete before visiting the office:
              </p>
            </div>
            {allChecked && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1.5" id="all-docs-ready-badge">
                <CheckCircle2 className="w-4 h-4" />
                <span>All Documents Ready!</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <label 
              className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition ${
                checkedDocs.doc1 
                  ? 'bg-red-50/50 border-[#ff2121]' 
                  : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
              }`}
              id="doc-check-item-1"
            >
              <input
                type="checkbox"
                checked={checkedDocs.doc1}
                onChange={() => toggleDoc('doc1')}
                className="mt-1 w-5 h-5 rounded text-[#ff2121] focus:ring-[#ff2121] accent-[#ff2121] cursor-pointer"
                id="doc-checkbox-1"
              />
              <div>
                <span className="text-sm font-bold text-neutral-900 block">
                  Certified Parent / Guardian ID
                </span>
                <span className="text-xs text-neutral-500">
                  Certified photocopy of South African ID document / smart ID card.
                </span>
              </div>
            </label>

            <label 
              className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition ${
                checkedDocs.doc2 
                  ? 'bg-red-50/50 border-[#ff2121]' 
                  : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
              }`}
              id="doc-check-item-2"
            >
              <input
                type="checkbox"
                checked={checkedDocs.doc2}
                onChange={() => toggleDoc('doc2')}
                className="mt-1 w-5 h-5 rounded text-[#ff2121] focus:ring-[#ff2121] accent-[#ff2121] cursor-pointer"
                id="doc-checkbox-2"
              />
              <div>
                <span className="text-sm font-bold text-neutral-900 block">
                  Learner's Birth Certificate
                </span>
                <span className="text-xs text-neutral-500">
                  Certified copy of unabridged or computerised birth certificate.
                </span>
              </div>
            </label>

            <label 
              className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition ${
                checkedDocs.doc3 
                  ? 'bg-red-50/50 border-[#ff2121]' 
                  : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
              }`}
              id="doc-check-item-3"
            >
              <input
                type="checkbox"
                checked={checkedDocs.doc3}
                onChange={() => toggleDoc('doc3')}
                className="mt-1 w-5 h-5 rounded text-[#ff2121] focus:ring-[#ff2121] accent-[#ff2121] cursor-pointer"
                id="doc-checkbox-3"
              />
              <div>
                <span className="text-sm font-bold text-neutral-900 block">
                  Latest School Report & Transfer Card
                </span>
                <span className="text-xs text-neutral-500">
                  Previous term academic report and official school transfer card.
                </span>
              </div>
            </label>

            <label 
              className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition ${
                checkedDocs.doc4 
                  ? 'bg-red-50/50 border-[#ff2121]' 
                  : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
              }`}
              id="doc-check-item-4"
            >
              <input
                type="checkbox"
                checked={checkedDocs.doc4}
                onChange={() => toggleDoc('doc4')}
                className="mt-1 w-5 h-5 rounded text-[#ff2121] focus:ring-[#ff2121] accent-[#ff2121] cursor-pointer"
                id="doc-checkbox-4"
              />
              <div>
                <span className="text-sm font-bold text-neutral-900 block">
                  Clinic Road to Health Card
                </span>
                <span className="text-xs text-neutral-500">
                  Official clinic card showing complete immunisation schedule.
                </span>
              </div>
            </label>

          </div>
        </div>

        {/* Callout Box with Phone Number */}
        <div className="bg-red-50 border-2 border-dashed border-red-300 rounded-2xl p-8 text-center max-w-3xl mx-auto" id="admission-contact-callout">
          <h4 className="text-xl sm:text-2xl font-bold text-[#ff2121] mb-2">
            Have questions or need to confirm admission dates?
          </h4>
          <p className="text-sm sm:text-base text-neutral-700 mb-6">
            Call our school office directly at <span className="font-bold text-[#ff2121]">081 509 1460</span> or visit us at 348 Khangela Street, Ntuzuma A.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:0815091460"
              className="inline-flex items-center gap-2.5 bg-[#ff2121] hover:bg-[#e01a1a] text-white font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 text-base cursor-pointer"
              id="admissions-call-btn"
            >
              <span>Call School Office: 081 509 1460</span>
            </a>

            <button
              onClick={handleDirectDownload}
              className="inline-flex items-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-md transition transform hover:-translate-y-0.5 text-base cursor-pointer"
              id="admissions-callout-download-btn"
            >
              <Download className="w-5 h-5 text-[#ff4d4d]" />
              <span>Download Form</span>
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Form Preview & Print Modal */}
      <AdmissionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
