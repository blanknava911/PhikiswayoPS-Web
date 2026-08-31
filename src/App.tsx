import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { EventsSection } from './components/EventsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Scroll to top whenever tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased bg-[#F9F9F9] text-[#1A1A1A]">
      
      {/* Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection setActiveTab={setActiveTab} />
            <AboutSection setActiveTab={setActiveTab} />
            <AdmissionsSection />
            <EventsSection />
            <ContactSection />
          </>
        )}

        {activeTab === 'about' && (
          <>
            <div className="bg-[#ff2121] text-white py-12 px-4 sm:px-8 text-center space-y-2">
              <span className="text-xs font-bold text-red-100 uppercase tracking-widest">
                Our Identity & Heritage
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
                About Phikiswayo Primary School
              </h1>
              <p className="text-red-50 text-sm sm:text-base max-w-xl mx-auto">
                Quality education in the heart of Ntuzuma, KwaZulu-Natal — living our motto: "Strive for Success".
              </p>
            </div>
            <AboutSection setActiveTab={setActiveTab} />
          </>
        )}

        {activeTab === 'admissions' && (
          <>
            <div className="bg-[#ff2121] text-white py-12 px-4 sm:px-8 text-center space-y-2">
              <span className="text-xs font-bold text-red-100 uppercase tracking-widest">
                Enrolment Information
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
                Admissions & Enrolment
              </h1>
              <p className="text-red-50 text-sm sm:text-base max-w-xl mx-auto">
                In-person admission steps, required document checklist, and school administration office details.
              </p>
            </div>
            <AdmissionsSection />
          </>
        )}

        {activeTab === 'events' && (
          <>
            <div className="bg-[#ff2121] text-white py-12 px-4 sm:px-8 text-center space-y-2">
              <span className="text-xs font-bold text-red-100 uppercase tracking-widest">
                Calendar & Highlights
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
                School Events & News
              </h1>
              <p className="text-red-50 text-sm sm:text-base max-w-xl mx-auto">
                Stay updated with our academic assessments, athletic tournaments, and parent meetings.
              </p>
            </div>
            <EventsSection />
          </>
        )}

        {activeTab === 'contact' && (
          <>
            <div className="bg-[#ff2121] text-white py-12 px-4 sm:px-8 text-center space-y-2">
              <span className="text-xs font-bold text-red-100 uppercase tracking-widest">
                Get In Touch
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
                Contact & Socials Directory
              </h1>
              <p className="text-red-50 text-sm sm:text-base max-w-xl mx-auto">
                348 Khangela Street, Ntuzuma A, KwaZulu-Natal. We are ready to assist you.
              </p>
            </div>
            <ContactSection />
          </>
        )}
      </main>

      {/* Footer Section */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

export default App;
