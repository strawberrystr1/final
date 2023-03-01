import { SERVER_ERROR, SETTING_CHANGED } from '../../constants/toast';
import { IAPIError } from '../../types/error';
import { BaseQuery } from '../../types/rtkApi';
import { IUpdateSettingsResponse, IUpdateUserUpdatePayload } from '../../types/user';
import { toastHandler } from '../../utils/toastHandlers';
import { RootState } from '../store';

export const userQuery: BaseQuery<IUpdateUserUpdatePayload, IUpdateSettingsResponse> = async (
  arg,
  { dispatch, queryFulfilled, getState }
) => {
  const {
    user: { language },
  } = getState() as RootState;

  try {
    await queryFulfilled;

    toastHandler(dispatch, SETTING_CHANGED[language], 'success');
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
