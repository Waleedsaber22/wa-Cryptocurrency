import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const baseUrl = "https://coinranking1.p.rapidapi.com";
const cryptoApiHeaders = {
  "X-RapidAPI-Key": "87e344fd17mshdd40da9033fd90ep1e2367jsn6c240e713694",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};
const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: ({ path, limit, timePeriod }) =>
        createRequest(
          `/${path}?${limit ? "limit=" + limit : ""}&${
            timePeriod ? "timePeriod=" + timePeriod : ""
          }`
        ),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;

// const fetchCoinDetails = async (isLoading, isError, coinid) => {
//   const URL = `https://coinranking1.p.rapidapi.com/coin/${
//     coinid || "Qwsogvtv82FCd"
//   }`;
//   try {
//     isLoading(true);
//     console.log("kkj");
//     const res = await axios.request(URL, {
//       headers: {
//         "X-RapidAPI-Key": "87e344fd17mshdd40da9033fd90ep1e2367jsn6c240e713694",
//         "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
//       },
//     });
//     console.log(isLoading);
//     isLoading(false);
//     return res.data;
//   } catch (error) {
//     isError(true);
//     console.log(error, "waleed");
//   }
// };

// export { fetchCoinDetails };
