import { Model, Document } from 'mongoose';
import {
  HelloItem,
  AboutMeItem,
  MyPortfolioItem,
  MyNewsItem,
  SkillItem,
} from '@/models/models';
import type { SectionName } from '@/types';

type SectionModel = Model<Document, unknown, unknown>;

export const sectionToModelMap: Record<SectionName, SectionModel> = {
  welcome: HelloItem,
  aboutMe: AboutMeItem,
  myPortfolio: MyPortfolioItem,
  someNews: MyNewsItem,
  skills: SkillItem,
};

export function getModelProperties(sectionName: SectionName): string[] | null {
  const model = sectionToModelMap[sectionName];
  return model ? Object.keys(model.schema.paths) : null;
}

