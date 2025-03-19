'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { CurrencyWithFlags } from '@/types/Currency';
import { setCurrencies } from '@/lib/features/currencies/currenciesSlice';

import Title from '@/components/Title';
import CurrencyContainer from '@/components/CurrencyContainer';
import CurrencyFlag from '@/components/CurrencyFlag';
import ToggleCurrencyButton from '@/components/ToggleCurrencyButton';

export default function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      dispatch(setCurrencies(await getCurrencies()));
    })();
  }, [dispatch]);

  return (
    <div className="max-w-4xl h-[80vh] bg-white my-10 mx-auto p-2 rounded-xl">
      <Title />

      <div className="flex flex-row justify-between items-center w-[90%] mx-auto mt-16">
        <CurrencyContainer idNumber={1} />

        <div className="flex flex-row justify-between items-center max-w-[20%] mx-auto gap-3">
          <CurrencyFlag idNumber={1} />

          <ToggleCurrencyButton />

          <CurrencyFlag idNumber={2} />
        </div>

        <CurrencyContainer idNumber={2} />
      </div>
    </div>
  );
}

async function getCurrencies() {
  const currenciesPath = process.env.NEXT_PUBLIC_currenciesPath!;
  const data = await fetch(currenciesPath);
  const currencies: Record<string, CurrencyWithFlags> = {};
  const currenciesArray = (await data.json()) as CurrencyWithFlags[];

  currenciesArray.forEach((val) => {
    currencies[val.code.toLowerCase()] = val;
  });

  return currencies;
}
