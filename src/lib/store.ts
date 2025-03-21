import { configureStore } from '@reduxjs/toolkit';

import allCurrenciesReducer from './features/allCurrencies/allCurrenciesSlice';
import currenciesReducer from './features/currencies/currenciesSlice';
import exchangeReducer from './features/exchange/exchangeSlice';
import loadingReducer from './features/loading/loading';

export const makeStore = () => {
  return configureStore({
    reducer: {
      allCurrencies: allCurrenciesReducer,
      currencies: currenciesReducer,
      exchange: exchangeReducer,
      loading: loadingReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
