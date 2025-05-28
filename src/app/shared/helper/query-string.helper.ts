import { DATE_FORMAT } from '@Shared/constant/common.constants';
import { ESortType } from '@Shared/enum/ESortType';
import { IModelCondition } from '@Shared/interface/common/IModelCondition';
import { IModelSearchCondition } from '@Shared/interface/common/IModelSearchCondition';
import { ISearchCondition } from '@Shared/interface/common/ISearchCondition';
import { ISortParam } from '@Shared/interface/common/ISortParam';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const convertSortObjToQueryString = (sortParam: ISortParam): string => {
  if (sortParam && sortParam.sortField && sortParam.sortOrder) {
    return `${sortParam.sortField},${sortParam.sortOrder === 1 ? ESortType.ASC : ESortType.DESC}`;
  }
  return '';
};

export const convertToSearchConditions = (modelFilter: string): ISearchCondition[] => {
  const oldJsonObj: IModelSearchCondition = JSON.parse(modelFilter);
  const newJsonConditions: ISearchCondition[] = [];

  const getValueDate = (dateVal: string): string => {
    const myDate = dayjs(dateVal);

    return myDate.format(DATE_FORMAT.YYYY_MM_DD);
  };

  const createSearchCondition = (key: string, condition: IModelCondition, combinationType: string = 'AND'): ISearchCondition => {
    const { value, matchMode } = condition;
    let filterType = 'text';
    if (matchMode.includes('date')) {
      filterType = 'date';
    } else if (typeof value === 'number') {
      filterType = 'number';
    }
    return {
      column: key,
      conditionType: matchMode!,
      filterType: filterType,
      value: filterType !== 'date' ? value! : getValueDate(value),
      combinationType
    };
  };

  for (const key of Object.keys(oldJsonObj)) {
    const oldCondition = oldJsonObj[key];
    if (oldCondition.value) {
      newJsonConditions.push(createSearchCondition(key, oldCondition));
    }
  }
  return newJsonConditions;
};
