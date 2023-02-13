import { COLLECTION_CREATE } from '../../constants/api';
import { ICollectionCreateResponse } from '../../types/collection';
import { ICreateCollectionForm } from '../../types/formik';
import { collectionQuery } from '../helpers/collectionQuery';

import baseApi from './baseClient';

const collectionApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    create: builder.mutation<ICollectionCreateResponse, ICreateCollectionForm>({
      query: body => ({
        url: COLLECTION_CREATE,
        method: 'POST',
        body,
      }),
      onQueryStarted: collectionQuery,
    }),
  }),
});

export const { useCreateMutation } = collectionApi;
