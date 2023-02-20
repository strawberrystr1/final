import {
  COLLECTION_CREATE,
  CREATE_COLLECTION_ITEM,
  ONE_COLLECTION,
  UPDATE_COLLECTION,
  USER_COLLECTIONS,
} from '../../constants/api';
import {
  COLLECTION_CREATE_MSG,
  COLLECTION_DELETE,
  COLLECTION_ITEM_CREATE_MSG,
  COLLECTION_UPDATE_MSG,
} from '../../constants/toast';
import { ICreateItemPayload, IUserCollectionsResponse } from '../../types/collection';
import { ICreateCollectionPayload, IUpdateCollectionPayload } from '../../types/formik';
import { collectionQuery } from '../helpers/collectionQuery';

import baseApi from './baseClient';

const collectionApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    create: builder.mutation<void, ICreateCollectionPayload>({
      query: body => ({
        url: COLLECTION_CREATE,
        method: 'POST',
        body,
      }),
      onQueryStarted: collectionQuery<ICreateCollectionPayload, void>(COLLECTION_CREATE_MSG),
      invalidatesTags: ['Collection'],
    }),
    updateCollection: builder.mutation<void, IUpdateCollectionPayload>({
      query: ({ id, ...rest }) => ({
        url: UPDATE_COLLECTION(id),
        method: 'POST',
        body: rest,
      }),
      onQueryStarted: collectionQuery<IUpdateCollectionPayload, void>(COLLECTION_UPDATE_MSG),
      invalidatesTags: ['Collection'],
    }),
    getUserCollection: builder.query<IUserCollectionsResponse[], void>({
      query: () => ({
        url: USER_COLLECTIONS,
      }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Collection' as const, id })), 'Collection']
          : ['Collection'],
    }),
    getOneCollection: builder.query<IUserCollectionsResponse, number>({
      query: arg => ({
        url: `${ONE_COLLECTION}${arg}`,
      }),
      providesTags: result =>
        result
          ? [...[result].map(({ id }) => ({ type: 'Collection' as const, id })), 'Collection']
          : ['Collection'],
    }),
    createCollectionItem: builder.mutation<void, ICreateItemPayload>({
      query: ({ id, ...body }) => ({
        url: CREATE_COLLECTION_ITEM(id),
        method: 'POST',
        body,
      }),
      onQueryStarted: collectionQuery<ICreateItemPayload, void>(COLLECTION_ITEM_CREATE_MSG),
      invalidatesTags: ['Collection'],
    }),
    deleteCollection: builder.mutation<void, number>({
      query: id => ({
        url: `${ONE_COLLECTION}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Collection'],
      onQueryStarted: collectionQuery<number, void>(COLLECTION_DELETE),
    }),
  }),
});

export const {
  useCreateMutation,
  useGetUserCollectionQuery,
  useGetOneCollectionQuery,
  useCreateCollectionItemMutation,
  useDeleteCollectionMutation,
  useUpdateCollectionMutation,
} = collectionApi;
