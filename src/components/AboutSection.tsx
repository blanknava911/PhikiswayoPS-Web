import React from 'react';
import { 
  Users, 
  GraduationCap, 
  Calendar,
  Eye,
  Target,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-white" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="about-header">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#ff2121] font-bold text-xs uppercase tracking-widest border border-red-200 mb-3">
            Our Identity, Vision & Mission
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ff2121] font-display">
            About Phikiswayo Primary School
          </h2>
          <p className="mt-3 text-neutral-600 text-sm sm:text-base">
            A proud public primary institution dedicated to foundational learning, resilience, and community upliftment in Ntuzuma, KwaZulu-Natal.
          </p>
        </div>

        {/* DEDICATED OFFICIAL VISION & MISSION SHOWCASE */}
        <div className="mb-16" id="vision-mission-showcase">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* VISION CARD */}
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-red-500/30 flex flex-col justify-between relative overflow-hidden group" id="vision-card">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff2121]/15 rounded-full blur-2xl pointer-events-none group-hover:bg-[#ff2121]/25 transition duration-500"></div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff2121]/20 border border-[#ff2121]/40 text-[#ff4d4d] text-xs font-bold uppercase tracking-wider">
                    <Eye className="w-4 h-4" />
                    <span>Our Guiding Vision</span>
                  </div>
                  <span className="text-xs font-bold text-neutral-400">Phikiswayo PS</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                    School Vision
                  </h3>
                  <blockquote className="text-base sm:text-lg text-neutral-100 font-serif italic leading-relaxed pl-4 border-l-4 border-[#ff2121] bg-white/5 py-3 rounded-r-xl pr-3">
                    "{SCHOOL_INFO.vision}"
                  </blockquote>
                </div>

                {/* Key Vision Pillars */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs font-bold text-[#ff4d4d] mb-0.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Academic Growth
                    </div>
                    <p className="text-[11px] text-neutral-300 leading-snug">
                      Excelling in CAPS literacy, numeracy and science.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs font-bold text-[#ff4d4d] mb-0.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Spiritual & Moral
                    </div>
                    <p className="text-[11px] text-neutral-300 leading-snug">
                      Nurturing integrity, empathy and mutual respect.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs font-bold text-[#ff4d4d] mb-0.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Physical Wellness
                    </div>
                    <p className="text-[11px] text-neutral-300 leading-snug">
                      Active sports, athletics and healthy development.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs font-bold text-[#ff4d4d] mb-0.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Positive Self-Concept
                    </div>
                    <p className="text-[11px] text-neutral-300 leading-snug">
                      Empowering learners and educators with confidence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span>Core Pillar: Holistic Growth</span>
                <span className="text-[#ff4d4d] font-bold">Strive for Success</span>
              </div>
            </div>

            {/* MISSION CARD */}
            <div className="bg-gradient-to-br from-[#990000] via-[#c41212] to-[#ff2121] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-red-400/40 flex flex-col justify-between relative overflow-hidden group" id="mission-card">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:bg-white/20 transition duration-500"></div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/25 border border-white/25 text-red-100 text-xs font-bold uppercase tracking-wider">
                    <Target className="w-4 h-4 text-red-200" />
                    <span>Our Strategic Mission</span>
                  </div>
                  <span className="text-xs font-bold text-red-200">Educating for Life</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                    School Mission
                  </h3>
                  <blockquote className="text-base sm:text-lg text-white font-serif italic leading-relaxed pl-4 border-l-4 border-white bg-black/15 py-3 rounded-r-xl pr-3">
                    "{SCHOOL_INFO.mission}"
                  </blockquote>
                </div>

                {/* Key Mission Pillars */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-black/20 border border-white/15 rounded-xl p-3">
                    <div className="text-xs font-bold text-white mb-0.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-200" /> High Quality
                    </div>
                    <p className="text-[11px] text-red-100 leading-snug">
                      Relevant, rigorous and inclusive teaching for all.
                    </p>
                  </div>

                  <div className="bg-black/20 border border-white/15 rounded-xl p-3">
                    <div className="text-xs font-bold text-white mb-0.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-200" /> Knowledge & Skills
                    </div>
                    <p className="text-[11px] text-red-100 leading-snug">
                      Practical competencies and digital/critical literacy.
                    </p>
                  </div>

                  <div className="bg-black/20 border border-white/15 rounded-xl p-3">
                    <div className="text-xs font-bold text-white mb-0.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-200" /> Values & Attitude
                    </div>
                    <p className="text-[11px] text-red-100 leading-snug">
                      Cultivating resilience, discipline, and Ubuntu.
                    </p>
                  </div>

                  <div className="bg-black/20 border border-white/15 rounded-xl p-3">
                    <div className="text-xs font-bold text-white mb-0.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-200" /> Future Readiness
                    </div>
                    <p className="text-[11px] text-red-100 leading-snug">
                      Equipping learners for high school and beyond.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/20 flex items-center justify-between text-xs text-red-100">
                <span>Action-Oriented Pedagogy</span>
                <span className="font-bold text-white">Grades R – 7</span>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Facts Counter Cards: ~900 Learners, Grade R - 7, Established 1984 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" id="about-stats-grid">
          
          {/* Card 1: ~900 Learners */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 text-center transition hover:-translate-y-1 hover:border-[#ff2121] shadow-sm" id="stat-learners-card">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-100 text-[#ff2121] flex items-center justify-center mb-4">
              <Users className="w-7 h-7" />
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold text-[#ff2121] font-serif leading-none mb-2">
              ~900
            </div>
            <div className="text-lg font-bold text-neutral-900 mb-1">
              Learners Enrolled
            </div>
            <p className="text-xs text-neutral-500">
              Around 900 active learners across Foundation, Intermediate, and Senior phases.
            </p>
          </div>

          {/* Card 2: Grade R - 7 */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 text-center transition hover:-translate-y-1 hover:border-[#ff2121] shadow-sm" id="stat-grades-card">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-100 text-[#ff2121] flex items-center justify-center mb-4">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold text-[#ff2121] font-serif leading-none mb-2">
              Grade R – 7
            </div>
            <div className="text-lg font-bold text-neutral-900 mb-1">
              Grades Offered
            </div>
            <p className="text-xs text-neutral-500">
              Comprehensive foundational education preparing learners for high school success.
            </p>
          </div>

          {/* Card 3: Established 1984 */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 text-center transition hover:-translate-y-1 hover:border-[#ff2121] shadow-sm" id="stat-established-card">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-100 text-[#ff2121] flex items-center justify-center mb-4">
              <Calendar className="w-7 h-7" />
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold text-[#ff2121] font-serif leading-none mb-2">
              1984
            </div>
            <div className="text-lg font-bold text-neutral-900 mb-1">
              Year Established
            </div>
            <p className="text-xs text-neutral-500">
              Serving the Ntuzuma community with educational pride and dedication.
            </p>
          </div>

        </div>

        {/* Narrative Overview & Community Roots */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16" id="community-roots-section">
          
          <div className="lg:col-span-7 bg-neutral-50 border border-neutral-200 rounded-2xl p-8 sm:p-10 space-y-4">
            <h3 className="text-2xl font-bold text-[#ff2121] font-display">
              Our Community Roots & Commitment
            </h3>
            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              Situated in Ntuzuma A within the Pinetown Education District, <strong>Phikiswayo Primary School</strong> has served generations of families. Guided by our motto, <em>"Strive for Success"</em>, we instill the belief that every child can realize their fullest potential through diligent effort, disciplined study, and compassionate guidance.
            </p>
            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              We provide a safe, holistic learning environment including reading hubs, sports programs, cultural celebrations, and the National School Nutrition Programme (NSNP), ensuring no learner studies on an empty stomach.
            </p>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-lg border border-neutral-800">
            <div className="space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#ff4d4d]">
                Guiding Institutional Creed
              </span>
              <blockquote className="font-serif text-base sm:text-lg italic leading-relaxed text-neutral-100">
                "{SCHOOL_INFO.vision}"
              </blockquote>
            </div>
            <div className="pt-6 border-t border-neutral-800 mt-4">
              <div className="font-bold text-white text-base">School Leadership & SGB</div>
              <div className="text-xs text-neutral-400">Phikiswayo Primary School • Ntuzuma, KZN</div>
            </div>
          </div>

        </div>

        {/* School Values Grid */}
        <div id="school-values-section">
          <h4 className="text-xl font-bold text-center text-neutral-800 mb-8 font-display">
            Core Values Guiding Our Learners
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-neutral-50 border border-neutral-200 border-t-4 border-t-[#ff2121] rounded-xl p-6" id="value-resilience">
              <h5 className="font-bold text-[#ff2121] text-base mb-0.5">Resilience</h5>
              <span className="text-xs font-semibold text-neutral-500 block mb-2">Ukubekezela</span>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Facing academic challenges with courage, tenacity, and consistent effort.
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 border-t-4 border-t-[#ff2121] rounded-xl p-6" id="value-excellence">
              <h5 className="font-bold text-[#ff2121] text-base mb-0.5">Excellence</h5>
              <span className="text-xs font-semibold text-neutral-500 block mb-2">Ukwenza Kahle</span>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Striving for the highest personal achievement in classrooms and on sports fields.
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 border-t-4 border-t-[#ff2121] rounded-xl p-6" id="value-ubuntu">
              <h5 className="font-bold text-[#ff2121] text-base mb-0.5">Ubuntu</h5>
              <span className="text-xs font-semibold text-neutral-500 block mb-2">Ubuntu Nempatho</span>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Kindness, mutual respect, empathy, and collective community care.
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 border-t-4 border-t-[#ff2121] rounded-xl p-6" id="value-integrity">
              <h5 className="font-bold text-[#ff2121] text-base mb-0.5">Integrity</h5>
              <span className="text-xs font-semibold text-neutral-500 block mb-2">Ubuqotho</span>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Honesty, trustworthiness, and ethical conduct inside and outside school.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
