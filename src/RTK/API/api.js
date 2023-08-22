import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';
import { BASE_URL } from '../endpoints/endpoints';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

export const api = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order' ,'User'],
    endpoints: (builder) => ({}),
});