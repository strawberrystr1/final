import {
  COLLECTION_CREATE,
  CREATE_COLLECTION_ITEM,
  ONE_COLLECTION,
  USER_COLLECTIONS,
} from '../../constants/api';
import { COLLECTION_CREATE_MSG, COLLECTION_ITEM_CREATE_MSG } from '../../constants/toast';
import { ICreateItemPayload, IUserCollectionsResponse } from '../../types/collection';
import { ICreateCollectionPayload } from '../../types/formik';
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
    }),
    getUserCollection: builder.query<IUserCollectionsResponse[], void>({
      query: () => ({
        url: USER_COLLECTIONS,
      }),
    }),
    getOneCollection: builder.query<IUserCollectionsResponse, number>({
      query: arg => ({
        url: `${ONE_COLLECTION}${arg}`,
      }),
    }),
    createCollectionItem: builder.mutation<void, ICreateItemPayload>({
      query: ({ id, ...body }) => ({
        url: CREATE_COLLECTION_ITEM(id),
        method: 'POST',
        body,
      }),
      onQueryStarted: collectionQuery<ICreateItemPayload, void>(COLLECTION_ITEM_CREATE_MSG),
    }),
  }),
});

export const {
  useCreateMutation,
  useGetUserCollectionQuery,
  useGetOneCollectionQuery,
  useCreateCollectionItemMutation,
} = collectionApi;
