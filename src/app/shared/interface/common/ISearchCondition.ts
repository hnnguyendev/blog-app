export interface ISearchCondition {
  column?: string;
  conditionType?: string;
  value?: any;
  filterType?: string;
  values?: any[];
  combinationType?: string;
  subConditions?: ISearchCondition[];
}
