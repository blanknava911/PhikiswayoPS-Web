import { SchoolEvent, StatItem, DocumentRequirement, SchoolValue, FAQItem, NoticeItem } from '../types';

export const SCHOOL_INFO = {
  name: "Phikiswayo Primary School",
  shortName: "Phikiswayo PS",
  location: "Ntuzuma, KwaZulu-Natal, South Africa",
  physicalAddress: "348 Khangela St, Ntuzuma A, Ntuzuma, 4360",
  phone: "081 509 1460",
  phoneFormatted: "+27 81 509 1460",
  email: "PHIKISWAYO-PS@kznschools.gov.za",
  motto: "Strive for Success",
  zuluMotto: "Zabalazela Impumelelo",
  vision: "To let our school grow academically, spiritually, physically and develop positive self-concept to all stakeholders particularly to learners and educators.",
  mission: "We will provide high quality education relevant to all learners which will equip them with knowledge, skills, values and attitude to meet the challenges of the future.",
  established: "1984",
  grades: "Grade R to Grade 7",
  principal: "Mr. S. M. Khumalo",
  deputyPrincipal: "Mrs. N. P. Dlamini",
  district: "Pinetown District / eThekwini North",
  circuit: "Ntuzuma Circuit",
  province: "KwaZulu-Natal (KZN)",
  colors: {
    primary: "#ff2121",
    secondary: "#e01a1a",
    accent: "#FFFFFF",
    charcoal: "#222222",
    lightBg: "#FDF8F8"
  },
  socials: {
    facebook: "https://www.facebook.com/people/Phikiswayo-Primary-School/61590967820774/#",
    whatsapp: "",
    tiktok: "https://www.tiktok.com/@phikiswayo.primar"
  },
  officeHours: "Monday – Friday: 07:30 – 15:30 (Term Time)",
  schoolHours: "Grade R: 07:45 – 12:30 | Grades 1-2: 07:45 – 13:30 | Grades 3-7: 07:45 – 14:30"
};

export const KEY_STATS: StatItem[] = [
  {
    id: "learners",
    number: 900,
    value: "~900",
    suffix: "",
    label: "Active Learners",
    description: "Nurturing approximately 900 bright young minds from Grade R through Grade 7 in Ntuzuma",
    iconName: "Users"
  },
  {
    id: "grades",
    number: 8,
    value: "Grade R - 7",
    suffix: "",
    label: "Comprehensive Grades",
    description: "Full CAPS curriculum covering Foundation to Senior primary schooling",
    iconName: "GraduationCap"
  },
  {
    id: "established",
    number: 1984,
    value: "1984",
    suffix: "",
    label: "Year Established",
    description: "Decades of serving the Ntuzuma and Greater Durban community with pride",
    iconName: "Calendar"
  }
];

export const SCHOOL_VALUES: SchoolValue[] = [
  {
    title: "Resilience & Tenacity",
    zuluTerm: "Ukubekezela",
    description: "Living our school motto 'Strive for Success', inspiring learners to reach their highest potential through dedication and perseverance.",
    iconName: "Shield"
  },
  {
    title: "Academic Excellence",
    zuluTerm: "Ukwenza Kahle Kwezemfundo",
    description: "Fostering literacy, numeracy, science, and critical thinking with strong foundational support.",
    iconName: "BookOpen"
  },
  {
    title: "Ubuntu & Community",
    zuluTerm: "Ubuntu Nempatho",
    description: "Instilling deep respect, empathy, teamwork, and pride in our vibrant Ntuzuma community.",
    iconName: "Heart"
  },
  {
    title: "Discipline & Integrity",
    zuluTerm: "Ubuqotho Nesimilo",
    description: "Building character, leadership skills, moral clarity, and mutual respect among educators and learners.",
    iconName: "Compass"
  }
];

export const SCHOOL_EVENTS: SchoolEvent[] = [
  {
    id: "event-1",
    title: "2027 Admissions Open",
    category: "academic",
    date: "September 15, 2026",
    time: "08:00 – 14:00 Daily",
    location: "Administration Office, Phikiswayo Primary",
    description: "Official opening of applications for Grade R to Grade 7 learners for the upcoming academic year. Early submission ensures placement.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    badge: "Admissions Open",
    highlights: ["Grade R to 7 Forms Available", "Bring Certified Documents", "Limited Spaces per Grade"]
  },
  {
    id: "event-2",
    title: "Annual Sports & Cultural Day",
    category: "sports",
    date: "October 24, 2026",
    time: "09:00 – 15:30",
    location: "Phikiswayo Main Sports Grounds",
    description: "A vibrant celebration of athletic talent and Zulu cultural heritage. Featuring track events, netball, soccer matches, traditional dance, and school choir performances.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    badge: "Flagship Event",
    highlights: ["Traditional Zulu Dance", "Inter-House Athletics", "Food Stalls & Parent Races"]
  },
  {
    id: "event-3",
    title: "Parent-Teacher Association (PTA) Meeting",
    category: "community",
    date: "November 12, 2026",
    time: "14:00 – 16:30",
    location: "School Community Hall",
    description: "Quarterly general meeting for all parents and guardians to discuss learner academic progress, Term 4 exam readiness, and school development initiatives.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    badge: "Important",
    highlights: ["Academic Progress Reports", "Safety & Infrastructure Update", "Q&A with Principal"]
  },
  {
    id: "event-4",
    title: "Foundation Phase Reading & Literacy Festival",
    category: "academic",
    date: "November 20, 2026",
    time: "10:00 – 13:00",
    location: "Phikiswayo Reading Hub & Library",
    description: "Spelling bee, isiZulu & English storytelling contest, and book exhibition aimed at boosting reading joy among Grades R - 3 learners.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    badge: "Literacy Drive",
    highlights: ["Storytelling Contest", "IsiZulu & English Poetry", "Prize Giving Ceremony"]
  },
  {
    id: "event-5",
    title: "Inter-School Soccer & Netball Derby",
    category: "sports",
    date: "December 02, 2026",
    time: "13:30 – 16:00",
    location: "Ntuzuma Sports Complex",
    description: "Phikiswayo Primary teams take on neighboring schools in exciting under-11 and under-13 soccer and netball championship fixtures.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    badge: "Tournament",
    highlights: ["Under-11 & Under-13 Matches", "Cheerleading Squad", "Trophy Presentation"]
  },
  {
    id: "event-6",
    title: "Ntuzuma Community Food Garden & Eco Day",
    category: "community",
    date: "December 08, 2026",
    time: "08:30 – 12:00",
    location: "Phikiswayo Nutrition Garden",
    description: "Learners, educators, and local community volunteers harvest vegetables supporting our school nutrition scheme and participate in tree planting.",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb2250d?auto=format&fit=crop&w=800&q=80",
    badge: "Green Project",
    highlights: ["Eco-Education", "Fresh Harvest for NSNP", "Community Planting"]
  }
];

export const REQUIRED_DOCUMENTS: DocumentRequirement[] = [
  {
    id: "doc-1",
    title: "Certified Copy of Parent/Guardian ID",
    description: "Clear certified copy of the South African National ID document or valid Passport of the primary parent/guardian.",
    required: true,
    category: "identity",
    tip: "Must be certified at a SAPS police station or Post Office within the last 3 months."
  },
  {
    id: "doc-2",
    title: "Learner's Birth Certificate",
    description: "Official unabridged or computerised birth certificate issued by the Department of Home Affairs showing ID number.",
    required: true,
    category: "identity",
    tip: "Certified copy required. Original must be presented for verification."
  },
  {
    id: "doc-3",
    title: "Latest School Report & Official Transfer Card",
    description: "The learner's most recent end-of-term academic report card plus an official transfer letter signed by the previous school principal.",
    required: true,
    category: "academic",
    tip: "Not required for Grade R first-time applicants."
  },
  {
    id: "doc-4",
    title: "Road to Health Clinic Card (Immunisation Record)",
    description: "Proof of completed mandatory childhood immunisations (especially for Grade R and Grade 1 applicants).",
    required: true,
    category: "health",
    tip: "Required by the KZN Department of Health regulations."
  },
  {
    id: "doc-5",
    title: "Proof of Residential Address",
    description: "Utility bill, municipal statement, or official letter from local councillor/tribal authority confirming residence in Ntuzuma/eThekwini.",
    required: true,
    category: "residence",
    tip: "Must not be older than 3 months."
  }
];

export const ADMISSION_STEPS = [
  {
    step: 1,
    title: "Collect / Submit Application Form",
    description: "Obtain the official admission form from our administrative office in Ntuzuma or submit your details online via this portal.",
    icon: "FileText",
    timeframe: "Term 3 & 4"
  },
  {
    step: 2,
    title: "Submit Certified Documents",
    description: "Provide all certified copies including Parent ID, Learner Birth Certificate, Clinic Card, Proof of Address, and previous report card.",
    icon: "CheckSquare",
    timeframe: "Within 7 Days"
  },
  {
    step: 3,
    title: "Review & Enrolment Confirmation",
    description: "Our admissions committee reviews documents and notifies parents via SMS/Call with an official enrolment letter and uniform guidelines.",
    icon: "Award",
    timeframe: "5-10 Working Days"
  }
];

export const FREQUENT_QUESTIONS: FAQItem[] = [
  {
    question: "What grades are offered at Phikiswayo Primary School?",
    answer: "We offer comprehensive schooling from Grade R (Reception year) through Grade 7, encompassing the Foundation Phase (Grades R-3), Intermediate Phase (Grades 4-6), and Senior Phase (Grade 7).",
    category: "Admissions"
  },
  {
    question: "What is the school fee policy?",
    answer: "Phikiswayo Primary School is a public school under the KwaZulu-Natal Department of Education. We strive to provide quality, accessible education. For details regarding fee exemptions and subsidized assistance, please contact the administration office.",
    category: "Finance"
  },
  {
    question: "Is there a National School Nutrition Programme (NSNP)?",
    answer: "Yes! Phikiswayo proudly participates in the government NSNP program, providing daily wholesome, balanced hot meals to all learners to support nutrition and optimal learning.",
    category: "Services"
  },
  {
    question: "What extra-curricular activities and sports are available?",
    answer: "We offer soccer, netball, athletics (track and field), traditional Zulu cultural dance, school choir, public speaking, and environmental gardening club.",
    category: "Activities"
  },
  {
    question: "What language of learning and teaching (LOLT) is used?",
    answer: "English is the primary Language of Learning and Teaching (LOLT) with IsiZulu offered as the Home Language / First Additional Language to preserve and celebrate our learners' heritage.",
    category: "Academic"
  },
  {
    question: "What is the Vision of Phikiswayo Primary School?",
    answer: "Our Vision is: 'To let our school grow academically, spiritually, physically and develop positive self-concept to all stakeholders particularly to learners and educators.'",
    category: "General"
  },
  {
    question: "What is the Mission of Phikiswayo Primary School?",
    answer: "Our Mission is: 'We will provide high quality education relevant to all learners which will equip them with knowledge, skills, values and attitude to meet the challenges of the future.'",
    category: "General"
  }
];

export const SCHOOL_NOTICES: NoticeItem[] = [
  {
    id: "notice-2027-admissions",
    title: "2027 Admission Applications",
    date: "September 15, 2026",
    category: "admissions",
    summary: "Parents and guardians can download the official admission form and submit completed applications at the school administration office.",
    audience: "Parents and guardians",
    pinned: true
  },
  {
    id: "notice-documents",
    title: "Certified Documents Required",
    date: "September 15, 2026",
    category: "general",
    summary: "Please bring certified copies of parent or guardian ID, learner birth certificate, clinic card, proof of address, latest report, and transfer card where applicable.",
    audience: "New applicants"
  },
  {
    id: "notice-office-hours",
    title: "Office Hours for Enquiries",
    date: "September 1, 2026",
    category: "general",
    summary: "The school office is open Monday to Friday from 07:30 to 15:30 during term time for admission and general enquiries.",
    audience: "School community"
  }
];
