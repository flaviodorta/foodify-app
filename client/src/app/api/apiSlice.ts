import {
  createApi,
  fetchBaseQuery,
  BaseQueryApi,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';
import { authActions } from '../../features/auth/authSlice';
import { RootState } from '../store';
import Cookie from 'js-cookie';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    if (token) {
      Cookie.set('accessToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
    }

    return headers;
  },
});

interface ExtraOptions {}

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: ExtraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log('sending refresh token');
    // send refresh token
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const state = api.getState() as RootState;
      const user = state.auth.user;
      api.dispatch(authActions.setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(authActions.logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
