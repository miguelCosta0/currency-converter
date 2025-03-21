export type CurrenciesExchangeObj = {
  date: string;
} & CurrenciesExchange;

export type CurrenciesExchange = {
  [key: string]: Record<string, number>;
};
