import { configureStore } from '@reduxjs/toolkit';

import flagSrcsReducer from './features/flagSrcs/flagSrcsSlice';
import currencyCodesReducer from './features/currencyCodes/currencyCodesSlice';
import currenciesReducer from './features/currencies/currenciesSlice';
import amountOfCurrencyReducer from './features/amountOfCurrency/amountOfCurrencySlice';
import exchangeReducer from './features/exchange/exchangeSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      flagSrcs: flagSrcsReducer,
      currencyCodes: currencyCodesReducer,
      currencies: currenciesReducer,
      amountOfCurrency: amountOfCurrencyReducer,
      exchange: exchangeReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
