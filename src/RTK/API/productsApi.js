import { PRODUCTS_URL, UPLOADS_URL } from "../endpoints/endpoints";
import { api } from "./api";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProductsDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${PRODUCTS_URL}`,
        params: {
          keyword,
          pageNumber,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (updatedProduct) => ({
        url: `${PRODUCTS_URL}/${updatedProduct.productId}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: ({ productId }) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
} = productsApi;
