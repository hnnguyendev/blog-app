import { EPostSectionType } from '@Shared/enum/EPostSectionType';
import { ISectionFile } from './ISectionFile';

export interface ISectionContent {
  id: string | null;
  position: number;
  heading?: string;
  textContent?: string;
  mediaUrl?: string;
  description?: string;
  photoCredit?: string;
  sectionType: EPostSectionType;
  sectionFiles?: ISectionFile[] | null[];
}
