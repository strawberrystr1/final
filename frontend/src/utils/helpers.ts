import { AdditionalFields } from '../constants/collection';
import { OmitNever } from '../types/base';
import { IUserCollectionsResponse } from '../types/collection';

type PossibleKeys = OmitNever<{
  [P in keyof IUserCollectionsResponse]: IUserCollectionsResponse[P] extends string[] ? P : never;
}>;
export type AdditionalFieldPluralKeys = keyof PossibleKeys;

export const getFieldName = (field: AdditionalFields): AdditionalFieldPluralKeys => {
  return field === 'checkbox' ? `${field}es` : `${field}s`;
};

export const revertFieldName = (field: AdditionalFieldPluralKeys) => {
  return field === 'checkboxes'
    ? (field.slice(0, -2) as AdditionalFields)
    : (field.slice(0, -1) as AdditionalFields);
};

export const extractIds = (path: string) => {
  return path
    .split('/')
    .map(e => +e)
    .filter(e => e)
    .map(e => `${e}`);
};

export const formatDateForInput = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString().split('.').reverse().join('-');
};
