export interface IModelCondition {
  filterType: string;
  type?: string;
  filter?: string;
  operator?: string;
  dateFrom?: string;
  dateTo?: string;
  condition1?: IModelCondition;
  condition2?: IModelCondition;
  conditions?: IModelCondition[];
  matchMode: string;
  value: string;
}
