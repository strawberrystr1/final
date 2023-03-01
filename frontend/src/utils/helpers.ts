import { AdditionalFields } from '../constants/collection';
import { OmitNever } from '../types/base';
import { IUserCollectionsResponse } from '../types/collection';
import { IUserResponse } from '../types/user';

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

export const writeUserToLS = (data: IUserResponse) => {
  const { token, theme, language: langFromBE, role, name, id } = data;

  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify({ theme, role, name, language: langFromBE, id }));
};

export const changeLSUser = (key: string, value: string | number) => {
  const lsUser = JSON.parse(localStorage.getItem('user') as string);
  lsUser[key] = value;
  localStorage.setItem('user', JSON.stringify(lsUser));
};
