
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface Language {
  id: string;
  language: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Native';
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
}

export interface ResumeAnalysis {
  atsScore: number;
  grammarScore: number;
  keywordScore: number;
  readabilityScore: number;
  formattingScore: number;
  suggestions: string[];
  missingKeywords: string[];
  issues: {
    type: 'grammar' | 'keyword' | 'formatting' | 'structure';
    message: string;
    suggestion: string;
  }[];
}

export type ResumeTemplate = 'modern' | 'classic' | 'creative' | 'minimal' | 'professional';
