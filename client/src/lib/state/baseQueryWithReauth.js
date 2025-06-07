// src/app/baseQueryWithReauth.js
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearCredentials, setCredentials } from "@/lib/state/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Try to refresh token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult?.data) {
      api.dispatch(
        setCredentials({
          user: refreshResult.data.user,
          accessToken: refreshResult.data.accessToken,
        })
      );
      // Retry the original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
    }
  }

  return result;
};
