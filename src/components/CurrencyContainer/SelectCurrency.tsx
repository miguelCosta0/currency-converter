import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setLoading } from '@/lib/features/loading/loading';
import { setExchange } from '@/lib/features/exchange/exchangeSlice';
import {
  setCurrencyCode,
  setAmountOfCurrency,
  setFlagSrc,
} from '@/lib/features/currencies/currenciesSlice';
import fetchExchange from '@/data/fetchExchange';

type SelectCurrencyProps = {
  idNumber: number;
};

export default function SelectCurrency({ idNumber }: SelectCurrencyProps) {
  const dispatch = useAppDispatch();
  const { currency1, currency2 } = useAppSelector((state) => state.currencies);
  const { date } = useAppSelector((state) => state.exchange);
  const { currencies: allCurrencies } = useAppSelector(
    (state) => state.allCurrencies
  );
  const currenciesValuesArray = Object.values(allCurrencies || {});

  return (
    <select
      id={`currency-${idNumber}`}
      className="border rounded-md p-1 w-full"
      value={idNumber === 1 ? currency1.code : currency2.code}
      onChange={handleCurrencyChange}
    >
      <option value="" disabled>
        Select a currency:
      </option>

      {currenciesValuesArray?.map((value) => {
        return (
          <option key={value.code} value={value.code.toLowerCase()}>
            {value.code} - {value.name}
          </option>
        );
      })}
    </select>
  );

  async function handleCurrencyChange(e: ChangeEvent<HTMLSelectElement>) {
    const newCurrencyCode = e.target.value;
    dispatch(setCurrencyCode({ idNumber, newCode: newCurrencyCode }));
    dispatch(
      setFlagSrc({ idNumber, newSrc: allCurrencies![newCurrencyCode].flag })
    );

    const _currency1 = idNumber === 1 ? newCurrencyCode : currency1.code;
    const _currency2 = idNumber === 2 ? newCurrencyCode : currency2.code;
    if (!(_currency1 && _currency2)) return;

    dispatch(setLoading(true));
    const newExchange = await fetchExchange(_currency1, _currency2, date);
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
