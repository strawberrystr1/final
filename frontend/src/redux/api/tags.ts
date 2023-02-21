import { GET_ALL_TAGS } from '../../constants/api';
import { IFieldTag } from '../../types/base';

import baseApi from './baseClient';

const tagsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllTags: builder.query<IFieldTag[], void>({
      query: () => ({
        url: GET_ALL_TAGS,
      }),
      providesTags: result =>
        result ? [...result.map(tag => ({ type: 'Tags' as const, id: tag.id })), 'Tags'] : ['Tags'],
    }),
  }),
});

export const { useGetAllTagsQuery } = tagsApi;
