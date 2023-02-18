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

export type AdditionalFields = string | number | boolean | Date;
export type FormikItemCreate = Record<string, AdditionalFields>;

export type FormikItemCreatePayload = Record<
  string,
  { fieldKey: string; fieldValue: AdditionalFields }
>;

export interface IToastMessage {
  ru: string;
  en: string;
}
