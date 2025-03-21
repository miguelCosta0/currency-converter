import cleanInputNumber from '@/utils/cleanInputNumber';
import { createSlice } from '@reduxjs/toolkit';
import {
  SetFlagSrcPayload,
  CurrenciesState,
  SetAmountOfCurrencyPayload,
  SetCurrencyCodePayload,
} from './types';

const initialState: CurrenciesState = {
  currency1: {
    code: '',
    amount: '',
    flagSrc: process.env.NEXT_PUBLIC_defaultFlagSrc!,
  },
  currency2: {
    code: '',
    amount: '',
    flagSrc: process.env.NEXT_PUBLIC_defaultFlagSrc!,
  },
};

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: initialState,
  reducers: {
    setCurrencyCode: (state, action: SetCurrencyCodePayload) => {
      const idNumber = action.payload.idNumber;
      state[`currency${idNumber}` as keyof CurrenciesState].code =
        action.payload.newCode.toLowerCase();
    },
    setFlagSrc: (state, action: SetFlagSrcPayload) => {
      const idNumber = action.payload.idNumber;
      state[`currency${idNumber}` as keyof CurrenciesState].flagSrc =
        action.payload.newSrc;
    },
    setAmountOfCurrency: (state, action: SetAmountOfCurrencyPayload) => {
      const idNumber = action.payload.idNumber;
      let newAmount = action.payload.newAmount;
      let exchange = action.payload.exchange;
      const currentCurrency = `currency${idNumber}` as keyof CurrenciesState;
      const otherCurrency = `currency${
        (idNumber % 2) + 1
      }` as keyof CurrenciesState;

      if (idNumber === 2) exchange **= -1;
      if (!newAmount) {
        state.currency1.amount = state.currency2.amount = '';
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
        state.currency1.amount = state.currency2.amount = '';
        return;
      }

      state[currentCurrency].amount = newAmount.trim();
      state[otherCurrency].amount = otherNewAmount;
    },
    toggleCurrencies: (state) => {
      [state.currency1.code, state.currency2.code] = [
        state.currency2.code,
        state.currency1.code,
      ];
      [state.currency1.flagSrc, state.currency2.flagSrc] = [
        state.currency2.flagSrc,
        state.currency1.flagSrc,
      ];
    },
  },
});

export const {
  setCurrencyCode,
  toggleCurrencies,
  setAmountOfCurrency,
  setFlagSrc,
} = currenciesSlice.actions;

export default currenciesSlice.reducer;
