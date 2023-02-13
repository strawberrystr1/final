export interface IUser {
  id: number;
  role: "user" | "admin";
  name: string;
  email: string;
  password: string;
  language: "en" | "ru";
  theme: "light" | "dark";
}

export type IUserCreation = Omit<IUser, "id" | "language" | "theme" | "role">;

export type IUserLogin = Omit<IUserCreation, "name">;

export type IUserSettings = Pick<IUser, "theme" | "language">;

export type IAuthUser = Pick<IUser, "role" | "email" | "name" | 'theme' | 'id'>;
