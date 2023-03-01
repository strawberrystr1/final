import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '../../constants/api';

const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: headers => {
      const tokenLS = localStorage.getItem('token');

      if (tokenLS) {
        headers.set('authorization', `Bearer ${tokenLS}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Collection', 'Item', 'Tags', 'Likes', 'Comments', 'Users'],
  endpoints: () => ({}),
});

export default baseApi;
