import { ADMIN_USERS_DATA, POST_SETTINGS } from '../../constants/api';
import { USERS_DELETED } from '../../constants/toast';
import type {
  IUpdateSettingsResponse,
  IUpdateUserUpdatePayload,
  IUserResponse,
} from '../../types/user';
import { baseQuery } from '../helpers/baseQuery';
import { userQuery } from '../helpers/userQueries';

import baseApi from './baseClient';

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    updateUser: builder.mutation<
      IUpdateSettingsResponse,
      IUpdateUserUpdatePayload | IUpdateUserUpdatePayload[]
    >({
      query: body => ({
        url: POST_SETTINGS,
        method: 'POST',
        body,
      }),
      onQueryStarted: userQuery,
      invalidatesTags: ['Users'],
    }),
    getAdminData: builder.query<IUserResponse[], void>({
      query: () => ({
        url: ADMIN_USERS_DATA,
      }),
      providesTags: ['Users'],
    }),
    deleteUsers: builder.mutation<void, string[]>({
      query: body => ({
        url: POST_SETTINGS,
        method: 'DELETE',
        body,
      }),
      onQueryStarted: baseQuery<string[], void>(USERS_DELETED),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useUpdateUserMutation, useGetAdminDataQuery, useDeleteUsersMutation } = userApi;
