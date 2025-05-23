import { ISectionContent } from './ISectionContent';

export interface IPost {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  status: string;
  category: string;
  tags: string[];
  sections: ISectionContent[];
}
