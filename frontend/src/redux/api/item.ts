import { GET_COLLECTION_ITEMS } from '../../constants/api';
import { IItem } from '../../types/item';

import baseApi from './baseClient';

const itemsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCollectionItems: builder.query<IItem[], string>({
      query: id => ({
        url: GET_COLLECTION_ITEMS(id),
      }),
      providesTags: result =>
        result ? [...result.map(({ id }) => ({ type: 'Item' as const, id })), 'Item'] : ['Item'],
    }),
  }),
});

export const { useGetCollectionItemsQuery } = itemsApi;
