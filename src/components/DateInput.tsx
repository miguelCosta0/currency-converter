import { ChangeEvent, useState } from 'react';
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
  const date = useAppSelector((state) => state.exchange.date);
  const [dateToday, setDateToday] = useState(getDateToday());
  updateDateToday();
  // const dateToday = getDateToday();

  return (
    <div className="mx-auto my-8 w-fit">
      <input
        className="p-0.5 rounded-md focus:outline-1 focus:outline-main focus:shadow-sm"
        type="date"
        value={date}
        min="2024-03-02"
        max={dateToday}
        onChange={handleDateChange}
      />
    </div>
  );

  async function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    const newDate = e.target.value;

    if (!newDate || newDate > dateToday) return;

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

  function updateDateToday(): void {
    setInterval(() => {
      const newDate = getDateToday();
      if (dateToday !== newDate) {
        setDateToday(newDate);
      }
    }, 30 * 1000);
  }
}
