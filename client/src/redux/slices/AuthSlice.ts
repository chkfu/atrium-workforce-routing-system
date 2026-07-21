import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth, IAuthState } from '../../utils/types/redux_types';

const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
};

export const auth_slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IAuth>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, clearAuth } = auth_slice.actions;

export default auth_slice.reducer;
