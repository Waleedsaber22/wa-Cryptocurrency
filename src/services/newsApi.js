import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://bing-news-search1.p.rapidapi.com";
const newsApiHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": "87e344fd17mshdd40da9033fd90ep1e2367jsn6c240e713694",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};
const createRequest = (url) => ({
  url,
  headers: newsApiHeaders,
});

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ path, count, category }) =>
        createRequest(
          `/${path}?${count ? "count=" + count : ""}&${
            category ? "q=" + category : ""
          }`
        ),
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
