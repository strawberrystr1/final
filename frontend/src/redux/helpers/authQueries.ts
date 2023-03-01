import { LOGGED_IN, SERVER_ERROR } from '../../constants/toast';
import type { IAPIError } from '../../types/error';
import { BaseQuery } from '../../types/rtkApi';
import type { IRegisterUserPayload, IUserLoginPayload, IUserResponse } from '../../types/user';
import { toastHandler } from '../../utils/toastHandlers';
import { loginUser } from '../slices/user';
import { RootState } from '../store';

export const authQuery: BaseQuery<IUserLoginPayload | IRegisterUserPayload, IUserResponse> = async (
  arg,
  { dispatch, queryFulfilled, getState }
) => {
  const {
    user: { language },
  } = getState() as RootState;

  try {
    const { data } = await queryFulfilled;

    dispatch(loginUser(data));
    toastHandler(dispatch, LOGGED_IN[language], 'success');
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
