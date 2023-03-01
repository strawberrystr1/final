import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Languages, Roles, Themes } from '../../types/base';
import type { IUserResponse } from '../../types/user';
import { changeLSUser, writeUserToLS } from '../../utils/helpers';

interface IInitialState {
  isLogged: boolean;
  name: string;
  theme: Themes;
  language: Languages;
  role: Roles;
  token: string;
  id: number;
}

const initialState: IInitialState = {
  isLogged: false,
  name: '',
  theme: 'dark',
  language: 'en',
  role: 'user',
  token: '',
  id: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeLanguage: state => {
      state.language = state.language === 'en' ? 'ru' : 'en';
      changeLSUser('language', state.language);
    },
    changeTheme: state => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      changeLSUser('theme', state.theme);
    },
    loginUser: (state, action: PayloadAction<IUserResponse>) => {
      const { name, role, theme, language, token, id } = action.payload;

      writeUserToLS(action.payload);
      return {
        isLogged: true,
        name,
        role,
        theme,
        language,
        token,
        id,
      };
    },
    logoutUser: () => {
      return initialState;
    },
  },
});

export default userSlice.reducer;
export const { changeLanguage, changeTheme, loginUser, logoutUser } = userSlice.actions;
