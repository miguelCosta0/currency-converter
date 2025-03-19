import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { changeFlagSrc } from '@/lib/features/flagSrcs/flagSrcsSlice';
import { setExchange } from '@/lib/features/exchange/exchangeSlice';
import { changeCurrencyCode } from '@/lib/features/currencyCodes/currencyCodesSlice';
import { setAmountOfCurrency } from '@/lib/features/amountOfCurrency/amountOfCurrencySlice';
import getFullDate from '@/utils/getFullDate';

type SelectCurrencyProps = {
  idNumber: number;
};

export default function SelectCurrency({ idNumber }: SelectCurrencyProps) {
  const dispatch = useAppDispatch();
  const currencies = useAppSelector((state) => state.currencies.obj);
  const { currency1, currency2 } = useAppSelector(
    (state) => state.currencyCodes
  );
  const amountOfCurrency1 = useAppSelector(
    (state) => state.amountOfCurrency.amount1
  );
  const currenciesValuesArray = Object.values(currencies || {});

  return (
    <select
      id={`currency-${idNumber}`}
      className="border rounded-md p-1 w-full"
      value={idNumber === 1 ? currency1 : currency2}
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
    dispatch(changeCurrencyCode({ idNumber, newCode: newCurrencyCode }));
    dispatch(
      changeFlagSrc({ idNumber, newSrc: currencies![newCurrencyCode].flag })
    );

    const auxCurrency1 = idNumber === 1 ? newCurrencyCode : currency1;
    const auxCurrency2 = idNumber === 2 ? newCurrencyCode : currency2;

    if (auxCurrency1 && auxCurrency2) {
      fetchExchange(auxCurrency1, auxCurrency2);
    }
  }

  async function fetchExchange(currency1: string, currency2: string) {
    const dateToday = getFullDate();
    const apiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${dateToday}/v1/currencies/${currency1}.json`;
    const exchangeObj = await fetch(apiUrl).then((res) => res.json()); // u need to type this

    if (typeof exchangeObj === 'string') {
      console.error('invalid exchange date');
      return;
    }

    const newExchange = exchangeObj[currency1][currency2];
    dispatch(setExchange({ newExchange }));
    dispatch(
      setAmountOfCurrency({
        idNumber: 1,
        newAmount: amountOfCurrency1,
        exchange: newExchange,
      })
    );
  }
}
