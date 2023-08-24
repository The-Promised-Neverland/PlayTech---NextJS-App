import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../endpoints/endpoints';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL, credentials: "include"});

export const api = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order' ,'User'],
    endpoints: (builder) => ({}),
});