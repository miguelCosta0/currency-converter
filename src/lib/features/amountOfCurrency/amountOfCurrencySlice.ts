import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import cleanInputNumber from '@/utils/cleanInputNumber';

export interface amountOfCurrencyState {
  amount1: string;
  amount2: string;
}

type changeCurrencyCodePayload = PayloadAction<{
  idNumber: number;
  newAmount: string;
  exchange: number;
}>;

const initialState: amountOfCurrencyState = {
  amount1: '',
  amount2: '',
};

export const amountOfCurrencySlice = createSlice({
  name: 'amountOfCurrency',
  initialState: initialState,
  reducers: {
    setAmountOfCurrency: (state, action: changeCurrencyCodePayload) => {
      const idNumber = action.payload.idNumber;
      let newAmount = action.payload.newAmount;
      let exchange = action.payload.exchange;
      const amountKey = `amount${idNumber}` as keyof amountOfCurrencyState;
      const otherAmountKey = `amount${
        (idNumber % 2) + 1
      }` as keyof amountOfCurrencyState;

      if (idNumber === 2) exchange **= -1;
      if (!newAmount) {
        state.amount1 = state.amount2 = '';
        return;
      }
      if (Number.isNaN(Number(newAmount))) return;

      const floatingPointIndex = newAmount.indexOf('.');
      if (
        floatingPointIndex > -1 &&
        newAmount.length - 1 - floatingPointIndex > 4
      ) {
        newAmount = newAmount.slice(0, newAmount.length - 1);
      }

      const otherNewAmount = cleanInputNumber(
        (Number(newAmount) * exchange).toFixed(4)
      );

      if (otherNewAmount === 'Infinity') {
        state.amount1 = state.amount2 = '';
        return;
      }

      state[amountKey] = newAmount;
      state[otherAmountKey] = otherNewAmount;
    },
  },
});

export const { setAmountOfCurrency } = amountOfCurrencySlice.actions;

export default amountOfCurrencySlice.reducer;
