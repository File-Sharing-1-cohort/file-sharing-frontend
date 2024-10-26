import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface FileData {
    originalFileName: string;
    awsFileName: string;
    link: string;
    password: string | null;
    id: number;
}

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}`,
  }),
  endpoints: build => ({
    checkApi: build.query<string, void>({ query: () => 'ping' }),
    getLogo: build.query<string, void>({ query: () => 'public/logo' }),
    uploadFile: build.mutation<FileData, FormData>({
      query: formData => ({
        url: 'files',
        method: 'POST',
        body: formData,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log('Upload FIle:', error);
        }
      },
    }),
  }),
});

export const {
  useCheckApiQuery,
  useGetLogoQuery,
  useUploadFileMutation,
} = baseApi;

export { baseApi };
