import { SEARCH_ITEMS } from '../../constants/api';
import { ISearchResult } from '../../types/search';

import baseApi from './baseClient';

const searchApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    search: builder.query<ISearchResult[], string>({
      query: args => ({
        url: SEARCH_ITEMS(args),
      }),
    }),
  }),
});

export const { useSearchQuery } = searchApi;
