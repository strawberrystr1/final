import { Languages, Roles, Themes } from './base';

export interface IRegisterUserPayload {
  name: string;
  password: string;
  email: string;
}

export interface IUserResponse {
  id: number;
  role: Roles;
  name: string;
  email: string;
  language: Languages;
  theme: Themes;
  token: string;
}

export type IUserLoginPayload = Omit<IRegisterUserPayload, 'name'>;

export interface IUpdateUserSettings {
  theme?: Themes;
  language?: Languages;
}

export interface IUpdateSettingsResponse {
  msg: string;
}
