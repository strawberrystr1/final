import type { IRegisterUserPayload, IUserLoginPayload, IUserResponse } from '../../types/user';
import { authQuery } from '../helpers/authQueries';

import baseApi from './baseClient';

const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    register: build.mutation<IUserResponse, IRegisterUserPayload>({
      query: body => ({
        url: '/user/register',
        method: 'POST',
        body,
      }),
      onQueryStarted: authQuery,
    }),
    login: build.mutation<IUserResponse, IUserLoginPayload>({
      query: body => ({
        url: '/user/login',
        method: 'POST',
        body,
      }),
      onQueryStarted: authQuery,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
