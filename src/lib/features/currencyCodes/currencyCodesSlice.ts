import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface currencyCodesState {
  currency1: string;
  currency2: string;
}

type changeCurrencyCodePayload = PayloadAction<{
  idNumber: number;
  newCode: string;
}>;

const initialState: currencyCodesState = {
  currency1: '',
  currency2: '',
};

export const currencyCodesSlice = createSlice({
  name: 'currencyCodes',
  initialState: initialState,
  reducers: {
    changeCurrencyCode: (state, action: changeCurrencyCodePayload) => {
      const idNumber = action.payload.idNumber;
      state[`currency${idNumber}` as keyof currencyCodesState] =
        action.payload.newCode.toLowerCase();
    },
    toggleCurrencyCodes: (state) => {
      [state.currency1, state.currency2] = [state.currency2, state.currency1];
    },
  },
});

export const { changeCurrencyCode, toggleCurrencyCodes } =
  currencyCodesSlice.actions;

export default currencyCodesSlice.reducer;
