import { SERVER_ERROR, SETTING_CHANGED } from '../../constants/toast';
import { IAPIError } from '../../types/error';
import { BaseQuery } from '../../types/rtkApi';
import { IUpdateSettingsResponse, IUpdateUserSettings } from '../../types/user';
import { toastHandler } from '../../utils/toastHandlers';

export const userQuery: BaseQuery<IUpdateUserSettings, IUpdateSettingsResponse> = async (
  arg,
  { dispatch, queryFulfilled }
) => {
  try {
    await queryFulfilled;

    toastHandler(dispatch, SETTING_CHANGED, 'success');
  } catch (e) {
    const {
      error: {
        data: { msg },
      },
    } = e as IAPIError;

    if (msg) {
      toastHandler(dispatch, msg, 'error');
    } else {
      toastHandler(dispatch, SERVER_ERROR, 'error');
    }
  }
};
