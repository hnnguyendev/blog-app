export interface IResponseBlogPost {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  authorName: string;
  imageUrl: string;
  lastUpdated: Date | string;
  slug: string;
}

export class ResponseBlogPost implements IResponseBlogPost {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public heroImage: string,
    public authorName: string,
    public imageUrl: string,
    public lastUpdated: Date | string,
    public slug: string
  ) {}
}
