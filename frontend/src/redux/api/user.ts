import type { IUpdateSettingsResponse, IUpdateUserSettings } from '../../types/user';
import { userQuery } from '../helpers/userQueries';

import baseApi from './baseClient';

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    updateSettings: builder.mutation<IUpdateSettingsResponse, IUpdateUserSettings>({
      query: body => ({
        url: '/user/settings',
        method: 'POST',
        body,
      }),
      onQueryStarted: userQuery,
    }),
  }),
});

export const { useUpdateSettingsMutation } = userApi;
