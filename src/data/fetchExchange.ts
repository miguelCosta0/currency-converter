import { type CurrenciesExchangeObj } from '@/types/ExchangeObj';

export default async function fetchExchange(
  currencyCode1: string,
  currencyCode2: string,
  date: string
): Promise<number | null> {
  const apiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${currencyCode1}.json`;
  const exchangeObj: CurrenciesExchangeObj | string = await fetch(apiUrl).then(
    (res) => res.json()
  );

  if (typeof exchangeObj === 'string') {
    console.error('invalid exchange date');
    return null;
  }

  const newExchange = exchangeObj[currencyCode1][currencyCode2];
  return newExchange;
}
