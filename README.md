# Phikiswayo Primary School Web Portal

Official modern web application for **Phikiswayo Primary School**, a public primary school situated in Ntuzuma A, KwaZulu-Natal, South Africa (Established 1984).

> **Motto:** *"Quality Education in the Heart of Ntuzuma — Strive for Success"*

---

## 📖 Overview of Work Completed

This application provides parents, learners, educators, and community members with a comprehensive digital portal. It details academic offerings, school history, admission requirements, calendar events, and official communication channels.

### 🌟 Key Modules & Features

#### 1. **Navigation & Header (`Navbar.tsx`)**
- **Brand Identity**: Features the official school logo image in `public/school-logo.png` and official school branding.
- **Dynamic Navigation**: Smooth-scrolling tab switching between **Home**, **About Us**, **Admissions**, **Events**, and **Contact & Socials**.
- **Call-to-Action**: Direct header button for immediate PDF application download.
- **Mobile Drawer**: Fully responsive slide-down menu with accessible touch targets for mobile devices.

#### 2. **Hero Section (`HeroSection.tsx`)**
- **Visual Presentation**: High-contrast, brand-aligned red gradient banner with refined display typography.
- **Quick Statistics Overview**: Highlights key facts (~900 Active Learners, Grade R – 7, Established 1984).
- **Direct Action Buttons**: Direct navigation to Admissions, School Tour/Contact, and one-click PDF Application Form download.
- **Quick Info Card**: Quick facts sidebar with grade coverage and admission status.

#### 3. **About & Heritage Showcase (`AboutSection.tsx`)**
- **Vision Statement**: Dedicated high-contrast card highlighting the school's vision of quality, inclusive foundation education.
- **Mission Statement**: Structured mission card breaking down academic excellence, character building, cultural enrichment, and community upliftment.
- **Key Statistics Grid**: Metric cards for **~900 Active Learners**, **Grade R – 7**, and **1984 Year Established**.
- **Community Roots & Narrative**: Historical background on the school's founding in Ntuzuma A and its educational legacy in KwaZulu-Natal.
- **Core Values**: Four foundational values paired with isiZulu translations:
  - *Resilience (Ukubekezela)*
  - *Excellence (Ukwenza Kahle)*
  - *Ubuntu (Ubuntu Nempatho)*
  - *Integrity (Ubuqotho)*

#### 4. **Admissions & Application Portal (`AdmissionsSection.tsx` & `AdmissionFormModal.tsx`)**
- **In-Person Submission Guidance**: Explicit instructions clarifying that physical forms must be signed and delivered to the school administration office during working hours.
- **3-Step Enrolment Guide**:
  1. *Download & Print* the official application form.
  2. *Gather Required Documents* (learner birth certificate, clinic card, parent IDs, proof of address, latest report card).
  3. *Submit in Person* at the school administration office.
- **Interactive Document Checklist**: Dynamic checklist allowing parents to check off required documents with real-time feedback.
- **Direct PDF Download**: Uses the official uploaded admission form PDF in `public/admission-form.pdf`.
- **Digital Form Preview Modal**: Full-screen preview modal displaying the official PDF with quick print and download actions.

#### 5. **School Events & Calendar (`EventsSection.tsx`)**
- **Category Filter Tabs**: Interactive filtering across **All Events**, **Academic**, **Sports & Athletics**, and **Parent Meetings**.
- **Event Cards**: Rich cards with visual imagery, badge categories, scheduled dates, times, campus locations, and descriptive overviews.

#### 6. **Contact Directory & Community Channels (`ContactSection.tsx`)**
- **Interactive Contact Cards**:
  - **Physical Address**: *348 Khangela St, Ntuzuma A, 4360* with a one-click copy button.
  - **Telephone**: *081 509 1460* with instant call trigger and copy-to-clipboard functionality.
  - **Official Email**: *PHIKISWAYO-PS@kznschools.gov.za* with mailto trigger and copy button.
- **Social Media Hub**: Prominent links to connect with the school on **Facebook** and **TikTok**, with WhatsApp ready to be added once the official number or link is supplied.

#### 7. **Footer (`Footer.tsx`)**
- Complete site directory, direct PDF download trigger, physical location details, copyright notices, and a smooth scroll-to-top button.

---

## 🛠️ Technical Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Iconography** | [Lucide React](https://lucide.dev/) |
| **Admission Form** | Static official PDF served from `public/admission-form.pdf` |
| **Typography** | Plus Jakarta Sans (Body & UI) & Playfair Display (Headings & Crest) |

---

## 📁 Project Structure

```
├── index.html                   # Entry HTML with typography & SEO metadata
├── metadata.json                # Project metadata & platform configuration
├── package.json                 # Dependencies and build scripts
├── vite.config.ts               # Vite configuration
├── src/
│   ├── main.tsx                 # React DOM mount entry point
│   ├── App.tsx                  # Root application orchestrator and state
│   ├── index.css                # Tailwind CSS global styles
│   ├── types.ts                 # TypeScript interfaces, types, and tab models
│   ├── components/
│   │   ├── Navbar.tsx           # Responsive navigation bar & mobile drawer
│   │   ├── HeroSection.tsx      # Hero banner, statistics, and call-to-actions
│   │   ├── AboutSection.tsx     # Vision, Mission, history, and core values
│   │   ├── AdmissionsSection.tsx# Admission guide & interactive checklist
│   │   ├── AdmissionFormModal.tsx# Digital preview & print modal for application form
│   │   ├── EventsSection.tsx    # School calendar & categorized events
│   │   ├── ContactSection.tsx   # Contact directory & social media connections
│   │   ├── Footer.tsx           # Site footer & quick links
│   │   └── SchoolCrest.tsx      # Reusable official school logo image component
│   ├── data/
│   │   └── schoolData.ts        # Centralized school data, contacts & event models
│   └── utils/
│       └── admissionForm.ts     # Admission form download/open helpers
```

---

## 🚀 Running the Application Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Lint Codebase**:
   ```bash
   npm run lint
   ```
