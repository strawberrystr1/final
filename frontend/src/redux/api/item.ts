import {
  DELETE_ITEM,
  GET_COLLECTION_ITEMS,
  GET_LATTEST_ITEMS,
  GET_ONE_ITEM,
  UPDATE_ITEM,
} from '../../constants/api';
import { ITEM_DELETE, ITEM_UPDATE } from '../../constants/toast';
import { IUpdateItemPayload } from '../../types/collection';
import { IItem, IItemWithAllFields, IMainPageItems } from '../../types/item';
import { baseQuery } from '../helpers/baseQuery';

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
      onQueryStarted: baseQuery<[string, string], void>(ITEM_DELETE),
    }),
    updateItem: builder.mutation<void, IUpdateItemPayload>({
      query: ({ collectionId, itemId, ...body }) => ({
        url: UPDATE_ITEM(collectionId as string, itemId as string),
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Item', 'Collection'],
      onQueryStarted: baseQuery<IUpdateItemPayload, void>(ITEM_UPDATE),
    }),
    getLattestItems: builder.query<IMainPageItems[], null>({
      query: () => ({
        url: GET_LATTEST_ITEMS,
      }),
    }),
  }),
});

export const {
  useGetCollectionItemsQuery,
  useGetOneItemQuery,
  useDeleteItemMutation,
  useUpdateItemMutation,
  useGetLattestItemsQuery,
} = itemsApi;
