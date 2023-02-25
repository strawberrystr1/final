import { SEARCH_ITEMS } from '../../constants/api';

import baseApi from './baseClient';

const searchApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    search: builder.query<unknown, string>({
      query: args => ({
        url: SEARCH_ITEMS(args),
      }),
    }),
  }),
});

export const { useSearchQuery } = searchApi;
