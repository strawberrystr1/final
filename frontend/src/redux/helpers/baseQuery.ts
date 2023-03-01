import { SERVER_ERROR } from '../../constants/toast';
import { IToastMessage } from '../../types/base';
import type { IAPIError } from '../../types/error';
import { BaseQuery } from '../../types/rtkApi';
import { toastHandler } from '../../utils/toastHandlers';
import { RootState } from '../store';

export const baseQuery =
  <T, R>(message: IToastMessage): BaseQuery<T, R> =>
  async (arg, { dispatch, queryFulfilled, getState }) => {
    const {
      user: { language },
    } = getState() as RootState;

    try {
      await queryFulfilled;

      toastHandler(dispatch, message[language], 'success');
    } catch (e) {
      const {
        error: {
          data: { msg },
        },
      } = e as IAPIError;

      if (msg) {
        toastHandler(dispatch, msg, 'error');
      } else {
        toastHandler(dispatch, SERVER_ERROR[language], 'error');
      }
    }
  };
