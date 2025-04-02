import getDateToday from '@/utils/getDateToday';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ExchangeState {
  exchange: number | undefined;
  date: string;
}

type SetExchangePayload = PayloadAction<{
  newExchange: number;
}>;

type SetExchangeDatePayload = PayloadAction<string>;

const initialState: ExchangeState = {
  exchange: undefined,
  date: getDateToday(),
};

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState: initialState,
  reducers: {
    setExchange: (state, action: SetExchangePayload) => {
      const newExchange = action.payload.newExchange;
      if (newExchange) state.exchange = newExchange;
    },
    setExchangeDate: (state, action: SetExchangeDatePayload) => {
      state.date = action.payload;
    },
  },
});

export const { setExchange, setExchangeDate } = exchangeSlice.actions;

export default exchangeSlice.reducer;
