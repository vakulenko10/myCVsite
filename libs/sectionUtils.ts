import {
  HelloItem,
  AboutMeItem,
  MyPortfolioItem,
  MyNewsItem,
  SkillItem,
  AskMeQuestion,
} from '@/models/models';
import type { SectionName } from '@/types';

export const sectionToModelMap: Record<SectionName, any> = {
  welcome: HelloItem,
  aboutMe: AboutMeItem,
  myPortfolio: MyPortfolioItem,
  someNews: MyNewsItem,
  skills: SkillItem,
  askmequestions: AskMeQuestion,
};

export function getModelProperties(sectionName: SectionName): string[] | null {
  const model = sectionToModelMap[sectionName];
  return model ? Object.keys(model.schema.paths) : null;
}

/** Sort option for list queries; e.g. askmequestions uses order ascending. */
export function getSortForSection(sectionName: SectionName): Record<string, 1 | -1> | null {
  if (sectionName === 'askmequestions') return { order: 1 };
  return null;
}

