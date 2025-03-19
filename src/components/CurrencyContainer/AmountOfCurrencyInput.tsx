import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  amountOfCurrencyState,
  setAmountOfCurrency,
} from '@/lib/features/amountOfCurrency/amountOfCurrencySlice';
import cleanInputNumber from '@/utils/cleanInputNumber';

type CurrencyAmountProps = {
  idNumber: number;
};

export default function AmountOfCurrencyInput({
  idNumber,
}: CurrencyAmountProps) {
  const dispatch = useAppDispatch();
  const amountOfCurrency = useAppSelector(
    (state) =>
      state.amountOfCurrency[`amount${idNumber}` as keyof amountOfCurrencyState]
  );
  const exchange = useAppSelector((state) => state.exchange.exchange);

  return (
    <input
      id={`currency-amount-${idNumber}`}
      type="text"
      value={amountOfCurrency}
      onChange={handleAmountOfCurrencyChange}
      onBlur={handleBlur}
      className="w-full mt-4 p-1 border-2 border-[rgb(160,160,160)] rounded-md
      focus:outline-0 focus:border-main-dark focus:shadow-sm text-2xl "
    />
  );

  async function handleAmountOfCurrencyChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const newAmount = e.target.value;
    if (exchange)
      dispatch(setAmountOfCurrency({ idNumber, newAmount, exchange }));
  }

  function handleBlur() {
    if (exchange)
      dispatch(
        setAmountOfCurrency({
          idNumber,
          newAmount: cleanInputNumber(amountOfCurrency),
          exchange,
        })
      );
  }
}
