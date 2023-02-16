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

export interface ITag {
  id: string;
  text: string;
}

export type FormikItemCreate = Record<string, string | number | boolean | Date>;
