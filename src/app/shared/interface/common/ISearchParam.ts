import { ISearchCondition } from './ISearchCondition';

export interface ISearchParam {
  searchConditions?: ISearchCondition[];
  page: number;
  size: number;
  sort?: string;
}
