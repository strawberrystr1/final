import { DELETE_ITEM, GET_COLLECTION_ITEMS, GET_ONE_ITEM } from '../../constants/api';
import { ITEM_DELETE } from '../../constants/toast';
import { IItem, IItemWithAllFields } from '../../types/item';
import { collectionQuery } from '../helpers/collectionQuery';

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
    getOneItem: builder.query<IItemWithAllFields, [string, string]>({
      query: ([collectionId, itemId]) => ({
        url: GET_ONE_ITEM(collectionId, itemId),
      }),
      providesTags: result =>
        result ? [{ type: 'Item' as const, id: result.id }, 'Item'] : ['Item'],
    }),
    deleteItem: builder.mutation<void, [string, string]>({
      query: ([collectionId, itemId]) => ({
        url: DELETE_ITEM(collectionId, itemId),
        method: 'DELETE',
      }),
      invalidatesTags: ['Item', 'Collection'],
      onQueryStarted: collectionQuery<[string, string], void>(ITEM_DELETE),
    }),
  }),
});

export const { useGetCollectionItemsQuery, useGetOneItemQuery, useDeleteItemMutation } = itemsApi;
