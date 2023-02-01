import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  isLogged: boolean;
  userName: string;
  theme: 'dark' | 'light';
  language: 'en' | 'ru';
  role: 'admin' | 'user';
  token: string;
}

const initialState: IInitialState = {
  isLogged: false,
  userName: '',
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
  },
});

export default userSlice.reducer;
export const { changeLanguage, changeTheme } = userSlice.actions;
