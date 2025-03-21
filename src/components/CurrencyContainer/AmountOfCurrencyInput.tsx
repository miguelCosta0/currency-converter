import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setAmountOfCurrency } from '@/lib/features/currencies/currenciesSlice';
import { CurrenciesState } from '@/lib/features/currencies/types';
import cleanInputNumber from '@/utils/cleanInputNumber';

type CurrencyAmountProps = {
  idNumber: number;
};

export default function AmountOfCurrencyInput({
  idNumber,
}: CurrencyAmountProps) {
  const dispatch = useAppDispatch();
  const { exchange } = useAppSelector((state) => state.exchange);
  const amountOfCurrency = useAppSelector(
    (state) =>
      state.currencies[`currency${idNumber}` as keyof CurrenciesState].amount
  );

  return (
    <input
      id={`currency-amount-${idNumber}`}
      type="text"
      value={amountOfCurrency}
      onChange={handleAmountOfCurrencyChange}
      onBlur={handleBlur}
      className="w-full mt-4 p-1 border-2 border-[rgb(160,160,160)] rounded-md
      focus:outline-0 focus:border-main focus:shadow-sm text-2xl "
    />
  );

  function handleAmountOfCurrencyChange(e: ChangeEvent<HTMLInputElement>) {
    if (!exchange) return;

    const newAmount = e.target.value;
    dispatch(setAmountOfCurrency({ idNumber, newAmount, exchange }));
  }

  function handleBlur() {
    if (!exchange) return;

    dispatch(
      setAmountOfCurrency({
        idNumber,
        newAmount: cleanInputNumber(amountOfCurrency),
        exchange,
      })
    );
  }
}
