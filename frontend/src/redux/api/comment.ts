import { CREATE_COMMENT, GET_COMMENTS } from '../../constants/api';
import { COMMENT_CREATED } from '../../constants/toast';
import { IComment, ICreateCommentPayload } from '../../types/comment';
import { baseQuery } from '../helpers/baseQuery';

import baseApi from './baseClient';

const commentApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getItemComments: builder.query<IComment[], [string, string]>({
      query: args => ({
        url: GET_COMMENTS(...args),
      }),
      providesTags: results =>
        results
          ? [...results.map(() => ({ type: 'Comments' as const, id: 'COMMENTS' }))]
          : ['Comments'],
    }),
    createItemComment: builder.mutation<IComment, ICreateCommentPayload>({
      query: ({ collectionId, ...body }) => ({
        url: CREATE_COMMENT(collectionId, `${body.itemId}`),
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Comments', id: 'COMMENTS' }],
      onQueryStarted: baseQuery<ICreateCommentPayload, IComment>(COMMENT_CREATED),
    }),
  }),
});

export const { useGetItemCommentsQuery, useCreateItemCommentMutation } = commentApi;
