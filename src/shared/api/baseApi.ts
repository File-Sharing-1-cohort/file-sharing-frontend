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
    uploadFile: build.mutation<
      FileData,
      { formData: FormData; signal: AbortSignal }
    >({
      query: ({ formData, signal }) => ({
        url: '/files',
        method: 'POST',
        body: formData,
        signal,
      }),
      async onQueryStarted(queryFulfilled) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log('Upload FIle:', error);
        }
      },
    }),
  }),
});

export const { useCheckApiQuery, useGetLogoQuery, useUploadFileMutation } =
  baseApi;

export { baseApi };
