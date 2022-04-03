import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': 'cd6cd91bf3msh6905a6c6b241644p1e8a3djsndcdb9fa298bd'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com/coins'

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = cryptoApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => createRequest('/coins')
        })
    })
})

export const {
    useGetCryptosQuery,
} = cryptoApi

/* const options = {
    method: 'GET',
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h',
      tiers: '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: '50',
      offset: '0'
    },
  }; */