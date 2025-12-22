import mongoose, { Schema, Model, Document } from 'mongoose';
import type {
  HelloItemType,
  AboutMeItemType,
  MyPortfolioItemType,
  MyNewsItemType,
  SkillItemType,
} from '@/types';

// HelloItem Schema
interface HelloItemDocument extends HelloItemType, Document {}

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
interface AboutMeItemDocument extends AboutMeItemType, Document {}

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
interface MyPortfolioItemDocument extends MyPortfolioItemType, Document {}

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
interface MyNewsItemDocument extends MyNewsItemType, Document {}

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
interface SkillItemDocument extends SkillItemType, Document {}

const skillsItemSchema = new Schema<SkillItemDocument>(
  {
    Title: { type: String },
    imageURL: { type: String },
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

export { SkillItem, HelloItem, AboutMeItem, MyPortfolioItem, MyNewsItem };


