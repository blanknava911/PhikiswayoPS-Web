import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Check, 
  Copy,
  Music2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section className="py-20 bg-[#F9F9F9]" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Prominent "Follow & Like Our Pages" Section */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 sm:p-10 mb-16 shadow-md flex flex-col md:flex-row items-center justify-between gap-6" id="social-follow-banner">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-[#ff2121] font-bold text-xs uppercase tracking-wider mb-2">
              Community & Socials
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#ff2121] font-display">
              Follow & Like Our Pages
            </h3>
            <p className="text-sm text-neutral-600 mt-1">
              Stay connected with school announcements, sports fixtures, and learner celebrations.
            </p>
          </div>

          {/* Social Media Buttons: Facebook, TikTok, WhatsApp placeholder */}
          <div className="flex flex-wrap items-center gap-3" id="social-buttons-group">
            
            {/* Facebook */}
            <a
              href="https://www.facebook.com/people/Phikiswayo-Primary-School/61590967820774/#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#1877F2] hover:bg-[#166fe5] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              id="social-btn-facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@phikiswayo.primar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-neutral-950 hover:bg-neutral-800 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              id="social-btn-tiktok"
            >
              <Music2 className="w-5 h-5" />
              <span>TikTok</span>
            </a>

            {/* WhatsApp */}
            <button
              type="button"
              disabled
              title="WhatsApp link will be added once the official number or link is supplied."
              className="inline-flex items-center gap-2.5 bg-neutral-200 text-neutral-500 px-5 py-3 rounded-xl font-bold text-sm shadow-sm cursor-not-allowed"
              id="social-btn-whatsapp-pending"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp Pending</span>
            </button>

          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14" id="contact-directory-header">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#ff2121] font-bold text-xs uppercase tracking-widest border border-red-200 mb-3">
            Official Directory
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ff2121] font-display">
            School Contact Directory
          </h2>
          <p className="mt-3 text-neutral-600 text-sm sm:text-base">
            Reach out to our administrative team or visit during official school hours.
          </p>
        </div>

        {/* School Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="contact-cards-grid">
          
          {/* Address */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition" id="contact-card-address">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-100 text-[#ff2121] flex items-center justify-center mb-5">
              <MapPin className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-[#ff2121] mb-2">
              Physical Address
            </h4>
            <p className="text-sm text-neutral-700 leading-relaxed mb-4">
              <strong>Phikiswayo Primary School</strong><br />
              348 Khangela St, Ntuzuma A<br />
              Ntuzuma, 4360<br />
              KwaZulu-Natal, South Africa
            </p>
            <button
              onClick={() => handleCopy('348 Khangela St, Ntuzuma A, 4360', 'address')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-[#ff2121] bg-neutral-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
              id="copy-address-btn"
            >
              {copiedField === 'address' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === 'address' ? 'Copied!' : 'Copy Address'}</span>
            </button>
          </div>

          {/* Phone */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition" id="contact-card-phone">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-100 text-[#ff2121] flex items-center justify-center mb-5">
              <Phone className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-[#ff2121] mb-2">
              Telephone & Enquiries
            </h4>
            <p className="text-sm text-neutral-700 leading-relaxed mb-4">
              Phone: <strong className="text-base text-neutral-900">081 509 1460</strong><br />
              Office Hours: Mon – Fri: 07:30 – 15:30<br />
              Direct parent helpline & office desk
            </p>
            <div className="flex items-center justify-center gap-2">
              <a
                href="tel:0815091460"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#ff2121] hover:bg-[#e01a1a] px-3.5 py-1.5 rounded-lg transition shadow-sm cursor-pointer"
                id="call-now-btn"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
              <button
                onClick={() => handleCopy('081 509 1460', 'phone')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-[#ff2121] bg-neutral-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
                id="copy-phone-btn"
              >
                {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'phone' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition" id="contact-card-email">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-100 text-[#ff2121] flex items-center justify-center mb-5">
              <Mail className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-[#ff2121] mb-2">
              Official Email
            </h4>
            <p className="text-sm text-neutral-700 leading-relaxed mb-4 truncate font-medium">
              PHIKISWAYO-PS@kznschools.gov.za<br />
              <span className="text-xs text-neutral-500">
                Pinetown District • KZN Department of Basic Education
              </span>
            </p>
            <div className="flex items-center justify-center gap-2">
              <a
                href="mailto:PHIKISWAYO-PS@kznschools.gov.za"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#ff2121] hover:bg-[#e01a1a] px-3.5 py-1.5 rounded-lg transition shadow-sm cursor-pointer"
                id="email-us-btn"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Us</span>
              </a>
              <button
                onClick={() => handleCopy('PHIKISWAYO-PS@kznschools.gov.za', 'email')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-[#ff2121] bg-neutral-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
                id="copy-email-btn"
              >
                {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
