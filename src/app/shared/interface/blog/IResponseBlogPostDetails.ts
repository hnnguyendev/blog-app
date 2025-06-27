import { EPostStatus } from '@Shared/enum/EPostStatus';
import { ICategory } from '../category/ICategory';
import { ITag } from '../tag/ITag';
import { ISectionContent } from './ISectionContent';

export interface IResponseBlogPostDetails {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  status: EPostStatus;
  category: ICategory;
  tags: ITag[];
  authorName: string;
  imageUrl: string;
  website: string;
  lastUpdated: Date | string;
  sections: ISectionContent[];
}
