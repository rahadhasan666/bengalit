export type Theme = 'dark' | 'light';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  features: string[];
  icon: string;
  highlight: string;
  badge?: string;
}

export interface WhyAdvantage {
  id: string;
  title: string;
  description: string;
  icon: string;
  metric?: string;
}

export interface TechItem {
  name: string;
  category: 'Mobile' | 'Frontend' | 'Backend' | 'Security & DevOps';
  description: string;
  accent?: string;
}

export interface Project {
  id: string;
  name: string;
  category: 'Mobile' | 'Web' | 'Security' | 'Other';
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  deliverables: string[];
  metrics: { label: string; value: string }[];
  accentColor?: string;
  previewGradient: string;
  image?: string;
  gallery?: string[];
  liveUrl?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  subtext: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  details: string;
}
