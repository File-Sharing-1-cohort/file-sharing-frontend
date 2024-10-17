import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API_URL }),
  endpoints: build => ({
    checkApi: build.query<string, void>({ query: () => 'ping' }),
    getLogo: build.query<string, void>({query: () => 'public/logo'}),
  }),
});

export const { useCheckApiQuery, useGetLogoQuery } = baseApi;
export { baseApi };
