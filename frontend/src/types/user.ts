import { Languages, Roles, Status, Themes } from './base';

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
  status: Status;
}

export type IUserLoginPayload = Omit<IRegisterUserPayload, 'name'>;

export interface IUpdateUserUpdatePayload {
  theme?: Themes;
  language?: Languages;
  role?: Roles;
  status?: Status;
  id?: number;
  field?: string;
}

export interface IUpdateSettingsResponse {
  msg: string;
}
