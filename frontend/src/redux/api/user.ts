import { POST_SETTINGS } from '../../constants/api';
import type { IUpdateSettingsResponse, IUpdateUserSettings } from '../../types/user';
import { userQuery } from '../helpers/userQueries';

import baseApi from './baseClient';

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    updateSettings: builder.mutation<IUpdateSettingsResponse, IUpdateUserSettings>({
      query: body => ({
        url: POST_SETTINGS,
        method: 'POST',
        body,
      }),
      onQueryStarted: userQuery,
    }),
  }),
});

export const { useUpdateSettingsMutation } = userApi;
