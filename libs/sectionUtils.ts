import {
  HelloItem,
  AboutMeItem,
  MyPortfolioItem,
  MyNewsItem,
  SkillItem,
} from '@/models/models';
import type { SectionName } from '@/types';

export const sectionToModelMap: Record<SectionName, any> = {
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

