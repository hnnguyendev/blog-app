import { EPostStatus } from '@Shared/enum/EPostStatus';
import { ISectionContent } from './ISectionContent';

export interface IPost {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  status: EPostStatus;
  category: string;
  tags: string[];
  authorName: string;
  imageUrl: string;
  lastUpdated: Date | string;
  sections: ISectionContent[];
}
