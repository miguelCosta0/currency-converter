import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setLoading } from '@/lib/features/loading/loading';
import { setAmountOfCurrency } from '@/lib/features/currencies/currenciesSlice';
import {
  setExchange,
  setExchangeDate,
} from '@/lib/features/exchange/exchangeSlice';
import fetchExchange from '@/data/fetchExchange';
import getDateToday from '@/utils/getDateToday';

export default function DateInput() {
  const dispatch = useAppDispatch();
  const { currency1, currency2 } = useAppSelector((state) => state.currencies);
  const { date } = useAppSelector((state) => state.exchange);

  return (
    <div className="mx-auto my-8 w-fit">
      <input
        className="p-0.5 rounded-md focus:outline-1 focus:outline-main focus:shadow-sm"
        type="date"
        value={date}
        min="2024-03-02"
        onChange={handleDateChange}
      />
    </div>
  );

  async function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    let newDate = e.target.value;
    const dateToday = getDateToday();

    if (!newDate || newDate > dateToday) newDate = dateToday;

    dispatch(setExchangeDate(newDate));

    if (!(currency1.code && currency2.code)) return;

    dispatch(setLoading(true));
    const newExchange = await fetchExchange(
      currency1.code,
      currency2.code,
      newDate
    );
    dispatch(setLoading(false));

    if (!newExchange) return;

    dispatch(setExchange({ newExchange }));
    dispatch(
      setAmountOfCurrency({
        idNumber: 1,
        newAmount: currency1.amount,
        exchange: newExchange,
      })
    );
  }
}
