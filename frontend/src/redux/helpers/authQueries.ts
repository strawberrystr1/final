import { LOGGED_IN } from '../../constants/toast';
import type { IAPIError } from '../../types/error';
import { BaseQuery } from '../../types/rtkApi';
import type { IRegisterUserPayload, IUserLoginPayload, IUserResponse } from '../../types/user';
import { toastHandler } from '../../utils/toastHandlers';
import { loginUser } from '../slices/user';

export const authQuery: BaseQuery<IUserLoginPayload | IRegisterUserPayload, IUserResponse> = async (
  arg,
  { dispatch, queryFulfilled }
) => {
  try {
    const { data } = await queryFulfilled;

    localStorage.setItem('token', data.token);
    dispatch(loginUser(data));
    toastHandler(dispatch, LOGGED_IN, 'success');
  } catch (e) {
    const {
      error: {
        data: { msg },
      },
    } = e as IAPIError;

    toastHandler(dispatch, msg, 'error');
  }
};
