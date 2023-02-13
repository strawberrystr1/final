import { Languages, Themes } from './base';

export interface IRegisterUserPayload {
  name: string;
  password: string;
  email: string;
}

export interface IUserResponse {
  id: number;
  role: 'user' | 'admin';
  name: string;
  email: string;
  language: 'en' | 'ru';
  theme: 'light' | 'dark';
  token: string;
}

export type IUserLoginPayload = Omit<IRegisterUserPayload, 'name'>;

export interface IUpdateUserSettings {
  theme?: Themes;
  language?: Languages;
}

export interface IUpdateSettingsResponse {}
