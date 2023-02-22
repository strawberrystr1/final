import { GET_LIKES, UPDATE_LIKES } from '../../constants/api';
import { ILike, IUpdateLikePayload } from '../../types/like';

import baseApi from './baseClient';

const likesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getItemLikes: builder.query<ILike, [string, string]>({
      query: arg => ({
        url: GET_LIKES(...arg),
      }),
    }),
    updateLike: builder.mutation<void, IUpdateLikePayload>({
      query: ({ collectionId, itemId, ...body }) => ({
        url: UPDATE_LIKES(collectionId, itemId),
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetItemLikesQuery, useUpdateLikeMutation } = likesApi;
