import { EPostStatus } from '@Shared/enum/EPostStatus';

export interface IResponsePost {
  id: string;
  title: string;
  heroImage: string;
  category: string;
  authorName: string;
  lastUpdated: Date | string;
  status: EPostStatus;
}

export class ResponsePost implements IResponsePost {
  constructor(
    public id: string,
    public title: string,
    public heroImage: string,
    public category: string,
    public authorName: string,
    public lastUpdated: Date | string,
    public status: EPostStatus
  ) {}
}
