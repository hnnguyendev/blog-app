import { EPostStatus } from '@Shared/enum/EPostStatus';
import { ISectionContent } from './ISectionContent';
import { ICategory } from '../category/ICategory';
import { ITag } from '../tag/ITag';

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
  lastUpdated: Date | string;
  sections: ISectionContent[];
}
