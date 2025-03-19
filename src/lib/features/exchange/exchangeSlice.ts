import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface exchangeState {
  exchange: number | undefined;
}

type setexchangePayload = PayloadAction<{
  newExchange: number;
}>;

const initialState: exchangeState = {
  exchange: undefined,
};

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState: initialState,
  reducers: {
    setExchange: (state, action: setexchangePayload) => {
      state.exchange = action.payload.newExchange;
    },
  },
});

export const { setExchange } = exchangeSlice.actions;

export default exchangeSlice.reducer;
