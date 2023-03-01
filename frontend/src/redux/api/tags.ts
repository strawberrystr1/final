import { GET_ALL_TAGS, GET_TAGS_CLOUD } from '../../constants/api';
import { IFieldTag, IMainTagsCloudItem } from '../../types/base';

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
    getTagsCloud: builder.query<IMainTagsCloudItem[], null>({
      query: () => ({
        url: GET_TAGS_CLOUD,
      }),
    }),
  }),
});

export const { useGetAllTagsQuery, useGetTagsCloudQuery } = tagsApi;
