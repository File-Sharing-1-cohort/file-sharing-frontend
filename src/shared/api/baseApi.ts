import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface UploadFileResponse {
  presignedUrl: string;
}

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}`,
  }),
  endpoints: build => ({
    checkApi: build.query<string, void>({ query: () => 'ping' }),
    getLogo: build.query<string, void>({ query: () => 'public/logo' }),
    uploadFile: build.mutation<UploadFileResponse, FormData>({
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
    getFile: build.query<File, string>({
      query: id => `files/${id}`,
    }),
  }),
});

export const {
  useCheckApiQuery,
  useGetLogoQuery,
  useUploadFileMutation,
  useGetFileQuery,
} = baseApi;

export { baseApi };
