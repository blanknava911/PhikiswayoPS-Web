import React, { useState } from 'react';
import { Download, Printer, X, FileText, CheckCircle } from 'lucide-react';
import { generateAdmissionPdf } from '../utils/generateAdmissionPdf';
import { SchoolCrest } from './SchoolCrest';

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
      const doc = generateAdmissionPdf();
      doc.save('Phikiswayo_Primary_School_Application_For_Admission.pdf');
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setTimeout(() => setIsDownloading(false), 600);
    }
  };

  const handlePrint = () => {
    try {
      const doc = generateAdmissionPdf();
      const pdfBlobUrl = doc.output('bloburl');
      const printWindow = window.open(pdfBlobUrl, '_blank');
      if (printWindow) {
        printWindow.focus();
      }
    } catch {
      window.print();
    }
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
                Phikiswayo Primary School • Grades R – 7 • 2-Page Document
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition cursor-pointer"
              title="Print Application Form"
            >
              <Printer className="w-4 h-4" />
              <span>Print Form</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#ff2121] hover:bg-[#e01a1a] text-white text-xs sm:text-sm font-extrabold shadow-md transition transform hover:scale-105 active:scale-95 cursor-pointer"
              id="modal-download-pdf-btn"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Generating...' : 'Download PDF'}</span>
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

        {/* Page Switcher & Download Quick Banner */}
        <div className="bg-neutral-100 px-6 py-3 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider">
              Viewing Page:
            </span>
            <div className="inline-flex rounded-lg bg-white p-1 border border-neutral-200 shadow-xs">
              <button
                onClick={() => setActivePage(1)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
                  activePage === 1 
                    ? 'bg-[#ff2121] text-white shadow-xs' 
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Page 1 (Learner & Medical)
              </button>
              <button
                onClick={() => setActivePage(2)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
                  activePage === 2 
                    ? 'bg-[#ff2121] text-white shadow-xs' 
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Page 2 (Parents, Siblings & Declaration)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-600">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Ready for direct print or PDF download to complete by hand</span>
          </div>
        </div>

        {/* Form Document Viewport */}
        <div className="p-4 sm:p-8 overflow-y-auto bg-neutral-200/60 flex-1 flex justify-center">
          <div className="w-full max-w-[800px] bg-white border border-neutral-300 shadow-xl rounded-xl p-6 sm:p-10 font-sans text-neutral-900 text-xs">
            
            {/* PAGE 1 CONTENT */}
            {activePage === 1 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                {/* Form Header */}
                <div className="flex justify-between items-start border-b-2 border-black pb-3">
                  <div>
                    <div className="text-sm sm:text-base font-black tracking-wide uppercase">
                      Application for Admission to School
                    </div>
                    <div className="mt-1 text-base sm:text-lg font-black text-black">
                      PHIKISWAYO PRIMARY SCHOOL
                    </div>
                    <div className="text-[11px] text-neutral-700 font-medium">
                      A348 KHANGELA STREET, DURBAN, 4360<br />
                      Telephone: <strong>081 509 1460 / 075 - 2402030</strong>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-bold text-neutral-500">Page 1</span>
                    <SchoolCrest size={64} variant="shield" />
                  </div>
                </div>

                {/* Important Notice */}
                <div className="bg-neutral-100 border border-neutral-400 p-2.5 rounded-sm text-[11px] leading-relaxed">
                  <strong>Note:</strong> This form must be completed in full. All changes to be initialed or signed by parent / guardian. Completing the form does not necessarily mean that the learner has been accepted into the school.
                </div>

                {/* Grade & Accession Grid */}
                <div className="grid grid-cols-4 border border-black divide-x divide-black text-[11px]">
                  <div className="p-1.5"><span className="font-bold block">Grade Applied For:</span></div>
                  <div className="p-1.5"><span className="font-bold block">Highest Grade Passed:</span></div>
                  <div className="p-1.5"><span className="font-bold block">Year Passed:</span></div>
                  <div className="p-1.5"><span className="font-bold block">Accession No:</span></div>
                </div>

                {/* Learner Personal Details */}
                <div className="border border-black divide-y divide-black text-[11px]">
                  <div className="grid grid-cols-12 divide-x divide-black">
                    <div className="col-span-6 p-1.5 font-bold">Surname:</div>
                    <div className="col-span-2 p-1.5 font-bold">Initials:</div>
                    <div className="col-span-4 p-1.5 font-bold">Nick Name:</div>
                  </div>

                  <div className="grid grid-cols-12 divide-x divide-black">
                    <div className="col-span-6 p-1.5 font-bold">First Name:</div>
                    <div className="col-span-6 p-1.5 font-bold">Other Names:</div>
                  </div>

                  <div className="grid grid-cols-12 divide-x divide-black">
                    <div className="col-span-6 p-1.5 font-bold">
                      Date Of Birth: <span className="font-normal text-neutral-500 ml-2">YYYY / MM / DD</span>
                    </div>
                    <div className="col-span-6 p-1.5 font-bold">
                      Gender: <span className="font-normal ml-3">[ ] Male</span> <span className="font-normal ml-3">[ ] Female</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 divide-x divide-black">
                    <div className="col-span-4 p-1.5 font-bold">Race:</div>
                    <div className="col-span-8 p-1.5 font-bold flex items-center justify-between">
                      <span>Identification / Passport No:</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 13 }).map((_, i) => (
                          <div key={i} className="w-3.5 h-4 border border-black bg-neutral-50"></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 divide-x divide-black">
                    <div className="col-span-6 p-1.5 font-bold">Country of Residence:</div>
                    <div className="col-span-6 p-1.5 font-bold">Citizenship:</div>
                  </div>

                  <div className="p-1.5 font-bold">
                    If SA, indicate province of residence:
                  </div>

                  <div className="grid grid-cols-12 divide-x divide-black">
                    <div className="col-span-6 p-1.5 font-bold min-h-[44px]">Physical Address:</div>
                    <div className="col-span-6 divide-y divide-black">
                      <div className="p-1 font-bold">Home Telephone:</div>
                      <div className="p-1 font-bold">Emergency Telephone:</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 divide-x divide-black">
                    <div className="col-span-6 p-1.5 font-bold">City/Suburb:</div>
                    <div className="col-span-6 p-1.5 font-bold">Learner Cell:</div>
                  </div>

                  <div className="grid grid-cols-12 divide-x divide-black">
                    <div className="col-span-2 p-1.5 font-bold">Code:</div>
                    <div className="col-span-4 p-1.5 font-bold">Home Language:</div>
                    <div className="col-span-6 p-1.5 font-bold">Preferred Language of Instruction:</div>
                  </div>

                  <div className="grid grid-cols-12 divide-x divide-black">
                    <div className="col-span-3 p-1.5 font-bold">Boarder: [ ] Yes [ ] No</div>
                    <div className="col-span-5 p-1.5 font-bold text-[10px]">
                      Deceased: [ ] Mother [ ] Father [ ] Both
                    </div>
                    <div className="col-span-4 p-1.5 font-bold">Mode of transport:</div>
                  </div>

                  <div className="grid grid-cols-12 divide-x divide-black">
                    <div className="col-span-4 p-1.5 font-bold">Religion:</div>
                    <div className="col-span-8 p-1.5 font-bold text-[10px]">
                      For Grade 1: Pre-primary: [ ] None [ ] Non-Formal [ ] Formal
                    </div>
                  </div>
                </div>

                {/* Previous School */}
                <div className="border border-black divide-y divide-black text-[11px]">
                  <div className="bg-neutral-100 p-1 font-bold">Previous School Information</div>
                  <div className="p-1.5 font-bold">Name of Previous School:</div>
                  <div className="p-1.5 font-bold">Previous School Address:</div>
                  <div className="grid grid-cols-3 divide-x divide-black">
                    <div className="p-1.5 font-bold">Code:</div>
                    <div className="p-1.5 font-bold">Province:</div>
                    <div className="p-1.5 font-bold">Country:</div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="border border-black divide-y divide-black text-[11px]">
                  <div className="bg-neutral-100 p-1 font-bold">Learner Medical Information</div>
                  <div className="grid grid-cols-2 divide-x divide-black">
                    <div className="p-1.5 font-bold">Medical Aid Number:</div>
                    <div className="p-1.5 font-bold">Medical Aid Name:</div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-black">
                    <div className="p-1.5 font-bold">Main Member:</div>
                    <div className="p-1.5 font-bold">Doctor Name & Tel:</div>
                  </div>
                  <div className="p-1.5 font-bold">Medical Condition & Allergies:</div>
                </div>

                {/* Document Requirements at Bottom */}
                <div className="bg-red-50/70 border border-red-200 p-3 rounded-lg text-[11px]">
                  <div className="font-bold text-[#ff2121] mb-1">
                    If accepted, submit the following certified copies:
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-neutral-800">
                    <div>1. Copy of Immunisation Records (Clinic Card)</div>
                    <div>2. Copy of Birth Certificate</div>
                    <div>3. Latest Progress Report from Previous School</div>
                    <div>4. Official Transfer Letter / Card</div>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 2 CONTENT */}
            {activePage === 2 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                {/* Header */}
                <div className="flex justify-between items-center border-b-2 border-black pb-2">
                  <div className="text-sm sm:text-base font-black tracking-wide uppercase">
                    Application for Admission to School — Page 2
                  </div>
                  <span className="text-xs font-bold text-neutral-500">Page 2</span>
                </div>

                {/* Siblings */}
                <div className="border border-black divide-y divide-black text-[11px]">
                  <div className="bg-neutral-100 p-1 font-bold">Siblings Currently at Phikiswayo Primary</div>
                  <div className="grid grid-cols-2 divide-x divide-black">
                    <div className="p-1.5 font-bold">Number of other Children at this school:</div>
                    <div className="p-1.5 font-bold">Position in family (e.g. 1st):</div>
                  </div>
                  <div className="p-1.5">
                    <div className="grid grid-cols-12 font-bold mb-1 border-b pb-1">
                      <div className="col-span-9">Sibling Full Name:</div>
                      <div className="col-span-3">Grade:</div>
                    </div>
                    <div className="space-y-1 text-neutral-400">
                      <div className="border-b border-dashed border-neutral-300 py-1">1.</div>
                      <div className="border-b border-dashed border-neutral-300 py-1">2.</div>
                      <div className="py-1">3.</div>
                    </div>
                  </div>
                </div>

                {/* Parent / Guardian Information */}
                <div className="border border-black divide-y divide-black text-[11px]">
                  <div className="bg-neutral-100 p-1 font-bold flex justify-between items-center">
                    <span>Parent / Guardian Information</span>
                    <span className="text-[9px] font-normal text-neutral-600">
                      Complete separate form for parents at different addresses
                    </span>
                  </div>

                  <div className="grid grid-cols-12 divide-x divide-black">
                    <div className="col-span-2 p-1.5 font-bold">Title:</div>
                    <div className="col-span-2 p-1.5 font-bold">Initials:</div>
                    <div className="col-span-8 p-1.5 font-bold">Surname:</div>
                  </div>

                  <div className="grid grid-cols-12 divide-x divide-black">
                    <div className="col-span-6 p-1.5 font-bold">First Name:</div>
                    <div className="col-span-6 p-1.5 font-bold">Gender: [ ] Male [ ] Female</div>
                  </div>

                  <div className="grid grid-cols-12 divide-x divide-black">
                    <div className="col-span-6 p-1.5 font-bold flex items-center justify-between">
                      <span>ID Number:</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 13 }).map((_, i) => (
                          <div key={i} className="w-3.5 h-4 border border-black bg-neutral-50"></div>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-6 p-1.5 font-bold">
                      Account Payer: [ ] Yes [ ] No
                    </div>
                  </div>

                  <div className="p-1.5 font-bold">Residential Street Address:</div>

                  <div className="grid grid-cols-12 divide-x divide-black">
                    <div className="col-span-8 p-1.5 font-bold">City/Suburb:</div>
                    <div className="col-span-4 p-1.5 font-bold">Postal Code:</div>
                  </div>

                  <div className="grid grid-cols-12 divide-x divide-black">
                    <div className="col-span-6 p-1.5 font-bold">Occupation:</div>
                    <div className="col-span-6 p-1.5 font-bold">Employer:</div>
                  </div>

                  <div className="grid grid-cols-12 divide-x divide-black">
                    <div className="col-span-6 p-1.5 font-bold">Spouse Surname & Name:</div>
                    <div className="col-span-6 p-1.5 font-bold">Spouse ID / Cell:</div>
                  </div>
                </div>

                {/* Contact Numbers */}
                <div className="border border-black divide-y divide-black text-[11px]">
                  <div className="bg-neutral-100 p-1 font-bold">Contact Numbers & Email</div>
                  <div className="grid grid-cols-2 divide-x divide-black">
                    <div className="p-1.5 font-bold">Home Tel:</div>
                    <div className="p-1.5 font-bold">Cell Number:</div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-black">
                    <div className="p-1.5 font-bold">Work Tel:</div>
                    <div className="p-1.5 font-bold">Email Address:</div>
                  </div>
                </div>

                {/* Parent Declaration */}
                <div className="border border-black p-3 space-y-3 text-[11px] bg-neutral-50">
                  <p className="font-semibold text-neutral-800">
                    "I hereby declare that to the best of my knowledge, the above information as supplied is accurate and correct."
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <span className="block font-bold mb-1">Name of Parent / Guardian (Print):</span>
                      <div className="border-b border-black h-6"></div>
                    </div>
                    <div>
                      <span className="block font-bold mb-1">Signature of Parent / Guardian:</span>
                      <div className="border-b border-black h-6"></div>
                    </div>
                  </div>

                  <div className="w-48">
                    <span className="block font-bold mb-1">Date:</span>
                    <div className="border-b border-black h-6"></div>
                  </div>
                </div>

                {/* Office Use Only */}
                <div className="border border-black divide-y divide-black text-[10px]">
                  <div className="bg-neutral-200 p-1 font-bold">Office Use Only</div>
                  <div className="grid grid-cols-3 divide-x divide-black">
                    <div className="p-1 font-bold">1. Date Received:</div>
                    <div className="p-1 font-bold">2. Status: [ ] Accepted</div>
                    <div className="p-1 font-bold">3. Accession Number:</div>
                  </div>
                  <div className="p-1 font-bold">
                    4. Status: [ ] Rejected &nbsp;&nbsp;|&nbsp;&nbsp; 5. Reason for Rejection:
                  </div>
                  <div className="p-1 font-bold">
                    6. Documentation Received: [ ] 6a Immunisation [ ] 6b Birth Cert [ ] 6c Progress Report [ ] 6d Transfer Letter
                  </div>
                </div>
              </div>
            )}

          </div>
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
