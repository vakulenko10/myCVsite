/**
 * Shared type definitions for the application
 */

// Environment variables types
export interface Env {
  MONGODB_URI: string;
  ADMINEMAIL: string;
  Google_ID: string;
  Google_Secret: string;
  NEXTAUTH_URL: string;
  NEXTAUTH_SECRET: string;
}

// NextAuth types
export interface UserRole {
  role?: 'admin' | 'user' | 'Google User';
}

export interface ExtendedUser {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  role?: string;
}

// Model types
export interface HelloItemType {
  _id?: string;
  enWelcome?: string;
  enDescription?: string;
  uaWelcome?: string;
  uaDescription?: string;
  plWelcome?: string;
  plDescription?: string;
  imageURL?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AboutMeItemType {
  _id?: string;
  enTitle?: string;
  enDescription?: string;
  uaTitle?: string;
  uaDescription?: string;
  plTitle?: string;
  plDescription?: string;
  imageURL?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MyPortfolioItemType {
  _id?: string;
  enTitle?: string;
  enDescription?: string;
  uaTitle?: string;
  uaDescription?: string;
  plTitle?: string;
  plDescription?: string;
  projectURL?: string;
  gitHubRepoURL?: string;
  imageURL?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MyNewsItemType {
  _id?: string;
  enTitle?: string;
  enDescription?: string;
  uaTitle?: string;
  uaDescription?: string;
  plTitle?: string;
  plDescription?: string;
  imageURL?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SkillItemType {
  _id?: string;
  Title?: string;
  imageURL?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProjectDescriptionType {
  _id?: string;
  portfolioItemId: string; // Reference to MyPortfolioItem
  markdownContent: string; // Rich markdown content (supports images, links, formatting)
  createdAt?: Date;
  updatedAt?: Date;
}

export type SectionItemType =
  | HelloItemType
  | AboutMeItemType
  | MyPortfolioItemType
  | MyNewsItemType
  | SkillItemType;

export type SectionName = 'welcome' | 'aboutMe' | 'myPortfolio' | 'skills' | 'someNews';

// Component prop types
export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export interface ImageContextType {
  imageURLFromContext: string;
  setImageURLFromContext: (url: string) => void;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'email' | 'number';
  required?: boolean;
  multiline?: boolean;
}

export interface DynamicFormProps {
  sectionName: SectionName;
  itemId?: string;
  initialData?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
}



