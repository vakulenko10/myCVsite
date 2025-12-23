import mongoose, { Schema, Model, Document } from 'mongoose';
import type {
  HelloItemType,
  AboutMeItemType,
  MyPortfolioItemType,
  MyNewsItemType,
  SkillItemType,
  ProjectDescriptionType,
} from '@/types';

// HelloItem Schema
interface HelloItemDocument extends Omit<HelloItemType, '_id' | 'createdAt' | 'updatedAt'>, Document {}

const helloItemSchema = new Schema<HelloItemDocument>(
  {
    enWelcome: { type: String },
    enDescription: { type: String },
    uaWelcome: { type: String },
    uaDescription: { type: String },
    plWelcome: { type: String },
    plDescription: { type: String },
    imageURL: { type: String },
  },
  {
    timestamps: true,
  }
);

// AboutMeItem Schema
interface AboutMeItemDocument extends Omit<AboutMeItemType, '_id' | 'createdAt' | 'updatedAt'>, Document {}

const aboutMeItemSchema = new Schema<AboutMeItemDocument>(
  {
    enTitle: { type: String },
    enDescription: { type: String },
    uaTitle: { type: String },
    uaDescription: { type: String },
    plTitle: { type: String },
    plDescription: { type: String },
    imageURL: { type: String },
  },
  {
    timestamps: true,
  }
);

// MyPortfolioItem Schema
interface MyPortfolioItemDocument extends Omit<MyPortfolioItemType, '_id' | 'createdAt' | 'updatedAt'>, Document {}

const myPortfolioItemSchema = new Schema<MyPortfolioItemDocument>(
  {
    enTitle: { type: String },
    enDescription: { type: String },
    uaTitle: { type: String },
    uaDescription: { type: String },
    plTitle: { type: String },
    plDescription: { type: String },
    projectURL: { type: String },
    gitHubRepoURL: { type: String },
    imageURL: { type: String },
  },
  {
    timestamps: true,
  }
);

// MyNewsItem Schema
interface MyNewsItemDocument extends Omit<MyNewsItemType, '_id' | 'createdAt' | 'updatedAt'>, Document {}

const myNewsItemSchema = new Schema<MyNewsItemDocument>(
  {
    enTitle: { type: String },
    enDescription: { type: String },
    uaTitle: { type: String },
    uaDescription: { type: String },
    plTitle: { type: String },
    plDescription: { type: String },
    imageURL: { type: String },
  },
  {
    timestamps: true,
  }
);

// SkillItem Schema
interface SkillItemDocument extends Omit<SkillItemType, '_id' | 'createdAt' | 'updatedAt'>, Document {}

const skillsItemSchema = new Schema<SkillItemDocument>(
  {
    Title: { type: String },
    imageURL: { type: String },
  },
  {
    timestamps: true,
  }
);

// ProjectDescription Schema
interface ProjectDescriptionDocument
  extends Omit<ProjectDescriptionType, '_id' | 'createdAt' | 'updatedAt'>,
    Document {}

const projectDescriptionSchema = new Schema<ProjectDescriptionDocument>(
  {
    portfolioItemId: {
      type: String,
      required: true,
      index: true, // Index for faster lookups
    },
    enMarkdownContent: {
      type: String,
    },
    uaMarkdownContent: {
      type: String,
    },
    plMarkdownContent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Models
const SkillItem: Model<SkillItemDocument> =
  mongoose.models.SkillItem || mongoose.model<SkillItemDocument>('SkillItem', skillsItemSchema);

const HelloItem: Model<HelloItemDocument> =
  mongoose.models.HelloItem || mongoose.model<HelloItemDocument>('HelloItem', helloItemSchema);

const AboutMeItem: Model<AboutMeItemDocument> =
  mongoose.models.AboutMeItem ||
  mongoose.model<AboutMeItemDocument>('AboutMeItem', aboutMeItemSchema);

const MyPortfolioItem: Model<MyPortfolioItemDocument> =
  mongoose.models.MyPortfolioItem ||
  mongoose.model<MyPortfolioItemDocument>('MyPortfolioItem', myPortfolioItemSchema);

const MyNewsItem: Model<MyNewsItemDocument> =
  mongoose.models.MyNewsItem || mongoose.model<MyNewsItemDocument>('MyNewsItem', myNewsItemSchema);

const ProjectDescription: Model<ProjectDescriptionDocument> =
  mongoose.models.ProjectDescription ||
  mongoose.model<ProjectDescriptionDocument>('ProjectDescription', projectDescriptionSchema);

export { SkillItem, HelloItem, AboutMeItem, MyPortfolioItem, MyNewsItem, ProjectDescription };


