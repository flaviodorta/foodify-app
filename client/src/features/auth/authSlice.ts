import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  name: string;
  roles: string[];
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
}

const initialState: IAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuthState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
