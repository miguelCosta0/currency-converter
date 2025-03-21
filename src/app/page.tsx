'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setAllCurrencies } from '@/lib/features/allCurrencies/allCurrenciesSlice';
import { setLoading } from '@/lib/features/loading/loading';
import fetchCurrencies from '@/data/fetchCurrencies';

import Title from '@/components/Title';
import CurrencyContainer from '@/components/CurrencyContainer';
import CurrencyFlag from '@/components/CurrencyFlag';
import ToggleCurrencyButton from '@/components/ToggleCurrencyButton';
import DateInput from '@/components/DateInput';
import LoadingIcon from '@/components/LoadingIcon';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.loading);

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      dispatch(setAllCurrencies(await fetchCurrencies()));
      dispatch(setLoading(false));
    })();
  }, [dispatch]);

  return (
    <div className="max-w-4xl min-h-[80vh] bg-white my-10 mx-auto p-3 rounded-xl">
      <Title />

      <div
        className="mt-16 mb-8 mx-auto w-[90%] flex flex-col gap-3 justify-between
        items-center md:flex-row md:*:flex-row md:*:gap-2"
      >
        <CurrencyContainer idNumber={1} />

        <div className="flex flex-col gap-0.5 justify-between items-center max-w-[20%] ">
          <CurrencyFlag idNumber={1} />

          {loading ? <LoadingIcon /> : <ToggleCurrencyButton />}

          <CurrencyFlag idNumber={2} />
        </div>

        <CurrencyContainer idNumber={2} />
      </div>

      <DateInput />
    </div>
  );
}
