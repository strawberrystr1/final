import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Languages, Roles, Themes } from '../../types/base';
import type { IUserResponse } from '../../types/user';

interface IInitialState {
  isLogged: boolean;
  name: string;
  theme: Themes;
  language: Languages;
  role: Roles;
  token: string;
}

const initialState: IInitialState = {
  isLogged: false,
  name: '',
  theme: 'dark',
  language: 'en',
  role: 'user',
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeLanguage: state => {
      state.language = state.language === 'en' ? 'ru' : 'en';
    },
    changeTheme: state => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    loginUser: (state, action: PayloadAction<IUserResponse>) => {
      const { name, role, theme, language, token } = action.payload;

      return {
        isLogged: true,
        name,
        role,
        theme,
        language,
        token,
      };
    },
    logoutUser: () => {
      return initialState;
    },
  },
});

export default userSlice.reducer;
export const { changeLanguage, changeTheme, loginUser, logoutUser } = userSlice.actions;
