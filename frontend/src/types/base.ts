import { IUserResponse } from './user';

export type SnackVariants = 'error' | 'info' | 'success';
export type Themes = 'dark' | 'light';
export type Languages = 'en' | 'ru';
export type Roles = 'admin' | 'user';
export type JWTUser = IUserResponse & {
  exp: number;
  iat: number;
};

export interface IAdditionalField {
  name: string;
}

export interface IFieldTag {
  id: string;
  text: string;
}

export type AdditionalFieldsTypes = string | number | boolean | Date;
export type FormikItemCreate = Record<string, AdditionalFieldsTypes>;

export type FormikItemCreatePayload = Record<
  string,
  { fieldKey: string; fieldValue: AdditionalFieldsTypes }
>;

export interface IToastMessage {
  ru: string;
  en: string;
}

export type OmitNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};
