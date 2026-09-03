export type TabType = 'home' | 'about' | 'admissions' | 'events' | 'news' | 'contact';

export type EventCategory = 'all' | 'academic' | 'sports' | 'community';

export interface SchoolEvent {
  id: string;
  title: string;
  category: 'academic' | 'sports' | 'community';
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  badge: string;
  highlights?: string[];
}

export interface StatItem {
  id: string;
  value: string;
  number: number;
  suffix: string;
  label: string;
  description: string;
  iconName: string;
}

export interface DocumentRequirement {
  id: string;
  title: string;
  description: string;
  required: boolean;
  category: 'identity' | 'academic' | 'residence' | 'health';
  tip: string;
}

export interface AdmissionFormData {
  learnerName: string;
  learnerSurname: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  gradeApplying: string;
  previousSchool: string;
  parentName: string;
  parentSurname: string;
  relationship: string;
  phone: string;
  email: string;
  residentialAddress: string;
  medicalConditions: string;
  message: string;
  agreedToTerms: boolean;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface SchoolValue {
  title: string;
  description: string;
  iconName: string;
  zuluTerm?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  category: 'general' | 'admissions' | 'academic' | 'events';
  summary: string;
  audience: string;
  pinned?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'academic' | 'sports' | 'meetings';
  categoryLabel: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
}
