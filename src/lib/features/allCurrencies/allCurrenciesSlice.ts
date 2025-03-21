import { CurrencyWithFlags } from '@/types/Currency';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AllCurrenciesState {
  currencies: Record<string, CurrencyWithFlags> | undefined;
}

type SetAllCurrenciesPayload = PayloadAction<Record<string, CurrencyWithFlags>>;

const initialState: AllCurrenciesState = {
  currencies: undefined,
};

export const allCurrenciesSlice = createSlice({
  name: 'allCurrencies',
  initialState: initialState,
  reducers: {
    setAllCurrencies: (state, action: SetAllCurrenciesPayload) => {
      state.currencies = action.payload;
    },
  },
});

export const { setAllCurrencies } = allCurrenciesSlice.actions;

export default allCurrenciesSlice.reducer;
