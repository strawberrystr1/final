import { COLLECTION_CREATE, USER_COLLECTIONS } from '../../constants/api';
import { IUserCollectionsResponse } from '../../types/collection';
import { ICreateCollectionForm } from '../../types/formik';
import { collectionQuery } from '../helpers/collectionQuery';

import baseApi from './baseClient';

const collectionApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    create: builder.mutation<void, ICreateCollectionForm>({
      query: body => ({
        url: COLLECTION_CREATE,
        method: 'POST',
        body,
      }),
      onQueryStarted: collectionQuery,
    }),
    getUserCollection: builder.query<IUserCollectionsResponse[], number>({
      query: args => ({
        url: `${USER_COLLECTIONS}?userId=${args}`,
      }),
    }),
  }),
});

export const { useCreateMutation, useGetUserCollectionQuery } = collectionApi;
