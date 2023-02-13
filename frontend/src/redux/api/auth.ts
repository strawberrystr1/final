import { POST_LOGIN, POST_REGISTER } from '../../constants/api';
import type { IRegisterUserPayload, IUserLoginPayload, IUserResponse } from '../../types/user';
import { authQuery } from '../helpers/authQueries';

import baseApi from './baseClient';

const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    register: build.mutation<IUserResponse, IRegisterUserPayload>({
      query: body => ({
        url: POST_REGISTER,
        method: 'POST',
        body,
      }),
      onQueryStarted: authQuery,
    }),
    login: build.mutation<IUserResponse, IUserLoginPayload>({
      query: body => ({
        url: POST_LOGIN,
        method: 'POST',
        body,
      }),
      onQueryStarted: authQuery,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
