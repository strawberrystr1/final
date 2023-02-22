import { GET_LIKES, UPDATE_LIKES } from '../../constants/api';
import { ILike, IUpdateLikePayload } from '../../types/like';

import baseApi from './baseClient';

const likesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getItemLikes: builder.query<ILike, [string, string]>({
      query: arg => ({
        url: GET_LIKES(...arg),
      }),
      providesTags: result =>
        result
          ? [{ type: 'Likes' as const, id: 'LIKES' }, 'Likes']
          : [{ type: 'Likes', id: 'LIKES' }],
    }),
    updateLike: builder.mutation<ILike, IUpdateLikePayload>({
      query: ({ collectionId, itemId, ...body }) => ({
        url: UPDATE_LIKES(collectionId, itemId),
        method: 'POST',
        body: {
          ...body,
          itemId,
        },
      }),
      invalidatesTags: [{ type: 'Likes', id: 'LIKES' }],
    }),
  }),
});

export const { useGetItemLikesQuery, useUpdateLikeMutation } = likesApi;
