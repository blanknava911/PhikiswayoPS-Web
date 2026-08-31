import React from 'react';
import { TabType } from '../types';
import { SchoolCrest } from './SchoolCrest';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp, 
  Download
} from 'lucide-react';
import { generateAdmissionPdf } from '../utils/generateAdmissionPdf';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E0E0E] text-white border-t-4 border-[#ff2121] pt-14 pb-8 transition-colors" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800" id="footer-main-grid">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4" id="footer-brand-col">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-neutral-900 border border-neutral-800">
                <SchoolCrest size={40} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">
                  Phikiswayo Primary School
                </h3>
                <p className="text-xs text-[#ff4d4d] font-semibold italic">
                  Strive for Success
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              Providing quality foundational CAPS education for Grade R to Grade 7 learners in Ntuzuma, KwaZulu-Natal. Empowering future leaders with resilience and academic excellence.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3" id="footer-nav-col">
            <h4 className="text-sm font-bold text-[#ff4d4d] uppercase tracking-wider font-sans">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              <li>
                <button
                  onClick={() => { setActiveTab('home'); scrollToTop(); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  id="footer-nav-home"
                >
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('about'); scrollToTop(); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  id="footer-nav-about"
                >
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('admissions'); scrollToTop(); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  id="footer-nav-admissions"
                >
                  <span>Admissions Guide</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const doc = generateAdmissionPdf();
                    doc.save('Phikiswayo_Primary_School_Application_For_Admission.pdf');
                  }}
                  className="text-[#ff4d4d] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-bold"
                  id="footer-nav-download-pdf"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Admission Form (PDF)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('events'); scrollToTop(); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  id="footer-nav-events"
                >
                  <span>Events</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('contact'); scrollToTop(); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  id="footer-nav-contact"
                >
                  <span>Contact & Socials</span>
                </button>
              </li>
            </ul>
          </div>

          {/* School Contact Details */}
          <div className="lg:col-span-4 space-y-3" id="footer-contact-col">
            <h4 className="text-sm font-bold text-[#ff4d4d] uppercase tracking-wider font-sans">
              School Contact
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ff2121] flex-shrink-0 mt-0.5" />
                <span>348 Khangela St, Ntuzuma A, 4360</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ff2121] flex-shrink-0" />
                <span>081 509 1460</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ff2121] flex-shrink-0" />
                <span className="truncate">PHIKISWAYO-PS@kznschools.gov.za</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500" id="footer-bottom-bar">
          <p>© 2026 Phikiswayo Primary School. Ntuzuma, KwaZulu-Natal. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition text-neutral-400 cursor-pointer"
            id="footer-back-to-top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
