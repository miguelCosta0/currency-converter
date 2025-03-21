import { CurrencyWithFlags } from '@/types/Currency';

export default async function fetchtCurrencies() {
  const currenciesPath = process.env.NEXT_PUBLIC_currenciesPath!;
  const data = await fetch(currenciesPath);
  const currencies: Record<string, CurrencyWithFlags> = {};
  const currenciesArray = (await data.json()) as CurrencyWithFlags[];

  currenciesArray.forEach((val) => {
    currencies[val.code.toLowerCase()] = val;
  });

  return currencies;
}
