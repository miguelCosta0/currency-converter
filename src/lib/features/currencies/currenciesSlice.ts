import { CurrencyWithFlags } from '@/types/Currency';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface currenciesState {
  obj: Record<string, CurrencyWithFlags> | undefined;
}

type setCurrenciesPayload = PayloadAction<Record<string, CurrencyWithFlags>>;

const initialState: currenciesState = {
  obj: undefined,
};

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: initialState,
  reducers: {
    setCurrencies: (state, action: setCurrenciesPayload) => {
      state.obj = action.payload;
    },
  },
});

export const { setCurrencies } = currenciesSlice.actions;

export default currenciesSlice.reducer;
