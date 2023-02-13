import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import { openToast } from '../redux/slices/toast';
import type { SnackVariants } from '../types/base';

export const toastHandler = (
  dispatch: ThunkDispatch<Record<string, never>, Record<string, never>, AnyAction>,
  message: string,
  type: SnackVariants
) => {
  dispatch(
    openToast({
      message,
      type,
    })
  );
};
