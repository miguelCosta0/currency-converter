import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LoadingState {
  loading: boolean;
}

type SetLoadingPayload = PayloadAction<boolean>;

const initialState: LoadingState = {
  loading: true,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialState,
  reducers: {
    setLoading: (state, action: SetLoadingPayload) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
