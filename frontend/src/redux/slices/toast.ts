import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { SnackVariants } from '../../types/base';

interface IInitialState {
  message: string;
  isShowing: boolean;
  type: SnackVariants;
}

const initialState: IInitialState = {
  message: '',
  isShowing: false,
  type: 'info',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    openToast: (state, action: PayloadAction<Omit<IInitialState, 'isShowing'>>) => {
      return {
        ...action.payload,
        isShowing: true,
      };
    },
    closeToast: () => {
      return initialState;
    },
  },
});

export const { openToast, closeToast } = toastSlice.actions;
export default toastSlice.reducer;
