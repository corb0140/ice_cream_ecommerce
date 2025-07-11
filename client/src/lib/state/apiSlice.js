import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Product", "Cart", "Image"], // Define tag types for cache invalidation
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ token, email }) => ({
        url: `/auth/verify-email?token=${token}&email=${email}`,
        method: "GET",
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),

    // IMAGES
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/images/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Image"],
    }),

    getUserImage: builder.query({
      query: () => "/images/user",
      providesTags: ["Image"],
    }),

    updateUserImage: builder.mutation({
      query: (formData) => ({
        url: "/images/update",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Image"],
    }),

    // USERS
    getUser: builder.query({
      query: () => "/user/me",
      providesTags: ["User"],
    }),

    // PRODUCTS
    getProducts: builder.query({
      query: () => "/products",
      providesTags: (result = []) =>
        result.length
          ? [
              ...result.map(({ id }) => ({ type: "Product", id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    createProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    updateProduct: builder.mutation({
      query: ({ id, product }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: product,
        formData: true,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),

    // CART
    getCart: builder.query({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: "/cart",
        method: "POST",
        body: { productId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation({
      query: ({ itemId, quantity }) => ({
        url: `/cart/${itemId}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    removeItemFromCart: builder.mutation({
      query: (itemId) => ({
        url: `/cart/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // CHECKOUT
    createCheckoutSession: builder.mutation({
      query: (cartItems) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { cartItems },
      }),
    }),

    // FAVORITES
    getUserFavorites: builder.query({
      query: () => "/favorites",
      providesTags: ["User"],
    }),

    addFavorite: builder.mutation({
      query: (productId) => ({
        url: "/favorites",
        method: "POST",
        body: productId,
      }),
      invalidatesTags: ["User"],
    }),

    removeFavorite: builder.mutation({
      query: (productId) => ({
        url: `/favorites/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyEmailMutation,
  useRefreshMutation,
  useUploadImageMutation,
  useGetUserImageQuery,
  useUpdateUserImageMutation,
  useGetUserQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveItemFromCartMutation,
  useCreateCheckoutSessionMutation,
  useGetUserFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = apiSlice;
