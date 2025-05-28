import { ISearchParam } from '../common/ISearchParam';

export interface IPostSearchParam extends ISearchParam {
  searchKeyword?: string;
}
