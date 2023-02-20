import { GET_COLLECTION_ITEMS, GET_ONE_ITEM } from '../../constants/api';
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
    getOneItem: builder.query<IItem, [string, string]>({
      query: ([collectionId, itemId]) => ({
        url: GET_ONE_ITEM(collectionId, itemId),
      }),
      providesTags: result =>
        result ? [{ type: 'Item' as const, id: result.id }, 'Item'] : ['Item'],
    }),
  }),
});

export const { useGetCollectionItemsQuery, useGetOneItemQuery } = itemsApi;
